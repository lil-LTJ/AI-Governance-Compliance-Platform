import { loadCompanyData, loadPhase1Data, loadPhase2Data, loadPhase3Data, loadPhase4Data, loadPhase5Data, loadPhase6Data } from '../storage.js';

export function renderExecutiveSummary(container) {
    const company = loadCompanyData() || { companyName: 'Corporate Entity', industry: 'Technology', employees: '500', usecases: '', goals: [] };
    
    // Load States
    const p1 = loadPhase1Data() || { assets: [] };
    const p2 = loadPhase2Data() || { raci: [] };
    const p3 = loadPhase3Data() || { ethics: {}, risk: {}, dataGov: {} };
    const p4 = loadPhase4Data() || { triage: [], etl: {} };
    const p5 = loadPhase5Data() || { risks: [], cards: {} };
    const p6 = loadPhase6Data() || { pmm: {}, incidents: [], audit: {} };

    // Load Controls
    const controlsStr = localStorage.getItem('controlStatuses');
    const controls = controlsStr ? JSON.parse(controlsStr) : {};
    let totalControls = Object.keys(controls).length;
    let compliantControls = 0;
    
    if (totalControls > 0) {
        Object.values(controls).forEach(status => {
            if (status === 'Compliant' || status === 'Partially Compliant') compliantControls++;
        });
    } else {
        // Fallback for demo
        totalControls = 10;
        compliantControls = 3;
    }
    const compliancePct = Math.round((compliantControls / totalControls) * 100);

    // Revenue tracking
    let storedRev = localStorage.getItem('annualRevenue');
    if (!storedRev) {
        // Estimate based on employees if possible ($150k per employee)
        const empCount = parseInt(company.employees.replace(/[^0-9]/g, '')) || 500;
        storedRev = empCount * 150000;
    } else {
        storedRev = parseFloat(storedRev);
    }

    // High Risk counting
    let highRiskCount = 0;
    if (p5.risks && p5.risks.length > 0) {
        p5.risks.forEach(r => {
            if (parseInt(r.likelihood)*parseInt(r.impact) >= 15) highRiskCount++;
        });
    } else {
        highRiskCount = 2; // fallback for narrative
    }

    // Evaluate Gaps for Roadmap
    const hasTriage = p4.triage && p4.triage.length > 0;
    const hasCards = Object.keys(p5.cards).length > 0;
    const hasPmm = p6.pmm && !!p6.pmm.metrics;
    const hasAudit = p6.audit && !!p6.audit.execSum;

    // Financial calculations
    const calcFinancials = (rev) => {
        // Regulatory Fines
        const isHighReg = ['Finance', 'Healthcare', 'Banking', 'Insurance'].some(i => company.industry.includes(i));
        const baseFine = isHighReg ? Math.max(20000000, rev * 0.04) : Math.max(10000000, rev * 0.02);
        const fineRisk = baseFine * (1 - (compliancePct / 100));

        // Automation Score (0 to 1)
        let autoScore = 0.2; // base
        if (p4.etl && p4.etl.gates) autoScore += 0.3;
        if (p6.pmm && p6.pmm.drift) autoScore += 0.3;
        const inefficiency = 500000 * (1 - autoScore);

        // Reputational Risk
        const repRisk = rev * (0.005 * highRiskCount);

        return {
            maxFine: baseFine, fineRisk, autoScore, inefficiency, repRisk
        };
    };

    let fins = calcFinancials(storedRev);

    // Format Currency
    const fmtC = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(val);

    const renderUI = () => {
        fins = calcFinancials(storedRev);

        const goals = company.goals && company.goals.length > 0 ? company.goals : ["Increase Operational Efficiency", "Accelerate Market Entry", "Enhance Customer Trust"];
        
        container.innerHTML = \`
            <div class="w-full max-w-[90rem] mx-auto fade-in pt-6 pb-20 px-4" id="exec-content">
                <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200" data-html2canvas-ignore="false">
                    <div>
                        <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 flex items-center gap-3">
                            <div class="p-2 bg-brand-100 text-brand-700 rounded-lg">
                                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                            </div>
                            Business Executive Summary
                        </h1>
                        <p class="mt-2 text-slate-600 font-medium">Strategic Alignment & Financial Value for \${company.companyName}</p>
                    </div>
                    <div data-html2canvas-ignore="true" class="flex items-center gap-3">
                        <div class="bg-white px-3 py-1.5 rounded-lg border flex items-center shadow-sm">
                            <label class="text-xs font-bold text-slate-500 mr-2">Revenue ($)</label>
                            <input type="number" id="in-rev" class="w-32 text-sm font-bold text-slate-800 outline-none" value="\${storedRev}">
                        </div>
                        <button id="btn-export-exec" class="px-5 py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white shadow-lg text-sm font-bold rounded-lg transition-transform hover:scale-105 flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            Export Presentation
                        </button>
                    </div>
                </div>

                <!-- Exec Summary Paragraph -->
                <div class="mb-8 p-8 bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl shadow-xl">
                    <h2 class="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                        <svg class="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                        Board-Level Briefing
                    </h2>
                    <p class="text-slate-300 leading-relaxed text-lg font-light">
                        <strong>\${company.companyName}</strong> is operating with a baseline AI regulatory compliance coverage of <span class="text-brand-400 font-bold">\${compliancePct}%</span>. 
                        Currently, there are <span class="text-yellow-400 font-bold">\${highRiskCount} high-risk AI deployments</span> requiring immediate oversight. 
                        By executing the governance roadmap below, we will effectively mitigate \${fmtC(fins.fineRisk)} in theoretical regulatory exposure, 
                        securing our strategic goal of <em>"\${goals[0]}"</em> while avoiding catastrophic reputational degradation.
                    </p>
                </div>

                <!-- Financial Data -->
                <h3 class="text-2xl font-extrabold text-slate-800 mb-6 border-b pb-2">Financial Implications & Value at Risk</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div class="glass-card rounded-2xl p-6 border-t-4 border-red-500 shadow-md">
                        <div class="flex justify-between items-start mb-4">
                            <h4 class="font-bold text-slate-800">Regulatory Fine Exposure</h4>
                            <div class="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                        </div>
                        <p class="text-3xl font-extrabold text-red-600 mb-2">\${fmtC(fins.fineRisk)}</p>
                        <p class="text-xs text-slate-500">Max theoretical penalty: \${fmtC(fins.maxFine)}</p>
                        <p class="text-sm mt-3 text-slate-600 font-medium">Mitigated by your \${compliancePct}% compliance baseline.</p>
                    </div>

                    <div class="glass-card rounded-2xl p-6 border-t-4 border-yellow-500 shadow-md">
                        <div class="flex justify-between items-start mb-4">
                            <h4 class="font-bold text-slate-800">Reputational Risk Impact</h4>
                            <div class="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg></div>
                        </div>
                        <p class="text-3xl font-extrabold text-yellow-600 mb-2">\${fmtC(fins.repRisk)}</p>
                        <p class="text-xs text-slate-500">Projected loss of trust/customer churn</p>
                        <p class="text-sm mt-3 text-slate-600 font-medium">Driven by \${highRiskCount} unmitigated high-risk assets.</p>
                    </div>

                    <div class="glass-card rounded-2xl p-6 border-t-4 border-blue-500 shadow-md">
                        <div class="flex justify-between items-start mb-4">
                            <h4 class="font-bold text-slate-800">Operational Inefficiency</h4>
                            <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg></div>
                        </div>
                        <p class="text-3xl font-extrabold text-blue-600 mb-2">\${fmtC(fins.inefficiency)}</p>
                        <p class="text-xs text-slate-500">Annual cost of manual AI testing/rework</p>
                        <p class="text-sm mt-3 text-slate-600 font-medium">Current automation posture: \${Math.round(fins.autoScore * 100)}%.</p>
                    </div>
                </div>

                <!-- Strategic Alignment Matrix -->
                <h3 class="text-2xl font-extrabold text-slate-800 mb-6 border-b pb-2">Strategic Goal Alignment</h3>
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
                    <table class="min-w-full text-left bg-white">
                        <thead class="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                            <tr>
                                <th class="px-6 py-4 border-b">Corporate Strategic Goal</th>
                                <th class="px-6 py-4 border-b">Governance Action</th>
                                <th class="px-6 py-4 border-b">Framework Driver</th>
                                <th class="px-6 py-4 border-b">Expected Business Outcome</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-sm">
                            \${goals.map((g, i) => \`
                            <tr class="hover:bg-slate-50 transition-colors">
                                <td class="px-6 py-4 font-bold text-slate-800">\${g}</td>
                                <td class="px-6 py-4 text-slate-600">\${i===0?'Deploy robust Model Cards':'Establish continuous ETL auditing'}</td>
                                <td class="px-6 py-4"><span class="px-2 py-1 bg-slate-100 text-slate-500 rounded text-xs px-2 py-1 font-bold">\${i===0?'EU AI Act Art. 11':'ISO 42001 Cl 8.3'}</span></td>
                                <td class="px-6 py-4 text-brand-600 font-bold">\${i===0?'Mitigate transparency litigation risk by 90%':'Prevent drift-induced operational downtime'}</td>
                            </tr>\`).join('')}
                        </tbody>
                    </table>
                </div>

                <!-- Roadmap -->
                <h3 class="text-2xl font-extrabold text-slate-800 mb-6 border-b pb-2">12-Month Risk Mitigation Roadmap</h3>
                <div class="relative">
                    <div class="absolute inset-0 bg-slate-200 w-1 left-6 md:left-1/2 -ml-0.5 rounded-full z-0 h-full"></div>
                    
                    <div class="space-y-8 relative z-10">
                        <!-- Q1 -->
                        <div class="flex flex-col md:flex-row items-center justify-between w-full">
                            <div class="order-1 md:w-5/12 ml-12 md:ml-0 md:text-right pr-0 md:pr-8">
                                <h4 class="text-brand-600 font-bold text-lg mb-1">Q1: Baseline & Triage</h4>
                                <p class="text-slate-600 text-sm mb-2">Identify and classify all shadow AI assets using the Triage Classification Worksheet.</p>
                                <span class="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">Status: \${hasTriage ? 'Complete' : 'Pending Phase 4'}</span>
                            </div>
                            <div class="order-1 w-10 h-10 rounded-full bg-white border-4 \${hasTriage ? 'border-brand-500' : 'border-slate-300'} flex items-center justify-center font-bold absolute left-1 md:relative md:left-auto md:mx-auto">1</div>
                            <div class="order-1 md:w-5/12 ml-12 md:ml-0 pl-0 md:pl-8">
                                <div class="glass-card p-4 rounded-xl border \${hasTriage?'border-brand-200 bg-brand-50':'border-slate-200'}">
                                    <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ROI Expectation</p>
                                    <p class="text-sm font-semibold text-slate-800">Reduces shadow-AI fine risk by ~40%</p>
                                </div>
                            </div>
                        </div>

                        <!-- Q2 -->
                        <div class="flex flex-col md:flex-row items-center justify-between w-full">
                            <div class="order-1 md:w-5/12 ml-12 md:ml-0 text-left md:text-right pr-0 md:pr-8 md:hidden block">
                                <div class="glass-card p-4 rounded-xl border \${hasCards?'border-brand-200 bg-brand-50':'border-slate-200'}">
                                    <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ROI Expectation</p>
                                    <p class="text-sm font-semibold text-slate-800">Neutralize 95% of regulatory visibility gaps</p>
                                </div>
                            </div>
                            <div class="order-1 md:w-5/12 ml-12 md:ml-0 hidden md:block text-right pr-0 md:pr-8">
                                <div class="glass-card p-4 rounded-xl border \${hasCards?'border-brand-200 bg-brand-50':'border-slate-200'}">
                                    <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ROI Expectation</p>
                                    <p class="text-sm font-semibold text-slate-800">Neutralize 95% of regulatory visibility gaps</p>
                                </div>
                            </div>
                            <div class="order-1 w-10 h-10 rounded-full bg-white border-4 \${hasCards ? 'border-brand-500' : 'border-slate-300'} flex items-center justify-center font-bold absolute left-1 md:relative md:left-auto md:mx-auto">2</div>
                            <div class="order-1 md:w-5/12 ml-12 md:ml-0 pl-0 md:pl-8">
                                <h4 class="text-brand-600 font-bold text-lg mb-1">Q2: Risk Documentation</h4>
                                <p class="text-slate-600 text-sm mb-2">Publish comprehensive Model Cards for all Tier 1 & 2 models identified in triage.</p>
                                <span class="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">Status: \${hasCards ? 'Complete' : 'Pending Phase 5'}</span>
                            </div>
                        </div>

                        <!-- Q3 -->
                        <div class="flex flex-col md:flex-row items-center justify-between w-full">
                            <div class="order-1 md:w-5/12 ml-12 md:ml-0 md:text-right pr-0 md:pr-8">
                                <h4 class="text-brand-600 font-bold text-lg mb-1">Q3: Continuous Monitoring</h4>
                                <p class="text-slate-600 text-sm mb-2">Establish automated data drift detection and formally document the PMM framework.</p>
                                <span class="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">Status: \${hasPmm ? 'Complete' : 'Pending Phase 6'}</span>
                            </div>
                            <div class="order-1 w-10 h-10 rounded-full bg-white border-4 \${hasPmm ? 'border-brand-500' : 'border-slate-300'} flex items-center justify-center font-bold absolute left-1 md:relative md:left-auto md:mx-auto">3</div>
                            <div class="order-1 md:w-5/12 ml-12 md:ml-0 pl-0 md:pl-8">
                                <div class="glass-card p-4 rounded-xl border \${hasPmm?'border-brand-200 bg-brand-50':'border-slate-200'}">
                                    <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ROI Expectation</p>
                                    <p class="text-sm font-semibold text-slate-800">Saves \${fmtC(fins.inefficiency / 2)} YoY in manual QA</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Q4 -->
                        <div class="flex flex-col md:flex-row items-center justify-between w-full">
                            <div class="order-1 md:w-5/12 ml-12 md:ml-0 text-left md:text-right pr-0 md:pr-8 md:hidden block">
                                <div class="glass-card p-4 rounded-xl border \${hasAudit?'border-brand-200 bg-brand-50':'border-slate-200'}">
                                    <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ROI Expectation</p>
                                    <p class="text-sm font-semibold text-slate-800">Secures formal board ISO/EU AI Act compliance</p>
                                </div>
                            </div>
                            <div class="order-1 md:w-5/12 ml-12 md:ml-0 hidden md:block text-right pr-0 md:pr-8">
                                <div class="glass-card p-4 rounded-xl border \${hasAudit?'border-brand-200 bg-brand-50':'border-slate-200'}">
                                    <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">ROI Expectation</p>
                                    <p class="text-sm font-semibold text-slate-800">Secures formal board ISO/EU AI Act compliance</p>
                                </div>
                            </div>
                            <div class="order-1 w-10 h-10 rounded-full bg-white border-4 \${hasAudit ? 'border-brand-500' : 'border-slate-300'} flex items-center justify-center font-bold absolute left-1 md:relative md:left-auto md:mx-auto">4</div>
                            <div class="order-1 md:w-5/12 ml-12 md:ml-0 pl-0 md:pl-8">
                                <h4 class="text-brand-600 font-bold text-lg mb-1">Q4: Independent Audit</h4>
                                <p class="text-slate-600 text-sm mb-2">Conduct an internal Executive Management audit and resolve non-conformities.</p>
                                <span class="text-xs font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">Status: \${hasAudit ? 'Complete' : 'Pending Phase 6'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        \`;

        // Bind events
        document.getElementById('in-rev').addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) {
                storedRev = val;
                localStorage.setItem('annualRevenue', storedRev);
                renderUI(); // Re-render to update calculations
                
                // Refocus input since we re-rendered
                setTimeout(()=>{
                    const el = document.getElementById('in-rev');
                    if(el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
                }, 0);
            }
        });

        // Export PDF
        const btnDownload = document.getElementById('btn-export-exec');
        if (btnDownload && typeof html2canvas !== 'undefined' && typeof window.jspdf !== 'undefined') {
            const { jsPDF } = window.jspdf;

            btnDownload.addEventListener('click', async () => {
                const prevHtml = btnDownload.innerHTML;
                btnDownload.innerHTML = 'Generating...';
                btnDownload.classList.add('opacity-50', 'pointer-events-none');
                
                try {
                    const reportContent = document.getElementById('exec-content');
                    // Force desktop rendering width temporarily for clean PDF
                    reportContent.classList.remove('max-w-[90rem]');
                    reportContent.classList.add('w-[1280px]'); 
                    
                    const canvas = await html2canvas(reportContent, {
                        scale: 2,
                        useCORS: true,
                        logging: false,
                        backgroundColor: '#f8fafc'
                    });

                    const imgData = canvas.toDataURL('image/jpeg', 1.0);
                    
                    reportContent.classList.remove('w-[1280px]');
                    reportContent.classList.add('max-w-[90rem]');

                    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                    
                    if (pdfHeight > pdf.internal.pageSize.getHeight()) {
                        let heightLeft = pdfHeight;
                        let position = 0;
                        const pageHeight = pdf.internal.pageSize.getHeight();

                        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
                        heightLeft -= pageHeight;

                        while (heightLeft > 0) {
                            position = heightLeft - pdfHeight;
                            pdf.addPage();
                            pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
                            heightLeft -= pageHeight;
                        }
                    } else {
                        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
                    }

                    pdf.save(\`\${company.companyName.replace(/\\s+/g, '_')}_Business_Summary.pdf\`);
                } catch (err) {
                    console.error("PDF Generation error", err);
                    alert("Failed to generate PDF. Make sure jsPDF and html2canvas are loaded.");
                } finally {
                    btnDownload.innerHTML = prevHtml;
                    btnDownload.classList.remove('opacity-50', 'pointer-events-none');
                }
            });
        }
    };

    renderUI();
    return container;
}
