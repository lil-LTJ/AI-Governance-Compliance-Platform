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

    // Guard clause removed: we now allow all pages to render.
    // Instead, we will inject a notice banner later if data is missing.

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
        try {
            renderFunc(appEl);
        } catch (renderError) {
            console.error(`[Router] Error rendering ${hash}:`, renderError);
            appEl.innerHTML = `<div class="p-12 text-center text-red-500 font-bold bg-red-50 rounded-2xl border border-red-100 mx-4 mt-8">
                Failed to render this module. Please check the console or reload.
            </div>`;
        }
 
        // Inject Profile Missing Banner if needed
        if (!companyData && hash !== 'landing') {
            const banner = document.createElement('div');
            banner.id = 'profile-missing-banner';
            banner.className = 'w-full max-w-[90rem] mx-auto px-4 mt-4 slide-up';
            banner.innerHTML = `
                <div class="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-amber-100 text-amber-700 rounded-lg">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        </div>
                        <div>
                            <p class="text-sm font-bold text-amber-900">Organization Profile Not Set</p>
                            <p class="text-xs text-amber-700 font-medium">Please initialize your profile to unlock full dashboard automation and report persistence.</p>
                        </div>
                    </div>
                    <a href="#landing" class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-sm transition-transform hover:scale-105">
                        Set Up Profile Now
                    </a>
                </div>
            `;
            appEl.prepend(banner);
        }
        
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
