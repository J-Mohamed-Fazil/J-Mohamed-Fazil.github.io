/**
 * Mohamed Fazil J — Professional Minimal Data Portfolio & DATOVA AI Studio
 * Features Interactive EER Model Studio, GoogleFlow, and Live Analytics
 */

document.addEventListener('DOMContentLoaded', () => {
  initDatanovaStudio();
  initGoogleFlow();
  initProjectShowcase();
  initAnalyticsLab();
  initCodeSandbox();
  initModals();
  initContactForm();
});

/* ===================================================================
   1. DATOVA AI: INTERACTIVE WORKING MODEL STUDIO
   =================================================================== */

const studioDatasets = {
  retail: {
    domain: "Retail & E-Commerce",
    healthScore: 94,
    statusText: "Excellent · Production Ready",
    duplicates: "0.0% (Clean)",
    missing: "1.2% (Imputed via Median)",
    types: "100% (Deterministic)",
    anomalies: "284 (IQR Method)",
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
    relations: [
      { from: "CUSTOMERS", to: "ORDERS", key: "customer_id", card: "1 ──< N" },
      { from: "ORDERS", to: "PAYMENTS", key: "order_id", card: "1 ──< N" },
      { from: "ORDERS", to: "ORDER_ITEMS", key: "order_id", card: "1 ──< N" }
    ],
    simQuery: "SELECT c.customer_id, c.customer_state, o.order_id, p.payment_type, p.payment_value FROM CUSTOMERS c INNER JOIN ORDERS o ON c.customer_id = o.customer_id INNER JOIN PAYMENTS p ON o.order_id = p.order_id LIMIT 5;",
    simRows: [
      ["CUST-9821", "SP", "ORD-10492", "credit_card", "$142.50"],
      ["CUST-9821", "SP", "ORD-10512", "credit_card", "$89.00"],
      ["CUST-4112", "RJ", "ORD-10493", "boleto", "$210.30"],
      ["CUST-7740", "MG", "ORD-10494", "credit_card", "$45.80"],
      ["CUST-3209", "PR", "ORD-10495", "voucher", "$65.00"]
    ],
    simHeaders: ["customer_id", "customer_state", "order_id", "payment_type", "payment_value"]
  },

  hr: {
    domain: "Corporate HR & Workforce",
    healthScore: 98,
    statusText: "Optimal · Zero Leakage",
    duplicates: "0.0% (Clean)",
    missing: "0.0% (Complete Records)",
    types: "100% (Deterministic)",
    anomalies: "48 (Compensation IQR)",
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
      },
      {
        name: "PERFORMANCE",
        rowCount: "1,470 rows",
        cols: [
          { name: "perf_id", type: "INT", isPk: true },
          { name: "employee_id", type: "INT", isFk: true },
          { name: "satisfaction", type: "INT", isFk: false },
          { name: "years_at_company", type: "INT", isFk: false }
        ]
      }
    ],
    relations: [
      { from: "EMPLOYEES", to: "COMPENSATION", key: "employee_id", card: "1 ──< 1" },
      { from: "EMPLOYEES", to: "PERFORMANCE", key: "employee_id", card: "1 ──< 1" }
    ],
    simQuery: "SELECT e.employee_id, e.job_role, e.attrition, c.monthly_rate, c.overtime FROM EMPLOYEES e JOIN COMPENSATION c ON e.employee_id = c.employee_id WHERE c.overtime = 'Yes' LIMIT 5;",
    simRows: [
      ["EMP-1002", "Sales Executive", "Yes", "$5,993", "Yes"],
      ["EMP-1007", "Research Scientist", "No", "$4,120", "Yes"],
      ["EMP-1014", "Sales Rep", "Yes", "$2,450", "Yes"],
      ["EMP-1022", "Lab Technician", "No", "$3,200", "Yes"],
      ["EMP-1035", "Sales Rep", "Yes", "$2,100", "Yes"]
    ],
    simHeaders: ["employee_id", "job_role", "attrition", "monthly_rate", "overtime"]
  },

  banking: {
    domain: "Commercial Banking & Fraud",
    healthScore: 96,
    statusText: "Audited · PCI Compliant Schema",
    duplicates: "0.0% (Clean)",
    missing: "0.4% (Imputed)",
    types: "100% (Deterministic)",
    anomalies: "112 (Velocity Z-Score)",
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
      },
      {
        name: "LOANS",
        rowCount: "12.4K loans",
        cols: [
          { name: "loan_id", type: "INT", isPk: true },
          { name: "account_id", type: "INT", isFk: true },
          { name: "principal", type: "DECIMAL(10,2)", isFk: false },
          { name: "status", type: "VARCHAR(15)", isFk: false }
        ]
      }
    ],
    relations: [
      { from: "CLIENTS", to: "ACCOUNTS", key: "client_id", card: "1 ──< N" },
      { from: "ACCOUNTS", to: "TRANSACTIONS", key: "account_id", card: "1 ──< N" },
      { from: "ACCOUNTS", to: "LOANS", key: "account_id", card: "1 ──< N" }
    ],
    simQuery: "SELECT c.client_id, a.account_id, a.account_type, t.amount, t.is_flagged FROM CLIENTS c JOIN ACCOUNTS a ON c.client_id = a.client_id JOIN TRANSACTIONS t ON a.account_id = t.account_id WHERE t.amount > 5000 LIMIT 5;",
    simRows: [
      ["CLI-4819", "ACC-9012", "Checking", "$12,450.00", "True"],
      ["CLI-1120", "ACC-4491", "Business", "$8,200.00", "False"],
      ["CLI-6302", "ACC-7188", "Savings", "$5,500.00", "False"],
      ["CLI-9941", "ACC-3042", "Checking", "$18,900.00", "True"],
      ["CLI-2511", "ACC-5510", "Business", "$6,420.00", "False"]
    ],
    simHeaders: ["client_id", "account_id", "account_type", "amount", "is_flagged"]
  }
};

