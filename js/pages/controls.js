export function renderControls(container) {
    const controlsData = [
        { 
            id: 'GOV-01', 
            desc: 'Establish AI governance structure with clear roles, responsibilities, and executive mandate.', 
            fws: [{n:'NIST AI RMF',v:'GOV 1.1'}, {n:'EU AI Act',v:'Art. 9'}, {n:'ISO 42001',v:'5.1'}, {n:'COBIT',v:'APO12'}], 
            arts: ['Governance charter', 'RACI matrix', 'Executive mandate'] 
        },
        { 
            id: 'GOV-02', 
            desc: 'Define and communicate AI risk appetite, including tolerance for bias, errors, and fines.', 
            fws: [{n:'NIST AI RMF',v:'GOV 1.2'}, {n:'EU AI Act',v:'Art. 13'}, {n:'ISO 42001',v:'6.1'}, {n:'COBIT',v:'EDM03'}], 
            arts: ['Risk appetite statement', 'Board meeting minutes'] 
        },
        { 
            id: 'GOV-03', 
            desc: 'Maintain an AI asset register with details of models, owners, and risk tiers.', 
            fws: [{n:'NIST AI RMF',v:'MAP 1.1'}, {n:'EU AI Act',v:'Art. 51'}, {n:'ISO 42001',v:'A.2.1'}, {n:'COBIT',v:'BAI09'}], 
            arts: ['AI asset register (spreadsheet)'] 
        },
        { 
            id: 'RISK-01', 
            desc: 'Conduct AI-specific risk assessments for each model, covering safety, fundamental rights, and security.', 
            fws: [{n:'NIST AI RMF',v:'MEASURE 1.1'}, {n:'EU AI Act',v:'Art. 9(2)'}, {n:'ISO 42001',v:'6.1.2'}, {n:'GDPR',v:'Art. 35'}], 
            arts: ['Risk assessment report', 'DPIA (if applicable)'] 
        },
        { 
            id: 'RISK-02', 
            desc: 'Classify AI systems according to EU AI Act risk levels (unacceptable, high, limited, minimal).', 
            fws: [{n:'EU AI Act',v:'Title III'}], 
            arts: ['Classification worksheet'] 
        },
        { 
            id: 'RISK-03', 
            desc: 'Establish a formal AI risk register with threat categories, likelihood, impact, and treatment.', 
            fws: [{n:'NIST AI RMF',v:'MAP 1.5'}, {n:'EU AI Act',v:'Art. 9(4)'}, {n:'ISO 42001',v:'6.1.3'}, {n:'COBIT',v:'APO12.03'}], 
            arts: ['Risk register database tracking'] 
        },
        { 
            id: 'DATA-01', 
            desc: 'Document data lineage from source to model output, including transformation logic and legal basis.', 
            fws: [{n:'NIST AI RMF',v:'MAP 2.2'}, {n:'EU AI Act',v:'Art. 10(2)'}, {n:'ISO 42001',v:'8.2'}, {n:'GDPR',v:'Art. 30'}], 
            arts: ['Data lineage diagram', 'Metadata mapping table'] 
        },
        { 
            id: 'DATA-02', 
            desc: 'Implement data quality controls (completeness, representativeness, accuracy) and validate before model use.', 
            fws: [{n:'NIST AI RMF',v:'MEASURE 2.1'}, {n:'EU AI Act',v:'Art. 10(3)'}, {n:'ISO 42001',v:'A.5.1'}, {n:'GDPR',v:'Art. 5(1)(d)'}], 
            arts: ['Data quality report', 'Validation execution logs'] 
        },
        { 
            id: 'ETHICS-01', 
            desc: 'Adopt an AI ethics policy that includes fairness, transparency, and human oversight.', 
            fws: [{n:'NIST AI RMF',v:'GOV 2.1'}, {n:'EU AI Act',v:'Art. 14'}, {n:'ISO 42001',v:'5.2'}], 
            arts: ['AI Ethics Policy', 'Human-in-the-loop guidelines'] 
        },
        { 
            id: 'ETHICS-02', 
            desc: 'Prohibit unacceptable AI uses (e.g., social scoring, real-time biometric surveillance).', 
            fws: [{n:'EU AI Act',v:'Art. 5'}], 
            arts: ['Prohibited uses blocklist', 'Policy enforcement statement'] 
        },
        { 
            id: 'TRANS-01', 
            desc: 'Create model cards for each AI system detailing intended use, performance metrics, and limitations.', 
            fws: [{n:'NIST AI RMF',v:'MAP 1.2'}, {n:'EU AI Act',v:'Art. 11'}, {n:'ISO 42001',v:'8.3'}], 
            arts: ['Transparency model card documents'] 
        },
        { 
            id: 'TRANS-02', 
            desc: 'Provide explainability (e.g., LIME/SHAP) for high-risk decisions, especially where individuals are impacted.', 
            fws: [{n:'NIST AI RMF',v:'MEASURE 2.3'}, {n:'EU AI Act',v:'Art. 13(1)'}, {n:'GDPR',v:'Art. 22'}], 
            arts: ['Explainability framework reports', 'SHAP/LIME output samples'] 
        },
        { 
            id: 'MON-01', 
            desc: 'Implement post-market monitoring for model drift, bias, and performance thresholds.', 
            fws: [{n:'NIST AI RMF',v:'MANAGE 1.3'}, {n:'EU AI Act',v:'Art. 61'}, {n:'ISO 42001',v:'9.1'}], 
            arts: ['PMM strategy plan', 'Drift monitoring dashboard exports'] 
        },
        { 
            id: 'MON-02', 
            desc: 'Establish an incident response process for AI failures, including logging and regulatory reporting.', 
            fws: [{n:'NIST AI RMF',v:'MANAGE 3.1'}, {n:'EU AI Act',v:'Art. 62'}, {n:'ISO 42001',v:'A.8.2'}, {n:'GDPR',v:'Art. 33'}], 
            arts: ['AI incident response playbook', 'Incident log records'] 
        },
        { 
            id: 'MON-03', 
            desc: 'Conduct regular internal audits and management reviews of the AI management system.', 
            fws: [{n:'NIST AI RMF',v:'GOV 1.4'}, {n:'EU AI Act',v:'Art. 43'}, {n:'ISO 42001',v:'9.2'}, {n:'COBIT',v:'MEA02'}], 
            arts: ['Internal audit reports', 'Executive management review minutes'] 
        },
        { 
            id: 'SEC-01', 
            desc: 'Apply security controls to AI systems, including access controls, encryption, and adversarial testing.', 
            fws: [{n:'NIST AI RMF',v:'MANAGE 2.1'}, {n:'EU AI Act',v:'Art. 15'}, {n:'ISO 42001',v:'A.6.1'}, {n:'GDPR',v:'Art. 32'}, {n:'COBIT',v:'DSS05'}], 
            arts: ['InfoSec policies', 'Adversarial penetration test reports'] 
        },
        { 
            id: 'SEC-02', 
            desc: 'Control access to AI training data and model artifacts with principle of least privilege.', 
            fws: [{n:'NIST AI RMF',v:'GOV 3.1'}, {n:'EU AI Act',v:'Art. 15(3)'}, {n:'ISO 42001',v:'A.6.3'}, {n:'GDPR',v:'Art. 25'}, {n:'COBIT',v:'DSS05.04'}], 
            arts: ['Access control matrices', 'IAM role policies'] 
        },
        { 
            id: 'RET-01', 
            desc: 'Define retirement criteria and decommissioning procedures for AI models, including data archival.', 
            fws: [{n:'NIST AI RMF',v:'MANAGE 3.2'}, {n:'EU AI Act',v:'Art. 61(4)'}, {n:'ISO 42001',v:'A.9.1'}, {n:'GDPR',v:'Art. 17'}], 
            arts: ['Model decommissioning plan', 'Data retention policy'] 
        },
        { 
            id: 'CONT-01', 
            desc: 'Integrate governance gates into CI/CD pipelines (e.g., ethics review before deployment).', 
            fws: [{n:'NIST AI RMF',v:'MANAGE 1.1'}, {n:'ISO 42001',v:'8.1'}, {n:'COBIT',v:'BAI03'}], 
            arts: ['CI/CD pipeline configuration scripts', 'Release gate checklists'] 
        },
        { 
            id: 'TRAIN-01', 
            desc: 'Provide AI governance and ethics training to all staff involved in AI development and use.', 
            fws: [{n:'NIST AI RMF',v:'GOV 5.1'}, {n:'ISO 42001',v:'7.2'}, {n:'COBIT',v:'APO07.03'}], 
            arts: ['Training syllabus records', 'Staff attendance logs'] 
        }
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

    // Calculate total artifacts across all controls
    const totalArtifacts = controlsData.reduce((acc, c) => acc + c.arts.length, 0);

    const calculateProgress = () => {
        let count = 0;
        controlsData.forEach(c => {
            c.arts.forEach((art, idx) => {
                const key = c.id + '-' + idx;
                const s = statuses[key];
                if (s === 'Compliant' || s === 'Partially Compliant') count++;
            });
        });
        return Math.round((count / totalArtifacts) * 100);
    };

    const updateProgressBar = () => {
        const pct = calculateProgress();
        const bar = document.getElementById('compliance-progress-bar');
        const text = document.getElementById('compliance-progress-text');
        if (bar && text) {
            bar.style.width = pct + '%';
            text.textContent = pct + '% Complete';
            if (pct >= 80) bar.className = 'bg-brand-500 h-2.5 rounded-full transition-all duration-500';
            else if (pct >= 40) bar.className = 'bg-yellow-400 h-2.5 rounded-full transition-all duration-500';
            else bar.className = 'bg-red-500 h-2.5 rounded-full transition-all duration-500';
        }
    };

    let template = `
        <div class="w-full max-w-[90rem] mx-auto fade-in pt-6 pb-20 px-4">
            
            <div class="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
                <div>
                    <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 flex items-center gap-3">
                        <div class="p-2 bg-brand-100 text-brand-700 rounded-lg">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        Granular Controls Mapping Matrix
                    </h1>
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

            <!-- Explanatory Overview Banner -->
            <div class="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-2xl shadow-sm text-blue-900">
                <h2 class="text-xl font-bold flex items-center gap-2 mb-3">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    How to Use the Alignment Matrix
                </h2>
                <p class="text-sm font-medium leading-relaxed mb-4">
                    This interactive matrix provides an exact 1-to-1 capability map bridging your internal AI governance posture across the primary requirements of <strong>NIST AI RMF, EU AI Act, ISO 42001, GDPR, and COBIT</strong>. Every global control includes specific clause mapping (e.g., <span class="bg-indigo-100 px-1 rounded border border-indigo-200">EU AI Act Art. 9</span>) and breaks down exactly which <strong>Artifacts</strong> you must collect to fulfill the mandate.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/60 p-5 rounded-xl border border-blue-100">
                    <div>
                        <h3 class="font-bold text-sm mb-1 text-slate-800">1. Score Artifacts</h3>
                        <p class="text-xs text-slate-600">Mark each individual artifact (like "Risk Register") as Compliant/Non-Compliant using the dropdown.</p>
                    </div>
                    <div>
                        <h3 class="font-bold text-sm mb-1 text-slate-800">2. Upload Evidence</h3>
                        <p class="text-xs text-slate-600">Attach the specific file or document supporting the artifact directly into the row for audit-readiness.</p>
                    </div>
                    <div>
                        <h3 class="font-bold text-sm mb-1 text-slate-800">3. Connect to Dashboards</h3>
                        <p class="text-xs text-slate-600">Your total artifact compliance automatically calculates metrics inside the <strong>Compliance Dashboard</strong> and predicts fine risks inside your <strong>Executive Summary</strong>.</p>
                    </div>
                </div>
            </div>

            <!-- Progress Card -->
            <div class="glass-card rounded-2xl border border-slate-200 shadow-sm p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex-1">
                    <div class="flex justify-between mb-2">
                        <span class="text-sm font-bold text-slate-700 uppercase tracking-wide">Artifact Collection Tracker</span>
                        <span id="compliance-progress-text" class="text-sm font-bold text-brand-600">0% Complete</span>
                    </div>
                    <div class="w-full bg-slate-200 rounded-full h-2.5">
                        <div id="compliance-progress-bar" class="bg-brand-500 h-2.5 rounded-full transition-all duration-500" style="width: 0%"></div>
                    </div>
                </div>
            </div>

            <!-- Detailed Controls Table -->
            <div class="glass-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left bg-white whitespace-nowrap md:whitespace-normal">
                        <thead class="bg-slate-800 text-white text-xs font-bold uppercase tracking-wider">
                            <tr>
                                <th class="px-5 py-4 w-32 rounded-tl-xl border-r border-slate-700">Control ID</th>
                                <th class="px-5 py-4 border-r border-slate-700">Description</th>
                                <th class="px-5 py-4 w-64 border-r border-slate-700">Framework Clauses</th>
                                <th class="px-5 py-4 w-64 border-r border-slate-700">Specific Artifact</th>
                                <th class="px-5 py-4 w-48 border-r border-slate-700">Artifact Status</th>
                                <th class="px-5 py-4 w-56 rounded-tr-xl">Evidence File</th>
                            </tr>
                        </thead>
                        <tbody id="controls-tbody" class="text-sm">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = template;

    const tbody = document.getElementById('controls-tbody');
    
    // Render robust rows with table rowspans for multi-artifact
    controlsData.forEach((c, cIdx) => {
        const rowColorClass = cIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50';

        c.arts.forEach((art, aIdx) => {
            const tr = document.createElement('tr');
            tr.className = `group hover:bg-slate-50 transition-colors border-b border-slate-200 ${rowColorClass}`;
            
            const key = c.id + '-' + aIdx;
            const ev = evidence.find(e => e.controlId === key);
            const fileName = ev ? ev.filename : 'No file chosen';
            const fileBtnClass = ev ? 'bg-slate-100 text-slate-700 border-slate-300' : 'bg-white text-brand-600 border-brand-200 hover:bg-brand-50';

            let rowHtml = '';

            // Only output the first three columns if it's the first artifact to span them across all
            if (aIdx === 0) {
                rowHtml += `
                    <td class="px-5 py-5 font-bold text-slate-800 align-top border-r border-slate-200" rowspan="${c.arts.length}">${c.id}</td>
                    <td class="px-5 py-5 text-slate-600 align-top leading-relaxed border-r border-slate-200 max-w-sm" rowspan="${c.arts.length}">${c.desc}</td>
                    <td class="px-5 py-5 align-top border-r border-slate-200" rowspan="${c.arts.length}">
                        <div class="flex flex-col gap-2">
                            ${c.fws.map(fw => `
                                <div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-wide rounded px-2 py-1 ${fwColors[fw.n] || 'bg-slate-100 text-slate-600 border border-slate-200'}">
                                    <span>${fw.n}</span>
                                    <span class="text-[9px] opacity-75">${fw.v}</span>
                                </div>
                            `).join('')}
                        </div>
                    </td>
                `;
            }

            rowHtml += `
                <td class="px-5 py-4 text-slate-700 font-medium align-middle border-r border-slate-200 flex items-center gap-2">
                    <svg class="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    ${art}
                </td>
                <td class="px-5 py-4 align-middle border-r border-slate-200">
                    <select data-id="${key}" class="status-select w-full rounded-md border-slate-300 text-xs py-2 px-2 text-slate-700 font-medium focus:ring-brand-500 focus:border-brand-500 bg-white">
                        <option value="" disabled ${!statuses[key] ? 'selected' : ''}>Status...</option>
                        <option value="Compliant" ${statuses[key] === 'Compliant' ? 'selected' : ''}>Compliant</option>
                        <option value="Partially Compliant" ${statuses[key] === 'Partially Compliant' ? 'selected' : ''}>Partially Compliant</option>
                        <option value="Non-Compliant" ${statuses[key] === 'Non-Compliant' ? 'selected' : ''}>Non-Compliant</option>
                        <option value="Not Applicable" ${statuses[key] === 'Not Applicable' ? 'selected' : ''}>N/A</option>
                    </select>
                </td>
                <td class="px-5 py-4 align-middle">
                    <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                        <button class="upload-btn px-3 py-1.5 border rounded-md text-[11px] font-bold transition-colors shadow-sm ${fileBtnClass}" data-id="${key}">Upload</button>
                        <span class="text-[11px] text-slate-400 truncate max-w-[120px]" id="filetext-${key}" title="${fileName}">${fileName}</span>
                        <input type="file" class="hidden" id="file-${key}">
                    </div>
                </td>
            `;

            tr.innerHTML = rowHtml;
            tbody.appendChild(tr);
        });
    });

    updateProgressBar();

    // Bind events
    const selects = tbody.querySelectorAll('.status-select');
    selects.forEach(sel => {
        sel.addEventListener('change', (e) => {
            const id = e.target.getAttribute('data-id');
            statuses[id] = e.target.value;
            updateProgressBar();
        });
    });

    const uploadBtns = tbody.querySelectorAll('.upload-btn');
    uploadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const fileInput = document.getElementById(`file-${id}`);
            fileInput.click();
            
            fileInput.onchange = (ev) => {
                if (fileInput.files.length > 0) {
                    const name = fileInput.files[0].name;
                    document.getElementById(`filetext-${id}`).textContent = name;
                    document.getElementById(`filetext-${id}`).title = name;
                    btn.className = 'upload-btn px-3 py-1.5 border rounded-md text-[11px] font-bold transition-colors shadow-sm bg-slate-100 text-slate-700 border-slate-300';
                    
                    evidence = evidence.filter(ev => ev.controlId !== id);
                    evidence.push({ controlId: id, filename: name, uploadDate: new Date().toISOString() });
                }
            };
        });
    });

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

    const genBtn = document.getElementById('btn-generate');
    genBtn.addEventListener('click', () => {
        localStorage.setItem('controlStatuses', JSON.stringify(statuses));
        localStorage.setItem('controlEvidence', JSON.stringify(evidence));
        
        localStorage.setItem('draftReportData', JSON.stringify({
            generatedAt: new Date().toISOString(),
            statusCount: Object.keys(statuses).length,
            evidenceCount: evidence.length
        }));
        
        window.location.hash = 'compliance-dashboard';
    });

    return container;
}
