import { storage } from './utils/storage.js';

// Constants
const THEME_KEY = 'pref-theme';


const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a[data-nav]').forEach(link => {
    const navKey = link.getAttribute('data-nav');
    const isActive = (navKey === 'index' && currentPage === 'index.html') || 
                    currentPage.startsWith(navKey);
    
    if (isActive) {
        link.setAttribute('aria-current', 'page');
    }
});


const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');

if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen.toString());
    });
}


const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


const themeBtn = document.getElementById('theme-toggle');

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
}


applyTheme(storage.get(THEME_KEY, 'auto'));

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.dataset.theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        storage.set(THEME_KEY, newTheme);
        applyTheme(newTheme);
    });
}