function initDatanovaStudio() {
  const modal = document.getElementById('datanovaModal');
  const btnClose = document.getElementById('btnCloseDatanovaModal');
  const btnCloseBtm = document.getElementById('btnCloseDatanovaModalBottom');
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
        showToast(`Inspecting Table: ${node.dataset.table}`);
      });
    });

    // Render simulation output
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
      showToast(`Loaded DATOVA Domain: ${studioDatasets[currentKey].domain}`);
    });
  }

  // Switch Views
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
        showToast("Relational join executed in 16ms.");
      }, 250);
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      renderEerCanvas(currentKey);
      showToast("EER Canvas layout reset.");
    });
  }

  // Open & Close Handlers
  function openStudio() {
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      renderEerCanvas(currentKey);
    }
  }

  function closeStudio() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.btn-launch-model').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openStudio();
    });
  });

  if (btnClose) btnClose.addEventListener('click', closeStudio);
  if (btnCloseBtm) btnCloseBtm.addEventListener('click', closeStudio);

  // Ask DATOVA Chat Simulation
  initAskDatovaChat();

  renderEerCanvas('retail');
}

/* Ask DATOVA AI Chat Logic */
function initAskDatovaChat() {
  const form = document.getElementById('askChatForm');
  const input = document.getElementById('askInput');
  const messagesList = document.getElementById('askMessagesList');
  const suggestions = document.querySelectorAll('#askSuggestions .prompt-chip');

  if (!form || !input || !messagesList) return;

  const cannedAnswers = {
    region: "Based on 99,441 records, São Paulo (SP) represents 42.1% of gross order volume ($6.65M GMV), followed by Rio de Janeiro (RJ) at 12.8% and Minas Gerais (MG) at 11.6%.",
    delay: "Anomalous freight delays (>3 days past SLA) cluster heavily in interstate routes to Rio de Janeiro and the North-East corridor, causing customer review ratings to fall by 2.8 stars on average.",
    payment: "Credit cards dominate with 73.6% of gross marketplace volume, followed by Boleto bancário (19.4%), Vouchers (5.2%), and Debit cards (1.8%)."
  };

  function sendQuestion(text) {
    if (!text.trim()) return;

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user';
    userMsg.innerHTML = `
      <div class="msg-avatar">You</div>
      <div class="msg-bubble"><p>${escapeHtml(text)}</p></div>
    `;
    messagesList.appendChild(userMsg);
    input.value = '';
    messagesList.scrollTop = messagesList.scrollHeight;

    // Simulate AI thinking and reply
    setTimeout(() => {
      let replyText = "I queried the relational model. Here is the breakdown: Total verified GMV is $15.8M across 99,441 transactions with a 94/100 data health rating and zero detected duplicate entities.";
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
    }, 350);
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
   2. GOOGLEFLOW: ANALYTICS LIFECYCLE
   =================================================================== */
const flowStepDetails = {
  1: {
    badge: "Step 01 Deep-Dive: Ingestion & Relational Architecture",
    title: "Extracting Multi-Table Data with Production SQL & DATOVA AI",
    body: "In DATOVA AI and the Chinook project, I engineered automated relational schema profiling across multi-table stores using SQL CTEs and deterministic type inference, achieving sub-25ms response times across thousands of records.",
    metric: "Demonstrated in Project: DATOVA AI & SQL Business Case Studies"
  },
  2: {
    badge: "Step 02 Deep-Dive: Automated Cleaning & Transformation",
    title: "Power Query M-Code & Pandas Imputation Pipeline",
    body: "In the Olist E-Commerce project, I engineered an automated ETL pipeline handling 100K+ Brazilian marketplace transactions. I performed deduplication, datetime parsing for freight SLAs, and handled missing review metrics with strict statistical consistency.",
    metric: "Demonstrated in Project: Olist E-Commerce Sales Analytics (Excel & Power Query)"
  },
  3: {
    badge: "Step 03 Deep-Dive: Dimensional Modeling & DAX Engine",
    title: "Star Schema Modeling & Custom Time-Intelligence Measures",
    body: "In the HR Attrition analytics dashboard, I structured FactAttrition with DimEmployee, DimDepartment, and DimTenure. I authored DAX calculations for dynamic turnover rates, overtime variance, and cohort risk multipliers.",
    metric: "Demonstrated in Project: HR Employee Attrition Analytics (Power BI & DAX)"
  },
  4: {
    badge: "Step 04 Deep-Dive: Executive Visualization & Storytelling",
    title: "Minimalist, High-Clarity Dashboards for Leaders",
    body: "Rather than cluttered charts, I design single-screen executive dashboards with clean visual hierarchy, dynamic slicers, drilldowns, and conditional color thresholds that immediately highlight problem areas.",
    metric: "Demonstrated in Project: Power BI & Tableau Visual Labs"
  },
  5: {
    badge: "Step 05 Deep-Dive: Actionable ROI & Business Outcomes",
    title: "Quantifiable Insights That Drive Retention & Margin",
    body: "My analysis identified that early-tenure sales representatives (<2 years) had a 39.2% turnover hazard directly tied to overtime burnout. The recommendation provided leadership with a concrete retention roadmap.",
    metric: "Demonstrated in Project: HR Workforce Strategy & Olist Logistics SLA"
  }
};

function initGoogleFlow() {
  const cards = document.querySelectorAll('.flow-step-card');
  const badgeEl = document.getElementById('flowDetailBadge');
  const titleEl = document.getElementById('flowDetailTitle');
  const bodyEl = document.getElementById('flowDetailBody');
  const metricEl = document.getElementById('flowDetailMetric');

  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const stepNum = card.dataset.step;
      const detail = flowStepDetails[stepNum];
      if (detail) {
        badgeEl.textContent = detail.badge;
        titleEl.textContent = detail.title;
        bodyEl.textContent = detail.body;
        metricEl.innerHTML = `<span>Demonstrated in Project:</span> <strong>${detail.metric.replace('Demonstrated in Project: ', '')}</strong>`;
      }
    });
  });
}

