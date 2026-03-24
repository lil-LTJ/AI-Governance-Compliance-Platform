import { loadCompanyData, loadPhase1Data, loadPhase2Data, loadPhase3Data, loadPhase4Data, loadPhase5Data, loadPhase6Data } from '../storage.js';

export function renderComplianceDashboard(container) {
    const company = loadCompanyData() || { companyName: 'Unknown Company', industry: '', employees: '', usecases: '', goals: [] };
    
    // Attempt to load all states
    const p1 = loadPhase1Data() || { mandate: {}, assets: [], risk: {}, scope: {} };
    const p2 = loadPhase2Data() || { lead: {}, committee: {}, raci: [] };
    const p3 = loadPhase3Data() || { ethics: {}, risk: {}, dataGov: {}, tracker: [] };
    const p4 = loadPhase4Data() || { lineage: {hops:[]}, quality: {}, triage: {}, etl: {} };
    const p5 = loadPhase5Data() || { risks: [], aias: {}, cards: {}, reports: {} };
    const p6 = loadPhase6Data() || { pmm: {}, incidents: [], retirement: {}, audit: {} };

    // Load Controls Data
    const controlsStr = localStorage.getItem('controlStatuses');
    const controls = controlsStr ? JSON.parse(controlsStr) : {};
    
    // Fallback static mapping for frameworks (since controls are generated dynamically)
    // We'll inspect the control ID prefix to guess the framework.
    const frameworkMap = { 'NIST': 0, 'EU': 0, 'ISO': 0, 'GDPR': 0, 'COBIT': 0 };
    const frameworkCompliant = { 'NIST': 0, 'EU': 0, 'ISO': 0, 'GDPR': 0, 'COBIT': 0 };
    
    let totalControls = Object.keys(controls).length;
    let compliantControls = 0;
    let nonCompliantList = [];

    // Fallback if no controls yet
    if (totalControls === 0) {
        // Just dummy data so charts render for demonstration
        ['NIST-1', 'EU-2', 'ISO-3', 'GDPR-4', 'COBIT-5'].forEach(id => {
            controls[id] = 'Compliant';
            totalControls++;
        });
    }

    Object.keys(controls).forEach(id => {
        let fw = 'NIST';
        if (id.includes('EU')) fw = 'EU';
        else if (id.includes('ISO')) fw = 'ISO';
        else if (id.includes('GDPR')) fw = 'GDPR';
        else if (id.includes('COBIT')) fw = 'COBIT';

        frameworkMap[fw] = (frameworkMap[fw] || 0) + 1;
        const status = controls[id];
        
        if (status === 'Compliant' || status === 'Partially Compliant') {
            compliantControls++;
            frameworkCompliant[fw] = (frameworkCompliant[fw] || 0) + 1;
        } else if (status === 'Non-Compliant') {
            nonCompliantList.push(id);
        }
    });

    const compliancePct = totalControls > 0 ? Math.round((compliantControls / totalControls) * 100) : 0;
    const totalRisks = p5.risks ? p5.risks.length : 0;
    let policiesDrafted = 0;
    if (p3.ethics && p3.ethics.statement) policiesDrafted++;
    if (p3.risk && p3.risk.framework) policiesDrafted++;
    if (p3.dataGov && p3.dataGov.lineage) policiesDrafted++;

    // Calculate Maturity scores (0-100)
    let govScore = 0;
    if (p2.lead && p2.lead.accountability) govScore += 33;
    if (p2.committee && p2.committee.purpose) govScore += 33;
    if (p2.raci && p2.raci.length > 0) govScore += 34;

    let riskScore = 0;
    if (p1.risk && p1.risk.quant) riskScore += 40;
    if (p5.risks && p5.risks.length > 0) riskScore += 60;

    let privacyScore = 0;
    if (p3.dataGov && p3.dataGov.lineage) privacyScore += 50;
    if (p4.lineage && p4.lineage.flow) privacyScore += 50;

    let transScore = 0;
    if (p3.ethics && p3.ethics.statement) transScore += 40;
    if (Object.keys(p5.cards).length > 0) transScore += 60;

    let monScore = 0;
    if (p6.pmm && p6.pmm.metrics) monScore += 50;
    if (p6.incidents && p6.incidents.length > 0) monScore += 20;
    if (p6.audit && p6.audit.execSum) monScore += 30;

    // Risk Posture calculation
    let highRiskCount = 0;
    let medRiskCount = 0;
    let lowRiskCount = 0;
    
    if (p5.risks && p5.risks.length > 0) {
        p5.risks.forEach(r => {
            const l = parseInt(r.likelihood || '1');
            const i = parseInt(r.impact || '1');
            const score = l * i;
            if (score >= 15) highRiskCount++;
            else if (score >= 8) medRiskCount++;
            else lowRiskCount++;
        });
    } else {
        lowRiskCount = 1; // Default safe
    }

    if (p6.incidents && p6.incidents.length > 0) {
        p6.incidents.forEach(inc => {
            if (inc.sev === '1' || inc.sev === '2') highRiskCount++;
            else if (inc.sev === '3') medRiskCount++;
            else lowRiskCount++;
        });
    }

    // --- DOM structure ---
    container.innerHTML = `
        <div class="w-full max-w-[90rem] mx-auto fade-in pt-6 pb-20 px-4" id="report-content">
            <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200" data-html2canvas-ignore="false">
                <div>
                    <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 flex items-center gap-3">
                        <div class="p-2 bg-blue-100 text-blue-700 rounded-lg">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        </div>
                        Compliance Dashboard
                    </h1>
                    <p class="mt-2 text-slate-600 font-medium">Enterprise Coverage & Maturity Analysis for ${company.companyName}</p>
                </div>
                <!-- Action Button omitted from PDF via css later if needed -->
                <div data-html2canvas-ignore="true">
                    <button id="btn-download-pdf" class="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-brand-600 hover:from-blue-700 hover:to-brand-700 text-white shadow-lg text-sm font-bold rounded-lg transition-transform hover:scale-105 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Download Full Report (PDF)
                    </button>
                    <p id="pdf-status" class="text-xs text-brand-600 mt-2 font-bold hidden text-right">Generating PDF...</p>
                </div>
            </div>

            <!-- How-to guide banner -->
            <div class="mb-8 p-5 bg-blue-50 border border-blue-200 rounded-2xl text-blue-900">
                <h2 class="text-base font-bold flex items-center gap-2 mb-3">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    About This Dashboard & How It Connects to the Platform
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs bg-white/60 p-4 rounded-xl border border-blue-100 text-slate-700">
                    <div><strong class="block mb-1 text-slate-800">📋 Controls Mapping</strong>Feeds your per-artifact compliance statuses and evidence files directly into the charts and metrics on this page.</div>
                    <div><strong class="block mb-1 text-slate-800">🔧 Implementation Dashboard</strong>Each completed phase (1–6) contributes data to the Governance Maturity Radar and policy coverage metrics here.</div>
                    <div><strong class="block mb-1 text-slate-800">📊 This Page</strong>Aggregates all data into visual coverage charts, highlights non-compliant controls, and auto-generates improvement recommendations.</div>
                    <div><strong class="block mb-1 text-slate-800">📈 Executive Summary</strong>Uses the compliance % from here to calculate financial fine exposure and strategic risk roadmaps for leadership.</div>
                </div>
            </div>

            <!-- Exec Summary -->
            <div class="mb-8 p-6 glass-card rounded-2xl border border-slate-200 shadow-sm">
                <h2 class="text-xl font-bold text-slate-800 mb-3">Executive Summary</h2>
                <p class="text-slate-700 leading-relaxed text-sm">
                    <strong>${company.companyName}</strong> currently exhibits an overall control compliance coverage of <strong>${compliancePct}%</strong> across ${totalControls} evaluated technical and organizational safeguards. 
                    The internal AI Asset Register maps to <strong>${p1.assets.length}</strong> AI models/systems, tracing lineage to <strong>${totalRisks}</strong> documented risk vectors. 
                    The organization has drafted <strong>${policiesDrafted}/3</strong> core governance policies (Ethics, Risk, Data Governance). 
                    ${compliancePct < 50 ? 'Immediate remediation is required to close critical framework gaps.' : 'The organization demonstrates a maturing posture towards continuous AI compliance.'}
                </p>
            </div>

            <!-- Key Metrics -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="glass-card rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Overall Coverage</p>
                        <p class="text-4xl font-extrabold ${compliancePct>70?'text-green-600':compliancePct>40?'text-yellow-500':'text-red-600'}">${compliancePct}%</p>
                    </div>
                    <div class="w-12 h-12 rounded-full ${compliancePct>70?'bg-green-100 text-green-600':compliancePct>40?'bg-yellow-100 text-yellow-600':'bg-red-100 text-red-600'} flex items-center justify-center">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                </div>
                <div class="glass-card rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Identified Risks</p>
                        <p class="text-4xl font-extrabold text-slate-800">${totalRisks}</p>
                    </div>
                    <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    </div>
                </div>
                <div class="glass-card rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <p class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Active Incidents</p>
                        <p class="text-4xl font-extrabold text-slate-800">${p6.incidents.length}</p>
                    </div>
                    <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                    </div>
                </div>
            </div>

            <!-- Charts Row 1 -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8" id="charts-row-1">
                <!-- Framework Coverage -->
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col items-center">
                    <h3 class="text-lg font-bold text-slate-800 self-start mb-6">Framework Coverage</h3>
                    <div class="relative w-full h-[300px]"><canvas id="frameworkChart"></canvas></div>
                </div>
                <!-- Maturity Radar -->
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col items-center">
                    <h3 class="text-lg font-bold text-slate-800 self-start mb-6">Governance Lifecycle Maturity</h3>
                    <div class="relative w-full h-[300px]"><canvas id="maturityChart"></canvas></div>
                </div>
            </div>

            <!-- Charts Row 2 & Tables -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <!-- Risk Posture -->
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col items-center lg:col-span-1" id="chart-risk">
                    <h3 class="text-lg font-bold text-slate-800 self-start mb-6">Risk & Threat Posture</h3>
                    <div class="relative w-full h-[250px]"><canvas id="riskPostureChart"></canvas></div>
                </div>

                <!-- Findings and Non-Compliant -->
                <div class="lg:col-span-2 space-y-8">
                    <div class="glass-card rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h3 class="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Non-Compliant Controls</h3>
                        ${nonCompliantList.length > 0 ? 
                            `<ul class="list-none space-y-2 text-sm text-red-700">${nonCompliantList.map(c => `<li class="flex items-center gap-2"><svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>${c}`).join('')}</ul>` : 
                            '<p class="text-sm text-green-700 font-medium bg-green-50 p-3 rounded-lg border border-green-200">No non-compliant controls documented in the matrix.</p>'
                        }
                    </div>
                    <div class="glass-card rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h3 class="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Auto-Generated Recommendations</h3>
                        <ul class="list-disc pl-5 space-y-2 text-sm text-slate-700">
                            ${govScore < 50 ? '<li><strong>Governance:</strong> Define AIMS Lead KPIs and formally charter an AI Risk Committee (Phase 2).</li>' : ''}
                            ${privacyScore < 50 ? '<li><strong>Data Privacy:</strong> Complete Data Lineage hops and ensure Data Quality assessments are signed (Phase 4).</li>' : ''}
                            ${transScore < 50 ? '<li><strong>Transparency:</strong> Ensure all Phase 1 assets possess completed AI Model Cards and Ethics Policies (Phase 3 & 5).</li>' : ''}
                            ${monScore < 50 ? '<li><strong>Monitoring:</strong> Establish a Post-Market Monitoring schedule and test incident log pipelines (Phase 6).</li>' : ''}
                            ${highRiskCount > 0 ? `<li><strong>Risk Mitigation:</strong> Remediate ${highRiskCount} high-severity risk entries in the AI Risk Register.</li>` : ''}
                            ${(govScore>=50&&privacyScore>=50&&transScore>=50&&monScore>=50&&highRiskCount===0) ? '<li><strong>Steady State:</strong> Continue executing recurring audits according to Phase 6 review cycle.</li>' : ''}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    // --- Render Charts (Chart.js) ---
    // Ensure Charts register properly
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded');
        return container;
    }

    // Colors
    const brandColor = '#22c55e';
    const brandBlue = '#3b82f6';
    const brandPurple = '#a855f7';

    // 1. Framework Bar Chart
    const fwLabels = ['NIST AI RMF', 'EU AI Act', 'ISO 42001', 'GDPR', 'COBIT'];
    const fwData = [
        Math.round((frameworkCompliant['NIST']/(frameworkMap['NIST']||1))*100),
        Math.round((frameworkCompliant['EU']/(frameworkMap['EU']||1))*100),
        Math.round((frameworkCompliant['ISO']/(frameworkMap['ISO']||1))*100),
        Math.round((frameworkCompliant['GDPR']/(frameworkMap['GDPR']||1))*100),
        Math.round((frameworkCompliant['COBIT']/(frameworkMap['COBIT']||1))*100)
    ];

    new Chart(document.getElementById('frameworkChart'), {
        type: 'bar',
        data: {
            labels: fwLabels,
            datasets: [{
                label: 'Compliance %',
                data: fwData,
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                borderColor: brandBlue,
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, max: 100 } },
            plugins: { legend: { display: false } }
        }
    });

    // 2. Maturity Radar Chart
    new Chart(document.getElementById('maturityChart'), {
        type: 'radar',
        data: {
            labels: ['Governance', 'Risk Management', 'Data Privacy', 'Transparency', 'Monitoring'],
            datasets: [{
                label: 'Maturity Score',
                data: [govScore, riskScore, privacyScore, transScore, monScore],
                backgroundColor: 'rgba(168, 85, 247, 0.2)',
                borderColor: brandPurple,
                pointBackgroundColor: brandPurple,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: brandPurple
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { r: { min: 0, max: 100, ticks: { stepSize: 20 } } },
            plugins: { legend: { display: false } }
        }
    });

    // 3. Risk Posture Doughnut
    new Chart(document.getElementById('riskPostureChart'), {
        type: 'doughnut',
        data: {
            labels: ['High Risk', 'Medium Risk', 'Low Risk'],
            datasets: [{
                data: [highRiskCount, medRiskCount, lowRiskCount],
                backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            cutout: '70%',
            plugins: { legend: { position: 'bottom' } }
        }
    });

    // --- PDF Download Logic ---
    const btnDownload = document.getElementById('btn-download-pdf');
    if (btnDownload && typeof html2canvas !== 'undefined' && typeof window.jspdf !== 'undefined') {
        const { jsPDF } = window.jspdf;
        const statusEl = document.getElementById('pdf-status');

        btnDownload.addEventListener('click', async () => {
            statusEl.classList.remove('hidden');
            btnDownload.classList.add('opacity-50', 'pointer-events-none');
            
            try {
                // Temporarily force wider layout for PDF capture quality
                const reportContent = document.getElementById('report-content');
                reportContent.classList.remove('max-w-[90rem]');
                reportContent.classList.add('w-[1280px]'); 
                
                // Allow charts to resize
                await new Promise(r => setTimeout(r, 500));

                const canvas = await html2canvas(reportContent, {
                    scale: 2, // High resolution
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#f8fafc' // slate-50
                });

                const imgData = canvas.toDataURL('image/jpeg', 1.0);
                
                // Restore classes
                reportContent.classList.remove('w-[1280px]');
                reportContent.classList.add('max-w-[90rem]');

                // PDF generation
                // A4 size: 210mm x 297mm
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                });

                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                
                // Check if content exceeds 1 page (it likely will)
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

                pdf.save(`${company.companyName.replace(/\\s+/g, '_')}_AI_Compliance_Report.pdf`);
            } catch (err) {
                console.error("PDF Generation error", err);
                alert("Failed to generate PDF. See console for details.");
            } finally {
                statusEl.classList.add('hidden');
                btnDownload.classList.remove('opacity-50', 'pointer-events-none');
            }
        });
    }

    return container;
}
