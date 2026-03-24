/**
 * session-manager.js
 * Handles save/load/clear of full audit sessions for multi-company support.
 */

const SESSION_KEYS = [
    'ai_gov_company_data',  // matches STORAGE_KEY in storage.js
    'controlStatuses',
    'controlEvidence',
    'phase1Data',
    'phase2Data',
    'phase3Data',
    'phase4Data',
    'phase5Data',
    'phase6Data',
    'kanbanBoardData',
    'draftReportData',
    'annualRevenue'
];

export function saveAuditSession() {
    const session = {};
    SESSION_KEYS.forEach(k => {
        const val = localStorage.getItem(k);
        if (val) session[k] = JSON.parse(val);
    });

    const company = session.companyData ? session.companyData.companyName || 'Audit' : 'Audit';
    const date = new Date().toISOString().split('T')[0];
    const filename = `AIGov_Session_${company.replace(/\s+/g, '_')}_${date}.json`;

    const blob = new Blob([JSON.stringify(session, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    return filename;
}

export function loadAuditSession(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const session = JSON.parse(e.target.result);
                SESSION_KEYS.forEach(k => {
                    if (session[k] !== undefined) {
                        localStorage.setItem(k, JSON.stringify(session[k]));
                    }
                });
                resolve(session.companyData ? session.companyData.companyName : 'Unknown');
            } catch (err) {
                reject(new Error('Invalid session file. Please use a valid AIGov session JSON.'));
            }
        };
        reader.onerror = () => reject(new Error('Failed to read file.'));
        reader.readAsText(file);
    });
}

export function clearAllData() {
    SESSION_KEYS.forEach(k => localStorage.removeItem(k));
}