/* ===================================================================
   3. PROJECT SHOWCASE (WITH DATOVA PROMINENCE)
   =================================================================== */
function initProjectShowcase() {
  const container = document.getElementById('projectsContainer');
  const countEl = document.getElementById('totalProjCount');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('projectSearchInput');

  if (!container || typeof portfolioProjects === 'undefined') return;

  let currentCategory = 'all';
  let searchQuery = '';

  if (countEl) countEl.textContent = portfolioProjects.length;

  function renderProjects() {
    const filtered = portfolioProjects.filter(p => {
      const matchCategory = currentCategory === 'all' || p.category === currentCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = !searchQuery || 
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tools.some(t => t.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 3rem; text-align: center; background: var(--bg-surface); border: 1px solid var(--border-hairline); border-radius: var(--radius-md);">
          <p style="color: var(--text-muted);">No projects found matching "<strong>${escapeHtml(searchQuery)}</strong>".</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(p => `
      <article class="project-card ${p.category === 'flagship' ? 'flagship-card' : ''}" data-id="${p.id}">
        <div class="card-top">
          <span class="card-badge">${p.badge || p.category.toUpperCase()}</span>
          <span class="card-impact">${p.impact}</span>
        </div>

        <h3 class="card-title">${p.title}</h3>
        <p class="card-desc">${p.summary}</p>

        <div class="card-kpis">
          ${p.metrics.slice(0, 2).map(m => `
            <div class="kpi-unit">
              <span class="k-v">${m.value}</span>
              <span class="k-l">${m.label}</span>
            </div>
          `).join('')}
        </div>

        <div class="card-tools">
          ${p.tools.map(t => `<span class="tool-tag">${t}</span>`).join('')}
        </div>

        <div class="card-footer">
          ${p.hasWorkingModel ? `
            <button class="btn btn-solid btn-sm btn-launch-model">
              ⚡ Open Working Model
            </button>
          ` : `
            <button class="btn btn-outline btn-sm btn-inspect" data-id="${p.id}">Case Study</button>
          `}
          <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">GitHub →</a>
        </div>
      </article>
    `).join('');

    // Reattach listeners
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

    container.querySelectorAll('.btn-inspect').forEach(btn => {
      btn.addEventListener('click', () => {
        const proj = portfolioProjects.find(i => i.id === btn.dataset.id);
        if (proj) openCaseStudyModal(proj);
      });
    });
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.filter;
      renderProjects();
    });
  });

  // Search
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderProjects();
  });

  renderProjects();
}

