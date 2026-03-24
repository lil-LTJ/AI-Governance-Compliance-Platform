import { loadControlStatuses, saveControlStatuses, loadControlEvidence, saveControlEvidence, saveDraftReportData, loadCompanyData } from '../storage.js';

const CONTROLS = [
    // NIST AI RMF
    { id: 'NIST-GOV-1', framework: 'NIST', desc: 'Policies and practices for mapping, measuring, and managing AI risks are in place.', artifacts: 'AI Governance Policy, SOPs' },
    { id: 'NIST-GOV-2', framework: 'NIST', desc: 'Accountability structures are in place for teams managing AI risks.', artifacts: 'Org Chart, RACI Matrix, Training Logs' },
    { id: 'NIST-GOV-3', framework: 'NIST', desc: 'Workforce diversity, equity, inclusion, and accessibility processes are prioritized.', artifacts: 'DEIA Policy, Hiring Metrics' },
    { id: 'NIST-GOV-4', framework: 'NIST', desc: 'Organizational teams are committed to a culture that considers and communicates AI risk.', artifacts: 'Risk Culture Survey, Communications Plan' },
    { id: 'NIST-GOV-5', framework: 'NIST', desc: 'Processes are in place for robust engagement with relevant AI actors.', artifacts: 'Stakeholder Mapping, Engagement Logs' },
    { id: 'NIST-GOV-6', framework: 'NIST', desc: 'Policies to address AI risks and benefits from third-party entities.', artifacts: 'Vendor Risk Assessment, SLAs' },
    { id: 'NIST-MAP-1', framework: 'NIST', desc: 'Context is established and understood for the AI system.', artifacts: 'System Context Document' },
    { id: 'NIST-MAP-2', framework: 'NIST', desc: 'Categorization of the AI system.', artifacts: 'AI System Inventory, Taxonomy' },
    { id: 'NIST-MAP-3', framework: 'NIST', desc: 'AI capabilities, targeted usage, goals, compared with benchmarks are understood.', artifacts: 'Business Case, ROI Analysis' },
    { id: 'NIST-MAP-4', framework: 'NIST', desc: 'Risks and benefits are mapped for all AI actors.', artifacts: 'Risk/Benefit Matrix' },
    { id: 'NIST-MAP-5', framework: 'NIST', desc: 'Impacts to individuals, groups, communities, organizations, and society are characterized.', artifacts: 'Societal Impact Assessment' },
    { id: 'NIST-MEAS-1', framework: 'NIST', desc: 'Appropriate methods and metrics are identified and applied.', artifacts: 'Metrics Dashboard, Validation Report' },
    { id: 'NIST-MEAS-2', framework: 'NIST', desc: 'AI systems are evaluated for trustworthy characteristics.', artifacts: 'Technical Testing Results, Fairness Audit' },
    { id: 'NIST-MEAS-3', framework: 'NIST', desc: 'Mechanisms for tracking identified AI risks over time.', artifacts: 'Key Risk Indicators (KRIs) Log' },
    { id: 'NIST-MEAS-4', framework: 'NIST', desc: 'Feedback about efficacy of measurement is gathered.', artifacts: 'Continuous Monitoring Plan' },
    { id: 'NIST-MAN-1', framework: 'NIST', desc: 'AI risks are prioritized, responded to, and managed.', artifacts: 'Risk Mitigation Plan' },
    { id: 'NIST-MAN-2', framework: 'NIST', desc: 'Strategies to maximize AI benefits and minimize negative impacts.', artifacts: 'Innovation Strategy Document' },
    { id: 'NIST-MAN-3', framework: 'NIST', desc: 'AI risks and benefits from third-party entities are managed.', artifacts: 'TPRM Reports' },
    { id: 'NIST-MAN-4', framework: 'NIST', desc: 'Risk treatments, including response and recovery, and communication plans are documented.', artifacts: 'Incident Response Plan' },

    // EU AI Act
    { id: 'EU-ART-8', framework: 'EU AI Act', desc: 'Compliance with requirements for high-risk systems.', artifacts: 'Conformity Assessment Report' },
    { id: 'EU-ART-9', framework: 'EU AI Act', desc: 'Risk management system established and maintained.', artifacts: 'Risk Management Framework' },
    { id: 'EU-ART-10', framework: 'EU AI Act', desc: 'Data and data governance (high-quality training datasets).', artifacts: 'Data Quality Policy, Dataset Lineage' },
    { id: 'EU-ART-11', framework: 'EU AI Act', desc: 'Technical documentation drawn up before market placement.', artifacts: 'Architecture Specs, Model Cards' },
    { id: 'EU-ART-12', framework: 'EU AI Act', desc: 'Record-keeping (logging) for traceability.', artifacts: 'Audit Logs, System Logs' },
    { id: 'EU-ART-13', framework: 'EU AI Act', desc: 'Transparency and provision of information to users.', artifacts: 'User Manuals, Transparency Disclosures' },
    { id: 'EU-ART-14', framework: 'EU AI Act', desc: 'Human oversight measures during high-risk AI usage.', artifacts: 'Human-in-the-loop SOPs' },
    { id: 'EU-ART-15', framework: 'EU AI Act', desc: 'Accuracy, robustness, and cybersecurity.', artifacts: 'Pentest Reports, Accuracy Metrics' },
    { id: 'EU-ART-16', framework: 'EU AI Act', desc: 'Obligations of providers of high-risk AI systems.', artifacts: 'Provider Compliance Declaration' },
    { id: 'EU-ART-17', framework: 'EU AI Act', desc: 'Quality management system setup.', artifacts: 'QMS Manual' },
    { id: 'EU-ART-50', framework: 'EU AI Act', desc: 'Transparency obligations for GenAI/Deepfakes.', artifacts: 'GenAI Watermarking Policy, Disclaimers' },

    // ISO 42001
    { id: 'ISO-A.2', framework: 'ISO 42001', desc: 'Establishing AI policies.', artifacts: 'Corporate AI Policy' },
    { id: 'ISO-A.3', framework: 'ISO 42001', desc: 'Internal organization for AI governance.', artifacts: 'Governance Committee Charter' },
    { id: 'ISO-A.4', framework: 'ISO 42001', desc: 'Resources for AI systems (tooling, data, human).', artifacts: 'Resource Allocation Plan' },
    { id: 'ISO-A.5', framework: 'ISO 42001', desc: 'Assessing AI system impacts.', artifacts: 'AIA (AI Impact Assessment) Report' },
    { id: 'ISO-A.6', framework: 'ISO 42001', desc: 'AI system life cycle management.', artifacts: 'SDLC Documentation' },
    { id: 'ISO-A.7', framework: 'ISO 42001', desc: 'Data for AI systems governance.', artifacts: 'Data Strategy' },
    { id: 'ISO-A.8', framework: 'ISO 42001', desc: 'Information for interested parties.', artifacts: 'External Communications' },
    { id: 'ISO-A.9', framework: 'ISO 42001', desc: 'Use of AI systems guidelines.', artifacts: 'Acceptable Use Policy (AUP)' },
    { id: 'ISO-A.10', framework: 'ISO 42001', desc: 'Third-party relationships.', artifacts: 'Supplier Code of Conduct' },

    // GDPR
    { id: 'GDPR-ART-5', framework: 'GDPR', desc: 'Principles relating to processing of personal data.', artifacts: 'Data Protection Policy, RoPA' },
    { id: 'GDPR-ART-6', framework: 'GDPR', desc: 'Lawfulness of processing (identifying legal basis).', artifacts: 'Legal Basis Register' },
    { id: 'GDPR-ART-9', framework: 'GDPR', desc: 'Processing of special categories of personal data.', artifacts: 'Special Data Processing Log' },
    { id: 'GDPR-ART-13', framework: 'GDPR', desc: 'Information to be provided (privacy notices).', artifacts: 'Privacy Notice' },
    { id: 'GDPR-ART-15', framework: 'GDPR', desc: 'Right of access by the data subject (explaining AI logic).', artifacts: 'DSAR Procedure' },
    { id: 'GDPR-ART-17', framework: 'GDPR', desc: 'Right to erasure (handling data deletion requests).', artifacts: 'Data Deletion Protocol' },
    { id: 'GDPR-ART-22', framework: 'GDPR', desc: 'Automated individual decision-making, including profiling.', artifacts: 'Algorithm Fairness Report, Opt-out Forms' },
    { id: 'GDPR-ART-25', framework: 'GDPR', desc: 'Data protection by design and by default.', artifacts: 'Privacy by Design Playbook' },
    { id: 'GDPR-ART-28', framework: 'GDPR', desc: 'Processor obligations (assessing third-party vendors).', artifacts: 'DPA (Data Processing Agreements)' },
    { id: 'GDPR-ART-35', framework: 'GDPR', desc: 'Data protection impact assessment (DPIA).', artifacts: 'Completed DPIA' },

    // COBIT
    { id: 'COBIT-EDM03', framework: 'COBIT', desc: 'Ensure Risk Optimization.', artifacts: 'Board Risk Directives' },
    { id: 'COBIT-APO01', framework: 'COBIT', desc: 'Manage the IT and AI Management Framework.', artifacts: 'Management Framework Structure' },
    { id: 'COBIT-APO12', framework: 'COBIT', desc: 'Manage Risk framework integration.', artifacts: 'Enterprise Risk Framework' },
    { id: 'COBIT-APO13', framework: 'COBIT', desc: 'Manage Security for AI models and infrastructure.', artifacts: 'Information Security Policy' },
    { id: 'COBIT-BAI02', framework: 'COBIT', desc: 'Manage Requirements Definition.', artifacts: 'Business Requirements Document (BRD)' },
    { id: 'COBIT-BAI03', framework: 'COBIT', desc: 'Manage Solutions Identification and Build.', artifacts: 'Vendor Evaluation Matrix' },
    { id: 'COBIT-BAI10', framework: 'COBIT', desc: 'Manage Configuration.', artifacts: 'Configuration Management Database (CMDB)' },
    { id: 'COBIT-DSS05', framework: 'COBIT', desc: 'Manage Security Services.', artifacts: 'Network Security Arch Diagrams' }
];

