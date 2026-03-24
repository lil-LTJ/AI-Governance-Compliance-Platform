/**
 * landing.js
 * Renders the landing page and handles form submission.
 */

import { saveCompanyData } from '../storage.js';
import { saveAuditSession, loadAuditSession, clearAllData } from '../session-manager.js';

export function renderLanding(container) {
    const template = `
        <div class="w-full max-w-4xl mx-auto slide-up pt-6 pb-12">
            <div class="text-center mb-12">
                <div class="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-sm font-semibold mb-6 pulse-soft shadow-sm">
                    <span class="flex w-2 h-2 bg-brand-500 rounded-full mr-2"></span>
                    Enterprise AI Compliance Engine
                </div>
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                    Master Your AI <br class="hidden md:block" />
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-emerald-400">Governance Strategy</span>
                </h1>
                <p class="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light">
                    Centralise oversight, map controls across leading frameworks (COBIT, ISO 42001, EU AI Act), and unlock fast, secure innovation.
                </p>
            </div>

            <div class="glass-card rounded-2xl shadow-xl overflow-hidden relative">
                <!-- Decorative element -->
                <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-400 via-emerald-500 to-teal-400"></div>
                
                <div class="p-8 sm:p-12">
                    <div class="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                        <div>
                            <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Organization Profile</h2>
                            <p class="text-sm text-slate-500 mt-1">Configure your foundational compliance parameters.</p>
                        </div>
                        <div class="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                            <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                        </div>
                    </div>
                    
                    <form id="onboarding-form" action="javascript:void(0)" method="post" class="space-y-8" onsubmit="return false;">
                        <!-- Company Name -->
                        <div>
                            <label for="companyName" class="block text-sm font-semibold text-slate-700 mb-2">Organization Name <span class="text-red-500">*</span></label>
                            <input type="text" id="companyName" name="companyName" required 
                                class="form-input block w-full rounded-xl border-slate-200 py-3.5 px-4 border text-slate-900 placeholder-slate-400 text-base" 
                                placeholder="e.g. Acme Corporation">
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <!-- Industry -->
                            <div>
                                <label for="industry" class="block text-sm font-semibold text-slate-700 mb-2">Primary Industry <span class="text-red-500">*</span></label>
                                <div class="relative">
                                    <select id="industry" name="industry" required 
                                        class="form-input block w-full rounded-xl border-slate-200 py-3.5 px-4 border text-slate-900 appearance-none text-base bg-white">
                                        <option value="" disabled selected>Select industry vertical...</option>
                                        <option value="Finance">Financial Services</option>
                                        <option value="Healthcare">Healthcare & Life Sciences</option>
                                        <option value="Tech">Technology & Software</option>
                                        <option value="Retail">Retail & E-commerce</option>
                                        <option value="Manufacturing">Manufacturing</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            <!-- Number of Employees -->
                            <div>
                                <label for="employees" class="block text-sm font-semibold text-slate-700 mb-2">Company Size <span class="text-red-500">*</span></label>
                                <div class="relative">
                                    <select id="employees" name="employees" required 
                                        class="form-input block w-full rounded-xl border-slate-200 py-3.5 px-4 border text-slate-900 appearance-none text-base bg-white">
                                        <option value="" disabled selected>Select employee count...</option>
                                        <option value="<50">&lt; 50 (Small)</option>
                                        <option value="50-500">50 &ndash; 500 (Mid-Market)</option>
                                        <option value=">500">&gt; 500 (Enterprise)</option>
                                    </select>
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Primary AI Use Cases -->
                        <div>
                            <label for="useCases" class="block text-sm font-semibold text-slate-700 mb-2">Primary AI Use Cases</label>
                            <textarea id="useCases" name="useCases" rows="3" 
                                class="form-input block w-full rounded-xl border-slate-200 py-3.5 px-4 border text-slate-900 placeholder-slate-400 text-base resize-none" 
                                placeholder="e.g. LLMs for automated customer support, predictive analytics for supply chain..."></textarea>
                            <p class="mt-2 text-xs text-slate-500 font-medium">Briefly describe your high-value AI implementations to tailor control recommendations.</p>
                        </div>

                        <!-- Strategic Goals -->
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-3">Core Strategic Objectives</label>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50/50 p-5 rounded-xl border border-slate-200">
                                <label class="flex items-center p-3 border border-transparent rounded-lg hover:bg-white hover:shadow-sm hover:border-slate-200 transition-all cursor-pointer group">
                                    <input name="strategicGoals" type="checkbox" value="Increase market share" class="w-5 h-5 text-brand-600 rounded border-slate-300 focus:ring-brand-500 outline-none transition-all">
                                    <span class="ml-3 font-medium text-slate-700 group-hover:text-slate-900">Increase market share</span>
                                </label>
                                <label class="flex items-center p-3 border border-transparent rounded-lg hover:bg-white hover:shadow-sm hover:border-slate-200 transition-all cursor-pointer group">
                                    <input name="strategicGoals" type="checkbox" value="Reduce operational costs" class="w-5 h-5 text-brand-600 rounded border-slate-300 focus:ring-brand-500 outline-none transition-all">
                                    <span class="ml-3 font-medium text-slate-700 group-hover:text-slate-900">Reduce operational costs</span>
                                </label>
                                <label class="flex items-center p-3 border border-transparent rounded-lg hover:bg-white hover:shadow-sm hover:border-slate-200 transition-all cursor-pointer group">
                                    <input name="strategicGoals" type="checkbox" value="Enhance customer experience" class="w-5 h-5 text-brand-600 rounded border-slate-300 focus:ring-brand-500 outline-none transition-all">
                                    <span class="ml-3 font-medium text-slate-700 group-hover:text-slate-900">Enhance customer experience</span>
                                </label>
                                <label class="flex items-center p-3 border border-transparent rounded-lg hover:bg-white hover:shadow-sm hover:border-slate-200 transition-all cursor-pointer group">
                                    <input name="strategicGoals" type="checkbox" value="Innovate new products" class="w-5 h-5 text-brand-600 rounded border-slate-300 focus:ring-brand-500 outline-none transition-all">
                                    <span class="ml-3 font-medium text-slate-700 group-hover:text-slate-900">Innovate new products</span>
                                </label>
                                <label class="flex items-center p-3 border border-transparent rounded-lg hover:bg-white hover:shadow-sm hover:border-slate-200 transition-all cursor-pointer group sm:col-span-2">
                                    <input name="strategicGoals" type="checkbox" value="Other" class="w-5 h-5 text-brand-600 rounded border-slate-300 focus:ring-brand-500 outline-none transition-all">
                                    <span class="ml-3 font-medium text-slate-700 group-hover:text-slate-900">Other strategic initiatives</span>
                                </label>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <div class="pt-6 border-t border-slate-100">
                            <button type="submit" class="group relative w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-brand-500/30 text-lg font-bold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 transform">
                                <div class="absolute inset-0 w-full h-full bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                                <span class="relative flex items-center">
                                    Initialize Platform Instance
                                    <svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- Session Management Panel -->
        <div class="mt-8 pb-10">
            <div class="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div class="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                    <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                    <h3 class="font-bold text-slate-700 text-sm">Audit Session Management</h3>
                </div>
                <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <!-- Save -->
                    <div class="flex flex-col gap-2 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                        <h4 class="text-sm font-bold text-emerald-800 flex items-center gap-1.5">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            Save Audit Session
                        </h4>
                        <p class="text-xs text-emerald-700">Export all current data as a JSON file you can reload anytime to continue this audit.</p>
                        <button id="btn-save-session" class="mt-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors">Download Session File</button>
                    </div>
                    <!-- Load/Resume -->
                    <div class="flex flex-col gap-2 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <h4 class="text-sm font-bold text-blue-800 flex items-center gap-1.5">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l4-4m0 0l4 4m-4-4v12"></path></svg>
                            Load Previous Session
                        </h4>
                        <p class="text-xs text-blue-700">Import a saved session file to resume a previous audit exactly where you left off.</p>
                        <label class="mt-auto cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg text-center transition-colors">
                            Load Session File
                            <input type="file" id="input-load-session" accept=".json" class="hidden">
                        </label>
                    </div>
                    <!-- Clear / New Company -->
                    <div class="flex flex-col gap-2 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <h4 class="text-sm font-bold text-red-800 flex items-center gap-1.5">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            New Company Audit
                        </h4>
                        <p class="text-xs text-red-700">Wipe all current data to start a fresh audit for a different organisation. Save first!</p>
                        <button id="btn-clear-data" class="mt-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors">Clear All & Start Fresh</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = template;

    // Attach event listener to form
    const form = document.getElementById('onboarding-form');
    if (!form) { console.error('[Landing] onboarding-form not found'); return container; }
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Gather checked goals
        const checkedGoals = Array.from(form.querySelectorAll('input[name="strategicGoals"]:checked'))
            .map(cb => cb.value);

        const data = {
            companyName: document.getElementById('companyName').value.trim(),
            industry: document.getElementById('industry').value,
            employees: document.getElementById('employees').value,
            useCases: document.getElementById('useCases').value.trim(),
            strategicGoals: checkedGoals,
            setupDate: new Date().toISOString()
        };

        if (saveCompanyData(data)) {
            // Navigate to controls
            window.location.hash = 'controls';
        } else {
            alert('Failed to initialize profile. Please ensure cookies and local storage are enabled.');
        }
    });

    // --- Session Management Listeners ---

    // Save Session
    const saveBtn = container.querySelector('#btn-save-session');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const filename = saveAuditSession();
            saveBtn.textContent = `✓ Saved as ${filename}`;
            setTimeout(() => { saveBtn.textContent = 'Download Session File'; }, 3000);
        });
    }

    // Load Session
    const loadInput = container.querySelector('#input-load-session');
    if (loadInput) {
        loadInput.addEventListener('change', async (e) => {
            if (!e.target.files.length) return;
            try {
                const company = await loadAuditSession(e.target.files[0]);
                if (confirm(`Session loaded for "${company}"! Reload the page to apply all changes?`)) {
                    window.location.reload();
                }
            } catch (err) {
                alert(err.message);
            }
        });
    }

    // Clear / New Company
    const clearBtn = container.querySelector('#btn-clear-data');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('⚠️ This will permanently clear ALL data for the current audit. Have you saved your session first?\n\nClick OK to wipe data and start fresh.')) {
                clearAllData();
                window.location.hash = '';
                window.location.reload();
            }
        });
    }

    return container;
}
