// scripts/discover.js
(function lastVisit(){
  const KEY='discover-last-visit';
  const now=Date.now();
  const el=document.getElementById('visitMsgText');
  let text="Welcome! Let us know if you have any questions.";
  const last=localStorage.getItem(KEY);
  if(last){
    const diff=now-Number(last);
    if(diff < 24*60*60*1000){
      text="Back so soon! Awesome!";
    }else{
      const days=Math.floor(diff/(24*60*60*1000));
      text=`You last visited ${days} ${days===1?'day':'days'} ago.`;
    }
  }
  el.textContent=text;
  localStorage.setItem(KEY, String(now));
})();

document.getElementById('visitMsgClose').addEventListener('click',()=>{
  document.querySelector('.visit-msg').style.display='none';
});

async function loadAttractions(){
  const grid=document.getElementById('discoverGrid');
  try{
    const res=await fetch('./data/attractions.json');
    const items=await res.json();
    const areas=["a1","a2","a3","a4","a5","a6","a7","a8"];
    items.slice(0,8).forEach((it,idx)=>{
      const art=document.createElement('article');
      art.className='card';
      art.dataset.area=areas[idx];
      art.innerHTML=`
        <h2>${it.name}</h2>
        <figure><img src="${it.image}" alt="${it.name}" width="300" height="200" loading="lazy"></figure>
        <address>${it.address}</address>
        <p>${it.description}</p>
        <a class="btn" href="${it.url}" aria-label="Learn more about ${it.name}">Learn More</a>
      `;
      grid.appendChild(art);
    });
  }catch(e){
    console.error(e);
    grid.innerHTML="<p>We couldn't load the attractions. Please try again later.</p>";
  }
}
loadAttractions();