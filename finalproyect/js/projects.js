import { storage } from './utils/storage.js';
import { openModal, bindDialog } from './modal.js';

const DATA_URL = 'data/units.json';
const listing = document.getElementById('listing');
const viewSelect = document.getElementById('view-select');
const projectFilter = document.getElementById('project-filter');
const minSize = document.getElementById('min-size');
const statusFilter = document.getElementById('status-filter');
const applyBtn = document.getElementById('apply-filters');
const resetBtn = document.getElementById('reset-filters');


const PREF_KEY = 'projects-prefs';
const prefs = storage.get(PREF_KEY, { 
    view: 'grid', 
    project: 'all', 
    minSize: 0, 
    status: 'all' 
});


viewSelect.value = prefs.view; 
projectFilter.value = prefs.project;
statusFilter.value = prefs.status; 
minSize.value = prefs.minSize || '';


const modal = document.getElementById('detail-modal');
bindDialog(modal);

let items = [];

async function loadData() {
    try {
        const res = await fetch(DATA_URL, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error('Invalid data');
        items = data;
        render();
    } catch (err) {
        listing.innerHTML = `<p class="card">Error loading data: ${err.message}</p>`;
    }
}

function applyFilters(data) {
    const p = projectFilter.value;
    const s = statusFilter.value;
    const m = Number(minSize.value) || 0;
    
    return data
        .filter(it => p === 'all' ? true : it.project === p)
        .filter(it => s === 'all' ? true : it.status === s)
        .filter(it => (it.lot_size_m2 || 0) >= m);
}

function itemCard(it) {
    const amenities = Array.isArray(it.amenities) ? it.amenities.slice(0, 3).join(' • ') : '';
    return `
    <article class="card item" data-id="${it.id}" tabindex="0">
        <img src="${it.image}" alt="Lot ${it.id} in ${it.project}" width="640" height="360" loading="lazy" />
        <div class="pad">
            <h3>${it.project} – Lot ${it.id}</h3>
            <p class="muted">${it.lot_size_m2} m² • $${it.price_usd.toLocaleString()} • ${it.status}</p>
            <p>${amenities}</p>
            <button class="btn small" data-action="details">Details</button>
        </div>
    </article>`;
}

function render() {
    const filtered = applyFilters(items);
    listing.classList.toggle('list', viewSelect.value === 'list');
    listing.innerHTML = filtered.map(itemCard).join('');
    
   
    listing.querySelectorAll('.item').forEach(card => {
        card.addEventListener('click', onCard);
        card.addEventListener('keydown', (e) => { 
            if (e.key === 'Enter') onCard.call(card, e); 
        });
    });
}

function onCard(e) {
    const card = e.currentTarget.closest('.item');
    if (!card) return;
    
    const id = card.dataset.id;
    const it = items.find(x => String(x.id) === String(id));
    if (!it) return;
    
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
        <img src="${it.image}" alt="Lot ${it.id} large view" width="960" height="540" loading="lazy" />
        <p id="modal-desc">Project: <strong>${it.project}</strong></p>
        <ul>
            <li>Lot size: ${it.lot_size_m2} m²</li>
            <li>Price: $${it.price_usd.toLocaleString()}</li>
            <li>Status: ${it.status}</li>
            <li>Amenities: ${it.amenities.join(', ')}</li>
        </ul>
    `;
    
    openModal(document.getElementById('detail-modal'));
}


applyBtn.addEventListener('click', () => {
    storage.set(PREF_KEY, {
        view: viewSelect.value, 
        project: projectFilter.value,
        minSize: Number(minSize.value) || 0, 
        status: statusFilter.value
    });
    render();
});

resetBtn.addEventListener('click', () => {
    viewSelect.value = 'grid'; 
    projectFilter.value = 'all'; 
    minSize.value = ''; 
    statusFilter.value = 'all';
    
    storage.set(PREF_KEY, { 
        view: 'grid', 
        project: 'all', 
        minSize: 0, 
        status: 'all' 
    });
    render();
});

viewSelect.addEventListener('change', () => {
    const p = storage.get(PREF_KEY, {});
    p.view = viewSelect.value; 
    storage.set(PREF_KEY, p);
    listing.classList.toggle('list', viewSelect.value === 'list');
});

loadData();