/* ===================================================================
   4. LIVE ANALYTICS LAB (CHART.JS)
   =================================================================== */
let primaryChartInstance = null;
let secondaryChartInstance = null;

const labDatasets = {
  attrition: {
    title1: "Attrition Rate by Department (%)",
    tag1: "Power BI Model",
    title2: "Overtime vs Attrition Across Tenure (Years)",
    tag2: "DAX Measures",
    metrics: [
      { label: "Headcount", value: "1,470" },
      { label: "Attrition", value: "16.1%" },
      { label: "Overtime Turnover", value: "30.5%" },
      { label: "Risk Cohort", value: "Sales Reps (<2y)" }
    ],
    chart1: {
      type: 'bar',
      data: {
        labels: ['Sales', 'Human Resources', 'Research & Dev'],
        datasets: [{
          label: 'Attrition Rate (%)',
          data: [20.6, 19.0, 13.8],
          backgroundColor: '#3b82f6',
          borderRadius: 4
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true, max: 25, ticks: { callback: v => v + '%' } }
        }
      }
    },
    chart2: {
      type: 'line',
      data: {
        labels: ['< 1y', '1-2y', '3-5y', '6-10y', '10y+'],
        datasets: [
          {
            label: 'Overtime',
            data: [39.2, 33.5, 24.1, 15.0, 8.4],
            borderColor: '#f8fafc',
            backgroundColor: 'transparent',
            tension: 0.3,
            pointRadius: 3
          },
          {
            label: 'No Overtime',
            data: [13.1, 11.4, 9.8, 6.2, 3.9],
            borderColor: '#64748b',
            borderDash: [5, 5],
            backgroundColor: 'transparent',
            tension: 0.3,
            pointRadius: 3
          }
        ]
      },
      options: {
        scales: {
          y: { beginAtZero: true, max: 45, ticks: { callback: v => v + '%' } }
        }
      }
    },
    insight: {
      title: "Key Analytical Takeaway: Early Career Overtime Fatigue",
      text: "Employees in their first 2 years working overtime show an alarming 39.2% attrition rate—nearly 3.5x that of standard hour colleagues. Implemented proactive retention triggers in the Power BI model."
    }
  },

  olist: {
    title1: "Top 5 Categories by Gross Revenue ($M)",
    tag1: "Excel Power Query ETL",
    title2: "Delivery Delay (Days) vs Review Score (Stars)",
    tag2: "Logistics SLA",
    metrics: [
      { label: "Gross GMV", value: "$15.8M" },
      { label: "Orders Analyzed", value: "99.4K" },
      { label: "Average Delivery", value: "12.5 Days" },
      { label: "SLA Penalty Drop", value: "-2.8 Stars" }
    ],
    chart1: {
      type: 'bar',
      data: {
        labels: ['Health & Beauty', 'Watches & Gifts', 'Bed Bath Table', 'Sports & Leisure', 'Computers & Acc'],
        datasets: [{
          label: 'Revenue ($M)',
          data: [1.44, 1.31, 1.25, 1.16, 1.09],
          backgroundColor: '#3b82f6',
          borderRadius: 4
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true, max: 1.8, ticks: { callback: v => '$' + v + 'M' } }
        }
      }
    },
    chart2: {
      type: 'line',
      data: {
        labels: ['On Time', '1-2d Late', '3-5d Late', '6-10d Late', '10d+ Late'],
        datasets: [{
          label: 'Customer Review Rating',
          data: [4.65, 3.82, 2.75, 1.95, 1.25],
          borderColor: '#3b82f6',
          backgroundColor: 'transparent',
          tension: 0.3,
          pointRadius: 4
        }]
      },
      options: {
        scales: {
          y: { min: 1, max: 5, ticks: { callback: v => v + ' ★' } }
        }
      }
    },
    insight: {
      title: "Key Analytical Takeaway: Non-Linear SLA Collapse",
      text: "Once an e-commerce order is delayed past 3 days, review scores collapse from 4.65★ to 2.75★, increasing customer churn risk by 64%."
    }
  },

  chinook: {
    title1: "Genre Contribution to Total Revenue (%)",
    tag1: "SQL CTE Model",
    title2: "Top Markets by Customer Lifetime Spend ($)",
    tag2: "Window Function Rank",
    metrics: [
      { label: "Relational Tables", value: "11" },
      { label: "Repeat Buyers", value: "68.2%" },
      { label: "Dominant Genre", value: "Rock (53.4%)" },
      { label: "Query Execution", value: "< 24ms" }
    ],
    chart1: {
      type: 'doughnut',
      data: {
        labels: ['Rock', 'Latin', 'Metal', 'Alternative', 'Jazz', 'Others'],
        datasets: [{
          data: [53.4, 16.8, 11.2, 6.5, 4.2, 7.9],
          backgroundColor: ['#3b82f6', '#60a5fa', '#93c5fd', '#64748b', '#475569', '#334155'],
          borderColor: '#090a0f',
          borderWidth: 2
        }]
      },
      options: {
        plugins: {
          legend: { position: 'right', labels: { boxWidth: 12, color: '#94a3b8' } }
        }
      }
    },
    chart2: {
      type: 'bar',
      data: {
        labels: ['USA', 'Canada', 'France', 'Brazil', 'Germany'],
        datasets: [{
          label: 'Total Spend ($)',
          data: [523.06, 303.96, 195.10, 190.10, 156.48],
          backgroundColor: '#3b82f6',
          borderRadius: 4
        }]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: { beginAtZero: true, ticks: { callback: v => '$' + v } }
        }
      }
    },
    insight: {
      title: "Key Analytical Takeaway: Genre Concentration & Cross-Sell Opportunity",
      text: "Rock and Latin tracks generate over 70% of total lifetime spend. Querying basket affinity with self-joins revealed high propensity to cross-purchase Jazz collections."
    }
  }
};

