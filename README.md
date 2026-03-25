# AI Governance Compliance Platform

A fully functional Single Page Application (SPA) designed to help organisations manage their AI governance, map compliance controls, and track implementation across global frameworks.

### 🚀 [Live Demo (GitHub Pages) link](https://lil-ltj.github.io/AI-Governance-Compliance-Platform/)


## Project Structure

```
ai-gov-platform/
├── index.html            # Main HTML shell and layout
├── css/
│   └── styles.css        # Custom CSS extensions, glassmorphism, and animations
├── js/
│   ├── app.js            # SPA Router and main logic controller
│   ├── storage.js        # localStorage data manager wrapper
│   └── pages/            # View components (ES Modules)
│       ├── landing.js
│       ├── controls.js
│       ├── AI implementation board.js
│       ├── dashboard.js
│       └── business-executive-summary.js
└── README.md             # This file
```

## Technologies Used

- **HTML5 & Vanilla JavaScript**: Modern ES6 modules for component-driven architecture without external framework bloat.
- **Tailwind CSS**: Utility-first CSS framework (via CDN) for rapid, responsive, and highly premium design aesthetics.
- **LocalStorage**: Client-side data persistence for session state and onboarding flows.

## How to Run Locally

Because this project utilizes native ES Modules (`<script type="module">`), opening the `index.html` directly from the file system (`file://` protocol) will result in CORS errors. You must serve it over HTTP.

### Using Python (recommended)
Navigate to the `ai-gov-platform` directory in your terminal and run:
```bash
python3 -m http.server 8000
# or for older Python versions:
# python -m SimpleHTTPServer 8000
```
Then visit `http://localhost:8000` in your web browser.

### Using Node.js
If you have `npx` installed globally:
```bash
npx serve .
```

### Using VS Code
Install the **Live Server** extension, right-click `index.html`, and select "Open with Live Server".

## Core Features Implemented

1. **Hash-based Routing Engine**: A lightweight SPA router (`app.js`) that handles view transitions and layout updates dynamically without full page reloads.
2. **State Protection**: Automatic redirect to the onboarding setup if `localStorage` profile data is missing, ensuring a personalized experience across modules.
3. **Controls Mapping Module**: Evaluates over 15 control points across leading standard frameworks (NIST, ISO 42001, EU AI Act, GDPR, COBIT), calculating compliance with built-in evidence upload handlers.
4. **6-Phase AI Implementation Dashboard**: A structured guided workflow capturing the AI lifecycle:
   - **Phase 1: Project Kickoff & Scoping** (Asset Register, Risk Appetite)
   - **Phase 2: Governance Structure** (Continuous RACI and Lead Tracking)
   - **Phase 3: Policy Development** (Ethics, Risk Management, Data Governance)
   - **Phase 4: Inventory Triage & Data Lineage** (ETL logging, automated Tiering)
   - **Phase 5: Risk Assessment & Model Cards** (Threat likelihood mapping and robust AIA)
   - **Phase 6: Continuous Improvement & Culture** (PMM Plans, Incident logs, Audits)
5. **Compliance Dashboard**: Interactive visualizations powered by Chart.js (Radar, Doughnut, and Bar Charts) generating dynamic metrics for board-level review, equipped with a PDF export engine.
6. **Business Executive Summary**: Translates technical posture into financial implications (calculated fine exposure, operational inefficiencies, and reputational risk) aligned directly with corporate strategic goals on a 12-month Risk Mitigation Roadmap.

## Reference Frameworks

The platform actively maps controls and requirements against the following global standards and regulations:

- **GDPR**: [Advisera GDPR Guide](https://advisera.com/gdpr/)
- **NIST AI RMF**: [NIST.AI.100-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)
- **COBIT**: [COBIT Framework PDF](https://netmarket.oss.aliyuncs.com/df5c71cb-f91a-4bf8-85a6-991e1c2c0a3e.pdf)
- **ISO 42001**: [ISO 42001:2023 Summary](https://www.gsc-co.com/wp-content/uploads/2024/08/SCAN-ISO-420012023_-Web.pdf)
- **EU AI Act**: [EU AI Act Guide](https://niranjanxprt.github.io/eu-ai-act-guide/)

## Next Steps / Future Enhancements

1. **Backend Integration**: Transition the \`storage.js\` logic to secure RESTful API calls mapped to a persistent database (e.g., Node.js with PostgreSQL or MongoDB).
2. **Multi-User Role Access (RBAC)**: Expand the platform to allow distinct login profiles for Legal, Data Science, and CISO teams.
3. **Automated Evidence Scanning**: Integrate an LLM microservice to parse PDF evidence uploads and automatically verify fulfillment of controls mapping parameters.
