const display = document.getElementById("memberDisplay");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

function setView(mode){
  if (mode === "grid"){
    display.classList.add("grid");
    display.classList.remove("list");
    gridBtn.classList.add("is-active");
    listBtn.classList.remove("is-active");
    gridBtn.setAttribute("aria-pressed","true");
    listBtn.setAttribute("aria-pressed","false");
  } else {
    display.classList.add("list");
    display.classList.remove("grid");
    listBtn.classList.add("is-active");
    gridBtn.classList.remove("is-active");
    listBtn.setAttribute("aria-pressed","true");
    gridBtn.setAttribute("aria-pressed","false");
  }
}

gridBtn.addEventListener("click", ()=> setView("grid"));
listBtn.addEventListener("click", ()=> setView("list"));

async function loadMembers(){
  try{
    const res = await fetch("./data/members.json");
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    const members = await res.json();
    renderMembers(members);
  }catch(err){
    display.innerHTML = `<p>Error loading the directory. ${err.message}</p>`;
  }
}

function renderMembers(members){
  display.innerHTML = "";
  const fragment = document.createDocumentFragment();

  members.forEach(m=>{
    const card = document.createElement("article");
    card.className = "card";

    const header = document.createElement("header");
    const img = document.createElement("img");
    img.className = "logo";
    img.src = `./images/${m.logo}`;
    img.alt = `Logo of ${m.name}`;

    const titleWrap = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.textContent = m.name;

    const tier = document.createElement("div");
    const tiers = {1:"Member", 2:"Silver", 3:"Gold"};
    tier.className = "tier";
    tier.textContent = `Level: ${tiers[m.membership] ?? "Member"}`;

    titleWrap.append(h3, tier);
    header.append(img, titleWrap);

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.innerHTML = `
      <div>${m.address}</div>
      <div>Phone: <a href="tel:${m.phone.replace(/[^+\d]/g,'')}">${m.phone}</a></div>
      <div>Website: <a href="${m.url}" target="_blank" rel="noopener">${m.url}</a></div>
      <div>Email: <a href="mailto:${m.email}">${m.email}</a></div>
    `;

    const desc = document.createElement("p");
    desc.className = "desc";
    desc.textContent = m.tagline || "Local business in Quito";

    card.append(header, desc, meta);
    fragment.append(card);
  });

  display.append(fragment);
}

setView("grid"); 
loadMembers();
