/**
 * Mohamed Fazil J — Professional Data Analyst Portfolio
 * Minimal Editorial UI/UX & Interactive Showcase
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbar();
  initProjectShowcase();
  initCertificateModal();
  initDatanovaStudio();
  initModals();
  initContactForm();
  initDynamicYear();
  initScrollAnimations();
});

/* ===================================================================
   1. THEME TOGGLE: CLEAN EDITORIAL LIGHT (DEFAULT) / DARK
   =================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const htmlEl = document.documentElement;

  // Retrieve saved preference or default to light mode
  const savedTheme = localStorage.getItem('fazil_editorial_theme') || 'light';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('fazil_editorial_theme', theme);
    if (themeIcon) {
      themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      showToast(`Switched to ${next === 'light' ? 'Editorial Light' : 'Muted Dark'} theme`);
    });
  }
}

/* ===================================================================
   2. SLIM NAVIGATION BAR
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
   3. FEATURED PROJECTS: EDITORIAL CARDS RENDERER
   =================================================================== */
function initProjectShowcase() {
  const container = document.getElementById('projectsListContainer');
  if (!container || typeof portfolioProjects === 'undefined') return;

  container.innerHTML = portfolioProjects.map(p => {
    const isFlagship = p.category === 'flagship' || p.id === 'datanova-ai';
    const metrics = p.verifiedMetrics || [];

    return `
      <article class="editorial-project-card" data-id="${p.id}">
        <div class="ep-left">
          <div class="ep-tools-row">
            <span class="tag-neutral">${p.badge || 'Analytics Project'}</span>
            ${p.tools.slice(0, 3).map(t => `<span class="tag-neutral">${t}</span>`).join('')}
          </div>

          <h3 class="ep-title">${p.title}</h3>

          <p class="ep-objective">${p.summary}</p>

          <div class="ep-problem-box">
            <strong>Business Problem:</strong> ${p.businessProblem}
          </div>

          <div class="ep-actions-row">
            ${p.hasWorkingModel ? `
              <button class="btn btn-primary btn-sm btn-launch-model">
                Open Working Model
              </button>
            ` : ''}
            <button class="btn ${p.hasWorkingModel ? 'btn-secondary' : 'btn-primary'} btn-sm btn-view-study" data-id="${p.id}">
              View Case Study
            </button>
            ${p.hasRepo ? `
              <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
                GitHub Repository ↗
              </a>
            ` : ''}
          </div>
        </div>

        <div class="ep-right">
          <div class="ep-metrics-grid">
            ${metrics.map(m => `
              <div class="ep-metric-unit">
                <span class="m-val">${m.value}</span>
                <span class="m-lbl">${m.label}</span>
              </div>
            `).join('')}
          </div>

          <div class="ep-screenshot-box">
            <span>📷 ${p.screenshotPlaceholder || 'Verified Project Visual Artifact'}</span>
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

  document.getElementById('modalTools').innerHTML = project.tools
    .map(t => `<span class="tag-neutral">${t}</span>`)
    .join('');

  // 01. Overview
  const overviewHtml = `
    <p>${cs.overview ? cs.overview.description : project.summary}</p>
    ${cs.overview ? `
      <p style="margin-top: 0.35rem; font-size: 0.82rem; color: var(--text-muted); font-family: var(--font-mono);">
        Domain: ${cs.overview.domain} | Tools: ${cs.overview.tools}
      </p>
    ` : ''}
  `;
  document.getElementById('modalOverview').innerHTML = overviewHtml;

  // 02. Problem & Objectives
  document.getElementById('modalProblem').textContent = cs.businessProblem || project.businessProblem;

  // 03. Dataset Source
  document.getElementById('modalDataset').textContent = cs.datasetSource || 'Verified analytical dataset.';

  // 04. Data Prep
  const prepList = cs.dataPreparation || [];
  document.getElementById('modalDataPrep').innerHTML = prepList.length > 0
    ? prepList.map(step => `<li>${step}</li>`).join('')
    : '<li>Data imported, normalized, and validated.</li>';

  // 05. Methodology & Code Box
  document.getElementById('modalMethodology').textContent = cs.analysisMethodology || 'Quantitative relational analysis and modeling.';
  const queryBoxContainer = document.getElementById('modalQueryContainer');
  const queryCodeEl = document.getElementById('modalQueryCode');
  if (cs.sampleQuery && queryBoxContainer && queryCodeEl) {
    queryCodeEl.textContent = cs.sampleQuery;
    queryBoxContainer.style.display = 'block';
  } else if (queryBoxContainer) {
    queryBoxContainer.style.display = 'none';
  }

  // 06. Verified Metrics
  document.getElementById('modalMetrics').innerHTML = (project.verifiedMetrics || []).map(m => `
    <div class="metric-item">
      <span class="metric-num">${m.value}</span>
      <span class="metric-lbl">${m.label}</span>
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

  // 09. Limitations & Files
  document.getElementById('modalLimitations').innerHTML = `<strong>Limitations:</strong> ${cs.limitations || 'None documented.'}`;
  const filesInfo = cs.projectFiles
    ? `${cs.projectFiles.type} available in the linked GitHub repository.`
    : 'Public repository documentation and reproduction scripts.';
  document.getElementById('modalFilesInfo').textContent = filesInfo;

  const repoLink = document.getElementById('modalRepoLink');
  if (repoLink) {
    repoLink.href = project.github;
    repoLink.style.display = project.hasRepo ? 'inline-flex' : 'none';
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* ===================================================================
   4. CERTIFICATE PREVIEW MODAL
   =================================================================== */
function initCertificateModal() {
  const certModal = document.getElementById('certModal');
  const btnPreviewCert = document.getElementById('btnPreviewCert');
  const btnCloseCert = document.getElementById('btnCloseCertModal');
  const btnCloseCertBtm = document.getElementById('btnCloseCertModalBtm');

  function openCertModal() {
    if (certModal) {
      certModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCertModal() {
    if (certModal) {
      certModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (btnPreviewCert) btnPreviewCert.addEventListener('click', openCertModal);
  if (btnCloseCert) btnCloseCert.addEventListener('click', closeCertModal);
  if (btnCloseCertBtm) btnCloseCertBtm.addEventListener('click', closeCertModal);

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeCertModal();
    });
  }
}

/* ===================================================================
   5. DATOVA AI: INTERACTIVE WORKING MODEL STUDIO
   =================================================================== */
const studioDatasets = {
  retail: {
    domain: "Retail & E-Commerce",
    healthScore: 94,
    statusText: "Optimal · Production Ready",
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
    statusText: "Optimal · Audited Schema",
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
          <span style="font-size:0.65rem; color:var(--text-muted);">${tbl.rowCount}</span>
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

    nodesContainer.querySelectorAll('.eer-table-node').forEach(node => {
      node.addEventListener('click', () => {
        showToast(`Inspecting Entity: ${node.dataset.table}`);
      });
    });

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

  if (datasetSelect) {
    datasetSelect.addEventListener('change', (e) => {
      currentKey = e.target.value;
      renderEerCanvas(currentKey);
      showToast(`Loaded Domain: ${studioDatasets[currentKey].domain}`);
    });
  }

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

  if (btnRunJoin) {
    btnRunJoin.addEventListener('click', () => {
      btnRunJoin.disabled = true;
      btnRunJoin.textContent = "Executing Query...";
      setTimeout(() => {
        btnRunJoin.disabled = false;
        btnRunJoin.textContent = "▶ Run Join Simulation";
        showToast("Relational join executed deterministically in 16ms.");
      }, 200);
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      renderEerCanvas(currentKey);
      showToast("EER Canvas layout refreshed.");
    });
  }

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

  initAskDatovaChat();
  renderEerCanvas('retail');
}

function initAskDatovaChat() {
  const form = document.getElementById('askChatForm');
  const input = document.getElementById('askInput');
  const messagesList = document.getElementById('askMessagesList');
  const suggestions = document.querySelectorAll('#askSuggestions .chip');

  if (!form || !input || !messagesList) return;

  const cannedAnswers = {
    region: "Based on 99,441 records, São Paulo (SP) represents 42.1% of gross order volume ($6.65M GMV), followed by Rio de Janeiro (RJ) at 12.8% and Minas Gerais (MG) at 11.6%.",
    delay: "Anomalous freight delays (>3 days past SLA) cluster heavily in interstate routes to Rio de Janeiro and the North-East corridor, causing customer review ratings to drop by 2.8 stars on average.",
    payment: "Credit cards dominate with 73.6% of gross marketplace volume, followed by Boleto bancário (19.4%), Vouchers (5.2%), and Debit cards (1.8%)."
  };

  function sendQuestion(text) {
    if (!text.trim()) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'chat-row user';
    userMsg.innerHTML = `
      <div class="chat-bubble"><p>${escapeHtml(text)}</p></div>
    `;
    messagesList.appendChild(userMsg);
    input.value = '';
    messagesList.scrollTop = messagesList.scrollHeight;

    setTimeout(() => {
      let replyText = "Verified figures from model: Total Gross GMV is $15.8M across 99,441 transactions with a 94/100 data health rating and zero duplicate records.";
      const q = text.toLowerCase();
      if (q.includes('region') || q.includes('volume')) replyText = cannedAnswers.region;
      else if (q.includes('delay') || q.includes('shipping')) replyText = cannedAnswers.delay;
      else if (q.includes('payment') || q.includes('method')) replyText = cannedAnswers.payment;

      const aiMsg = document.createElement('div');
      aiMsg.className = 'chat-row assistant';
      aiMsg.innerHTML = `
        <div class="chat-bubble">
          <strong>DATOVA Deterministic Engine</strong>
          <p>${replyText}</p>
        </div>
      `;
      messagesList.appendChild(aiMsg);
      messagesList.scrollTop = messagesList.scrollHeight;
    }, 250);
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
   6. MODALS & RESUME
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
  const btnHeroResume = document.getElementById('btnHeroResume');
  const btnOpenResumeModal = document.getElementById('btnOpenResumeModal');
  const btnCloseResume = document.getElementById('btnCloseResume');
  const btnPrintResume = document.getElementById('btnPrintResume');

  function closeAllModals() {
    if (caseModal) caseModal.classList.remove('active');
    if (datanovaModal) datanovaModal.classList.remove('active');
    if (resumeModal) resumeModal.classList.remove('active');
    const certModal = document.getElementById('certModal');
    if (certModal) certModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (btnCloseCase) btnCloseCase.addEventListener('click', closeAllModals);
  if (btnCloseCaseBtm) btnCloseCaseBtm.addEventListener('click', closeAllModals);

  if (btnCloseDatanova) btnCloseDatanova.addEventListener('click', closeAllModals);
  if (btnCloseDatanovaBtm) btnCloseDatanovaBtm.addEventListener('click', closeAllModals);

  if (btnCloseResume) btnCloseResume.addEventListener('click', closeAllModals);

  [btnNavResume, btnHeroResume, btnOpenResumeModal].forEach(btn => {
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

  [caseModal, datanovaModal, resumeModal].forEach(m => {
    if (m) {
      m.addEventListener('click', (e) => {
        if (e.target === m) closeAllModals();
      });
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

/* ===================================================================
   7. CONTACT FORM & TOAST
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

      showToast("Email draft opened. Thank you!");
      form.reset();
    });
  }

  if (btnCopy && emailVal) {
    btnCopy.addEventListener('click', () => {
      navigator.clipboard.writeText(emailVal.textContent.trim()).then(() => {
        showToast("Email address copied to clipboard");
      });
    });
  }
}

function initDynamicYear() {
  const yearEl = document.getElementById('footerYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function initScrollAnimations() {
  // Check if reduced motion is preferred
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const sections = document.querySelectorAll('.content-section, .editorial-project-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(sec => {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(8px)';
    sec.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    observer.observe(sec);
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
