/**
 * app.js
 * Main entry point and router for the SPA.
 */

import { loadCompanyData } from './storage.js';
import { renderLanding } from './pages/landing.js';
import { renderControls } from './pages/controls.js';
import { renderAIModelProducts } from './pages/ai-model-products.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderComplianceDashboard } from './pages/compliance-dashboard.js';
import { renderExecutiveSummary } from './pages/business-executive-summary.js';

const appEl = document.getElementById('app');

// Router configuration
const routes = {
    'landing': renderLanding,
    'controls': renderControls,
    'ai-model-products': renderAIModelProducts,
    'dashboard': renderDashboard,
    'compliance': renderComplianceDashboard,
    'executive-summary': renderExecutiveSummary
};

function getInitials(name) {
    if (!name) return 'AI';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

function updateNavigation(currentRoute, companyData) {
    // Update active state on nav links
    document.querySelectorAll('.nav-link, #mobile-menu a').forEach(link => {
        const href = link.getAttribute('href').replace('#', '');
        if (href === currentRoute) {
            link.classList.add('active-nav-link');
        } else {
            link.classList.remove('active-nav-link');
        }
    });

    // Update header with company info
    const greetingEl = document.getElementById('user-greeting');
    const nameDisplayEl = document.getElementById('company-name-display');
    const initialsEl = document.getElementById('company-initials');
    
    const mobileGreetingEl = document.getElementById('mobile-user-greeting');
    const mobileNameDisplayEl = document.getElementById('mobile-company-name-display');
    const mobileInitialsEl = document.getElementById('mobile-company-initials');

    if (companyData && currentRoute !== 'landing') {
        const initials = getInitials(companyData.companyName);
        
        nameDisplayEl.textContent = companyData.companyName;
        initialsEl.textContent = initials;
        greetingEl.classList.remove('opacity-0');
        greetingEl.classList.add('opacity-100');
        
        mobileNameDisplayEl.textContent = companyData.companyName;
        mobileInitialsEl.textContent = initials;
        mobileGreetingEl.classList.remove('hidden');
        mobileGreetingEl.classList.add('flex');
    } else {
        greetingEl.classList.remove('opacity-100');
        greetingEl.classList.add('opacity-0');
        mobileGreetingEl.classList.remove('flex');
        mobileGreetingEl.classList.add('hidden');
    }
}

function handleRoute() {
    // Get the hash, default to 'landing'
    let hash = window.location.hash.slice(1);
    if (!hash || !routes[hash]) {
        hash = 'landing';
        window.location.hash = hash;
        return; // handleRoute will be called again by hashchange
    }

    const companyData = loadCompanyData();

    // Guard clause: if missing data and not on landing, force redirect
    if (!companyData && hash !== 'landing') {
        window.location.hash = 'landing';
        return;
    }

    // Set active route and update UI
    updateNavigation(hash, companyData);

    // Fade out effect
    appEl.style.opacity = '0';
    appEl.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        // Render content
        const renderFunc = routes[hash];
        appEl.innerHTML = ''; // Clear current
        
        // Execute render factory
        renderFunc(appEl);
        
        // Fade in effect
        appEl.style.opacity = '1';
        appEl.style.transform = 'translateY(0)';
        
        // Ensure scrolling to top
        window.scrollTo(0, 0);
    }, 200);
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    
    // Toggle menu
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('hidden');
    });

    // Close menu when clicking a link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !btn.contains(e.target)) {
            menu.classList.add('hidden');
        }
    });
}

// Initialization
function init() {
    setupMobileMenu();
    window.addEventListener('hashchange', handleRoute);
    
    // Initial route handler
    handleRoute();
}

// Start app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
