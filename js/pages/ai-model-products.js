export function renderAIModelProducts(container) {
    const defaultData = {
        'col-ideation': [
            { id: 'card-1', title: 'Copilot Developer Assistant', type: 'Third-Party / Vendor', risk: 'Low Risk', desc: 'Code generation assistant for engineering teams.' }
        ],
        'col-review': [
            { id: 'card-2', title: 'HR Resume Screener', type: 'Acquired Platform', risk: 'High Risk', desc: 'Automated candidate filtering mapping to EU AI Act high-risk classification.' }
        ],
        'col-testing': [
            { id: 'card-3', title: 'Sales Forecasting ML', type: 'Built In-House', risk: 'Medium Risk', desc: 'Predictive analytics model for Q3 revenue modeling.' }
        ],
        'col-deployed': [
            { id: 'card-4', title: 'Customer Support Chatbot', type: 'Built In-House', risk: 'Low Risk', desc: 'LLM-powered external chatbot for Level 1 triage.' }
        ]
    };

    let boardData = JSON.parse(localStorage.getItem('kanbanBoardData'));
    if (!boardData || Object.keys(boardData).length === 0) {
        boardData = defaultData;
        localStorage.setItem('kanbanBoardData', JSON.stringify(boardData));
    }

    const typeColors = {
        'Built In-House': 'bg-blue-100 text-blue-700 border-blue-200',
        'Acquired Platform': 'bg-purple-100 text-purple-700 border-purple-200',
        'Third-Party / Vendor': 'bg-slate-100 text-slate-700 border-slate-200'
    };

    const riskColors = {
        'High Risk': 'text-red-600 bg-red-50 border-red-100',
        'Medium Risk': 'text-yellow-600 bg-yellow-50 border-yellow-100',
        'Low Risk': 'text-green-600 bg-green-50 border-green-100'
    };

    // Helper to render cards
    const renderCards = (cardsArray) => {
        return cardsArray.map(card => `
            <div class="kanban-card bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-grab active:cursor-grabbing hover:border-brand-300 hover:shadow-md transition-all duration-200 mb-3 group" draggable="true" id="${card.id}">
                <div class="flex justify-between items-start mb-2">
                    <div class="flex flex-wrap gap-1">
                        <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${typeColors[card.type] || 'bg-slate-100'}">${card.type}</span>
                        <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${riskColors[card.risk] || 'bg-slate-100'}">${card.risk}</span>
                    </div>
                    <div class="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="btn-edit-card p-1 text-slate-400 hover:text-blue-600 transition-colors" title="Edit Card" data-id="${card.id}">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </button>
                        <button class="btn-delete-card p-1 text-slate-400 hover:text-red-600 transition-colors" title="Delete Card" data-id="${card.id}">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </div>
                </div>
                <h4 class="font-bold text-slate-800 text-sm mb-1">${card.title}</h4>
                <p class="text-xs text-slate-500 leading-relaxed">${card.desc}</p>
            </div>
        `).join('');
    };

    let template = `
        <div class="w-full max-w-[90rem] mx-auto fade-in pt-6 pb-20 px-4">
            <div class="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
                <div>
                    <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 flex items-center gap-3">
                        <div class="p-2 bg-brand-100 text-brand-700 rounded-lg">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                        </div>
                        AI Model Products Kanban
                    </h1>
                </div>
                <button id="btn-add-model" class="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white shadow-md text-sm font-bold rounded-lg transition-transform hover:-translate-y-0.5 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                    Register New Model
                </button>
            </div>

            <!-- Instructional Banner -->
            <div class="mb-8 p-6 bg-brand-50 border border-brand-200 rounded-2xl shadow-sm text-brand-900">
                <h2 class="text-xl font-bold flex items-center gap-2 mb-3">
                    <svg class="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    How to use the Production Board
                </h2>
                <p class="text-sm font-medium leading-relaxed mb-4">
                    The <strong>AI Model Products</strong> board is your dynamic, day-to-day operational tracker. While the <strong>Implementation Dashboard</strong> defines your company's high-level Governance policies (the "How" and "Why"), this Kanban board tracks specific AI systems transitioning through those defined governance gates (the "What" and "When").
                </p>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white/60 p-4 rounded-xl border border-brand-100">
                    <div>
                        <h3 class="font-bold text-xs mb-1 text-slate-800">1. Ideation</h3>
                        <p class="text-[10px] text-slate-600">Registering new shadow-AI or planned internal builds before any resources are spent.</p>
                    </div>
                    <div>
                        <h3 class="font-bold text-xs mb-1 text-slate-800">2. Governance Review</h3>
                        <p class="text-[10px] text-slate-600">Evaluating the model against the Risk matrices set in Phase 5 of the Implementation Board.</p>
                    </div>
                    <div>
                        <h3 class="font-bold text-xs mb-1 text-slate-800">3. Testing & Validation</h3>
                        <p class="text-[10px] text-slate-600">Verifying data linearity and checking Model Cards output (Phase 4 & 5).</p>
                    </div>
                    <div>
                        <h3 class="font-bold text-xs mb-1 text-slate-800">4. Deployed</h3>
                        <p class="text-[10px] text-slate-600">Actively in production and subject to continuous Post-Market Monitoring (Phase 6).</p>
                    </div>
                </div>
            </div>

            <!-- Kanban Board -->
            <div class="flex flex-col md:flex-row gap-6 pb-4 overflow-x-auto min-h-[60vh]">
                
                <!-- Col 1 -->
                <div class="flex-none w-full md:w-80 flex flex-col">
                    <div class="flex items-center justify-between mb-3 px-1">
                        <h3 class="font-extrabold text-slate-700 uppercase tracking-wide text-sm flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-full bg-slate-400"></span> Ideation / Proposed
                        </h3>
                        <span class="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full" id="count-ideation">${boardData['col-ideation'].length}</span>
                    </div>
                    <div class="kanban-column bg-slate-100 rounded-2xl flex-1 p-3 border border-slate-200/60 shadow-inner flex flex-col gap-3" id="col-ideation">
                        ${renderCards(boardData['col-ideation'])}
                    </div>
                </div>

                <!-- Col 2 -->
                <div class="flex-none w-full md:w-80 flex flex-col">
                    <div class="flex items-center justify-between mb-3 px-1">
                        <h3 class="font-extrabold text-slate-700 uppercase tracking-wide text-sm flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-full bg-yellow-400"></span> Governance Review
                        </h3>
                        <span class="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full" id="count-review">${boardData['col-review'].length}</span>
                    </div>
                    <div class="kanban-column bg-slate-100 rounded-2xl flex-1 p-3 border border-slate-200/60 shadow-inner flex flex-col gap-3" id="col-review">
                        ${renderCards(boardData['col-review'])}
                    </div>
                </div>

                <!-- Col 3 -->
                <div class="flex-none w-full md:w-80 flex flex-col">
                    <div class="flex items-center justify-between mb-3 px-1">
                        <h3 class="font-extrabold text-slate-700 uppercase tracking-wide text-sm flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Testing & Validation
                        </h3>
                        <span class="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full" id="count-testing">${boardData['col-testing'].length}</span>
                    </div>
                    <div class="kanban-column bg-slate-100 rounded-2xl flex-1 p-3 border border-slate-200/60 shadow-inner flex flex-col gap-3" id="col-testing">
                        ${renderCards(boardData['col-testing'])}
                    </div>
                </div>

                <!-- Col 4 -->
                <div class="flex-none w-full md:w-80 flex flex-col">
                    <div class="flex items-center justify-between mb-3 px-1">
                        <h3 class="font-extrabold text-slate-700 uppercase tracking-wide text-sm flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Deployed (Production)
                        </h3>
                        <span class="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full" id="count-deployed">${boardData['col-deployed'].length}</span>
                    </div>
                    <div class="kanban-column bg-slate-100 rounded-2xl flex-1 p-3 border border-slate-200/60 shadow-inner flex flex-col gap-3" id="col-deployed">
                        ${renderCards(boardData['col-deployed'])}
                    </div>
                </div>

            </div>
        </div>
    `;

    container.innerHTML = template;

    // --- Card Action Handlers ---
    const attachCardListeners = (cardEl) => {
        cardEl.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', cardEl.id);
            setTimeout(() => { cardEl.classList.add('opacity-50'); }, 0);
        });

        cardEl.addEventListener('dragend', () => {
            cardEl.classList.remove('opacity-50');
            saveBoardState();
        });

        // Edit
        const btnEdit = cardEl.querySelector('.btn-edit-card');
        if (btnEdit) {
            btnEdit.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btnEdit.getAttribute('data-id');
                
                // Find current data
                let currentItem;
                let currentColId;
                Object.keys(boardData).forEach(colId => {
                    const found = boardData[colId].find(c => c.id === id);
                    if (found) {
                        currentItem = found;
                        currentColId = colId;
                    }
                });

                if (currentItem) {
                    const newTitle = prompt('Edit AI Model Name:', currentItem.title);
                    if (newTitle === null) return;
                    
                    const newType = prompt('Edit Type (Built In-House, Acquired Platform, or Third-Party / Vendor):', currentItem.type);
                    const newRisk = prompt('Edit Risk Classification (High Risk, Medium Risk, Low Risk):', currentItem.risk);
                    const newDesc = prompt('Edit Description:', currentItem.desc);

                    currentItem.title = newTitle || currentItem.title;
                    currentItem.type = newType || currentItem.type;
                    currentItem.risk = newRisk || currentItem.risk;
                    currentItem.desc = newDesc || currentItem.desc;

                    localStorage.setItem('kanbanBoardData', JSON.stringify(boardData));
                    renderAIModelProducts(container); // Re-render everything
                }
            });
        }

        // Delete
        const btnDelete = cardEl.querySelector('.btn-delete-card');
        if (btnDelete) {
            btnDelete.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this AI model product?')) {
                    const id = btnDelete.getAttribute('data-id');
                    Object.keys(boardData).forEach(colId => {
                        boardData[colId] = boardData[colId].filter(c => c.id !== id);
                    });
                    localStorage.setItem('kanbanBoardData', JSON.stringify(boardData));
                    renderAIModelProducts(container); // Re-render
                }
            });
        }
    };

    container.querySelectorAll('.kanban-card').forEach(attachCardListeners);

    // --- Drag and Drop Logic ---
    const columns = container.querySelectorAll('.kanban-column');

    columns.forEach(col => {
        col.addEventListener('dragover', (e) => {
            e.preventDefault(); // Necessary to allow dropping
            col.classList.add('bg-slate-200/80');
        });

        col.addEventListener('dragleave', () => {
            col.classList.remove('bg-slate-200/80');
        });

        col.addEventListener('drop', (e) => {
            e.preventDefault();
            col.classList.remove('bg-slate-200/80');
            const id = e.dataTransfer.getData('text/plain');
            const draggableElement = document.getElementById(id);
            if (draggableElement) {
                // Append the card to the column
                col.appendChild(draggableElement);
                updateCounts();
                saveBoardState(); // Important to save after drop
            }
        });
    });

    const updateCounts = () => {
        columns.forEach(col => {
            const countId = col.id.replace('col-', 'count-');
            const counter = document.getElementById(countId);
            if(counter) {
                counter.textContent = col.querySelectorAll('.kanban-card').length;
            }
        });
    };

    const saveBoardState = () => {
        const newState = {
            'col-ideation': [],
            'col-review': [],
            'col-testing': [],
            'col-deployed': []
        };
        
        columns.forEach(col => {
            const colCards = col.querySelectorAll('.kanban-card');
            colCards.forEach(card => {
                // Reconstruct data
                const typeSpan = card.querySelector('.flex.flex-wrap.gap-1 span:nth-child(1)');
                const riskSpan = card.querySelector('.flex.flex-wrap.gap-1 span:nth-child(2)');
                const titleNode = card.querySelector('h4');
                const descNode = card.querySelector('p');

                newState[col.id].push({
                    id: card.id,
                    type: typeSpan ? typeSpan.textContent : '',
                    risk: riskSpan ? riskSpan.textContent : '',
                    title: titleNode ? titleNode.textContent : '',
                    desc: descNode ? descNode.textContent : ''
                });
            });
        });

        localStorage.setItem('kanbanBoardData', JSON.stringify(newState));
        boardData = newState; // Keep local state in sync
    };

    // New Model Modal
    const btnAdd = document.getElementById('btn-add-model');
    btnAdd.addEventListener('click', () => {
        const title = prompt('Enter AI Model Name:');
        if(!title) return;
        
        const type = prompt('Model Type (Built In-House, Acquired Platform, or Third-Party / Vendor):', 'Built In-House');
        const risk = prompt('Risk Classification (High Risk, Medium Risk, Low Risk):', 'Medium Risk');
        const desc = prompt('Brief description:');

        const newId = 'card-' + Date.now();
        boardData['col-ideation'].push({ id: newId, title, type, risk, desc });
        localStorage.setItem('kanbanBoardData', JSON.stringify(boardData));
        renderAIModelProducts(container); // Re-render to get listeners attached cleanly
    });

    return container;
}
