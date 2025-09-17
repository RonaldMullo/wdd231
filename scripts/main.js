
// Accessible mobile nav toggle
const btn = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');
if (btn){
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

// Inject current year and last-modified
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
document.querySelectorAll('[data-lastmod]').forEach(el => el.textContent = document.lastModified);

// Home page dynamic bits
(async () => {
  const eventsEl = document.getElementById('events-list');
  const forecastEl = document.getElementById('forecast-list');
  const directoryEl = document.getElementById('directory-sample');

  // Load local JSON data (replace with live APIs later)
  try{
    const [events, forecast, members] = await Promise.all([
      fetch('./data/events.json').then(r=>r.json()),
      fetch('./data/forecast.json').then(r=>r.json()),
      fetch('./data/members.json').then(r=>r.json())
    ]);

    if (eventsEl){
      eventsEl.innerHTML = events.slice(0,3).map(e => `
        <li><span class="badge">${new Date(e.date).toLocaleDateString()}</span> ${e.title} – <em>${e.location}</em></li>
      `).join('');
    }
    if (forecastEl){
      forecastEl.innerHTML = forecast.map(d => `
        <li><strong>${d.day}</strong>: ${d.temp}°C – ${d.summary}</li>
      `).join('');
    }
    if (directoryEl){
      directoryEl.innerHTML = members.slice(0,3).map(m => `
        <article class="card business">
          <img src="${m.logo}" alt="Logo ${m.name}">
          <div>
            <h4>${m.name}</h4>
            <div class="tag">${m.tagline}</div>
            <div>Email: <a href="mailto:${m.email}">${m.email}</a></div>
            <div>Tel: <a href="tel:${m.phone}">${m.phone}</a> · <a href="${m.url}" target="_blank" rel="noopener">Sitio</a></div>
          </div>
        </article>
      `).join('');
    }
  }catch(err){
    console.warn('No local data found', err);
  }
})();
