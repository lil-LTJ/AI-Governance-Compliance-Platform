/**
 * storage.js
 * Handles reading, saving, and clearing company data in localStorage.
 */

const STORAGE_KEY = 'ai_gov_company_data';

export function saveCompanyData(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Error saving to localStorage', e);
        return false;
    }
}

export function loadCompanyData() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Error loading from localStorage', e);
        return null;
    }
}

export function clearCompanyData() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (e) {
        console.error('Error clearing localStorage', e);
        return false;
    }
}

// Controls Data Storage Helpers
export function saveControlStatuses(statuses) {
    try { localStorage.setItem('controlStatuses', JSON.stringify(statuses)); return true; } catch(e) { return false; }
}

export function loadControlStatuses() {
    try { return JSON.parse(localStorage.getItem('controlStatuses')) || {}; } catch(e) { return {}; }
}

export function saveControlEvidence(evidence) {
    try { localStorage.setItem('controlEvidence', JSON.stringify(evidence)); return true; } catch(e) { return false; }
}

export function loadControlEvidence() {
    try { return JSON.parse(localStorage.getItem('controlEvidence')) || []; } catch(e) { return []; }
}

export function saveDraftReportData(data) {
    try { localStorage.setItem('draftReportData', JSON.stringify(data)); return true; } catch(e) { return false; }
}

export function savePhase1Data(data) {
    try { localStorage.setItem('phase1Data', JSON.stringify(data)); return true; } catch(e) { return false; }
}

export function loadPhase1Data() {
    try { return JSON.parse(localStorage.getItem('phase1Data')) || null; } catch(e) { return null; }
}

export function savePhase2Data(data) {
    try { localStorage.setItem('phase2Data', JSON.stringify(data)); return true; } catch(e) { return false; }
}

export function loadPhase2Data() {
    try { return JSON.parse(localStorage.getItem('phase2Data')) || null; } catch(e) { return null; }
}

export function savePhase3Data(data) {
    try { localStorage.setItem('phase3Data', JSON.stringify(data)); return true; } catch(e) { return false; }
}

export function loadPhase3Data() {
    try { return JSON.parse(localStorage.getItem('phase3Data')) || null; } catch(e) { return null; }
}

export function savePhase4Data(data) {
    try { localStorage.setItem('phase4Data', JSON.stringify(data)); return true; } catch(e) { return false; }
}

export function loadPhase4Data() {
    try { return JSON.parse(localStorage.getItem('phase4Data')) || null; } catch(e) { return null; }
}

export function savePhase5Data(data) {
    try { localStorage.setItem('phase5Data', JSON.stringify(data)); return true; } catch(e) { return false; }
}

export function loadPhase5Data() {
    try { return JSON.parse(localStorage.getItem('phase5Data')) || null; } catch(e) { return null; }
}

export function savePhase6Data(data) {
    try { localStorage.setItem('phase6Data', JSON.stringify(data)); return true; } catch(e) { return false; }
}

export function loadPhase6Data() {
    try { return JSON.parse(localStorage.getItem('phase6Data')) || null; } catch(e) { return null; }
}