function initAnalyticsLab() {
  const tabs = document.querySelectorAll('.ds-tab');
  const metricsBar = document.getElementById('labMetricsBar');
  const chart1Title = document.getElementById('chart1Title');
  const chart1Tag = document.getElementById('chart1Tag');
  const chart2Title = document.getElementById('chart2Title');
  const chart2Tag = document.getElementById('chart2Tag');
  const insightBox = document.getElementById('labInsightBox');

  const canvas1 = document.getElementById('primaryChart');
  const canvas2 = document.getElementById('secondaryChart');

  if (!canvas1 || !canvas2 || typeof Chart === 'undefined') return;

  function loadDataset(key) {
    const ds = labDatasets[key];
    if (!ds) return;

    chart1Title.textContent = ds.title1;
    chart1Tag.textContent = ds.tag1;
    chart2Title.textContent = ds.title2;
    chart2Tag.textContent = ds.tag2;

    metricsBar.innerHTML = ds.metrics.map(m => `
      <div class="kpi-block">
        <span class="lbl">${m.label}</span>
        <span class="val">${m.value}</span>
      </div>
    `).join('');

    insightBox.innerHTML = `
      <strong>${ds.insight.title}</strong>
      <p>${ds.insight.text}</p>
    `;

    if (primaryChartInstance) primaryChartInstance.destroy();
    if (secondaryChartInstance) secondaryChartInstance.destroy();

    const commonOpts = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: ds.chart1.type === 'doughnut' }
      }
    };

    primaryChartInstance = new Chart(canvas1, {
      type: ds.chart1.type,
      data: ds.chart1.data,
      options: { ...commonOpts, ...(ds.chart1.options || {}) }
    });

    secondaryChartInstance = new Chart(canvas2, {
      type: ds.chart2.type,
      data: ds.chart2.data,
      options: { ...commonOpts, ...(ds.chart2.options || {}) }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      loadDataset(tab.dataset.dataset);
    });
  });

  loadDataset('attrition');
}

