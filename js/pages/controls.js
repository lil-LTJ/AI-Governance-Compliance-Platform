export function renderControls(container) {
    // Phase mapping: each artifact -> { phase tab, label }
    const artPhaseMap = {
        'Governance charter':               { phase: 'phase2-pane', label: 'Phase 2: Governance' },
        'RACI matrix':                      { phase: 'phase2-pane', label: 'Phase 2: Governance' },
        'Executive mandate':                { phase: 'phase1-pane', label: 'Phase 1: Kickoff' },
        'Risk appetite statement':          { phase: 'phase5-pane', label: 'Phase 5: Risk & Models' },
        'Board meeting minutes':            { phase: 'phase2-pane', label: 'Phase 2: Governance' },
        'AI asset register (spreadsheet)':  { phase: 'phase1-pane', label: 'Phase 1: Kickoff' },
        'Risk assessment report':           { phase: 'phase5-pane', label: 'Phase 5: Risk & Models' },
        'DPIA (if applicable)':             { phase: 'phase5-pane', label: 'Phase 5: Risk & Models' },
        'Classification worksheet':         { phase: 'phase4-pane', label: 'Phase 4: Triage & Lineage' },
        'Risk register database tracking':  { phase: 'phase5-pane', label: 'Phase 5: Risk & Models' },
        'Data lineage diagram':             { phase: 'phase4-pane', label: 'Phase 4: Triage & Lineage' },
        'Metadata mapping table':           { phase: 'phase4-pane', label: 'Phase 4: Triage & Lineage' },
        'Data quality report':              { phase: 'phase4-pane', label: 'Phase 4: Triage & Lineage' },
        'Validation execution logs':        { phase: 'phase4-pane', label: 'Phase 4: Triage & Lineage' },
        'AI Ethics Policy':                 { phase: 'phase3-pane', label: 'Phase 3: Policy' },
        'Human-in-the-loop guidelines':     { phase: 'phase3-pane', label: 'Phase 3: Policy' },
        'Prohibited uses blocklist':        { phase: 'phase3-pane', label: 'Phase 3: Policy' },
        'Policy enforcement statement':     { phase: 'phase3-pane', label: 'Phase 3: Policy' },
        'Transparency model card documents':{ phase: 'phase5-pane', label: 'Phase 5: Risk & Models' },
        'Explainability framework reports': { phase: 'phase5-pane', label: 'Phase 5: Risk & Models' },
        'SHAP/LIME output samples':         { phase: 'phase5-pane', label: 'Phase 5: Risk & Models' },
        'PMM strategy plan':                { phase: 'phase6-pane', label: 'Phase 6: CI & Culture' },
        'Drift monitoring dashboard exports':{ phase: 'phase6-pane', label: 'Phase 6: CI & Culture' },
        'AI incident response playbook':    { phase: 'phase6-pane', label: 'Phase 6: CI & Culture' },
        'Incident log records':             { phase: 'phase6-pane', label: 'Phase 6: CI & Culture' },
        'Internal audit reports':           { phase: 'phase6-pane', label: 'Phase 6: CI & Culture' },
        'Executive management review minutes':{ phase: 'phase6-pane', label: 'Phase 6: CI & Culture' },
        'InfoSec policies':                 { phase: 'phase3-pane', label: 'Phase 3: Policy' },
        'Adversarial penetration test reports':{ phase: 'phase5-pane', label: 'Phase 5: Risk & Models' },
        'Access control matrices':          { phase: 'phase2-pane', label: 'Phase 2: Governance' },
        'IAM role policies':                { phase: 'phase2-pane', label: 'Phase 2: Governance' },
        'Model decommissioning plan':       { phase: 'phase6-pane', label: 'Phase 6: CI & Culture' },
        'Data retention policy':            { phase: 'phase3-pane', label: 'Phase 3: Policy' },
        'CI/CD pipeline configuration scripts':{ phase: 'phase6-pane', label: 'Phase 6: CI & Culture' },
        'Release gate checklists':          { phase: 'phase6-pane', label: 'Phase 6: CI & Culture' },
        'Training syllabus records':        { phase: 'phase6-pane', label: 'Phase 6: CI & Culture' },
        'Staff attendance logs':            { phase: 'phase6-pane', label: 'Phase 6: CI & Culture' }
    };

    const controlsData = [
        { id: 'GOV-01', desc: 'Establish AI governance structure with clear roles, responsibilities, and executive mandate.', fws: [{n:'NIST AI RMF',v:'GOV 1.1'},{n:'EU AI Act',v:'Art. 9'},{n:'ISO 42001',v:'5.1'},{n:'COBIT',v:'APO12'}], arts: ['Governance charter','RACI matrix','Executive mandate'] },
        { id: 'GOV-02', desc: 'Define and communicate AI risk appetite, including tolerance for bias, errors, and fines.', fws: [{n:'NIST AI RMF',v:'GOV 1.2'},{n:'EU AI Act',v:'Art. 13'},{n:'ISO 42001',v:'6.1'},{n:'COBIT',v:'EDM03'}], arts: ['Risk appetite statement','Board meeting minutes'] },
        { id: 'GOV-03', desc: 'Maintain an AI asset register with details of models, owners, and risk tiers.', fws: [{n:'NIST AI RMF',v:'MAP 1.1'},{n:'EU AI Act',v:'Art. 51'},{n:'ISO 42001',v:'A.2.1'},{n:'COBIT',v:'BAI09'}], arts: ['AI asset register (spreadsheet)'] },
        { id: 'RISK-01', desc: 'Conduct AI-specific risk assessments for each model, covering safety, fundamental rights, and security.', fws: [{n:'NIST AI RMF',v:'MEASURE 1.1'},{n:'EU AI Act',v:'Art. 9(2)'},{n:'ISO 42001',v:'6.1.2'},{n:'GDPR',v:'Art. 35'}], arts: ['Risk assessment report','DPIA (if applicable)'] },
        { id: 'RISK-02', desc: 'Classify AI systems according to EU AI Act risk levels (unacceptable, high, limited, minimal).', fws: [{n:'EU AI Act',v:'Title III'}], arts: ['Classification worksheet'] },
        { id: 'RISK-03', desc: 'Establish a formal AI risk register with threat categories, likelihood, impact, and treatment.', fws: [{n:'NIST AI RMF',v:'MAP 1.5'},{n:'EU AI Act',v:'Art. 9(4)'},{n:'ISO 42001',v:'6.1.3'},{n:'COBIT',v:'APO12.03'}], arts: ['Risk register database tracking'] },
        { id: 'DATA-01', desc: 'Document data lineage from source to model output, including transformation logic and legal basis.', fws: [{n:'NIST AI RMF',v:'MAP 2.2'},{n:'EU AI Act',v:'Art. 10(2)'},{n:'ISO 42001',v:'8.2'},{n:'GDPR',v:'Art. 30'}], arts: ['Data lineage diagram','Metadata mapping table'] },
        { id: 'DATA-02', desc: 'Implement data quality controls and validate before model use.', fws: [{n:'NIST AI RMF',v:'MEASURE 2.1'},{n:'EU AI Act',v:'Art. 10(3)'},{n:'ISO 42001',v:'A.5.1'},{n:'GDPR',v:'Art. 5(1)(d)'}], arts: ['Data quality report','Validation execution logs'] },
        { id: 'ETHICS-01', desc: 'Adopt an AI ethics policy that includes fairness, transparency, and human oversight.', fws: [{n:'NIST AI RMF',v:'GOV 2.1'},{n:'EU AI Act',v:'Art. 14'},{n:'ISO 42001',v:'5.2'}], arts: ['AI Ethics Policy','Human-in-the-loop guidelines'] },
        { id: 'ETHICS-02', desc: 'Prohibit unacceptable AI uses (e.g., social scoring, real-time biometric surveillance).', fws: [{n:'EU AI Act',v:'Art. 5'}], arts: ['Prohibited uses blocklist','Policy enforcement statement'] },
        { id: 'TRANS-01', desc: 'Create model cards for each AI system detailing intended use, performance metrics, and limitations.', fws: [{n:'NIST AI RMF',v:'MAP 1.2'},{n:'EU AI Act',v:'Art. 11'},{n:'ISO 42001',v:'8.3'}], arts: ['Transparency model card documents'] },
        { id: 'TRANS-02', desc: 'Provide explainability (e.g., LIME/SHAP) for high-risk decisions.', fws: [{n:'NIST AI RMF',v:'MEASURE 2.3'},{n:'EU AI Act',v:'Art. 13(1)'},{n:'GDPR',v:'Art. 22'}], arts: ['Explainability framework reports','SHAP/LIME output samples'] },
        { id: 'MON-01', desc: 'Implement post-market monitoring for model drift, bias, and performance thresholds.', fws: [{n:'NIST AI RMF',v:'MANAGE 1.3'},{n:'EU AI Act',v:'Art. 61'},{n:'ISO 42001',v:'9.1'}], arts: ['PMM strategy plan','Drift monitoring dashboard exports'] },
        { id: 'MON-02', desc: 'Establish an incident response process for AI failures, including logging and regulatory reporting.', fws: [{n:'NIST AI RMF',v:'MANAGE 3.1'},{n:'EU AI Act',v:'Art. 62'},{n:'ISO 42001',v:'A.8.2'},{n:'GDPR',v:'Art. 33'}], arts: ['AI incident response playbook','Incident log records'] },
        { id: 'MON-03', desc: 'Conduct regular internal audits and management reviews of the AI management system.', fws: [{n:'NIST AI RMF',v:'GOV 1.4'},{n:'EU AI Act',v:'Art. 43'},{n:'ISO 42001',v:'9.2'},{n:'COBIT',v:'MEA02'}], arts: ['Internal audit reports','Executive management review minutes'] },
        { id: 'SEC-01', desc: 'Apply security controls to AI systems, including access controls, encryption, and adversarial testing.', fws: [{n:'NIST AI RMF',v:'MANAGE 2.1'},{n:'EU AI Act',v:'Art. 15'},{n:'ISO 42001',v:'A.6.1'},{n:'GDPR',v:'Art. 32'},{n:'COBIT',v:'DSS05'}], arts: ['InfoSec policies','Adversarial penetration test reports'] },
        { id: 'SEC-02', desc: 'Control access to AI training data and model artifacts with principle of least privilege.', fws: [{n:'NIST AI RMF',v:'GOV 3.1'},{n:'EU AI Act',v:'Art. 15(3)'},{n:'ISO 42001',v:'A.6.3'},{n:'GDPR',v:'Art. 25'},{n:'COBIT',v:'DSS05.04'}], arts: ['Access control matrices','IAM role policies'] },
        { id: 'RET-01', desc: 'Define retirement criteria and decommissioning procedures for AI models, including data archival.', fws: [{n:'NIST AI RMF',v:'MANAGE 3.2'},{n:'EU AI Act',v:'Art. 61(4)'},{n:'ISO 42001',v:'A.9.1'},{n:'GDPR',v:'Art. 17'}], arts: ['Model decommissioning plan','Data retention policy'] },
        { id: 'CONT-01', desc: 'Integrate governance gates into CI/CD pipelines (e.g., ethics review before deployment).', fws: [{n:'NIST AI RMF',v:'MANAGE 1.1'},{n:'ISO 42001',v:'8.1'},{n:'COBIT',v:'BAI03'}], arts: ['CI/CD pipeline configuration scripts','Release gate checklists'] },
        { id: 'TRAIN-01', desc: 'Provide AI governance and ethics training to all staff involved in AI development and use.', fws: [{n:'NIST AI RMF',v:'GOV 5.1'},{n:'ISO 42001',v:'7.2'},{n:'COBIT',v:'APO07.03'}], arts: ['Training syllabus records','Staff attendance logs'] }
    ];

    const fwColors = {
        'NIST AI RMF': 'bg-blue-100 text-blue-700 border border-blue-200',
        'EU AI Act':   'bg-indigo-100 text-indigo-700 border border-indigo-200',
        'ISO 42001':   'bg-emerald-100 text-emerald-700 border border-emerald-200',
        'GDPR':        'bg-purple-100 text-purple-700 border border-purple-200',
        'COBIT':       'bg-orange-100 text-orange-700 border border-orange-200'
    };

    let statuses = JSON.parse(localStorage.getItem('controlStatuses')) || {};
    let evidence  = JSON.parse(localStorage.getItem('controlEvidence'))  || [];

    const totalArtifacts = controlsData.reduce((a,c) => a + c.arts.length, 0);

    const calculateProgress = () => {
        let count = 0;
        controlsData.forEach(c => c.arts.forEach((_,i) => {
            const k = c.id+'-'+i;
            if (statuses[k]==='Compliant'||statuses[k]==='Partially Compliant') count++;
        }));
        return Math.round((count / totalArtifacts) * 100);
    };

    const updateProgressBar = () => {
        const pct = calculateProgress();
        const bar  = document.getElementById('compliance-progress-bar');
        const text = document.getElementById('compliance-progress-text');
        if (bar && text) {
            bar.style.width = pct + '%';
            text.textContent = pct + '% Complete';
            bar.className = `h-2.5 rounded-full transition-all duration-500 ${pct>=80?'bg-emerald-500':pct>=40?'bg-yellow-400':'bg-red-500'}`;
        }
    };

    container.innerHTML = `
        <div class="w-full max-w-[90rem] mx-auto fade-in pt-6 pb-20 px-4">
            <div class="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
                <div>
                    <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 flex items-center gap-3">
                        <div class="p-2 bg-brand-100 text-brand-700 rounded-lg">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        Granular Controls Mapping Matrix
                    </h1>
                    <p class="mt-2 text-slate-500 text-sm font-medium">Map each artifact against its regulatory framework — then generate missing documents directly from the Implementation Dashboard.</p>
                </div>
                <div class="flex items-center gap-3">
                    <button id="btn-save" class="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 shadow-sm text-sm font-bold rounded-lg transition-transform hover:-translate-y-0.5 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                        Save Progress
                    </button>
                    <button id="btn-generate" class="px-5 py-2.5 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white shadow-lg text-sm font-bold rounded-lg transition-transform hover:-translate-y-0.5 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Generate Draft Report
                    </button>
                </div>
            </div>

            <!-- How-to banner -->
            <div class="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-2xl shadow-sm text-blue-900">
                <h2 class="text-xl font-bold flex items-center gap-2 mb-3">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    How this matrix connects to your platform
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/60 p-5 rounded-xl border border-blue-100">
                    <div>
                        <h3 class="font-bold text-sm mb-1 text-slate-800">1. Score Each Artifact</h3>
                        <p class="text-xs text-slate-600">Use the Status dropdown on every artifact row to rate its current compliance state.</p>
                    </div>
                    <div>
                        <h3 class="font-bold text-sm mb-1 text-slate-800">2. Missing Evidence? Generate It</h3>
                        <p class="text-xs text-slate-600">If evidence is not uploaded, a <strong class="text-indigo-700">Develop Artifact</strong> button appears, routing you straight to the correct Implementation Dashboard Phase to fill in the details and download a PDF.</p>
                    </div>
                    <div>
                        <h3 class="font-bold text-sm mb-1 text-slate-800">3. Upload & Close the Loop</h3>
                        <p class="text-xs text-slate-600">Upload the generated PDF back here as evidence. Your Compliance Dashboard and Executive Summary instantly reflect the improved posture.</p>
                    </div>
                </div>
            </div>

            <!-- Progress -->
            <div class="glass-card rounded-2xl border border-slate-200 shadow-sm p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex-1">
                    <div class="flex justify-between mb-2">
                        <span class="text-sm font-bold text-slate-700 uppercase tracking-wide">Artifact Collection Progress</span>
                        <span id="compliance-progress-text" class="text-sm font-bold text-brand-600">0% Complete</span>
                    </div>
                    <div class="w-full bg-slate-200 rounded-full h-2.5">
                        <div id="compliance-progress-bar" class="bg-brand-500 h-2.5 rounded-full transition-all duration-500" style="width: 0%"></div>
                    </div>
                </div>
            </div>

            <!-- Table -->
            <div class="glass-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left bg-white">
                        <thead class="bg-slate-800 text-white text-xs font-bold uppercase tracking-wider">
                            <tr>
                                <th class="px-5 py-4 w-28 rounded-tl-xl border-r border-slate-700">Control ID</th>
                                <th class="px-5 py-4 border-r border-slate-700 min-w-[200px]">Description</th>
                                <th class="px-5 py-4 w-56 border-r border-slate-700">Framework Clauses</th>
                                <th class="px-5 py-4 min-w-[180px] border-r border-slate-700">Specific Artifact</th>
                                <th class="px-5 py-4 w-44 border-r border-slate-700">Status</th>
                                <th class="px-5 py-4 rounded-tr-xl min-w-[220px]">Evidence / Action</th>
                            </tr>
                        </thead>
                        <tbody id="controls-tbody" class="text-sm divide-y divide-slate-100"></tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    const tbody = document.getElementById('controls-tbody');

    controlsData.forEach((c, cIdx) => {
        const rowBase = cIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40';

        c.arts.forEach((art, aIdx) => {
            const key = c.id + '-' + aIdx;
            const ev  = evidence.find(e => e.controlId === key);
            const hasEvidence = !!ev;
            const phaseInfo = artPhaseMap[art];

            const tr = document.createElement('tr');
            tr.className = `group hover:bg-blue-50/40 transition-colors ${rowBase}`;

            let html = '';

            if (aIdx === 0) {
                html += `
                    <td class="px-5 py-5 font-bold text-slate-800 align-top border-r border-slate-200 text-xs" rowspan="${c.arts.length}">${c.id}</td>
                    <td class="px-5 py-5 text-slate-600 align-top leading-relaxed border-r border-slate-200 text-xs max-w-xs" rowspan="${c.arts.length}">${c.desc}</td>
                    <td class="px-4 py-5 align-top border-r border-slate-200" rowspan="${c.arts.length}">
                        <div class="flex flex-col gap-1.5">
                            ${c.fws.map(fw => `
                                <div class="flex justify-between items-center text-[9px] font-bold uppercase tracking-wide rounded px-2 py-1 ${fwColors[fw.n]||'bg-slate-100 text-slate-600 border border-slate-200'}">
                                    <span>${fw.n}</span><span class="opacity-75 ml-1">${fw.v}</span>
                                </div>`).join('')}
                        </div>
                    </td>
                `;
            }

            // Build the evidence/action cell
            let evidenceCell = '';
            if (hasEvidence) {
                evidenceCell = `
                    <div class="flex flex-col gap-1">
                        <button class="upload-btn px-3 py-1.5 border rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 transition-colors" data-id="${key}">✓ Re-upload</button>
                        <span class="text-[10px] text-slate-400 truncate max-w-[160px]" id="filetext-${key}" title="${ev.filename}">${ev.filename}</span>
                        <input type="file" class="hidden" id="file-${key}">
                    </div>`;
            } else {
                const dashLink = phaseInfo
                    ? `<button onclick="localStorage.setItem('dashMountTab','${phaseInfo.phase}'); window.location.hash='dashboard';" class="inline-flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-1 rounded hover:bg-indigo-100 transition-colors mt-1">
                            <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                            Develop in ${phaseInfo.label}
                       </button>`
                    : '';

                evidenceCell = `
                    <div class="flex flex-col gap-1">
                        <div class="flex items-center gap-2">
                            <button class="upload-btn px-3 py-1.5 border rounded-md text-[11px] font-bold bg-white text-brand-600 border-brand-200 hover:bg-brand-50 transition-colors" data-id="${key}">Upload</button>
                            <span class="text-[10px] text-slate-400 italic">No file</span>
                        </div>
                        ${dashLink}
                        <input type="file" class="hidden" id="file-${key}">
                    </div>`;
            }

            html += `
                <td class="px-5 py-4 align-middle border-r border-slate-200">
                    <div class="flex items-start gap-1.5 text-xs text-slate-700 font-medium">
                        <svg class="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        ${art}
                    </div>
                </td>
                <td class="px-4 py-4 align-middle border-r border-slate-200">
                    <select data-id="${key}" class="status-select w-full rounded-md border-slate-200 text-xs py-2 px-2 text-slate-700 font-medium bg-white focus:ring-brand-500 focus:border-brand-500">
                        <option value="" disabled ${!statuses[key]?'selected':''}>Status...</option>
                        <option value="Compliant" ${statuses[key]==='Compliant'?'selected':''}>✅ Compliant</option>
                        <option value="Partially Compliant" ${statuses[key]==='Partially Compliant'?'selected':''}>🟡 Partial</option>
                        <option value="Non-Compliant" ${statuses[key]==='Non-Compliant'?'selected':''}>❌ Non-Compliant</option>
                        <option value="Not Applicable" ${statuses[key]==='Not Applicable'?'selected':''}>➖ N/A</option>
                    </select>
                </td>
                <td class="px-4 py-4 align-middle">${evidenceCell}</td>
            `;

            tr.innerHTML = html;
            tbody.appendChild(tr);
        });
    });

    updateProgressBar();

    // Status select events
    tbody.querySelectorAll('.status-select').forEach(sel => {
        sel.addEventListener('change', e => {
            statuses[e.target.getAttribute('data-id')] = e.target.value;
            updateProgressBar();
        });
    });

    // Upload events
    tbody.querySelectorAll('.upload-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const fi = document.getElementById(`file-${id}`);
            fi.click();
            fi.onchange = () => {
                if (!fi.files.length) return;
                const name = fi.files[0].name;
                const textEl = document.getElementById(`filetext-${id}`);
                if (textEl) { textEl.textContent = name; textEl.title = name; }
                btn.textContent = '✓ Re-upload';
                btn.className = 'upload-btn px-3 py-1.5 border rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border-emerald-200';
                evidence = evidence.filter(e => e.controlId !== id);
                evidence.push({ controlId: id, filename: name, uploadDate: new Date().toISOString() });
            };
        });
    });

    // Save
    document.getElementById('btn-save').addEventListener('click', () => {
        localStorage.setItem('controlStatuses', JSON.stringify(statuses));
        localStorage.setItem('controlEvidence', JSON.stringify(evidence));
        const btn = document.getElementById('btn-save');
        const orig = btn.innerHTML;
        btn.innerHTML = '✓ Saved!';
        setTimeout(() => { btn.innerHTML = orig; }, 1500);
    });

    // Generate Report
    document.getElementById('btn-generate').addEventListener('click', () => {
        localStorage.setItem('controlStatuses', JSON.stringify(statuses));
        localStorage.setItem('controlEvidence', JSON.stringify(evidence));
        localStorage.setItem('draftReportData', JSON.stringify({ generatedAt: new Date().toISOString(), statusCount: Object.keys(statuses).length, evidenceCount: evidence.length }));
        window.location.hash = 'compliance-dashboard';
    });

    return container;
}
