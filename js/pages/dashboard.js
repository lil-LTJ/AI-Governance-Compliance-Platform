import { loadPhase1Data, savePhase1Data, loadPhase2Data, savePhase2Data, loadPhase3Data, savePhase3Data, loadPhase4Data, savePhase4Data, loadPhase5Data, savePhase5Data, loadPhase6Data, savePhase6Data } from '../storage.js';
import { getPhase1Template, getPhase2Template, getPhase3Template, getPhase4Template, getPhase5Template, getPhase6Template } from './dashboard-templates.js';

export function renderDashboard(container) {
    // 1. Initialize States
    let state1 = loadPhase1Data() || {
        mandate: { filename: '', title: '', version: '', date: '', authority: '', purpose: '', owner: '', authorities: [], commitments: '' },
        assets: [],
        risk: { quant: '', qual: '', financial: '' },
        scope: { inScope: '', outScope: '', geography: '', boundaries: '' },
        completed: false
    };

    let state2 = loadPhase2Data() || {
        lead: { accountability: '', responsibilities: [], authorities: [], kpis: '' },
        committee: { purpose: '', membership: [], cadence: '', quorum: '', escalation: '' },
        raci: [
            { id: 'r1', activity: 'Asset Register Update', aims: '', ds: '', legal: '', ciso: '', pm: '' },
            { id: 'r2', activity: 'Bias Testing', aims: '', ds: '', legal: '', ciso: '', pm: '' },
            { id: 'r3', activity: 'Privacy Impact (DPIA)', aims: '', ds: '', legal: '', ciso: '', pm: '' },
            { id: 'r4', activity: 'Model Decommissioning', aims: '', ds: '', legal: '', ciso: '', pm: '' }
        ],
        letters: {},
        completed: false
    };

    let state3 = loadPhase3Data() || {
        ethics: { statement: '', fairness: '', transparency: '', oversight: '', prohibited: '', nonNegotiable: '' },
        risk: { framework: '', matrix: '', treatments: [], reassessment: '', regulatory: '' },
        dataGov: { lineage: '', quality: '', pbd: '', bias: '', ip: '' },
        tracker: [
            { id: 't1', section: 'Data Privacy', iso: 'ISO-A.7', eu: 'EU-ART-10', controlId: 'GDPR-ART-5' },
            { id: 't2', section: 'Human Oversight', iso: 'ISO-A.9', eu: 'EU-ART-14', controlId: 'NIST-MEAS-2' },
            { id: 't3', section: 'Bias & Fairness', iso: 'ISO-A.5', eu: 'EU-ART-15', controlId: 'NIST-MEAS-2' }
        ],
        completed: false
    };

    let state4 = loadPhase4Data() || {
        lineage: { flow: '', hops: [] },
        quality: { completeness: '', representativeness: '', accuracy: '', drift: '', signatureName: '', signatureDate: '' },
        triage: {}, // map of asset id -> { safety: false, rights: false, biometric: false, classification: '' }
        etl: { script: '', gates: '', access: '', storage: '' },
        completed: false
    };

    let state5 = loadPhase5Data() || {
        risks: [],
        aias: {},
        cards: {},
        reports: {},
        completed: false
    };

    let state6 = loadPhase6Data() || {
        pmm: { metrics: '', feedback: '', drift: '', log: '', cycle: '' },
        incidents: [],
        retirement: { criteria: '', archival: '', transition: '', environmental: '' },
        audit: { execSum: '', nonconf: '', adequacy: '', goals: '' },
        completed: false
    };

    // 2. Render Shell
    container.innerHTML = `
        <div class="w-full max-w-[90rem] mx-auto fade-in pt-6 pb-20 h-full flex flex-col px-4">
            <div class="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200">
                <div><h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 flex items-center gap-3"><div class="p-2 bg-purple-100 text-purple-700 rounded-lg"><svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div>Implementation Dashboard</h1></div>
                <div><button id="btn-save-all" class="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 shadow-sm flex items-center gap-2"><svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>Save All</button></div>
            </div>
            <div class="flex space-x-2 border-b border-slate-200 mb-8 overflow-x-auto p-1 scrollbar-hide">
                <button class="tab-btn px-4 py-2 text-sm font-bold text-purple-700 border-b-2 border-purple-700 whitespace-nowrap" data-target="phase1-pane">Phase 1: Kickoff</button>
                <button class="tab-btn px-4 py-2 text-sm font-bold text-slate-500 border-b-2 border-transparent hover:text-slate-700 whitespace-nowrap" data-target="phase2-pane">Phase 2: Governance</button>
                <button class="tab-btn px-4 py-2 text-sm font-bold text-slate-500 border-b-2 border-transparent hover:text-slate-700 whitespace-nowrap" data-target="phase3-pane">Phase 3: Policy</button>
                <button class="tab-btn px-4 py-2 text-sm font-bold text-slate-500 border-b-2 border-transparent hover:text-slate-700 whitespace-nowrap" data-target="phase4-pane">Phase 4: Triage & Lineage</button>
                <button class="tab-btn px-4 py-2 text-sm font-bold text-slate-500 border-b-2 border-transparent hover:text-slate-700 whitespace-nowrap" data-target="phase5-pane">Phase 5: Risks & Models</button>
                <button class="tab-btn px-4 py-2 text-sm font-bold text-slate-500 border-b-2 border-transparent hover:text-slate-700 whitespace-nowrap" data-target="phase6-pane">Phase 6: CI & Culture</button>
            </div>
            ${getPhase1Template(state1)}
            ${getPhase2Template(state2)}
            ${getPhase3Template(state3)}
            ${getPhase4Template(state4)}
            ${getPhase5Template(state5)}
            ${getPhase6Template(state6)}
        </div>
    `;

    // --- Tab Logic ---
    const tabBtns = container.querySelectorAll('.tab-btn');
    const tabPanes = container.querySelectorAll('.tab-pane');

    const activateTab = (targetId) => {
        tabBtns.forEach(b => { b.classList.remove('text-purple-700','border-purple-700'); b.classList.add('text-slate-500','border-transparent'); });
        tabPanes.forEach(p => { p.classList.remove('block'); p.classList.add('hidden'); });
        const matchBtn = container.querySelector(`.tab-btn[data-target="${targetId}"]`);
        if (matchBtn) { matchBtn.classList.add('text-purple-700','border-purple-700'); matchBtn.classList.remove('text-slate-500','border-transparent'); }
        const pane = document.getElementById(targetId);
        if (pane) { pane.classList.remove('hidden'); pane.classList.add('block'); }
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => activateTab(btn.getAttribute('data-target')));
    });

    // Deep-link from Controls Mapping: if dashMountTab is set, switch to that phase
    const mountTab = localStorage.getItem('dashMountTab');
    if (mountTab) {
        activateTab(mountTab);
        localStorage.removeItem('dashMountTab');
        // Scroll to top and flash a contextual banner
        container.scrollIntoView({ behavior: 'smooth' });
        const banner = document.createElement('div');
        banner.className = 'fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-indigo-600 text-white text-sm font-bold px-6 py-3 rounded-full shadow-xl animate-bounce';
        banner.textContent = '📋 Fill in this section to generate your missing evidence artifact ↓';
        document.body.appendChild(banner);
        setTimeout(() => banner.remove(), 4000);
    }

    // --- PDF Generation Helper ---
    const generatePhasePDF = (phaseLabel, rows) => {
        if (!window.jspdf) { alert('PDF library not loaded. Please refresh the page.'); return; }
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ unit: 'pt', format: 'a4' });
        const margin = 50; let y = margin;
        const companyData = JSON.parse(localStorage.getItem('companyData')) || {};
        const companyName = companyData.companyName || 'Organisation';

        // Header
        doc.setFillColor(67, 56, 202);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 70, 'F');
        doc.setTextColor(255,255,255);
        doc.setFontSize(18); doc.setFont('helvetica','bold');
        doc.text(`${companyName} — AI Governance`, margin, 30);
        doc.setFontSize(13); doc.setFont('helvetica','normal');
        doc.text(`${phaseLabel} Artifact`, margin, 50);
        doc.setFontSize(9);
        doc.text(`Generated: ${new Date().toLocaleDateString('en-GB', {day:'2-digit',month:'long',year:'numeric'})}`, margin, 64);

        y = 90;
        doc.setTextColor(30,30,30);

        rows.forEach(({ label, value }) => {
            if (!value || value.toString().trim() === '') return;
            if (y > 750) { doc.addPage(); y = margin; }
            doc.setFontSize(9); doc.setFont('helvetica','bold'); doc.setTextColor(67,56,202);
            doc.text(label.toUpperCase(), margin, y); y += 14;
            doc.setFont('helvetica','normal'); doc.setTextColor(40,40,40); doc.setFontSize(10);
            const lines = doc.splitTextToSize(value.toString(), doc.internal.pageSize.getWidth() - margin*2);
            lines.forEach(line => {
                if (y > 760) { doc.addPage(); y = margin; }
                doc.text(line, margin, y); y += 14;
            });
            y += 6;
            doc.setDrawColor(220,220,220); doc.line(margin, y, doc.internal.pageSize.getWidth()-margin, y); y += 10;
        });

        // Footer
        const total = doc.internal.getNumberOfPages();
        for (let i = 1; i <= total; i++) {
            doc.setPage(i);
            doc.setFontSize(8); doc.setTextColor(150,150,150);
            doc.text(`${companyName} | ${phaseLabel} | Page ${i} of ${total} | AI Governance Compliance Platform`, margin, doc.internal.pageSize.getHeight()-20);
        }

        const fileName = `${phaseLabel.replace(/\s+/g,'-').replace(/:/g,'')}.pdf`;
        doc.save(fileName);
    };

    const boolUI = (bool) => `px-2 py-0.5 rounded-md text-xs font-bold ${bool?'bg-green-100 text-green-700':'bg-slate-100 text-slate-500'}`;

    const renderAssets1 = () => {
        const tbody1 = document.getElementById('asset-tbody');
        const empty1 = document.getElementById('empty-assets');
        if(state1.assets.length === 0){tbody1.innerHTML='';empty1.classList.remove('hidden');}
        else{empty1.classList.add('hidden');
            tbody1.innerHTML = state1.assets.map((a,i)=>`<tr><td class="px-2 py-1"><input type="text" class="p1-asset p1-input w-full text-xs border-slate-200 p-1" data-idx="${i}" data-field="id" value="${a.id||''}"></td><td class="px-2 py-1"><input type="text" class="p1-asset p1-input w-full text-xs border-slate-200 p-1" data-idx="${i}" data-field="name" value="${a.name||''}"></td><td class="px-2 py-1"><input type="text" class="p1-asset p1-input w-full text-xs border-slate-200 p-1" data-idx="${i}" data-field="purpose" value="${a.purpose||''}"></td><td class="px-2 py-1"><select class="p1-asset p1-input w-full text-xs border-slate-200 p-1" data-idx="${i}" data-field="stack"><option value=""></option><option value="API" ${a.stack==='API'?'selected':''}>API</option><option value="In-house" ${a.stack==='In-house'?'selected':''}>In-house</option><option value="Both" ${a.stack==='Both'?'selected':''}>Both</option></select></td><td class="px-2 py-1"><input type="text" class="p1-asset p1-input w-full text-xs border-slate-200 p-1" data-idx="${i}" data-field="sponsor" value="${a.sponsor||''}"></td><td class="px-2 py-1"><input type="text" class="p1-asset p1-input w-full text-xs border-slate-200 p-1" data-idx="${i}" data-field="steward" value="${a.steward||''}"></td><td class="px-2 py-1"><select class="p1-asset p1-input w-full text-xs border-slate-200 p-1" data-idx="${i}" data-field="tier"><option value=""></option><option value="Unacceptable" ${a.tier==='Unacceptable'?'selected':''}>Unacceptable</option><option value="High" ${a.tier==='High'?'selected':''}>High</option><option value="Limited" ${a.tier==='Limited'?'selected':''}>Limited</option></select></td><td class="px-2 py-1 text-right"><button class="del-a text-red-500 font-bold text-xs" data-idx="${i}">X</button></td></tr>`).join('');
        }
    };

    const renderRACI = () => document.getElementById('raci-tbody').innerHTML = state2.raci.map((r,i) => `<tr><td class="px-4 py-2 font-medium text-slate-700">${r.activity}</td>${['aims','ds','legal','ciso','pm'].map(role=> `<td class="px-4 py-2"><select class="raci-sel p2-input w-full text-xs rounded border-slate-200 p-1 bg-white" data-idx="${i}" data-role="${role}"><option value=""></option><option value="R" ${r[role]==='R'?'selected':''}>R</option><option value="A" ${r[role]==='A'?'selected':''}>A</option><option value="C" ${r[role]==='C'?'selected':''}>C</option><option value="I" ${r[role]==='I'?'selected':''}>I</option></select></td>`).join('')}</tr>`).join('');

    const renderLetters = () => {
        const lc=document.getElementById('letters-container');
        if(state1.assets.length===0){lc.innerHTML='<div class="text-sm text-yellow-700 p-4">No assets.</div>';return;}
        lc.innerHTML = state1.assets.map(a => {
            const id=a.id||'Unknown';const n=a.name||'Unnamed';
            if(!state2.letters[id]) state2.letters[id]={spName:a.sponsor||'',stName:a.steward||'',spFile:'',stFile:''};
            const ld = state2.letters[id];
            return `<div class="border border-slate-200 rounded p-4 bg-white"><h4 class="font-bold text-sm mb-3">${id}: ${n}</h4><div class="grid grid-cols-2 gap-4"><div class="p-2 bg-slate-50"><span class="text-xs block mb-1">Bus. Sponsor (${ld.spName})</span><span class="text-xs bg-slate-200 px-2 py-1 rounded cursor-pointer p2-l-upload">Upload<input type="file" class="hidden" data-asset="${id}" data-type="sp"></span><span class="text-xs ml-2">${ld.spFile||''}</span></div><div class="p-2 bg-slate-50"><span class="text-xs block mb-1">Tech Steward (${ld.stName})</span><span class="text-xs bg-slate-200 px-2 py-1 rounded cursor-pointer p2-l-upload">Upload<input type="file" class="hidden" data-asset="${id}" data-type="st"></span><span class="text-xs ml-2">${ld.stFile||''}</span></div></div></div>`;
        }).join('');
    };

    const renderTracker3 = () => document.getElementById('track-tbody').innerHTML = state3.tracker.map((t,i) => `<tr><td class="px-4 py-2"><input type="text" class="p3-track p3-input w-full text-xs border border-slate-200 rounded p-1" data-idx="${i}" data-field="section" value="${t.section}"></td><td class="px-4 py-2"><input type="text" class="p3-track p3-input w-full text-xs border border-slate-200 rounded p-1" data-idx="${i}" data-field="iso" value="${t.iso}"></td><td class="px-4 py-2"><input type="text" class="p3-track p3-input w-full text-xs border border-slate-200 rounded p-1" data-idx="${i}" data-field="eu" value="${t.eu}"></td><td class="px-4 py-2"><input type="text" class="p3-track p3-input w-full text-xs border border-slate-200 rounded p-1" data-idx="${i}" data-field="controlId" value="${t.controlId}"></td><td class="px-4 py-2 text-right"><button class="del-t text-red-500 font-bold text-xs" data-idx="${i}">X</button></td></tr>`).join('');

    const renderHops4 = () => document.getElementById('hop-tbody').innerHTML = state4.lineage.hops.map((h,i) => `<tr><td class="px-2 py-1"><input type="text" class="p4-hop p4-input w-full text-xs border-slate-200 p-1" data-idx="${i}" data-field="name" value="${h.name}"></td><td class="px-2 py-1"><input type="text" class="p4-hop p4-input w-full text-xs border-slate-200 p-1" data-idx="${i}" data-field="owner" value="${h.owner}"></td><td class="px-2 py-1"><input type="text" class="p4-hop p4-input w-full text-xs border-slate-200 p-1" data-idx="${i}" data-field="basis" value="${h.basis}"></td><td class="px-2 py-1"><input type="text" class="p4-hop p4-input w-full text-xs border-slate-200 p-1" data-idx="${i}" data-field="freq" value="${h.freq}"></td><td class="px-2 py-1"><input type="text" class="p4-hop p4-input w-full text-xs border-slate-200 p-1" data-idx="${i}" data-field="logic" value="${h.logic}"></td><td class="px-2 py-1 text-right"><button class="del-hop text-red-500 font-bold text-xs" data-idx="${i}">X</button></td></tr>`).join('');

    const renderTriage4 = () => {
        const tc = document.getElementById('triage-tbody');
        if(state1.assets.length === 0){ tc.innerHTML = '<tr><td colspan="5" class="py-4 text-center text-sm text-yellow-700">No assets registered in Phase 1.</td></tr>'; return; }
        tc.innerHTML = state1.assets.map(a => {
            const id = a.id || 'Unknown';
            if(!state4.triage[id]) state4.triage[id] = { safety: false, rights: false, biometric: false, classification: '' };
            const t = state4.triage[id];
            
            // Auto Suggest Classification
            let sugg = 'Minimal';
            if(t.biometric || t.safety || t.rights) sugg = 'High';
            if(t.biometric && t.safety) sugg = 'Unacceptable'; // Just a conceptual rule
            if(!t.classification) t.classification = sugg;

            return `<tr>
                <td class="px-4 py-2 text-sm font-medium">${id}: ${a.name}</td>
                <td class="px-4 py-2"><input type="checkbox" class="triage-cb p4-input" data-asset="${id}" data-field="safety" ${t.safety?'checked':''}></td>
                <td class="px-4 py-2"><input type="checkbox" class="triage-cb p4-input" data-asset="${id}" data-field="rights" ${t.rights?'checked':''}></td>
                <td class="px-4 py-2"><input type="checkbox" class="triage-cb p4-input" data-asset="${id}" data-field="biometric" ${t.biometric?'checked':''}></td>
                <td class="px-4 py-2"><select class="triage-sel p4-input text-sm border-slate-200 rounded p-1" data-asset="${id}">
                    <option value="Minimal" ${t.classification==='Minimal'?'selected':''}>Minimal</option>
                    <option value="Limited" ${t.classification==='Limited'?'selected':''}>Limited</option>
                    <option value="High" ${t.classification==='High'?'selected':''}>High</option>
                    <option value="Unacceptable" ${t.classification==='Unacceptable'?'selected':''}>Unacceptable</option>
                </select></td>
            </tr>`;
        }).join('');
    };

    const renderRisks5 = () => {
        const rc = document.getElementById('risk-tbody');
        if (state5.risks.length === 0) { rc.innerHTML = '<tr><td colspan="8" class="py-4 text-center text-sm text-slate-500">No risks documented.</td></tr>'; return; }
        rc.innerHTML = state5.risks.map((r, i) => `<tr>
            <td class="px-2 py-1"><input type="text" class="p5-risk p5-input w-full text-xs border border-slate-200 rounded p-1" data-idx="${i}" data-field="id" value="${r.id||''}"></td>
            <td class="px-2 py-1"><select class="p5-risk p5-input w-full text-xs border border-slate-200 rounded p-1" data-idx="${i}" data-field="modelId"><option value=""></option>${state1.assets.map(a=>`<option value="${a.id}" ${r.modelId===a.id?'selected':''}>${a.id}</option>`).join('')}</select></td>
            <td class="px-2 py-1"><input type="text" class="p5-risk p5-input w-full text-xs border border-slate-200 rounded p-1" data-idx="${i}" data-field="threat" value="${r.threat||''}"></td>
            <td class="px-2 py-1"><select class="p5-risk p5-input w-full text-xs border border-slate-200 rounded p-1" data-idx="${i}" data-field="likelihood"><option value="1" ${r.likelihood==='1'?'selected':''}>1</option><option value="2" ${r.likelihood==='2'?'selected':''}>2</option><option value="3" ${r.likelihood==='3'?'selected':''}>3</option><option value="4" ${r.likelihood==='4'?'selected':''}>4</option><option value="5" ${r.likelihood==='5'?'selected':''}>5</option></select></td>
            <td class="px-2 py-1"><select class="p5-risk p5-input w-full text-xs border border-slate-200 rounded p-1" data-idx="${i}" data-field="impact"><option value="1" ${r.impact==='1'?'selected':''}>1</option><option value="2" ${r.impact==='2'?'selected':''}>2</option><option value="3" ${r.impact==='3'?'selected':''}>3</option><option value="4" ${r.impact==='4'?'selected':''}>4</option><option value="5" ${r.impact==='5'?'selected':''}>5</option></select></td>
            <td class="px-2 py-1"><input type="text" class="p5-risk p5-input w-full text-xs border border-slate-200 rounded p-1" data-idx="${i}" data-field="mitigation" value="${r.mitigation||''}"></td>
            <td class="px-2 py-1"><input type="text" class="p5-risk p5-input w-full text-xs border border-slate-200 rounded p-1" data-idx="${i}" data-field="owner" value="${r.owner||''}"></td>
            <td class="px-2 py-1 text-right"><button class="del-r text-red-500 font-bold text-xs" data-idx="${i}">X</button></td>
        </tr>`).join('');
    };

    const renderAIAs5 = () => {
        const ac = document.getElementById('aia-container');
        if (state1.assets.length === 0) { ac.innerHTML = '<div class="text-sm text-slate-500 p-4">No models found in Phase 1 Asset Register.</div>'; return; }
        ac.innerHTML = state1.assets.map(a => {
            const id = a.id || 'Unknown';
            if (!state5.aias[id]) state5.aias[id] = { desc: '', stakeholders: '', harms: '', mit: '', residual: '' };
            const m = state5.aias[id];
            return `<div class="border rounded p-4 bg-white"><h4 class="font-bold text-sm mb-3">Model AIA: ${id}</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="md:col-span-2"><label class="text-xs font-semibold">System Description</label><textarea class="p5-aia p5-input w-full border text-xs p-2 rounded" rows="2" data-asset="${id}" data-field="desc">${m.desc}</textarea></div>
                    <div><label class="text-xs font-semibold">Stakeholders</label><textarea class="p5-aia p5-input w-full border text-xs p-2 rounded" rows="2" data-asset="${id}" data-field="stakeholders">${m.stakeholders}</textarea></div>
                    <div><label class="text-xs font-semibold">Harm Identifications</label><textarea class="p5-aia p5-input w-full border text-xs p-2 rounded" rows="2" data-asset="${id}" data-field="harms">${m.harms}</textarea></div>
                    <div><label class="text-xs font-semibold">Mitigation Strategy</label><textarea class="p5-aia p5-input w-full border text-xs p-2 rounded" rows="2" data-asset="${id}" data-field="mit">${m.mit}</textarea></div>
                    <div><label class="text-xs font-semibold">Residual Risk</label><textarea class="p5-aia p5-input w-full border text-xs p-2 rounded" rows="2" data-asset="${id}" data-field="residual">${m.residual}</textarea></div>
                </div></div>`;
        }).join('');
    };

    const renderCards5 = () => {
        const cc = document.getElementById('card-container');
        if (state1.assets.length === 0) { cc.innerHTML = '<div class="text-sm text-slate-500 p-4">No models found in Asset Register.</div>'; return; }
        cc.innerHTML = state1.assets.map(a => {
            const id = a.id || 'Unknown';
            if (!state5.cards[id]) state5.cards[id] = { version: '', developer: '', date: '', intended: '', outOfScope: '', factors: '', metrics: '', limitations: '' };
            const m = state5.cards[id];
            return `<div class="border rounded p-4 bg-white"><h4 class="font-bold text-sm mb-3">Model Card: ${id}</h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div><label class="text-xs font-semibold">Version</label><input type="text" class="p5-card p5-input w-full border text-xs p-1 rounded" data-asset="${id}" data-field="version" value="${m.version}"></div>
                    <div><label class="text-xs font-semibold">Developer</label><input type="text" class="p5-card p5-input w-full border text-xs p-1 rounded" data-asset="${id}" data-field="developer" value="${m.developer}"></div>
                    <div><label class="text-xs font-semibold">Release Date</label><input type="date" class="p5-card p5-input w-full border text-xs p-1 rounded" data-asset="${id}" data-field="date" value="${m.date}"></div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label class="text-xs font-semibold">Intended Use</label><textarea class="p5-card p5-input w-full border text-xs p-2 rounded" rows="2" data-asset="${id}" data-field="intended">${m.intended}</textarea></div>
                    <div><label class="text-xs font-semibold">Out-of-Scope Use</label><textarea class="p5-card p5-input w-full border text-xs p-2 rounded" rows="2" data-asset="${id}" data-field="outOfScope">${m.outOfScope}</textarea></div>
                    <div><label class="text-xs font-semibold">Factors Considered</label><textarea class="p5-card p5-input w-full border text-xs p-2 rounded" rows="2" data-asset="${id}" data-field="factors">${m.factors}</textarea></div>
                    <div><label class="text-xs font-semibold">Performance Metrics</label><textarea class="p5-card p5-input w-full border text-xs p-2 rounded" rows="2" data-asset="${id}" data-field="metrics">${m.metrics}</textarea></div>
                    <div class="md:col-span-2"><label class="text-xs font-semibold">Limitations & Biases</label><textarea class="p5-card p5-input w-full border text-xs p-2 rounded" rows="2" data-asset="${id}" data-field="limitations">${m.limitations}</textarea></div>
                </div></div>`;
        }).join('');
    };

    const renderReports5 = () => {
        const rr = document.getElementById('report-container');
        if (state1.assets.length === 0) { rr.innerHTML = '<div class="text-sm text-slate-500 p-4">No models found in Asset Register.</div>'; return; }
        rr.innerHTML = state1.assets.map(a => {
            const id = a.id || 'Unknown';
            if (!state5.reports[id]) state5.reports[id] = { method: '', bias: '', robust: '', explain: '' };
            const m = state5.reports[id];
            return `<div class="border rounded p-4 bg-white"><h4 class="font-bold text-sm mb-3">Model Report: ${id}</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label class="text-xs font-semibold">Testing Methodology (e.g. LIME/SHAP)</label><textarea class="p5-rep p5-input w-full border text-xs p-2 rounded" rows="2" data-asset="${id}" data-field="method">${m.method}</textarea></div>
                    <div><label class="text-xs font-semibold">Bias Metrics (e.g. Disparate Impact Ratio)</label><textarea class="p5-rep p5-input w-full border text-xs p-2 rounded" rows="2" data-asset="${id}" data-field="bias">${m.bias}</textarea></div>
                    <div><label class="text-xs font-semibold">Robustness Score</label><input type="text" class="p5-rep p5-input w-full border text-xs p-2 rounded" data-asset="${id}" data-field="robust" value="${m.robust}"></div>
                    <div><label class="text-xs font-semibold">Explainability Audit</label><textarea class="p5-rep p5-input w-full border text-xs p-2 rounded" rows="2" data-asset="${id}" data-field="explain">${m.explain}</textarea></div>
                </div></div>`;
        }).join('');
    };

    const renderIncidents6 = () => {
        const ic = document.getElementById('inc-tbody');
        if (state6.incidents.length === 0) { ic.innerHTML = '<tr><td colspan="8" class="py-4 text-center text-sm text-slate-500">No incidents logged.</td></tr>'; return; }
        ic.innerHTML = state6.incidents.map((t, i) => `<tr>
            <td class="px-2 py-1"><input type="text" class="p6-inc p6-input w-full text-xs border border-slate-200 rounded p-1" data-idx="${i}" data-field="id" value="${t.id||''}"></td>
            <td class="px-2 py-1"><input type="datetime-local" class="p6-inc p6-input w-full text-xs border border-slate-200 rounded p-1" data-idx="${i}" data-field="dt" value="${t.dt||''}"></td>
            <td class="px-2 py-1"><select class="p6-inc p6-input w-full text-xs border border-slate-200 rounded p-1" data-idx="${i}" data-field="sev"><option value="4" ${t.sev==='4'?'selected':''}>4-Low</option><option value="3" ${t.sev==='3'?'selected':''}>3-Med</option><option value="2" ${t.sev==='2'?'selected':''}>2-High</option><option value="1" ${t.sev==='1'?'selected':''}>1-Crit</option></select></td>
            <td class="px-2 py-1"><input type="text" class="p6-inc p6-input w-full text-xs border border-slate-200 rounded p-1" data-idx="${i}" data-field="desc" value="${t.desc||''}"></td>
            <td class="px-2 py-1"><input type="text" class="p6-inc p6-input w-full text-xs border border-slate-200 rounded p-1" data-idx="${i}" data-field="root" value="${t.root||''}"></td>
            <td class="px-2 py-1"><input type="text" class="p6-inc p6-input w-full text-xs border border-slate-200 rounded p-1" data-idx="${i}" data-field="rem" value="${t.rem||''}"></td>
            <td class="px-2 py-1 text-center"><input type="checkbox" class="p6-inc p6-input" data-idx="${i}" data-field="reg" ${t.reg?'checked':''}></td>
            <td class="px-2 py-1 text-right"><button class="del-inc text-red-500 font-bold text-xs" data-idx="${i}">X</button></td>
        </tr>`).join('');
    };

    const updateSummaries = () => {
        const hm=!!state1.mandate.filename; document.getElementById('sum1-mandate').textContent=hm?'Yes':'No'; document.getElementById('sum1-mandate').className=boolUI(hm);
        document.getElementById('sum1-assets').textContent=state1.assets.length;
        const hr1=!!state1.risk.quant; document.getElementById('sum1-risk').textContent=hr1?'Yes':'No'; document.getElementById('sum1-risk').className=boolUI(hr1);
        document.getElementById('sum1-status').textContent=state1.completed?'Completed':'In Progress'; document.getElementById('sum1-status').className=state1.completed?'px-2 py-1 rounded text-xs font-bold bg-purple-100 text-purple-700':'px-2 py-1 rounded text-xs font-bold bg-yellow-100 text-yellow-700';

        const hl2=!!state2.lead.accountability; document.getElementById('sum2-lead').textContent=hl2?'Yes':'No'; document.getElementById('sum2-lead').className=boolUI(hl2);
        const hc2=!!state2.committee.purpose; document.getElementById('sum2-comm').textContent=hc2?'Yes':'No'; document.getElementById('sum2-comm').className=boolUI(hc2);
        const hr2=state2.raci.some(r=>r.aims); document.getElementById('sum2-raci').textContent=hr2?'Yes':'No'; document.getElementById('sum2-raci').className=boolUI(hr2);
        document.getElementById('sum2-status').textContent=state2.completed?'Completed':'In Progress'; document.getElementById('sum2-status').className=state2.completed?'px-2 py-1 rounded text-xs font-bold bg-purple-100 text-purple-700':'px-2 py-1 rounded text-xs font-bold bg-yellow-100 text-yellow-700';

        const he3=!!state3.ethics.statement; document.getElementById('sum3-ethics').textContent=he3?'Yes':'No'; document.getElementById('sum3-ethics').className=boolUI(he3);
        const hk3=!!state3.risk.framework; document.getElementById('sum3-risk').textContent=hk3?'Yes':'No'; document.getElementById('sum3-risk').className=boolUI(hk3);
        const hd3=!!state3.dataGov.lineage; document.getElementById('sum3-data').textContent=hd3?'Yes':'No'; document.getElementById('sum3-data').className=boolUI(hd3);
        document.getElementById('sum3-track').textContent=state3.tracker.length;
        document.getElementById('sum3-status').textContent=state3.completed?'Completed':'In Progress'; document.getElementById('sum3-status').className=state3.completed?'px-2 py-1 rounded text-xs font-bold bg-purple-100 text-purple-700':'px-2 py-1 rounded text-xs font-bold bg-yellow-100 text-yellow-700';

        const hl4=!!state4.lineage.flow; document.getElementById('sum4-lineage').textContent=hl4?'Yes':'No'; document.getElementById('sum4-lineage').className=boolUI(hl4);
        const hq4=!!state4.quality.completeness; document.getElementById('sum4-qual').textContent=hq4?'Yes':'No'; document.getElementById('sum4-qual').className=boolUI(hq4);
        const ht4=Object.keys(state4.triage).length; document.getElementById('sum4-triage').textContent=ht4; document.getElementById('sum4-triage').className='px-2 py-0.5 rounded-md text-xs font-bold bg-blue-100 text-blue-700';
        const he4=!!state4.etl.script; document.getElementById('sum4-etl').textContent=he4?'Yes':'No'; document.getElementById('sum4-etl').className=boolUI(he4);
        document.getElementById('sum4-status').textContent=state4.completed?'Completed':'In Progress'; document.getElementById('sum4-status').className=state4.completed?'px-2 py-1 rounded text-xs font-bold bg-purple-100 text-purple-700':'px-2 py-1 rounded text-xs font-bold bg-yellow-100 text-yellow-700';

        document.getElementById('sum5-risks').textContent = state5.risks.length; document.getElementById('sum5-risks').className = 'px-2 py-0.5 rounded-md text-xs font-bold bg-blue-100 text-blue-700';
        document.getElementById('sum5-aias').textContent = Object.values(state5.aias).filter(x=>x.desc).length;
        document.getElementById('sum5-cards').textContent = Object.values(state5.cards).filter(x=>x.intended).length;
        document.getElementById('sum5-reports').textContent = Object.values(state5.reports).filter(x=>x.method).length;
        document.getElementById('sum5-status').textContent=state5.completed?'Completed':'In Progress'; document.getElementById('sum5-status').className=state5.completed?'px-2 py-1 rounded text-xs font-bold bg-purple-100 text-purple-700':'px-2 py-1 rounded text-xs font-bold bg-yellow-100 text-yellow-700';

        const hpmm=!!state6.pmm.metrics; document.getElementById('sum6-pmm').textContent=hpmm?'Yes':'No'; document.getElementById('sum6-pmm').className=boolUI(hpmm);
        document.getElementById('sum6-inc').textContent = state6.incidents.length; document.getElementById('sum6-inc').className = 'px-2 py-0.5 rounded-md text-xs font-bold bg-blue-100 text-blue-700';
        const hret=!!state6.retirement.criteria; document.getElementById('sum6-ret').textContent=hret?'Yes':'No'; document.getElementById('sum6-ret').className=boolUI(hret);
        const haud=!!state6.audit.execSum; document.getElementById('sum6-aud').textContent=haud?'Yes':'No'; document.getElementById('sum6-aud').className=boolUI(haud);
        document.getElementById('sum6-status').textContent=state6.completed?'Completed':'In Progress'; document.getElementById('sum6-status').className=state6.completed?'px-2 py-1 rounded text-xs font-bold bg-purple-100 text-purple-700':'px-2 py-1 rounded text-xs font-bold bg-yellow-100 text-yellow-700';
    };

    // --- State Extractors ---
    const commitP1 = () => {
        state1.mandate.title=document.getElementById('m-title').value; state1.mandate.version=document.getElementById('m-version').value; state1.mandate.date=document.getElementById('m-date').value; state1.mandate.authority=document.getElementById('m-authority').value; state1.mandate.owner=document.getElementById('m-owner').value; state1.mandate.purpose=document.getElementById('m-purpose').value; state1.mandate.commitments=document.getElementById('m-commitments').value;
        state1.mandate.authorities=Array.from(document.querySelectorAll('.auth-cb:checked')).map(c=>c.value);
        document.querySelectorAll('.p1-asset').forEach(i=>state1.assets[i.getAttribute('data-idx')][i.getAttribute('data-field')]=i.value);
        state1.risk.quant=document.getElementById('r-quant').value; state1.risk.qual=document.getElementById('r-qual').value; state1.risk.financial=document.getElementById('r-fin').value;
        state1.scope.inScope=document.getElementById('s-in').value; state1.scope.outScope=document.getElementById('s-out').value; state1.scope.geography=document.getElementById('s-geo').value; state1.scope.boundaries=document.getElementById('s-bound').value;
        updateSummaries();
    };

    const commitP2 = () => {
        state2.lead.accountability=document.getElementById('l-account').value; state2.lead.kpis=document.getElementById('l-kpi').value;
        state2.lead.responsibilities=Array.from(document.querySelectorAll('.l-resp-cb:checked')).map(c=>c.value);
        state2.lead.authorities=[document.getElementById('l-auth').value];
        state2.committee.purpose=document.getElementById('c-purpose').value; state2.committee.cadence=document.getElementById('c-cadence').value; state2.committee.quorum=document.getElementById('c-quorum').value; state2.committee.escalation=document.getElementById('c-esc').value;
        state2.committee.membership=Array.from(document.querySelectorAll('.c-member-cb:checked')).map(c=>c.value);
        document.querySelectorAll('.raci-sel').forEach(i=>state2.raci[i.getAttribute('data-idx')][i.getAttribute('data-role')]=i.value);
        updateSummaries();
    };

    const commitP3 = () => {
        state3.ethics.statement=document.getElementById('e-stmt').value; state3.ethics.fairness=document.getElementById('e-fair').value; state3.ethics.transparency=document.getElementById('e-trans').value; state3.ethics.oversight=document.getElementById('e-over').value; state3.ethics.prohibited=document.getElementById('e-probib').value; state3.ethics.nonNegotiable=document.getElementById('e-nonneg').value;
        state3.risk.framework=document.getElementById('k-frame').value; state3.risk.matrix=document.getElementById('k-matrix').value; state3.risk.reassessment=document.getElementById('k-reassess').value; state3.risk.regulatory=document.getElementById('k-reg').value;
        state3.risk.treatments=Array.from(document.querySelectorAll('.k-treat-cb:checked')).map(c=>c.value);
        state3.dataGov.lineage=document.getElementById('d-lineage').value; state3.dataGov.quality=document.getElementById('d-quality').value; state3.dataGov.pbd=document.getElementById('d-pbd').value; state3.dataGov.bias=document.getElementById('d-bias').value; state3.dataGov.ip=document.getElementById('d-ip').value;
        document.querySelectorAll('.p3-track').forEach(i=>state3.tracker[i.getAttribute('data-idx')][i.getAttribute('data-field')]=i.value);
        updateSummaries();
    };

    const commitP4 = () => {
        state4.lineage.flow = document.getElementById('i-flow').value;
        document.querySelectorAll('.p4-hop').forEach(i=>state4.lineage.hops[i.getAttribute('data-idx')][i.getAttribute('data-field')]=i.value);
        state4.quality.completeness = document.getElementById('q-comp').value; state4.quality.representativeness = document.getElementById('q-rep').value; state4.quality.accuracy = document.getElementById('q-acc').value; state4.quality.drift = document.getElementById('q-drift').value; state4.quality.signatureName = document.getElementById('q-sign').value; state4.quality.signatureDate = document.getElementById('q-date').value;
        document.querySelectorAll('.triage-cb').forEach(c => state4.triage[c.getAttribute('data-asset')][c.getAttribute('data-field')] = c.checked);
        document.querySelectorAll('.triage-sel').forEach(s => state4.triage[s.getAttribute('data-asset')].classification = s.value);
        state4.etl.script = document.getElementById('etl-script').value; state4.etl.gates = document.getElementById('etl-gates').value; state4.etl.access = document.getElementById('etl-access').value; state4.etl.storage = document.getElementById('etl-storage').value;
        
        renderTriage4(); // Re-render to show auto-calculated classifications
        updateSummaries();
    };

    const commitP5 = () => {
        document.querySelectorAll('.p5-risk').forEach(i => state5.risks[i.getAttribute('data-idx')][i.getAttribute('data-field')] = i.value);
        document.querySelectorAll('.p5-aia').forEach(i => state5.aias[i.getAttribute('data-asset')][i.getAttribute('data-field')] = i.value);
        document.querySelectorAll('.p5-card').forEach(i => state5.cards[i.getAttribute('data-asset')][i.getAttribute('data-field')] = i.value);
        document.querySelectorAll('.p5-rep').forEach(i => state5.reports[i.getAttribute('data-asset')][i.getAttribute('data-field')] = i.value);
        updateSummaries();
    };

    const commitP6 = () => {
        state6.pmm.metrics = document.getElementById('pmm-metrics').value; state6.pmm.feedback = document.getElementById('pmm-feedback').value; state6.pmm.drift = document.getElementById('pmm-drift').value; state6.pmm.log = document.getElementById('pmm-log').value; state6.pmm.cycle = document.getElementById('pmm-cycle').value;
        document.querySelectorAll('.p6-inc').forEach(i => { if(i.type==='checkbox') state6.incidents[i.getAttribute('data-idx')][i.getAttribute('data-field')] = i.checked; else state6.incidents[i.getAttribute('data-idx')][i.getAttribute('data-field')] = i.value; });
        state6.retirement.criteria = document.getElementById('ret-crit').value; state6.retirement.archival = document.getElementById('ret-arch').value; state6.retirement.transition = document.getElementById('ret-trans').value; state6.retirement.environmental = document.getElementById('ret-env').value;
        state6.audit.execSum = document.getElementById('aud-exec').value; state6.audit.nonconf = document.getElementById('aud-nonc').value; state6.audit.adequacy = document.getElementById('aud-res').value; state6.audit.goals = document.getElementById('aud-goals').value;
        updateSummaries();
    };

    // --- Action Listeners ---
    container.addEventListener('change', e => {
        if(e.target.classList.contains('p1-input')) commitP1();
        if(e.target.classList.contains('p2-input')) commitP2();
        if(e.target.classList.contains('p3-input')) commitP3();
        if(e.target.classList.contains('p4-input')) commitP4();
        if(e.target.classList.contains('p5-input')) commitP5();
        if(e.target.classList.contains('p6-input')) commitP6();
    });

    document.getElementById('btn-add-asset').addEventListener('click', () => { commitP1(); state1.assets.push({}); renderAssets1(); renderLetters(); renderTriage4(); });
    document.getElementById('btn-add-track').addEventListener('click', () => { commitP3(); state3.tracker.push({section:'',iso:'',eu:'',controlId:''}); renderTracker3(); });
    document.getElementById('btn-add-hop').addEventListener('click', () => { commitP4(); state4.lineage.hops.push({name:'',owner:'',basis:'',freq:'',logic:''}); renderHops4(); });
    document.getElementById('btn-add-risk').addEventListener('click', () => { commitP5(); state5.risks.push({id:'',modelId:'',threat:'',likelihood:'1',impact:'1',mitigation:'',owner:''}); renderRisks5(); });
    document.getElementById('btn-add-inc').addEventListener('click', () => { commitP6(); state6.incidents.push({id:'',dt:'',sev:'4',desc:'',root:'',rem:'',reg:false}); renderIncidents6(); });

    container.addEventListener('click', e => {
        if(e.target.closest('.del-a')){ commitP1(); state1.assets.splice(e.target.closest('.del-a').getAttribute('data-idx'),1); renderAssets1(); renderLetters(); renderTriage4(); }
        if(e.target.closest('.del-t')){ commitP3(); state3.tracker.splice(e.target.closest('.del-t').getAttribute('data-idx'),1); renderTracker3(); }
        if(e.target.closest('.del-hop')){ commitP4(); state4.lineage.hops.splice(e.target.closest('.del-hop').getAttribute('data-idx'),1); renderHops4(); }
        if(e.target.closest('.del-r')){ commitP5(); state5.risks.splice(e.target.closest('.del-r').getAttribute('data-idx'),1); renderRisks5(); }
        if(e.target.closest('.del-inc')){ commitP6(); state6.incidents.splice(e.target.closest('.del-inc').getAttribute('data-idx'),1); renderIncidents6(); }
    });

    document.getElementById('m-file').addEventListener('change', e => { if(e.target.files.length){state1.mandate.filename=e.target.files[0].name; document.getElementById('m-filename').textContent=e.target.files[0].name; commitP1();} });
    container.addEventListener('change', e => {
        if(e.target.matches('.p2-l-upload input[type="file"]')){
            if(!e.target.files.length) return;
            const asset=e.target.getAttribute('data-asset'); const type=e.target.getAttribute('data-type');
            if(type==='sp') state2.letters[asset].spFile = e.target.files[0].name; else state2.letters[asset].stFile = e.target.files[0].name;
            renderLetters();
        }
    });

    // Save All & Downs
    document.getElementById('btn-save-all').addEventListener('click', () => {
        commitP1(); commitP2(); commitP3(); commitP4(); commitP5(); commitP6();
        if(savePhase1Data(state1)&&savePhase2Data(state2)&&savePhase3Data(state3)&&savePhase4Data(state4)&&savePhase5Data(state5)&&savePhase6Data(state6)) alert('All phases saved.'); else alert('Save failed.');
    });

    const downloadJSON = (state, n) => { const a=document.createElement('a'); a.href="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(state,null,2)); a.download=`${n}.json`; a.click(); };
    
    document.getElementById('btn-complete-1').addEventListener('click', () => { commitP1(); state1.completed=true; savePhase1Data(state1); updateSummaries(); });
    document.getElementById('btn-download-1').addEventListener('click', () => { commitP1(); downloadJSON(state1, 'phase1_data'); });
    document.getElementById('btn-complete-2').addEventListener('click', () => { commitP2(); state2.completed=true; savePhase2Data(state2); updateSummaries(); });
    document.getElementById('btn-download-2').addEventListener('click', () => { commitP2(); downloadJSON(state2, 'phase2_data'); });
    document.getElementById('btn-complete-3').addEventListener('click', () => { commitP3(); state3.completed=true; savePhase3Data(state3); updateSummaries(); });
    document.getElementById('btn-download-3').addEventListener('click', () => { commitP3(); downloadJSON(state3, 'phase3_data'); });
    document.getElementById('btn-complete-4').addEventListener('click', () => { commitP4(); state4.completed=true; savePhase4Data(state4); updateSummaries(); });
    document.getElementById('btn-download-4').addEventListener('click', () => { commitP4(); downloadJSON(state4, 'phase4_data'); });
    document.getElementById('btn-complete-5').addEventListener('click', () => { commitP5(); state5.completed=true; savePhase5Data(state5); updateSummaries(); });
    document.getElementById('btn-download-5').addEventListener('click', () => { commitP5(); downloadJSON(state5, 'phase5_data'); });
    document.getElementById('btn-complete-6').addEventListener('click', () => { commitP6(); state6.completed=true; savePhase6Data(state6); updateSummaries(); });
    document.getElementById('btn-download-6').addEventListener('click', () => { commitP6(); downloadJSON(state6, 'phase6_data'); });

    // --- PDF Artifact Export Buttons ---
    const addPdfBtn = (paneId, phaseLabel, rowsFn) => {
        const pane = document.getElementById(paneId);
        if (!pane) return;
        const btn = document.createElement('button');
        btn.className = 'mt-6 flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg shadow-md transition-transform hover:-translate-y-0.5';
        btn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>Download ${phaseLabel} Artifact (PDF)`;
        btn.addEventListener('click', rowsFn);
        pane.appendChild(btn);
    };

    addPdfBtn('phase1-pane', 'Phase 1: Kickoff', () => {
        commitP1();
        generatePhasePDF('Phase 1: Project Kickoff & Scoping', [
            { label: 'Mandate Document Title', value: state1.mandate.title },
            { label: 'Approving Authority',    value: state1.mandate.authority },
            { label: 'Purpose of Mandate',     value: state1.mandate.purpose },
            { label: 'Granted Authorities',    value: state1.mandate.authorities.join(', ') },
            { label: 'Resource Commitments',   value: state1.mandate.commitments },
            { label: 'In-Scope Entities',      value: state1.scope.inScope },
            { label: 'Out-of-Scope',           value: state1.scope.outScope },
            { label: 'Geographic Scope',       value: state1.scope.geography },
            { label: 'Quantitative Risk',      value: state1.risk.quant },
            { label: 'Qualitative Risk',       value: state1.risk.qual },
            { label: 'Financial Risk',         value: state1.risk.financial },
            { label: 'AI Asset Register',      value: state1.assets.map(a => `${a.id||''}: ${a.name||''} (Tier: ${a.tier||''})`).join('\n') }
        ]);
    });

    addPdfBtn('phase2-pane', 'Phase 2: Governance', () => {
        commitP2();
        generatePhasePDF('Phase 2: Governance Structure', [
            { label: 'AIMS Lead Accountability',  value: state2.lead.accountability },
            { label: 'Core Responsibilities',     value: state2.lead.responsibilities.join(', ') },
            { label: 'Delegated Authorities',     value: state2.lead.authorities.join(', ') },
            { label: 'KPIs',                      value: state2.lead.kpis },
            { label: 'Committee Purpose',         value: state2.committee.purpose },
            { label: 'Committee Membership',      value: state2.committee.membership.join(', ') },
            { label: 'Meeting Cadence',           value: state2.committee.cadence },
            { label: 'Quorum Requirement',        value: state2.committee.quorum },
            { label: 'Escalation Path',           value: state2.committee.escalation }
        ]);
    });

    addPdfBtn('phase3-pane', 'Phase 3: Policy', () => {
        commitP3();
        generatePhasePDF('Phase 3: Policy Development', [
            { label: 'Ethics Policy Statement',       value: state3.ethics.statement },
            { label: 'Fairness Rules',                value: state3.ethics.fairness },
            { label: 'Transparency Requirements',     value: state3.ethics.transparency },
            { label: 'Human Oversight Definition',    value: state3.ethics.oversight },
            { label: 'Prohibited Use Cases',          value: state3.ethics.prohibited },
            { label: 'Non-Negotiable Requirements',   value: state3.ethics.nonNegotiable },
            { label: 'Risk Management Framework',     value: state3.risk.framework },
            { label: 'Risk Matrix Methodology',       value: state3.risk.matrix },
            { label: 'Regulatory Mapping',            value: state3.risk.regulatory },
            { label: 'Data Lineage',                  value: state3.dataGov.lineage },
            { label: 'Data Quality Standards',        value: state3.dataGov.quality },
            { label: 'Privacy by Design',             value: state3.dataGov.pbd },
            { label: 'IP Statement',                  value: state3.dataGov.ip }
        ]);
    });

    addPdfBtn('phase4-pane', 'Phase 4: Triage & Lineage', () => {
        commitP4();
        generatePhasePDF('Phase 4: Inventory Triage & Data Lineage', [
            { label: 'Data Flow Narrative',   value: state4.lineage.flow },
            { label: 'Lineage Hops',          value: state4.lineage.hops.map(h => `${h.name||''} (Owner: ${h.owner||''})`).join('\n') },
            { label: 'Data Completeness',     value: state4.quality.completeness },
            { label: 'Representativeness',    value: state4.quality.representativeness },
            { label: 'Accuracy Controls',     value: state4.quality.accuracy },
            { label: 'ETL Governance Gates',  value: state4.etl.gates },
            { label: 'Access Controls',       value: state4.etl.access },
            { label: 'Data Steward Sign-off', value: `${state4.quality.signatureName} (${state4.quality.signatureDate})` }
        ]);
    });

    addPdfBtn('phase5-pane', 'Phase 5: Risk & Models', () => {
        commitP5();
        generatePhasePDF('Phase 5: Risk Assessment & Model Cards', [
            { label: 'Risk Register', value: state5.risks.map(r => `[${r.id||'?'}] ${r.threat||''} — Likelihood: ${r.likelihood||''}, Impact: ${r.impact||''}`).join('\n') },
            { label: 'AI Impact Assessments', value: Object.entries(state5.aias).map(([k,v]) => `${k}: ${v.scope||''}`).join('\n') },
            { label: 'Model Cards Completed', value: Object.keys(state5.cards).join(', ')||'None yet' }
        ]);
    });

    addPdfBtn('phase6-pane', 'Phase 6: CI & Culture', () => {
        commitP6();
        generatePhasePDF('Phase 6: Continuous Improvement & Culture', [
            { label: 'PMM Key Metrics',          value: state6.pmm.metrics },
            { label: 'PMM Feedback Loops',       value: state6.pmm.feedback },
            { label: 'Drift Detection Method',   value: state6.pmm.drift },
            { label: 'Review Cycle',             value: state6.pmm.cycle },
            { label: 'Active Incidents',         value: state6.incidents.map(i => `[${i.id||'?'}] ${i.title||''} — Severity: ${i.severity||''}`).join('\n') },
            { label: 'Retirement Criteria',      value: state6.retirement.criteria },
            { label: 'Data Archival Policy',     value: state6.retirement.archival },
            { label: 'Audit Executive Summary',  value: state6.audit.execSum },
            { label: 'Non-Conformances',         value: state6.audit.nonconf },
            { label: 'Management Review Goals',  value: state6.audit.goals }
        ]);
    });

    // Boot
    renderAssets1(); renderRACI(); renderLetters(); renderTracker3(); renderHops4(); renderTriage4(); renderRisks5(); renderAIAs5(); renderCards5(); renderReports5(); renderIncidents6(); updateSummaries();
    return container;
}
