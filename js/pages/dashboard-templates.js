export function getPhase1Template(state1) {
    return \`
    <div id="phase1-pane" class="tab-pane block">
        <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div class="xl:col-span-3 space-y-8">
                <!-- P1: Mandate -->
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div class="bg-slate-50 px-6 py-4 border-b border-slate-200"><h2 class="text-lg font-bold text-slate-800">1. Executive Management Mandate</h2></div>
                    <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label class="block text-sm font-semibold text-slate-700 mb-2">Document Title</label><input type="text" id="m-title" class="p1-input form-input w-full rounded-xl border-slate-200 py-2.5 px-3 border" value="\${state1.mandate.title}"></div>
                        <div class="grid grid-cols-2 gap-4">
                            <div><label class="block text-sm font-semibold text-slate-700 mb-2">Version</label><input type="text" id="m-version" class="p1-input form-input w-full rounded-xl border-slate-200 py-2.5 px-3 border" value="\${state1.mandate.version}"></div>
                            <div><label class="block text-sm font-semibold text-slate-700 mb-2">Date</label><input type="date" id="m-date" class="p1-input form-input w-full rounded-xl border-slate-200 py-2.5 px-3 border" value="\${state1.mandate.date}"></div>
                        </div>
                        <div><label class="block text-sm font-semibold text-slate-700 mb-2">Approving Authority</label><input type="text" id="m-authority" class="p1-input form-input w-full rounded-xl border-slate-200 py-2.5 px-3 border" value="\${state1.mandate.authority}"></div>
                        <div><label class="block text-sm font-semibold text-slate-700 mb-2">AIMS Owner Name</label><input type="text" id="m-owner" class="p1-input form-input w-full rounded-xl border-slate-200 py-2.5 px-3 border" value="\${state1.mandate.owner}"></div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-semibold text-slate-700 mb-2">Mandate Document Upload</label>
                            <div class="flex items-center gap-3">
                                <label class="cursor-pointer inline-flex items-center px-4 py-2 border border-slate-200 shadow-sm text-sm font-medium rounded-lg bg-white hover:bg-slate-50">Attach PDF <input type="file" id="m-file" class="hidden p1-input" accept=".pdf"></label>
                                <span id="m-filename" class="text-sm font-medium text-slate-500 truncate">\${state1.mandate.filename || 'No file selected'}</span>
                            </div>
                        </div>
                        <div class="md:col-span-2"><label class="block text-sm font-semibold text-slate-700 mb-2">Purpose of Mandate</label><textarea id="m-purpose" rows="2" class="p1-input form-input w-full rounded-xl border-slate-200 py-2.5 px-3 border">\${state1.mandate.purpose}</textarea></div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-semibold text-slate-700 mb-3">Granted Authorities</label>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50/50 p-4 rounded-xl border border-slate-200">
                                \${['Right to Pause', 'Budget override', 'Mandatory audit', 'Direct reporting line'].map(opt => \`
                                <label class="flex items-center"><input type="checkbox" class="auth-cb p1-input w-4 h-4 text-purple-600 rounded border-slate-300" value="\${opt}" \${state1.mandate.authorities.includes(opt)?'checked':''}><span class="ml-3 text-sm text-slate-700">\${opt}</span></label>\`).join('')}
                            </div>
                        </div>
                        <div class="md:col-span-2"><label class="block text-sm font-semibold text-slate-700 mb-2">Resource Commitment</label><textarea id="m-commitments" rows="2" class="p1-input form-input w-full rounded-xl border-slate-200 py-2.5 px-3 border">\${state1.mandate.commitments}</textarea></div>
                    </div>
                </div>

                <!-- P1: Assets -->
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden"><div class="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center"><h2 class="text-lg font-bold text-slate-800">2. AI Asset Register</h2><button id="btn-add-asset" class="text-sm font-semibold text-purple-600 px-3 py-1.5 rounded flex gap-1">Add Asset</button></div><div class="p-0 overflow-x-auto"><table class="min-w-full divide-y divide-slate-200"><thead class="bg-white"><tr><th class="px-3 py-2 text-left text-xs font-bold text-slate-500">ID</th><th class="px-3 py-2 text-left text-xs font-bold text-slate-500">Model</th><th class="px-3 py-2 text-left text-xs font-bold text-slate-500">Purpose</th><th class="px-3 py-2 text-left text-xs font-bold text-slate-500">Stack</th><th class="px-3 py-2 text-left text-xs font-bold text-slate-500">Sponsor</th><th class="px-3 py-2 text-left text-xs font-bold text-slate-500">Steward</th><th class="px-3 py-2 text-left text-xs font-bold text-slate-500">Tier</th><th class="px-3 py-2"></th></tr></thead><tbody id="asset-tbody" class="bg-slate-50/30"></tbody></table><div id="empty-assets" class="p-8 text-center hidden">No assets.</div></div></div>

                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label class="block text-sm font-semibold text-slate-700 mb-2">In-Scope Entities</label><textarea id="s-in" rows="2" class="p1-input w-full border rounded p-2 text-sm">\${state1.scope.inScope}</textarea></div>
                    <div><label class="block text-sm font-semibold text-slate-700 mb-2">Out-of-Scope</label><textarea id="s-out" rows="2" class="p1-input w-full border rounded p-2 text-sm">\${state1.scope.outScope}</textarea></div>
                    <div><label class="block text-sm font-semibold text-slate-700 mb-2">Geographic Scope</label><input type="text" id="s-geo" class="p1-input w-full border rounded p-2 text-sm" value="\${state1.scope.geography}"></div>
                    <div><label class="block text-sm font-semibold text-slate-700 mb-2">Third-Party</label><input type="text" id="s-bound" class="p1-input w-full border rounded p-2 text-sm" value="\${state1.scope.boundaries}"></div>
                    <div class="md:col-span-2 grid grid-cols-3 gap-4 border-t pt-4">
                        <div><label class="block text-sm font-semibold text-slate-700 mb-2">Quant. Risk</label><textarea id="r-quant" rows="2" class="p1-input w-full text-sm rounded border">\${state1.risk.quant}</textarea></div>
                        <div><label class="block text-sm font-semibold text-slate-700 mb-2">Qual. Risk</label><textarea id="r-qual" rows="2" class="p1-input w-full text-sm rounded border">\${state1.risk.qual}</textarea></div>
                        <div><label class="block text-sm font-semibold text-slate-700 mb-2">Financial Risk</label><textarea id="r-fin" rows="2" class="p1-input w-full text-sm rounded border">\${state1.risk.financial}</textarea></div>
                    </div>
                </div>
            </div>
            <div class="xl:col-span-1"><div class="glass-card rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-24"><h3 class="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">Phase 1 Summary</h3><div class="space-y-4 mb-6"><div class="flex justify-between text-sm"><span class="text-slate-600">Mandate</span><span id="sum1-mandate"></span></div><div class="flex justify-between text-sm"><span class="text-slate-600">Assets</span><span id="sum1-assets" class="px-2 py-0.5 rounded-md text-xs font-bold bg-blue-100 text-blue-700"></span></div><div class="flex justify-between text-sm"><span class="text-slate-600">Risk Defined</span><span id="sum1-risk"></span></div><div class="flex justify-between text-sm pt-3 border-t"><span class="text-slate-800 font-bold">Status</span><span id="sum1-status"></span></div></div><button id="btn-complete-1" class="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-lg mb-3">Complete</button><button id="btn-download-1" class="w-full px-4 py-2 border text-slate-700 text-sm font-bold rounded-lg">Download JSON</button></div></div>
        </div>
    </div>
    \`;
}

export function getPhase2Template(state2) {
    return \`
    <div id="phase2-pane" class="tab-pane hidden">
        <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div class="xl:col-span-3 space-y-8">
                <!-- P2: Lead -->
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <h2 class="text-lg font-bold text-slate-800 md:col-span-2">1. AIMS Lead Role Description</h2>
                    <div class="md:col-span-2"><label class="block text-sm font-semibold text-slate-700 mb-2">Accountability Statement</label><textarea id="l-account" rows="2" class="p2-input w-full rounded-xl border border-slate-200 py-2 px-3 text-sm">\${state2.lead.accountability}</textarea></div>
                    <div class="md:col-span-2"><label class="block text-sm font-semibold text-slate-700 mb-2">Core Responsibilities</label><div class="flex flex-wrap gap-4">\${['Maintain Asset Register', 'Coordinate risk assessments', 'Liaise with auditors', 'Monitor metrics'].map(opt => \`<label class="flex items-center"><input type="checkbox" class="l-resp-cb p2-input w-4 h-4 text-purple-600 rounded border-slate-300" value="\${opt}" \${state2.lead.responsibilities.includes(opt)?'checked':''}><span class="ml-2 text-sm text-slate-700">\${opt}</span></label>\`).join('')}</div></div>
                    <div><label class="block text-sm font-semibold text-slate-700 mb-2">Authorities</label><textarea id="l-auth" rows="3" class="p2-input w-full rounded border px-3 text-sm">\${state2.lead.authorities[0]||''}</textarea></div>
                    <div><label class="block text-sm font-semibold text-slate-700 mb-2">KPIs</label><textarea id="l-kpi" rows="3" class="p2-input w-full rounded border px-3 text-sm">\${state2.lead.kpis}</textarea></div>
                </div>
                <!-- P2: Committee -->
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <h2 class="text-lg font-bold text-slate-800 md:col-span-2">2. Committee Charter</h2>
                    <div class="md:col-span-2"><label class="block text-sm font-semibold text-slate-700 mb-2">Purpose</label><textarea id="c-purpose" rows="2" class="p2-input w-full rounded border py-2 px-3 text-sm">\${state2.committee.purpose}</textarea></div>
                    <div><label class="block text-sm font-semibold text-slate-700 mb-2">Roles</label><div class="flex flex-wrap gap-2">\${['Legal', 'Data Science', 'Security', 'HR'].map(m => \`<label class="flex items-center"><input type="checkbox" class="c-member-cb p2-input" value="\${m}" \${state2.committee.membership.includes(m)?'checked':''}><span class="ml-1 text-xs">\${m}</span></label>\`).join('')}</div></div>
                    <div class="space-y-4">
                        <select id="c-cadence" class="p2-input w-full border rounded p-2 text-sm"><option value="Monthly" \${state2.committee.cadence==='Monthly'?'selected':''}>Monthly</option><option value="Quarterly" \${state2.committee.cadence==='Quarterly'?'selected':''}>Quarterly</option></select>
                        <input type="text" id="c-quorum" class="p2-input w-full border rounded p-2 text-sm" placeholder="Quorum rule" value="\${state2.committee.quorum}">
                        <input type="text" id="c-esc" class="p2-input w-full border rounded p-2 text-sm" placeholder="Escalation" value="\${state2.committee.escalation}">
                    </div>
                </div>
                <!-- P2: RACI -->
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden"><div class="bg-slate-50 px-6 py-4 border-b border-slate-200"><h2 class="text-lg font-bold text-slate-800">3. AI RACI Matrix</h2></div><div class="overflow-x-auto"><table class="min-w-full divide-y"><thead class="bg-white"><tr><th class="px-4 py-3 text-left">Activity</th><th>AIMS</th><th>Sci</th><th>Leg</th><th>CIS</th><th>PM</th></tr></thead><tbody id="raci-tbody" class="divide-y text-sm"></tbody></table></div></div>
                <!-- P2: Letters -->
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden"><div class="bg-slate-50 px-6 py-4 border-b border-slate-200"><h2 class="text-lg font-bold text-slate-800">4. Letters</h2></div><div class="p-6"><div id="letters-container" class="space-y-4"></div></div></div>
            </div>
            <div class="xl:col-span-1"><div class="glass-card rounded-2xl border shadow-sm p-6 sticky top-24"><h3 class="font-bold border-b pb-3 mb-4">Phase 2 Summary</h3><div class="space-y-4 mb-6"><div class="flex justify-between text-sm"><span>Lead Role</span><span id="sum2-lead"></span></div><div class="flex justify-between text-sm"><span>Committee</span><span id="sum2-comm"></span></div><div class="flex justify-between text-sm"><span>RACI</span><span id="sum2-raci"></span></div><div class="flex justify-between text-sm pt-3 border-t"><span class="font-bold">Status</span><span id="sum2-status"></span></div></div><button id="btn-complete-2" class="w-full px-4 py-2 bg-purple-600 text-white text-sm font-bold rounded-lg mb-3">Complete</button><button id="btn-download-2" class="w-full px-4 py-2 border rounded-lg text-sm font-bold">Download JSON</button></div></div>
        </div>
    </div>
    \`;
}

export function getPhase3Template(state3) {
    return \`
    <div id="phase3-pane" class="tab-pane hidden">
        <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div class="xl:col-span-3 space-y-8">
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div class="bg-slate-50 px-6 py-4 border-b border-slate-200"><h2 class="text-lg font-bold text-slate-800">1. Ethics Policy</h2></div>
                    <div class="p-6 grid grid-cols-1 gap-6">
                        <textarea id="e-stmt" rows="2" class="p3-input w-full border rounded p-2 text-sm" placeholder="Policy Statement">\${state3.ethics.statement}</textarea>
                        <textarea id="e-fair" rows="2" class="p3-input w-full border rounded p-2 text-sm" placeholder="Fairness Rules">\${state3.ethics.fairness}</textarea>
                        <textarea id="e-trans" rows="2" class="p3-input w-full border rounded p-2 text-sm" placeholder="Transparency">\${state3.ethics.transparency}</textarea>
                        <textarea id="e-over" rows="2" class="p3-input w-full border rounded p-2 text-sm" placeholder="Human Oversight">\${state3.ethics.oversight}</textarea>
                        <textarea id="e-probib" rows="2" class="p3-input w-full border rounded p-2 text-sm" placeholder="Prohibited Uses">\${state3.ethics.prohibited}</textarea>
                        <textarea id="e-nonneg" rows="2" class="p3-input w-full border rounded p-2 text-sm" placeholder="Non-Negotiable">\${state3.ethics.nonNegotiable}</textarea>
                    </div>
                </div>
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <h2 class="text-lg font-bold text-slate-800 md:col-span-2">2. Risk Policy</h2>
                    <textarea id="k-frame" rows="2" class="p3-input w-full border rounded p-2" placeholder="Risk Framework">\${state3.risk.framework}</textarea>
                    <textarea id="k-matrix" rows="2" class="p3-input w-full border rounded p-2" placeholder="Scoring Matrix">\${state3.risk.matrix}</textarea>
                    <div class="md:col-span-2 flex gap-4">\${['Avoid', 'Mitigate', 'Transfer', 'Accept'].map(opt => \`<label><input type="checkbox" class="k-treat-cb p3-input" value="\${opt}" \${state3.risk.treatments.includes(opt)?'checked':''}>\${opt}</label>\`).join('')}</div>
                    <textarea id="k-reassess" rows="2" class="p3-input w-full border rounded p-2" placeholder="Re-assessment">\${state3.risk.reassessment}</textarea>
                    <textarea id="k-reg" rows="2" class="p3-input w-full border rounded p-2" placeholder="Regulatory Mapping">\${state3.risk.regulatory}</textarea>
                </div>
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <h2 class="text-lg font-bold text-slate-800 md:col-span-2">3. Data Gov Policy</h2>
                    <input type="text" id="d-lineage" class="p3-input w-full border rounded p-2" placeholder="Lineage" value="\${state3.dataGov.lineage}">
                    <input type="text" id="d-quality" class="p3-input w-full border rounded p-2" placeholder="Quality" value="\${state3.dataGov.quality}">
                    <input type="text" id="d-pbd" class="p3-input w-full border rounded p-2" placeholder="Privacy by Design" value="\${state3.dataGov.pbd}">
                    <input type="text" id="d-bias" class="p3-input w-full border rounded p-2" placeholder="Bias Rules" value="\${state3.dataGov.bias}">
                    <input type="text" id="d-ip" class="p3-input w-full border rounded p-2 md:col-span-2" placeholder="IP Rules" value="\${state3.dataGov.ip}">
                </div>
                <div class="glass-card rounded-2xl border shadow-sm"><div class="p-4 border-b flex justify-between"><h2 class="font-bold">4. Standard Tracker</h2><button id="btn-add-track" class="text-xs font-bold text-purple-600">Add Row</button></div>
                <div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr><th>Section</th><th>ISO</th><th>EU</th><th>Control</th><th></th></tr></thead><tbody id="track-tbody"></tbody></table></div></div>
            </div>
            <div class="xl:col-span-1"><div class="glass-card rounded-2xl border shadow-sm p-6 sticky top-24"><h3 class="font-bold border-b pb-3 mb-4">Phase 3 Summary</h3><div class="space-y-4 mb-6"><div class="flex justify-between text-sm"><span>Ethics</span><span id="sum3-ethics"></span></div><div class="flex justify-between text-sm"><span>Risk</span><span id="sum3-risk"></span></div><div class="flex justify-between text-sm"><span>Data Gov</span><span id="sum3-data"></span></div><div class="flex justify-between text-sm"><span>Trackers</span><span id="sum3-track"></span></div><div class="flex justify-between text-sm pt-3 border-t"><span class="font-bold">Status</span><span id="sum3-status"></span></div></div><button id="btn-complete-3" class="w-full px-4 py-2 bg-purple-600 text-white text-sm font-bold rounded-lg mb-3">Complete</button><button id="btn-download-3" class="w-full px-4 py-2 border rounded-lg text-sm font-bold">Download JSON</button></div></div>
        </div>
    </div>
    \`;
}

export function getPhase4Template(state4) {
    return \`
    <div id="phase4-pane" class="tab-pane hidden">
        <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div class="xl:col-span-3 space-y-8">
                <!-- P4: Lineage -->
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm p-6">
                    <h2 class="text-lg font-bold text-slate-800 mb-4">1. Data Lineage Diagram</h2>
                    <label class="block text-sm font-semibold mb-2">Visual Flow Description</label>
                    <textarea id="i-flow" rows="2" class="p4-input w-full border rounded p-2 text-sm mb-6" placeholder="Source -> Ingestion -> Trans -> Output">\${state4.lineage.flow}</textarea>
                    
                    <div class="flex justify-between items-center mb-2"><label class="block text-sm font-semibold">Metadata Lineage Hops</label><button id="btn-add-hop" class="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">Add Hop</button></div>
                    <div class="overflow-x-auto border-t border-slate-200"><table class="w-full text-sm mt-2 text-left"><thead><tr class="text-slate-500 font-bold border-b"><th class="pb-2">Hop Name</th><th>Source Owner</th><th>Legal Basis</th><th>Freq</th><th>Logic</th><th></th></tr></thead><tbody id="hop-tbody"></tbody></table></div>
                </div>

                <!-- P4: Quality -->
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <h2 class="text-lg font-bold text-slate-800 md:col-span-2">2. Data Quality Report</h2>
                    <div><label class="block text-sm font-semibold mb-2">Completeness</label><input type="text" id="q-comp" class="p4-input w-full border rounded p-2 text-sm" value="\${state4.quality.completeness}"></div>
                    <div><label class="block text-sm font-semibold mb-2">Representativeness</label><input type="text" id="q-rep" class="p4-input w-full border rounded p-2 text-sm" value="\${state4.quality.representativeness}"></div>
                    <div><label class="block text-sm font-semibold mb-2">Accuracy & Consist.</label><input type="text" id="q-acc" class="p4-input w-full border rounded p-2 text-sm" value="\${state4.quality.accuracy}"></div>
                    <div><label class="block text-sm font-semibold mb-2">Drift Baselines</label><input type="text" id="q-drift" class="p4-input w-full border rounded p-2 text-sm" value="\${state4.quality.drift}"></div>
                    <div><label class="block text-sm font-semibold mb-2">Validation Signature</label><input type="text" id="q-sign" class="p4-input w-full border rounded p-2 text-sm" value="\${state4.quality.signatureName}"></div>
                    <div><label class="block text-sm font-semibold mb-2">Signature Date</label><input type="date" id="q-date" class="p4-input w-full border rounded p-2 text-sm" value="\${state4.quality.signatureDate}"></div>
                </div>

                <!-- P4: Triage Worksheet -->
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div class="bg-slate-50 p-6 border-b"><h2 class="text-lg font-bold text-slate-800">3. AI Triage & Classification Worksheet</h2><p class="text-xs text-slate-500">Auto-suggests EU AI Act Tiers</p></div>
                    <div class="overflow-x-auto"><table class="w-full text-sm text-center"><thead><tr class="bg-white border-b"><th class="p-3 text-left">Asset</th><th>Safety Component?</th><th>Fund. Rights?</th><th>Biometric ID?</th><th>Final Classification</th></tr></thead><tbody id="triage-tbody" class="divide-y"></tbody></table></div>
                </div>

                <!-- P4: ETL Log -->
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <h2 class="text-lg font-bold text-slate-800 md:col-span-2">4. ETL Governance Log</h2>
                    <div><label class="block text-sm font-semibold mb-2">Script Version (Link)</label><input type="text" id="etl-script" class="p4-input w-full border rounded p-2 text-sm" value="\${state4.etl.script}"></div>
                    <div><label class="block text-sm font-semibold mb-2">Storage Location</label><input type="text" id="etl-storage" class="p4-input w-full border rounded p-2 text-sm" value="\${state4.etl.storage}"></div>
                    <div class="md:col-span-2"><label class="block text-sm font-semibold mb-2">Automated Gates</label><textarea id="etl-gates" class="p4-input w-full border rounded p-2 text-sm" rows="2">\${state4.etl.gates}</textarea></div>
                    <div class="md:col-span-2"><label class="block text-sm font-semibold mb-2">Access Logs</label><textarea id="etl-access" class="p4-input w-full border rounded p-2 text-sm" rows="2">\${state4.etl.access}</textarea></div>
                </div>
            </div>

            <!-- P4 Sidebar -->
            <div class="xl:col-span-1"><div class="glass-card rounded-2xl border shadow-sm p-6 sticky top-24"><h3 class="font-bold border-b pb-3 mb-4">Phase 4 Summary</h3><div class="space-y-4 mb-6"><div class="flex justify-between text-sm"><span>Lineage</span><span id="sum4-lineage"></span></div><div class="flex justify-between text-sm"><span>Quality Rep</span><span id="sum4-qual"></span></div><div class="flex justify-between text-sm"><span>Triaged Models</span><span id="sum4-triage"></span></div><div class="flex justify-between text-sm"><span>ETL Logged</span><span id="sum4-etl"></span></div><div class="flex justify-between text-sm pt-3 border-t"><span class="font-bold">Status</span><span id="sum4-status"></span></div></div><button id="btn-complete-4" class="w-full px-4 py-2 bg-purple-600 text-white text-sm font-bold rounded-lg mb-3">Complete</button><button id="btn-download-4" class="w-full px-4 py-2 border rounded-lg text-sm font-bold">Download JSON</button></div></div>
        </div>
    </div>
    \`;
}

export function getPhase5Template(state5) {
    return \`
    <div id="phase5-pane" class="tab-pane hidden">
        <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div class="xl:col-span-3 space-y-8">
                <!-- P5: Risk Register -->
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm p-6">
                    <div class="flex justify-between items-center mb-4"><h2 class="text-lg font-bold text-slate-800">1. AI Risk Register</h2><button id="btn-add-risk" class="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">Add Risk</button></div>
                    <div class="overflow-x-auto"><table class="w-full text-sm text-left"><thead><tr class="text-slate-500 font-bold border-b"><th class="pb-2">Risk ID</th><th>Model ID</th><th>Threat Category</th><th>Likelihood</th><th>Impact</th><th>Control/Mitigation</th><th>Owner</th><th></th></tr></thead><tbody id="risk-tbody"></tbody></table></div>
                </div>

                <!-- P5: AIAs -->
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden"><div class="bg-slate-50 p-6 border-b"><h2 class="text-lg font-bold text-slate-800">2. Algorithmic Impact Assessments (AIA)</h2></div><div id="aia-container" class="p-6 space-y-6"></div></div>

                <!-- P5: Model Cards -->
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden"><div class="bg-slate-50 p-6 border-b"><h2 class="text-lg font-bold text-slate-800">3. AI Model Cards</h2></div><div id="card-container" class="p-6 space-y-6"></div></div>

                <!-- P5: Robustness Reports -->
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden"><div class="bg-slate-50 p-6 border-b"><h2 class="text-lg font-bold text-slate-800">4. Robustness & Bias Reports</h2></div><div id="report-container" class="p-6 space-y-6"></div></div>
            </div>
            <!-- P5 Sidebar -->
            <div class="xl:col-span-1"><div class="glass-card rounded-2xl border shadow-sm p-6 sticky top-24"><h3 class="font-bold border-b pb-3 mb-4">Phase 5 Summary</h3><div class="space-y-4 mb-6"><div class="flex justify-between text-sm"><span>Risk Entries</span><span id="sum5-risks"></span></div><div class="flex justify-between text-sm"><span>AIAs</span><span id="sum5-aias"></span></div><div class="flex justify-between text-sm"><span>Model Cards</span><span id="sum5-cards"></span></div><div class="flex justify-between text-sm"><span>Test Reports</span><span id="sum5-reports"></span></div><div class="flex justify-between text-sm pt-3 border-t"><span class="font-bold">Status</span><span id="sum5-status"></span></div></div><button id="btn-complete-5" class="w-full px-4 py-2 bg-purple-600 text-white text-sm font-bold rounded-lg mb-3">Complete</button><button id="btn-download-5" class="w-full px-4 py-2 border rounded-lg text-sm font-bold">Download JSON</button></div></div>
        </div>
    </div>
    \`;
}

export function getPhase6Template(state6) {
    return \`
    <div id="phase6-pane" class="tab-pane hidden">
        <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div class="xl:col-span-3 space-y-8">
                <!-- P6: PMM Plan -->
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <h2 class="text-lg font-bold text-slate-800 md:col-span-2">1. Post-Market Monitoring (PMM) Plan</h2>
                    <div><label class="block text-sm font-semibold mb-2">Monitoring Metrics</label><textarea id="pmm-metrics" class="p6-input w-full border text-xs p-2 rounded" rows="3">\${state6.pmm.metrics}</textarea></div>
                    <div><label class="block text-sm font-semibold mb-2">Feedback Channels</label><textarea id="pmm-feedback" class="p6-input w-full border text-xs p-2 rounded" rows="3">\${state6.pmm.feedback}</textarea></div>
                    <div><label class="block text-sm font-semibold mb-2">Data Drift Detection</label><textarea id="pmm-drift" class="p6-input w-full border text-xs p-2 rounded" rows="3">\${state6.pmm.drift}</textarea></div>
                    <div><label class="block text-sm font-semibold mb-2">Logging Requirements</label><textarea id="pmm-log" class="p6-input w-full border text-xs p-2 rounded" rows="3">\${state6.pmm.log}</textarea></div>
                    <div class="md:col-span-2"><label class="block text-sm font-semibold mb-2">Review Cycle</label><input type="text" id="pmm-cycle" class="p6-input w-full border text-xs p-2 rounded" value="\${state6.pmm.cycle}"></div>
                </div>

                <!-- P6: Incidents -->
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div class="bg-slate-50 p-6 border-b flex justify-between items-center"><h2 class="text-lg font-bold text-slate-800">2. AI Incident & "Near-Miss" Log</h2><button id="btn-add-inc" class="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">Log Incident</button></div>
                    <div class="overflow-x-auto"><table class="w-full text-sm text-left"><thead><tr class="text-slate-500 font-bold border-b border-t"><th class="py-2 px-2">ID</th><th>Date/Time</th><th>Severity</th><th>Description</th><th>Root Cause</th><th>Remediation</th><th>Reg Trigger</th><th></th></tr></thead><tbody id="inc-tbody"></tbody></table></div>
                </div>

                <!-- P6: Retirement -->
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <h2 class="text-lg font-bold text-slate-800 md:col-span-2">3. Model Decommissioning & Retirement Plan</h2>
                    <div><label class="block text-sm font-semibold mb-2">Retirement Criteria</label><textarea id="ret-crit" class="p6-input w-full border text-xs p-2 rounded" rows="3">\${state6.retirement.criteria}</textarea></div>
                    <div><label class="block text-sm font-semibold mb-2">Data Archival Strategy</label><textarea id="ret-arch" class="p6-input w-full border text-xs p-2 rounded" rows="3">\${state6.retirement.archival}</textarea></div>
                    <div><label class="block text-sm font-semibold mb-2">User Transition Plan</label><textarea id="ret-trans" class="p6-input w-full border text-xs p-2 rounded" rows="3">\${state6.retirement.transition}</textarea></div>
                    <div><label class="block text-sm font-semibold mb-2">Environmental Impact</label><textarea id="ret-env" class="p6-input w-full border text-xs p-2 rounded" rows="3">\${state6.retirement.environmental}</textarea></div>
                </div>

                <!-- P6: Internal Audit -->
                <div class="glass-card rounded-2xl border border-slate-200 shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <h2 class="text-lg font-bold text-slate-800 md:col-span-2">4. AIMS Internal Audit & Management Review</h2>
                    <div><label class="block text-sm font-semibold mb-2">Executive Summary</label><textarea id="aud-exec" class="p6-input w-full border text-xs p-2 rounded" rows="3">\${state6.audit.execSum}</textarea></div>
                    <div><label class="block text-sm font-semibold mb-2">Non-Conformity Tracker</label><textarea id="aud-nonc" class="p6-input w-full border text-xs p-2 rounded" rows="3">\${state6.audit.nonconf}</textarea></div>
                    <div><label class="block text-sm font-semibold mb-2">Resource Adequacy</label><textarea id="aud-res" class="p6-input w-full border text-xs p-2 rounded" rows="3">\${state6.audit.adequacy}</textarea></div>
                    <div><label class="block text-sm font-semibold mb-2">Continuous Improvement Goals</label><textarea id="aud-goals" class="p6-input w-full border text-xs p-2 rounded" rows="3">\${state6.audit.goals}</textarea></div>
                </div>
            </div>
            
            <!-- P6 Sidebar -->
            <div class="xl:col-span-1"><div class="glass-card rounded-2xl border shadow-sm p-6 sticky top-24"><h3 class="font-bold border-b pb-3 mb-4">Phase 6 Summary</h3><div class="space-y-4 mb-6"><div class="flex justify-between text-sm"><span>PMM Plan</span><span id="sum6-pmm"></span></div><div class="flex justify-between text-sm"><span>Incidents</span><span id="sum6-inc"></span></div><div class="flex justify-between text-sm"><span>Retirement</span><span id="sum6-ret"></span></div><div class="flex justify-between text-sm"><span>Internal Audit</span><span id="sum6-aud"></span></div><div class="flex justify-between text-sm pt-3 border-t"><span class="font-bold">Status</span><span id="sum6-status"></span></div></div><button id="btn-complete-6" class="w-full px-4 py-2 bg-purple-600 text-white text-sm font-bold rounded-lg mb-3">Complete</button><button id="btn-download-6" class="w-full px-4 py-2 border rounded-lg text-sm font-bold">Download JSON</button></div></div>
        </div>
    </div>
    \`;
}