/* ===================================================================
   5. SQL & PYTHON SANDBOX SIMULATION
   =================================================================== */
const codeSnippets = {
  clv: {
    lang: "SQL (MySQL 8.0+ / PostgreSQL)",
    desc: "Calculates customer lifetime spend, running totals, and cohort classification using CTEs & Window Functions.",
    code: `-- Case Study: Chinook Music Store Customer Lifetime Value (CLV)
WITH CustomerSpend AS (
    SELECT 
        c.CustomerId,
        CONCAT(c.FirstName, ' ', c.LastName) AS CustomerName,
        c.Country,
        COUNT(i.InvoiceId) AS TotalOrders,
        ROUND(SUM(i.Total), 2) AS LifetimeValue,
        MIN(i.InvoiceDate) AS FirstPurchaseDate
    FROM Customer c
    JOIN Invoice i ON c.CustomerId = i.CustomerId
    GROUP BY c.CustomerId, c.FirstName, c.LastName, c.Country
),
RankedCustomers AS (
    SELECT 
        CustomerId,
        CustomerName,
        Country,
        TotalOrders,
        LifetimeValue,
        DENSE_RANK() OVER (ORDER BY LifetimeValue DESC) AS ValueRank,
        ROUND(SUM(LifetimeValue) OVER (
            ORDER BY LifetimeValue DESC 
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ), 2) AS RunningTotalRevenue
    FROM CustomerSpend
)
SELECT 
    ValueRank,
    CustomerName,
    Country,
    TotalOrders,
    CONCAT('$', LifetimeValue) AS TotalSpent,
    CONCAT('$', RunningTotalRevenue) AS CumulativeRevenue
FROM RankedCustomers
WHERE ValueRank <= 5;`,
    headers: ["Rank", "Customer Name", "Country", "Orders", "Total Spent", "Cumulative GMV"],
    rows: [
      ["#1", "Helena Holý", "Czech Republic", "7", "$49.62", "$49.62"],
      ["#2", "Richard Cunningham", "USA", "7", "$47.62", "$97.24"],
      ["#3", "Luis Rojas", "Chile", "7", "$46.62", "$143.86"],
      ["#4", "Ladislav Kovács", "Hungary", "7", "$45.62", "$189.48"],
      ["#5", "Hugh O'Reilly", "Ireland", "7", "$45.62", "$235.10"]
    ],
    execTime: "18ms",
    rowsCount: "5 rows (scanned 2,240 records)"
  },

  sales_rank: {
    lang: "SQL (Window Partitioning)",
    desc: "Evaluates sales representative quota attainment, revenue generation, and rank within fiscal support assignments.",
    code: `-- Case Study: Sales Support Representative Performance Benchmark
WITH RepRevenue AS (
    SELECT 
        e.EmployeeId,
        CONCAT(e.FirstName, ' ', e.LastName) AS RepName,
        e.Title,
        COUNT(DISTINCT c.CustomerId) AS ActiveAccounts,
        COUNT(i.InvoiceId) AS InvoicesClosed,
        ROUND(SUM(i.Total), 2) AS RevenueGenerated
    FROM Employee e
    JOIN Customer c ON e.EmployeeId = c.SupportRepId
    JOIN Invoice i ON c.CustomerId = i.CustomerId
    GROUP BY e.EmployeeId, e.FirstName, e.LastName, e.Title
)
SELECT 
    RepName,
    Title,
    ActiveAccounts,
    InvoicesClosed,
    CONCAT('$', RevenueGenerated) AS TotalSales,
    ROUND((RevenueGenerated / SUM(RevenueGenerated) OVER()) * 100, 1) AS PctContribution,
    DENSE_RANK() OVER (ORDER BY RevenueGenerated DESC) AS RankPosition
FROM RepRevenue;`,
    headers: ["Rep Name", "Title", "Accounts", "Invoices", "Total Sales", "Contribution (%)", "Rank"],
    rows: [
      ["Jane Peacock", "Sales Support Agent", "21", "146", "$833.04", "35.8%", "#1"],
      ["Margaret Park", "Sales Support Agent", "20", "140", "$775.40", "33.3%", "#2"],
      ["Steve Johnson", "Sales Support Agent", "18", "126", "$720.16", "30.9%", "#3"]
    ],
    execTime: "14ms",
    rowsCount: "3 reps evaluated (100% distribution)"
  },

  python_eda: {
    lang: "Python 3.11 (Pandas & Scikit)",
    desc: "Statistical script identifying transaction anomalies in retail data and computing correlation coefficients.",
    code: `import pandas as pd
import numpy as np

def detect_outliers_iqr(df, column_name):
    """Calculates IQR boundaries and isolates anomalous transactions."""
    q25 = df[column_name].quantile(0.25)
    q75 = df[column_name].quantile(0.75)
    iqr = q75 - q25
    
    lower_bound = q25 - (1.5 * iqr)
    upper_bound = q75 + (1.5 * iqr)
    
    anomalies = df[(df[column_name] < lower_bound) | (df[column_name] > upper_bound)]
    print(f"Feature: {column_name} | Q25: {q25:.2f} | Q75: {q75:.2f} | IQR: {iqr:.2f}")
    return anomalies`,
    headers: ["Feature Evaluated", "25th Percentile", "75th Percentile", "IQR Spread", "Upper Bound", "Outliers Flagged"],
    rows: [
      ["Gross Revenue ($)", "$42.50", "$148.90", "$106.40", "$308.50", "284 transactions (0.5%)"],
      ["Unit Discount (%)", "5.0%", "15.0%", "10.0%", "30.0%", "118 transactions (0.2%)"],
      ["Delivery Days", "3.0 days", "9.0 days", "6.0 days", "18.0 days", "412 shipments (0.8%)"]
    ],
    execTime: "24ms",
    rowsCount: "3 features audited across 50K rows"
  }
};

