export function renderControls(container) {
    const controlsData = [
        { id: 'GOV-01', desc: 'Establish AI governance structure with clear roles, responsibilities, and executive mandate.', fws: ['NIST AI RMF', 'EU AI Act', 'ISO 42001', 'COBIT'], arts: 'Governance charter, RACI matrix, executive mandate' },
        { id: 'GOV-02', desc: 'Define and communicate AI risk appetite, including tolerance for bias, errors, and fines.', fws: ['NIST AI RMF', 'EU AI Act', 'ISO 42001', 'COBIT'], arts: 'Risk appetite statement, board minutes' },
        { id: 'GOV-03', desc: 'Maintain an AI asset register with details of models, owners, and risk tiers.', fws: ['NIST AI RMF', 'EU AI Act', 'ISO 42001', 'COBIT'], arts: 'AI asset register (spreadsheet/database)' },
        { id: 'RISK-01', desc: 'Conduct AI-specific risk assessments for each model, covering safety, fundamental rights, and security.', fws: ['NIST AI RMF', 'EU AI Act', 'ISO 42001', 'GDPR'], arts: 'Risk assessment reports, DPIA (if applicable)' },
        { id: 'RISK-02', desc: 'Classify AI systems according to EU AI Act risk levels (unacceptable, high, limited, minimal).', fws: ['EU AI Act'], arts: 'Classification worksheet' },
        { id: 'RISK-03', desc: 'Establish a formal AI risk register with threat categories, likelihood, impact, and treatment.', fws: ['NIST AI RMF', 'EU AI Act', 'ISO 42001', 'COBIT'], arts: 'Risk register (spreadsheet)' },
        { id: 'DATA-01', desc: 'Document data lineage from source to model output, including transformation logic and legal basis.', fws: ['NIST AI RMF', 'EU AI Act', 'ISO 42001', 'GDPR'], arts: 'Data lineage diagram, metadata tables' },
        { id: 'DATA-02', desc: 'Implement data quality controls (completeness, representativeness, accuracy) and validate before model use.', fws: ['NIST AI RMF', 'EU AI Act', 'ISO 42001', 'GDPR'], arts: 'Data quality report, validation logs' },
        { id: 'ETHICS-01', desc: 'Adopt an AI ethics policy that includes fairness, transparency, and human oversight.', fws: ['NIST AI RMF', 'EU AI Act', 'ISO 42001'], arts: 'AI Ethics Policy' },
        { id: 'ETHICS-02', desc: 'Prohibit unacceptable AI uses (e.g., social scoring, real-time biometric surveillance).', fws: ['EU AI Act'], arts: 'Prohibited uses list, policy statement' },
        { id: 'TRANS-01', desc: 'Create model cards for each AI system detailing intended use, performance metrics, and limitations.', fws: ['NIST AI RMF', 'EU AI Act', 'ISO 42001'], arts: 'Model cards for each asset' },
        { id: 'TRANS-02', desc: 'Provide explainability (e.g., LIME/SHAP) for high-risk decisions, especially where individuals are impacted.', fws: ['NIST AI RMF', 'EU AI Act', 'GDPR'], arts: 'Explainability reports, SHAP/LIME outputs' },
        { id: 'MON-01', desc: 'Implement post-market monitoring for model drift, bias, and performance thresholds.', fws: ['NIST AI RMF', 'EU AI Act', 'ISO 42001'], arts: 'PMM plan, drift dashboards' },
        { id: 'MON-02', desc: 'Establish an incident response process for AI failures, including logging and regulatory reporting.', fws: ['NIST AI RMF', 'EU AI Act', 'ISO 42001', 'GDPR'], arts: 'Incident response plan, incident logs' },
        { id: 'MON-03', desc: 'Conduct regular internal audits and management reviews of the AI management system.', fws: ['NIST AI RMF', 'EU AI Act', 'ISO 42001', 'COBIT'], arts: 'Audit reports, management review minutes' },
        { id: 'SEC-01', desc: 'Apply security controls to AI systems, including access controls, encryption, and adversarial testing.', fws: ['NIST AI RMF', 'EU AI Act', 'ISO 42001', 'GDPR', 'COBIT'], arts: 'Security policies, penetration test reports' },
        { id: 'SEC-02', desc: 'Control access to AI training data and model artifacts with principle of least privilege.', fws: ['NIST AI RMF', 'EU AI Act', 'ISO 42001', 'GDPR', 'COBIT'], arts: 'Access control lists, IAM policies' },
        { id: 'RET-01', desc: 'Define retirement criteria and decommissioning procedures for AI models, including data archival.', fws: ['NIST AI RMF', 'EU AI Act', 'ISO 42001', 'GDPR'], arts: 'Retirement plan, data retention policy' },
        { id: 'CONT-01', desc: 'Integrate governance gates into CI/CD pipelines (e.g., ethics review before deployment).', fws: ['NIST AI RMF', 'ISO 42001', 'COBIT'], arts: 'CI/CD pipeline scripts, gate checklists' },
        { id: 'TRAIN-01', desc: 'Provide AI governance and ethics training to all staff involved in AI development and use.', fws: ['NIST AI RMF', 'ISO 42001', 'COBIT'], arts: 'Training records, attendance logs' }
    ];

    const fwColors = {
        'NIST AI RMF': 'bg-blue-100 text-blue-700 border border-blue-200',
        'EU AI Act': 'bg-indigo-100 text-indigo-700 border border-indigo-200',
        'ISO 42001': 'bg-emerald-100 text-emerald-700 border border-emerald-200',
        'GDPR': 'bg-purple-100 text-purple-700 border border-purple-200',
        'COBIT': 'bg-orange-100 text-orange-700 border border-orange-200'
    };

    // Load state
    let statuses = JSON.parse(localStorage.getItem('controlStatuses')) || {};
    let evidence = JSON.parse(localStorage.getItem('controlEvidence')) || [];

    const calculateProgress = () => {
        let count = 0;
        controlsData.forEach(c => {
            const s = statuses[c.id];
            if (s === 'Compliant' || s === 'Partially Compliant') count++;
        });
        return Math.round((count / controlsData.length) * 100);
    };

    const updateProgressBar = () => {
        const pct = calculateProgress();
        const bar = document.getElementById('compliance-progress-bar');
        const text = document.getElementById('compliance-progress-text');
        if (bar && text) {
            bar.style.width = pct + '%';
            text.textContent = pct + '% Complete';
            // Update color based on score
            if (pct >= 80) bar.className = 'bg-brand-500 h-2.5 rounded-full transition-all duration-500';
            else if (pct >= 40) bar.className = 'bg-yellow-400 h-2.5 rounded-full transition-all duration-500';
            else bar.className = 'bg-red-500 h-2.5 rounded-full transition-all duration-500';
        }
    };

    let template = `
        <div class="w-full max-w-[90rem] mx-auto fade-in pt-6 pb-20 px-4">
            <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
                <div>
                    <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 flex items-center gap-3">
                        <div class="p-2 bg-brand-100 text-brand-700 rounded-lg">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        Controls Mapping Matrix
                    </h1>
                    <p class="mt-2 text-slate-600 font-medium">Map organizational assets against leading AI governance and privacy frameworks.</p>
                </div>
                <div class="flex items-center gap-3">
                    <button id="btn-save" class="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 shadow-sm text-sm font-bold rounded-lg transition-transform hover:-translate-y-0.5 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                        Save Progress
                    </button>
                    <button id="btn-generate" class="px-5 py-2.5 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white shadow-lg shadow-brand-500/30 text-sm font-bold rounded-lg transition-transform hover:-translate-y-0.5 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Generate Draft Report
                    </button>
                </div>
            </div>

            <!-- Progress Card -->
            <div class="glass-card rounded-2xl border border-slate-200 shadow-sm p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex-1">
                    <div class="flex justify-between mb-2">
                        <span class="text-sm font-bold text-slate-700 uppercase tracking-wide">Overall Matrix Completion</span>
                        <span id="compliance-progress-text" class="text-sm font-bold text-brand-600">0% Complete</span>
                    </div>
                    <div class="w-full bg-slate-200 rounded-full h-2.5">
                        <div id="compliance-progress-bar" class="bg-brand-500 h-2.5 rounded-full transition-all duration-500" style="width: 0%"></div>
                    </div>
                </div>
                <div class="text-xs text-slate-500 max-w-xs pl-0 sm:pl-4 border-l-0 sm:border-l border-slate-200">
                    Completion is based on controls marked as Compliant or Partially Compliant. Upload evidence to formally fulfill control mandates.
                </div>
            </div>

            <!-- Controls Table -->
            <div class="glass-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left bg-white whitespace-nowrap md:whitespace-normal">
                        <thead class="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            <tr>
                                <th class="px-5 py-4 w-32">Control ID</th>
                                <th class="px-5 py-4 min-w-[250px]">Description</th>
                                <th class="px-5 py-4 w-48">Frameworks</th>
                                <th class="px-5 py-4 w-48">Artifacts to Collect</th>
                                <th class="px-5 py-4 w-48">Compliance Status</th>
                                <th class="px-5 py-4 w-48">Evidence File</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100 text-sm" id="controls-tbody">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = template;

    const tbody = document.getElementById('controls-tbody');
    
    // Render rows
    controlsData.forEach(c => {
        const ev = evidence.find(e => e.controlId === c.id);
        const fileName = ev ? ev.filename : 'No file chosen';
        const fileBtnClass = ev ? 'bg-slate-100 text-slate-700 border-slate-300' : 'bg-white text-brand-600 border-brand-200 hover:bg-brand-50';

        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50 transition-colors group';
        tr.innerHTML = `
            <td class="px-5 py-4 font-bold text-slate-800 align-top">${c.id}</td>
            <td class="px-5 py-4 text-slate-600 pr-8 align-top leading-relaxed">${c.desc}</td>
            <td class="px-5 py-4 align-top">
                <div class="flex flex-wrap gap-1.5">
                    ${c.fws.map(fw => `<span class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded ${fwColors[fw] || 'bg-slate-100 text-slate-600'}">${fw}</span>`).join('')}
                </div>
            </td>
            <td class="px-5 py-4 text-slate-500 text-xs align-top">${c.arts}</td>
            <td class="px-5 py-4 align-top">
                <select data-id="${c.id}" class="status-select w-full rounded-lg border-slate-200 text-sm py-2 px-3 text-slate-700 font-medium focus:ring-brand-500 focus:border-brand-500 bg-white">
                    <option value="" disabled ${!statuses[c.id] ? 'selected' : ''}>Select Status...</option>
                    <option value="Compliant" ${statuses[c.id] === 'Compliant' ? 'selected' : ''}>Compliant</option>
                    <option value="Partially Compliant" ${statuses[c.id] === 'Partially Compliant' ? 'selected' : ''}>Partially Compliant</option>
                    <option value="Non-Compliant" ${statuses[c.id] === 'Non-Compliant' ? 'selected' : ''}>Non-Compliant</option>
                    <option value="Not Applicable" ${statuses[c.id] === 'Not Applicable' ? 'selected' : ''}>Not Applicable</option>
                </select>
            </td>
            <td class="px-5 py-4 align-top">
                <div class="flex items-center gap-2">
                    <button class="upload-btn px-3 py-1.5 border rounded-md text-xs font-bold transition-colors ${fileBtnClass}" data-id="${c.id}">Upload</button>
                    <span class="text-xs text-slate-400 truncate w-24" id="filetext-${c.id}" title="${fileName}">${fileName}</span>
                    <input type="file" class="hidden" id="file-${c.id}">
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });

    updateProgressBar();

    // Bind events
    // Status Change
    const selects = tbody.querySelectorAll('.status-select');
    selects.forEach(sel => {
        sel.addEventListener('change', (e) => {
            const id = e.target.getAttribute('data-id');
            statuses[id] = e.target.value;
            // Provide immediate visual feedback on select update without forcing save yet
            updateProgressBar();
        });
    });

    // Upload Click
    const uploadBtns = tbody.querySelectorAll('.upload-btn');
    uploadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const fileInput = document.getElementById(`file-${id}`);
            fileInput.click();
            
            // On file select
            fileInput.onchange = (ev) => {
                if (fileInput.files.length > 0) {
                    const name = fileInput.files[0].name;
                    document.getElementById(`filetext-${id}`).textContent = name;
                    document.getElementById(`filetext-${id}`).title = name;
                    btn.className = 'upload-btn px-3 py-1.5 border rounded-md text-xs font-bold transition-colors bg-slate-100 text-slate-700 border-slate-300';
                    
                    // Update evidence array in memory
                    evidence = evidence.filter(ev => ev.controlId !== id);
                    evidence.push({ controlId: id, filename: name, uploadDate: new Date().toISOString() });
                }
            };
        });
    });

    // Save Progress
    const saveBtn = document.getElementById('btn-save');
    saveBtn.addEventListener('click', () => {
        localStorage.setItem('controlStatuses', JSON.stringify(statuses));
        localStorage.setItem('controlEvidence', JSON.stringify(evidence));
        
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Saved!';
        saveBtn.classList.replace('text-slate-700', 'text-brand-600');
        
        setTimeout(() => {
            saveBtn.innerHTML = originalText;
            saveBtn.classList.replace('text-brand-600', 'text-slate-700');
        }, 1500);
    });

    // Generate Draft Report
    const genBtn = document.getElementById('btn-generate');
    genBtn.addEventListener('click', () => {
        localStorage.setItem('controlStatuses', JSON.stringify(statuses));
        localStorage.setItem('controlEvidence', JSON.stringify(evidence));
        
        // Setup draftReportData bridge
        localStorage.setItem('draftReportData', JSON.stringify({
            generatedAt: new Date().toISOString(),
            statusCount: Object.keys(statuses).length,
            evidenceCount: evidence.length
        }));
        
        window.location.hash = 'compliance-dashboard';
    });

    return container;
}
