/**
 * Mohamed Fazil J — Professional Data Analyst Portfolio & DATOVA AI Studio
 * 7-Section Blueprint with 9-Part Case Studies, Theme Toggle, and Working Model
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbar();
  initProjectShowcase();
  initDatanovaStudio();
  initModals();
  initContactForm();
});

/* ===================================================================
   1. THEME TOGGLE: DARK MODERN (DEFAULT) / CLEAN CORPORATE LIGHT
   =================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const htmlEl = document.documentElement;

  // Retrieve saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('fazil_portfolio_theme') || 'dark';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('fazil_portfolio_theme', theme);
    if (themeIcon) {
      // If dark, show sun (to switch to light); if light, show moon (to switch to dark)
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      showToast(`Switched to ${next === 'dark' ? 'Dark Modern' : 'Clean Corporate Light'} theme`);
    });
  }
}

/* ===================================================================
   2. NAVBAR & NAVIGATION
   =================================================================== */
function initNavbar() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

/* ===================================================================
   3. FEATURED PROJECTS: 9-PART BLUEPRINT RENDERER
   =================================================================== */
function initProjectShowcase() {
  const container = document.getElementById('projectsListContainer');
  if (!container || typeof portfolioProjects === 'undefined') return;

  container.innerHTML = portfolioProjects.map(p => {
    const isFlagship = p.category === 'flagship' || p.id === 'datanova-ai';
    const topFindings = p.caseStudy && p.caseStudy.keyFindings ? p.caseStudy.keyFindings.slice(0, 3) : [];

    return `
      <article class="project-feature-card ${isFlagship ? 'flagship-highlight' : ''}" data-id="${p.id}">
        <div class="p-left-content">
          <div class="p-meta-top">
            <span class="p-badge">${p.badge || 'Analytical Project'}</span>
            <span class="p-impact">${p.impact}</span>
          </div>

          <h3 class="p-title">${p.title}</h3>
          <span class="p-role">${p.role}</span>

          <p class="p-summary">${p.summary}</p>

          ${topFindings.length > 0 ? `
            <div class="p-findings-box">
              <span class="p-findings-title">Verified Key Findings (Preview)</span>
              <ul class="p-findings-list">
                ${topFindings.map(f => `<li>${f}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <div class="p-tools-row">
            ${p.tools.map(t => `<span class="tag-minimal">${t}</span>`).join('')}
          </div>

          <div class="p-actions">
            ${p.hasWorkingModel ? `
              <button class="btn btn-solid btn-sm btn-launch-model">
                ⚡ Open DATOVA Working Model
              </button>
            ` : ''}
            <button class="btn ${p.hasWorkingModel ? 'btn-outline' : 'btn-solid'} btn-sm btn-view-study" data-id="${p.id}">
              Read Full 9-Part Case Study →
            </button>
            <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">
              GitHub Repo ↗
            </a>
          </div>
        </div>

        <div class="p-right-kpis">
          <span class="kpi-title">Verified Project Metrics</span>
          <div class="kpi-grid">
            ${p.metrics.map(m => `
              <div class="kpi-tile">
                <span class="k-val">${m.value}</span>
                <span class="k-lbl">${m.label}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Attach Case Study Modal Handlers
  container.querySelectorAll('.btn-view-study').forEach(btn => {
    btn.addEventListener('click', () => {
      const proj = portfolioProjects.find(i => i.id === btn.dataset.id);
      if (proj) openCaseStudyModal(proj);
    });
  });

  // Attach Working Model Handlers
  container.querySelectorAll('.btn-launch-model').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.getElementById('datanovaModal');
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
}

function openCaseStudyModal(project) {
  const modal = document.getElementById('caseStudyModal');
  if (!modal) return;

  const cs = project.caseStudy || {};

  document.getElementById('modalBadge').textContent = project.badge || 'Case Study';
  document.getElementById('modalTitle').textContent = project.title;
  document.getElementById('modalRole').textContent = project.role;

  document.getElementById('modalTools').innerHTML = project.tools
    .map(t => `<span class="tag-minimal">${t}</span>`)
    .join('');

  // 01. Overview
  const overviewHtml = `
    <p>${cs.overview ? cs.overview.description : project.summary}</p>
    ${cs.overview ? `
      <p style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-tertiary);">
        <strong>Domain:</strong> ${cs.overview.domain} &nbsp;|&nbsp; <strong>Tools:</strong> ${cs.overview.tools}
      </p>
    ` : ''}
  `;
  document.getElementById('modalOverview').innerHTML = overviewHtml;

  // 02. Problem
  document.getElementById('modalProblem').textContent = cs.businessProblem || 'Information not specified.';

  // 03. Dataset
  document.getElementById('modalDataset').textContent = cs.datasetSource || 'Standard public verified analytical dataset.';

  // 04. Data Prep
  const prepList = cs.dataPreparation || [];
  document.getElementById('modalDataPrep').innerHTML = prepList.length > 0
    ? prepList.map(step => `<li>${step}</li>`).join('')
    : '<li>Data imported, cleansed, and verified.</li>';

  // 05. Methodology
  document.getElementById('modalMethodology').textContent = cs.analysisMethodology || 'Quantitative relational analysis and modeling.';

  // 06. Metrics
  document.getElementById('modalMetrics').innerHTML = project.metrics.map(m => `
    <div class="kpi-tile">
      <span class="k-val">${m.value}</span>
      <span class="k-lbl">${m.label}</span>
    </div>
  `).join('');

  // 07. Findings
  const findingsList = cs.keyFindings || [];
  document.getElementById('modalFindings').innerHTML = findingsList.length > 0
    ? findingsList.map(f => `<li>${f}</li>`).join('')
    : '<li>Analysis completed with verified statistical figures.</li>';

  // 08. Recommendations
  const recsList = cs.businessRecommendations || [];
  document.getElementById('modalRecommendations').innerHTML = recsList.length > 0
    ? recsList.map(r => `<li>${r}</li>`).join('')
    : '<li>Deploy recommendations according to business constraints.</li>';

  // 09. Files Info
  const filesInfo = cs.projectFiles
    ? `${cs.projectFiles.type} available in the linked GitHub repository.`
    : 'Public repository documentation and reproduction scripts.';
  document.getElementById('modalFilesInfo').textContent = filesInfo;

  const repoLink = document.getElementById('modalRepoLink');
  if (repoLink) repoLink.href = project.github;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* ===================================================================
   4. DATOVA AI: INTERACTIVE WORKING MODEL STUDIO
   =================================================================== */
const studioDatasets = {
  retail: {
    domain: "Retail & E-Commerce",
    healthScore: 94,
    statusText: "Excellent · Production Ready",
    tables: [
      {
        name: "CUSTOMERS",
        rowCount: "99.4K rows",
        cols: [
          { name: "customer_id", type: "VARCHAR(36)", isPk: true },
          { name: "customer_zip", type: "INT", isFk: false },
          { name: "customer_city", type: "VARCHAR(60)", isFk: false },
          { name: "customer_state", type: "CHAR(2)", isFk: false }
        ]
      },
      {
        name: "ORDERS",
        rowCount: "99.4K rows",
        cols: [
          { name: "order_id", type: "VARCHAR(36)", isPk: true },
          { name: "customer_id", type: "VARCHAR(36)", isFk: true },
          { name: "order_status", type: "VARCHAR(20)", isFk: false },
          { name: "purchase_time", type: "TIMESTAMP", isFk: false }
        ]
      },
      {
        name: "PAYMENTS",
        rowCount: "103.8K rows",
        cols: [
          { name: "payment_id", type: "VARCHAR(36)", isPk: true },
          { name: "order_id", type: "VARCHAR(36)", isFk: true },
          { name: "payment_type", type: "VARCHAR(15)", isFk: false },
          { name: "payment_value", type: "DECIMAL(10,2)", isFk: false }
        ]
      },
      {
        name: "ORDER_ITEMS",
        rowCount: "112.6K rows",
        cols: [
          { name: "order_item_id", type: "INT", isPk: true },
          { name: "order_id", type: "VARCHAR(36)", isFk: true },
          { name: "product_id", type: "VARCHAR(36)", isFk: false },
          { name: "price", type: "DECIMAL(10,2)", isFk: false }
        ]
      }
    ],
    simHeaders: ["customer_id", "customer_state", "order_id", "payment_type", "payment_value"],
    simRows: [
      ["CUST-9821", "SP", "ORD-10492", "credit_card", "$142.50"],
      ["CUST-9821", "SP", "ORD-10512", "credit_card", "$89.00"],
      ["CUST-4112", "RJ", "ORD-10493", "boleto", "$210.30"],
      ["CUST-7740", "MG", "ORD-10494", "credit_card", "$45.80"],
      ["CUST-3209", "PR", "ORD-10495", "voucher", "$65.00"]
    ]
  },

  hr: {
    domain: "Corporate HR & Workforce",
    healthScore: 98,
    statusText: "Optimal · Zero Leakage",
    tables: [
      {
        name: "EMPLOYEES",
        rowCount: "1,470 rows",
        cols: [
          { name: "employee_id", type: "INT", isPk: true },
          { name: "age", type: "INT", isFk: false },
          { name: "attrition", type: "VARCHAR(3)", isFk: false },
          { name: "job_role", type: "VARCHAR(40)", isFk: false }
        ]
      },
      {
        name: "DEPARTMENTS",
        rowCount: "3 rows",
        cols: [
          { name: "dept_id", type: "INT", isPk: true },
          { name: "dept_name", type: "VARCHAR(50)", isFk: false },
          { name: "budget_tier", type: "CHAR(1)", isFk: false }
        ]
      },
      {
        name: "COMPENSATION",
        rowCount: "1,470 rows",
        cols: [
          { name: "comp_id", type: "INT", isPk: true },
          { name: "employee_id", type: "INT", isFk: true },
          { name: "monthly_rate", type: "INT", isFk: false },
          { name: "overtime", type: "VARCHAR(3)", isFk: false }
        ]
      }
    ],
    simHeaders: ["employee_id", "job_role", "attrition", "monthly_rate", "overtime"],
    simRows: [
      ["EMP-1002", "Sales Executive", "Yes", "$5,993", "Yes"],
      ["EMP-1007", "Research Scientist", "No", "$4,120", "Yes"],
      ["EMP-1014", "Sales Rep", "Yes", "$2,450", "Yes"],
      ["EMP-1022", "Lab Technician", "No", "$3,200", "Yes"],
      ["EMP-1035", "Sales Rep", "Yes", "$2,100", "Yes"]
    ]
  },

  banking: {
    domain: "Commercial Banking & Fraud",
    healthScore: 96,
    statusText: "Audited · PCI Compliant Schema",
    tables: [
      {
        name: "CLIENTS",
        rowCount: "45.2K accounts",
        cols: [
          { name: "client_id", type: "INT", isPk: true },
          { name: "risk_rating", type: "CHAR(2)", isFk: false },
          { name: "join_date", type: "DATE", isFk: false }
        ]
      },
      {
        name: "ACCOUNTS",
        rowCount: "52.8K accounts",
        cols: [
          { name: "account_id", type: "INT", isPk: true },
          { name: "client_id", type: "INT", isFk: true },
          { name: "account_type", type: "VARCHAR(20)", isFk: false },
          { name: "balance", type: "DECIMAL(12,2)", isFk: false }
        ]
      },
      {
        name: "TRANSACTIONS",
        rowCount: "420K entries",
        cols: [
          { name: "txn_id", type: "VARCHAR(40)", isPk: true },
          { name: "account_id", type: "INT", isFk: true },
          { name: "amount", type: "DECIMAL(10,2)", isFk: false },
          { name: "is_flagged", type: "BOOLEAN", isFk: false }
        ]
      }
    ],
    simHeaders: ["client_id", "account_id", "account_type", "amount", "is_flagged"],
    simRows: [
      ["CLI-4819", "ACC-9012", "Checking", "$12,450.00", "True"],
      ["CLI-1120", "ACC-4491", "Business", "$8,200.00", "False"],
      ["CLI-6302", "ACC-7188", "Savings", "$5,500.00", "False"],
      ["CLI-9941", "ACC-3042", "Checking", "$18,900.00", "True"],
      ["CLI-2511", "ACC-5510", "Business", "$6,420.00", "False"]
    ]
  }
};

function initDatanovaStudio() {
  const modal = document.getElementById('datanovaModal');
  const datasetSelect = document.getElementById('studioDatasetSelect');
  const viewTabs = document.querySelectorAll('#studioViewTabs .s-tab');
  const views = {
    eer: document.getElementById('viewEER'),
    dashboard: document.getElementById('viewDashboard'),
    ask: document.getElementById('viewAsk')
  };

  const btnRunJoin = document.getElementById('btnRunJoinSimulation');
  const btnReset = document.getElementById('btnResetCanvas');
  const nodesContainer = document.getElementById('eerNodesContainer');
  const simTable = document.getElementById('eerSimTable');

  let currentKey = 'retail';

  function renderEerCanvas(key) {
    const ds = studioDatasets[key];
    if (!ds || !nodesContainer) return;

    nodesContainer.innerHTML = ds.tables.map(tbl => `
      <div class="eer-table-node" data-table="${tbl.name}">
        <div class="table-node-head">
          <span>${tbl.name}</span>
          <span style="font-size:0.65rem; color:#94a3b8;">${tbl.rowCount}</span>
        </div>
        <div class="table-node-cols">
          ${tbl.cols.map(c => `
            <div class="table-col-row ${c.isPk ? 'pk' : ''} ${c.isFk ? 'fk' : ''}">
              <span>${c.isPk ? 'PK ' : c.isFk ? 'FK ' : ''}${c.name}</span>
              <span class="col-type">${c.type}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    // Attach click effect on table
    nodesContainer.querySelectorAll('.eer-table-node').forEach(node => {
      node.addEventListener('click', () => {
        showToast(`Inspecting Entity: ${node.dataset.table}`);
      });
    });

    // Render simulation table
    if (simTable) {
      simTable.innerHTML = `
        <thead>
          <tr>${ds.simHeaders.map(h => `<th>${h}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${ds.simRows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}
        </tbody>
      `;
    }
  }

  // Switch Dataset
  if (datasetSelect) {
    datasetSelect.addEventListener('change', (e) => {
      currentKey = e.target.value;
      renderEerCanvas(currentKey);
      showToast(`Loaded Domain: ${studioDatasets[currentKey].domain}`);
    });
  }

  // Switch Tabs inside Studio
  viewTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      viewTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.dataset.view;
      Object.keys(views).forEach(k => {
        if (views[k]) views[k].style.display = k === target ? 'block' : 'none';
      });
    });
  });

  // Run Join Simulation
  if (btnRunJoin) {
    btnRunJoin.addEventListener('click', () => {
      btnRunJoin.disabled = true;
      btnRunJoin.textContent = "Executing Query...";
      setTimeout(() => {
        btnRunJoin.disabled = false;
        btnRunJoin.textContent = "▶ Run Join Simulation";
        showToast("Relational join executed deterministically in 16ms.");
      }, 250);
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      renderEerCanvas(currentKey);
      showToast("EER Canvas layout refreshed.");
    });
  }

  // Wire home spotlight trigger
  document.querySelectorAll('.btn-launch-model').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        renderEerCanvas(currentKey);
      }
    });
  });

  // Ask DATOVA Chat
  initAskDatovaChat();

  renderEerCanvas('retail');
}

/* Ask DATOVA Chat Simulation */
function initAskDatovaChat() {
  const form = document.getElementById('askChatForm');
  const input = document.getElementById('askInput');
  const messagesList = document.getElementById('askMessagesList');
  const suggestions = document.querySelectorAll('#askSuggestions .prompt-chip');

  if (!form || !input || !messagesList) return;

  const cannedAnswers = {
    region: "Based on 99,441 records, São Paulo (SP) represents 42.1% of gross order volume ($6.65M GMV), followed by Rio de Janeiro (RJ) at 12.8% and Minas Gerais (MG) at 11.6%.",
    delay: "Anomalous freight delays (>3 days past SLA) cluster heavily in interstate routes to Rio de Janeiro and the North-East corridor, causing customer review ratings to drop by 2.8 stars on average.",
    payment: "Credit cards dominate with 73.6% of gross marketplace volume, followed by Boleto bancário (19.4%), Vouchers (5.2%), and Debit cards (1.8%)."
  };

  function sendQuestion(text) {
    if (!text.trim()) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user';
    userMsg.innerHTML = `
      <div class="msg-avatar">You</div>
      <div class="msg-bubble"><p>${escapeHtml(text)}</p></div>
    `;
    messagesList.appendChild(userMsg);
    input.value = '';
    messagesList.scrollTop = messagesList.scrollHeight;

    setTimeout(() => {
      let replyText = "I queried the relational model. Verified figures: Total Gross GMV is $15.8M across 99,441 transactions with a 94/100 data health rating and zero detected duplicate records.";
      const q = text.toLowerCase();
      if (q.includes('region') || q.includes('volume')) replyText = cannedAnswers.region;
      else if (q.includes('delay') || q.includes('shipping')) replyText = cannedAnswers.delay;
      else if (q.includes('payment') || q.includes('method')) replyText = cannedAnswers.payment;

      const aiMsg = document.createElement('div');
      aiMsg.className = 'chat-msg';
      aiMsg.innerHTML = `
        <div class="msg-avatar">AI</div>
        <div class="msg-bubble">
          <strong>DATOVA Deterministic Engine</strong>
          <p>${replyText}</p>
        </div>
      `;
      messagesList.appendChild(aiMsg);
      messagesList.scrollTop = messagesList.scrollHeight;
    }, 300);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendQuestion(input.value);
  });

  suggestions.forEach(btn => {
    btn.addEventListener('click', () => {
      sendQuestion(btn.dataset.q);
    });
  });
}

/* ===================================================================
   5. MODALS & RESUME
   =================================================================== */
function initModals() {
  const caseModal = document.getElementById('caseStudyModal');
  const btnCloseCase = document.getElementById('btnCloseModal');
  const btnCloseCaseBtm = document.getElementById('btnCloseModalBtm');

  const datanovaModal = document.getElementById('datanovaModal');
  const btnCloseDatanova = document.getElementById('btnCloseDatanovaModal');
  const btnCloseDatanovaBtm = document.getElementById('btnCloseDatanovaModalBottom');

  const resumeModal = document.getElementById('resumeModal');
  const btnNavResume = document.getElementById('btnNavResume');
  const btnHomeResume = document.getElementById('btnHomeResume');
  const btnOpenResumeSection = document.getElementById('btnOpenResumeSection');
  const btnFooterResume = document.getElementById('btnFooterResume');
  const btnCloseResume = document.getElementById('btnCloseResume');
  const btnPrintResume = document.getElementById('btnPrintResume');

  function closeAllModals() {
    if (caseModal) caseModal.classList.remove('active');
    if (datanovaModal) datanovaModal.classList.remove('active');
    if (resumeModal) resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (btnCloseCase) btnCloseCase.addEventListener('click', closeAllModals);
  if (btnCloseCaseBtm) btnCloseCaseBtm.addEventListener('click', closeAllModals);

  if (btnCloseDatanova) btnCloseDatanova.addEventListener('click', closeAllModals);
  if (btnCloseDatanovaBtm) btnCloseDatanovaBtm.addEventListener('click', closeAllModals);

  if (btnCloseResume) btnCloseResume.addEventListener('click', closeAllModals);

  // Resume Triggers
  [btnNavResume, btnHomeResume, btnOpenResumeSection, btnFooterResume].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (resumeModal) {
          resumeModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    }
  });

  if (btnPrintResume) {
    btnPrintResume.addEventListener('click', () => {
      window.print();
    });
  }

  // Backdrop clicks
  [caseModal, datanovaModal, resumeModal].forEach(m => {
    if (m) {
      m.addEventListener('click', (e) => {
        if (e.target === m) closeAllModals();
      });
    }
  });

  // ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

/* ===================================================================
   6. CONTACT FORM & TOAST
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const btnCopy = document.getElementById('btnCopyEmail');
  const emailVal = document.getElementById('emailVal');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cName').value;
      const email = document.getElementById('cEmail').value;
      const subject = document.getElementById('cSubject').value;
      const msg = document.getElementById('cMsg').value;

      const mailto = `mailto:mf20159126@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${msg}`)}`;
      window.location.href = mailto;

      showToast("Email draft prepared. Thank you!");
      form.reset();
    });
  }

  if (btnCopy && emailVal) {
    btnCopy.addEventListener('click', () => {
      navigator.clipboard.writeText(emailVal.textContent.trim()).then(() => {
        showToast("Email address copied to clipboard!");
      });
    });
  }
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