function initCodeSandbox() {
  const tabs = document.querySelectorAll('.code-tab');
  const codeArea = document.getElementById('codeDisplayArea');
  const langBadge = document.getElementById('editorLangBadge');
  const fileDesc = document.getElementById('editorFileDesc');
  const btnRun = document.getElementById('btnRunQuery');
  const execTimeEl = document.getElementById('execTime');
  const rowsCountEl = document.getElementById('rowsCount');
  const tableWrap = document.getElementById('resultTableWrap');

  if (!codeArea || !tableWrap) return;

  let activeSnippet = 'clv';

  function displaySnippet(key) {
    const item = codeSnippets[key];
    if (!item) return;

    activeSnippet = key;
    langBadge.textContent = item.lang;
    fileDesc.textContent = item.desc;
    codeArea.textContent = item.code;

    execTimeEl.textContent = item.execTime;
    rowsCountEl.textContent = item.rowsCount;

    tableWrap.innerHTML = `
      <table class="sim-table">
        <thead>
          <tr>${item.headers.map(h => `<th>${h}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${item.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    `;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      displaySnippet(tab.dataset.query);
    });
  });

  if (btnRun) {
    btnRun.addEventListener('click', () => {
      btnRun.disabled = true;
      btnRun.textContent = "Executing...";

      setTimeout(() => {
        btnRun.disabled = false;
        btnRun.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          <span>Run Simulation</span>
        `;
        showToast("Query simulation completed in 18ms.");
        displaySnippet(activeSnippet);
      }, 300);
    });
  }

  displaySnippet('clv');
}

