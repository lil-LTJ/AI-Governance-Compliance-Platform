# AI Governance Compliance Platform

A fully functional Single Page Application (SPA) designed to help organisations manage their AI governance, map compliance controls, and track implementation across global frameworks.

## Project Structure

\`\`\`
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
\`\`\`

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
3. **Premium UI/UX**: Includes a custom gradient brand theme, smooth page transitions, responsive navigation, custom scrollbars, and modern glassmorphism panels.

## Reference Frameworks

The platform actively maps controls and requirements against the following global standards and regulations:

- **GDPR**: [Advisera GDPR Guide](https://advisera.com/gdpr/)
- **NIST AI RMF**: [NIST.AI.100-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)
- **COBIT**: [COBIT Framework PDF](https://netmarket.oss.aliyuncs.com/df5c71cb-f91a-4bf8-85a6-991e1c2c0a3e.pdf)
- **ISO 42001**: [ISO 42001:2023 Summary](https://www.gsc-co.com/wp-content/uploads/2024/08/SCAN-ISO-420012023_-Web.pdf)
- **EU AI Act**: [EU AI Act Guide](https://niranjanxprt.github.io/eu-ai-act-guide/)

## Next Steps / Future Enhancements

1. **Controls Mapping Module (`controls.js`)**: Integrate the specific standards (COBIT, ISO 42001, NIST AI RMF, EU AI Act, GDPR). Map user inputs to a dynamic checklist structure.
2. **AI Implementation Board (`AI implementation board.js`)**: Develop a kanban or list-based task tracker (similar to Jira or Trello) to monitor active AI initiatives in the enterprise.
3. **Dashboards (`dashboard.js`)**: Integrate a charting library (like Chart.js or D3) to display compliance scores and active risks visually.
4. **Export Functionality (`business-executive-summary.js`)**: Add a feature to generate PDF or Markdown reports on the fly using libraries like jsPDF.
5. **Backend Transition**: When ready for production, transition the `storage.js` logic to secure API calls mapped to a real backend (e.g., Node.js with PostgreSQL or MongoDB).