function getBadgeColor(framework) {
    const colors = {
        'NIST': 'bg-blue-100 text-blue-800 border-blue-200',
        'EU AI Act': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        'ISO 42001': 'bg-purple-100 text-purple-800 border-purple-200',
        'GDPR': 'bg-green-100 text-green-800 border-green-200',
        'COBIT': 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[framework] || 'bg-slate-100 text-slate-800 border-slate-200';
}

function getStatusColor(status) {
    switch (status) {
        case 'Compliant': return 'text-green-600 bg-green-50 border-green-200';
        case 'Partially Compliant': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
        case 'Non-Compliant': return 'text-red-600 bg-red-50 border-red-200';
        case 'Not Applicable': return 'text-slate-500 bg-slate-50 border-slate-200';
        default: return 'text-slate-900 bg-white border-slate-300';
    }
}

export function renderControls(container) {
    let localStatuses = loadControlStatuses();
    let localEvidence = loadControlEvidence(); // array of { controlId, filename }
    
    // Calculate initial progress
    const updateProgress = () => {
        let compliantCount = 0;
        let totalApplicable = CONTROLS.length;
        
        CONTROLS.forEach(c => {
            const st = localStatuses[c.id];
            if (st === 'Compliant') compliantCount += 1;
            if (st === 'Partially Compliant') compliantCount += 0.5;
            if (st === 'Not Applicable') totalApplicable -= 1;
        });
        
        const percentage = totalApplicable === 0 ? 100 : Math.round((compliantCount / totalApplicable) * 100);
        return percentage;
    };

    const template = `
        <div class="w-full max-w-7xl mx-auto fade-in pt-6 pb-12 h-full flex flex-col">
            <!-- Header section -->
            <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
                <div>
                    <div class="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold mb-3 uppercase tracking-wider">
                        Module 01
                    </div>
                    <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                        <div class="p-2 bg-brand-100 text-brand-700 rounded-lg">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                        </div>
                        Controls Mapping
                    </h1>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                    <button id="btn-save-progress" class="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-2">
                        <svg class="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                        Save Progress
                    </button>
                    <button id="btn-generate-report" class="px-5 py-2.5 bg-brand-600 border border-transparent text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition-colors shadow-sm shadow-brand-500/30 flex items-center justify-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Generate Draft Report
                    </button>
                </div>
            </div>

            <!-- Progress Bar -->
            <div class="glass-card rounded-xl border border-slate-200 p-6 mb-8 shadow-sm">
                <div class="flex justify-between items-end mb-2">
                    <div>
                        <h3 class="text-sm font-bold text-slate-700 uppercase tracking-wide">Overall Compliance Posture</h3>
                        <p class="text-xs text-slate-500 mt-1">Percentage of controls marked as Compliant or Partially Compliant</p>
                    </div>
                    <span id="progress-text" class="text-3xl font-extrabold text-brand-600 tracking-tight">0%</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-3 overflow-hidden border border-slate-300 shadow-inner">
                    <div id="progress-bar-fill" class="bg-gradient-to-r from-brand-400 to-brand-600 h-3 rounded-full transition-all duration-700 ease-out" style="width: 0%"></div>
                </div>
            </div>

            <!-- Controls Table -->
            <div class="glass-card rounded-xl border border-slate-200 overflow-hidden shadow-sm flex-grow flex flex-col">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-slate-200">
                        <thead class="bg-slate-50">
                            <tr>
                                <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-32 border-b border-slate-200">Control ID</th>
                                <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-32 border-b border-slate-200">Framework</th>
                                <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Control Description</th>
                                <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-48 border-b border-slate-200">Artifacts to Collect</th>
                                <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-48 border-b border-slate-200">Compliance Status</th>
                                <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-48 border-b border-slate-200">Evidence File</th>
                            </tr>
                        </thead>
                        <tbody id="controls-tbody" class="bg-white divide-y divide-slate-100">
                            <!-- Rows injected here -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    container.innerHTML = template;

    const tbody = document.getElementById('controls-tbody');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressText = document.getElementById('progress-text');

    const renderRows = () => {
        tbody.innerHTML = CONTROLS.map((control, index) => {
            const currentStatus = localStatuses[control.id] || '';
            const currentEvidenceObj = localEvidence.find(e => e.controlId === control.id);
            const currentFileName = currentEvidenceObj ? currentEvidenceObj.filename : 'No file chosen';
            
            return `
            <tr class="hover:bg-slate-50 transition-colors group">
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm font-bold text-slate-800">${control.id}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeColor(control.framework)}">
                        ${control.framework}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <p class="text-sm text-slate-600 font-medium">${control.desc}</p>
                </td>
                <td class="px-6 py-4">
                    <div class="flex items-start gap-2 text-xs text-slate-500">
                        <svg class="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        <span>${control.artifacts}</span>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <select data-id="${control.id}" class="control-status form-input block w-full text-sm rounded-lg border-slate-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 font-medium transition-colors ${getStatusColor(currentStatus)}">
                        <option value="" disabled ${!currentStatus ? 'selected' : ''}>Select Status...</option>
                        <option value="Compliant" ${currentStatus === 'Compliant' ? 'selected' : ''}>Compliant</option>
                        <option value="Partially Compliant" ${currentStatus === 'Partially Compliant' ? 'selected' : ''}>Partially Compliant</option>
                        <option value="Non-Compliant" ${currentStatus === 'Non-Compliant' ? 'selected' : ''}>Non-Compliant</option>
                        <option value="Not Applicable" ${currentStatus === 'Not Applicable' ? 'selected' : ''}>Not Applicable</option>
                    </select>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-2">
                        <label class="cursor-pointer inline-flex items-center px-3 py-1.5 border border-slate-200 shadow-sm text-xs font-medium rounded text-slate-700 bg-white hover:bg-slate-50 transition-colors">
                            <svg class="w-3.5 h-3.5 mr-1.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                            Upload
                            <input type="file" class="hidden control-file" data-id="${control.id}">
                        </label>
                        <span class="text-xs text-slate-500 truncate w-32 filename-display" title="${currentFileName}">${currentFileName}</span>
                    </div>
                </td>
            </tr>
            `;
        }).join('');

        // Attach event listeners for selects
        tbody.querySelectorAll('.control-status').forEach(select => {
            select.addEventListener('change', (e) => {
                const id = e.target.getAttribute('data-id');
                localStatuses[id] = e.target.value;
                // Update color class of the select
                e.target.className = `control-status form-input block w-full text-sm rounded-lg border-slate-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 font-medium transition-colors ${getStatusColor(e.target.value)}`;
                updateUIMetrics();
            });
        });

        // Attach event listeners for file uploads
        tbody.querySelectorAll('.control-file').forEach(input => {
            input.addEventListener('change', (e) => {
                const id = e.target.getAttribute('data-id');
                const file = e.target.files[0];
                if (file) {
                    // Update local evidence array
                    const existingIdx = localEvidence.findIndex(ev => ev.controlId === id);
                    if (existingIdx !== -1) {
                        localEvidence[existingIdx].filename = file.name;
                    } else {
                        localEvidence.push({ controlId: id, filename: file.name });
                    }
                    // Update display
                    const displaySpan = e.target.closest('td').querySelector('.filename-display');
                    displaySpan.textContent = file.name;
                    displaySpan.title = file.name;
                }
            });
        });
    };

    const updateUIMetrics = () => {
        const pct = updateProgress();
        progressBarFill.style.width = `${pct}%`;
        progressText.textContent = `${pct}%`;
    };

    // Initial render
    renderRows();
    updateUIMetrics();

    // Button actions
    document.getElementById('btn-save-progress').addEventListener('click', () => {
        const s1 = saveControlStatuses(localStatuses);
        const s2 = saveControlEvidence(localEvidence);
        if (s1 && s2) {
            alert('Progress successfully saved to secure storage.');
        } else {
            alert('Error saving progress.');
        }
    });

    document.getElementById('btn-generate-report').addEventListener('click', () => {
        // Automatically save active progress first
        saveControlStatuses(localStatuses);
        saveControlEvidence(localEvidence);

        const companyData = loadCompanyData() || {};
        
        // Collate data for the draft report
        const reportData = {
            metadata: {
                companyName: companyData.companyName || 'Not Set',
                industry: companyData.industry || 'Not Set',
                generatedAt: new Date().toISOString()
            },
            complianceScore: updateProgress(),
            statuses: localStatuses,
            evidence: localEvidence,
            controls: CONTROLS // Include full definitions for easy dashboard rendering
        };

        saveDraftReportData(reportData);
        window.location.hash = 'dashboard';
    });

    return container;
}