/* ===================================================================
   6. MODALS & RESUME
   =================================================================== */
function initModals() {
  const caseModal = document.getElementById('caseStudyModal');
  const btnCloseCase = document.getElementById('btnCloseModal');
  const btnCloseCaseBtm = document.getElementById('btnCloseModalBtm');

  const resumeModal = document.getElementById('resumeModal');
  const btnNavResume = document.getElementById('btnNavResume');
  const btnHeroResume = document.getElementById('btnHeroResume');
  const btnRecruiterResume = document.getElementById('btnRecruiterResume');
  const btnFooterResume = document.getElementById('btnFooterResume');
  const btnCloseResume = document.getElementById('btnCloseResume');
  const btnPrintResume = document.getElementById('btnPrintResume');

  function closeModals() {
    if (caseModal) caseModal.classList.remove('active');
    if (resumeModal) resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (btnCloseCase) btnCloseCase.addEventListener('click', closeModals);
  if (btnCloseCaseBtm) btnCloseCaseBtm.addEventListener('click', closeModals);
  if (btnCloseResume) btnCloseResume.addEventListener('click', closeModals);

  [btnNavResume, btnHeroResume, btnRecruiterResume, btnFooterResume].forEach(btn => {
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

  [caseModal, resumeModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModals();
      });
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModals();
      const datanovaModal = document.getElementById('datanovaModal');
      if (datanovaModal) {
        datanovaModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
}

function openCaseStudyModal(project) {
  const modal = document.getElementById('caseStudyModal');
  if (!modal) return;

  document.getElementById('modalBadge').textContent = project.badge || project.category.toUpperCase();
  document.getElementById('modalTitle').textContent = project.title;

  document.getElementById('modalTools').innerHTML = project.tools
    .map(t => `<span class="tag-minimal">${t}</span>`)
    .join('');

  document.getElementById('modalMetrics').innerHTML = project.metrics
    .map(m => `
      <div class="m-kpi-item">
        <span class="v">${m.value}</span>
        <span class="l">${m.label}</span>
      </div>
    `).join('');

  document.getElementById('modalProblem').textContent = project.caseStudy.problem;
  document.getElementById('modalMethodology').textContent = project.caseStudy.methodology;
  document.getElementById('modalOutcome').textContent = project.caseStudy.outcome;

  document.getElementById('modalHighlights').innerHTML = project.highlights
    .map(h => `<li>${h}</li>`)
    .join('');

  const repoLink = document.getElementById('modalRepoLink');
  if (repoLink) repoLink.href = project.github;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* ===================================================================
   7. CONTACT & TOAST
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

      showToast("Email client opened. Thank you!");
      form.reset();
    });
  }

  if (btnCopy && emailVal) {
    btnCopy.addEventListener('click', () => {
      navigator.clipboard.writeText(emailVal.textContent.trim()).then(() => {
        showToast("Email copied to clipboard!");
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
