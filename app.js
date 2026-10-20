/**
 * Mohamed Fazil J - Minimalist Data Analyst & Data Science Portfolio
 * Three.js 3D Visualizer, GoogleFlow Engine & Interactive Lab
 */

document.addEventListener('DOMContentLoaded', () => {
  initThreeDataLattice();
  initGoogleFlow();
  initProjectShowcase();
  initAnalyticsLab();
  initCodeSandbox();
  initModals();
  initContactForm();
});

/* ===================================================================
   1. THREE.JS 3D DATA LATTICE (SMOOTH & LIGHTWEIGHT)
   =================================================================== */
function initThreeDataLattice() {
  const container = document.getElementById('threeContainer');
  if (!container || typeof THREE === 'undefined') return;

  const width = container.clientWidth || 380;
  const height = container.clientHeight || 340;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 5.2;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Group for rotation
  const dataGroup = new THREE.Group();
  scene.add(dataGroup);

  // 1. Central Geometric Icosahedron Data Core
  const coreGeo = new THREE.IcosahedronGeometry(1.6, 1);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x3b82f6,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  dataGroup.add(coreMesh);

  // 2. Data Node Points (Vertices)
  const posAttribute = coreGeo.attributes.position;
  const nodesGeo = new THREE.BufferGeometry();
  nodesGeo.setAttribute('position', posAttribute);

  // Point particles
  const nodesMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.08,
    transparent: true,
    opacity: 0.95
  });
  const nodesMesh = new THREE.Points(nodesGeo, nodesMat);
  dataGroup.add(nodesMesh);

  // 3. Orbiting Data Satellite Ring
  const ringGeo = new THREE.RingGeometry(2.1, 2.15, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x64748b,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.25
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI / 3;
  dataGroup.add(ringMesh);

  // Mouse Parallax Interaction
  let targetRotationX = 0;
  let targetRotationY = 0;
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / height) * 2 - 1);

    if (isDragging) {
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      dataGroup.rotation.y += deltaX * 0.01;
      dataGroup.rotation.x += deltaY * 0.01;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    } else {
      targetRotationX = y * 0.45;
      targetRotationY = x * 0.45;
    }
  });

  // Touch Support
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;
      dataGroup.rotation.y += deltaX * 0.01;
      dataGroup.rotation.x += deltaY * 0.01;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Responsive resize
  window.addEventListener('resize', () => {
    const newW = container.clientWidth || 380;
    const newH = container.clientHeight || 340;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  });

  // Animation Loop (60 FPS)
  function animate() {
    requestAnimationFrame(animate);

    // Continuous subtle auto-rotation
    dataGroup.rotation.y += 0.0035;
    dataGroup.rotation.x += 0.0018;

    // Smooth inertia interpolation
    if (!isDragging) {
      dataGroup.rotation.y += (targetRotationY - dataGroup.rotation.y) * 0.03;
      dataGroup.rotation.x += (targetRotationX - dataGroup.rotation.x) * 0.03;
    }

    renderer.render(scene, camera);
  }

  animate();
}

/* ===================================================================
   2. GOOGLEFLOW: INTERACTIVE LIFECYCLE DEEP-DIVE
   =================================================================== */
const flowStepDetails = {
  1: {
    badge: "Step 01 Deep-Dive: Ingestion & Relational Architecture",
    title: "Extracting Multi-Table Data with Production SQL",
    body: "In the Chinook database project, I analyzed across 11 normalized relational entities using CTEs and window partition functions. This avoided nested subquery bottlenecks and ensured sub-25ms query execution times across 2,200+ transactional records.",
    metric: "Demonstrated in Project: SQL Business Case Studies (Chinook)"
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
   3. PROJECT SHOWCASE WITH 3D CARD TILT
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
      <article class="project-card" data-id="${p.id}">
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
          <button class="btn btn-outline btn-sm btn-inspect" data-id="${p.id}">Case Study</button>
          <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn-solid btn-sm">GitHub →</a>
        </div>
      </article>
    `).join('');

    // Attach 3D tilt listeners to project cards
    apply3DTilt(container.querySelectorAll('.project-card'));

    // Attach inspect modal listeners
    container.querySelectorAll('.btn-inspect').forEach(btn => {
      btn.addEventListener('click', () => {
        const proj = portfolioProjects.find(i => i.id === btn.dataset.id);
        if (proj) openCaseStudyModal(proj);
      });
    });
  }

  // 3D Card Perspective Tilt Effect
  function apply3DTilt(cardElements) {
    cardElements.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
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
   4. LIVE ANALYTICS LAB (CHART.JS MINIMALIST)
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
      text: "Employees in their first 2 years working overtime show an alarming 39.2% attrition rate—nearly 3.5x that of standard hour colleagues. Implemented proactive retention triggers and salary benchmarking in the Power BI model to alert department heads before critical resignation thresholds."
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
      text: "Once an e-commerce order is delayed past 3 days, review scores collapse from 4.65★ to 2.75★, increasing customer churn risk by 64%. Identified interstate distribution corridors in Rio de Janeiro as the primary bottleneck."
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
      text: "Rock and Latin tracks generate over 70% of total lifetime spend. Querying basket affinity with self-joins revealed that customers buying Latin albums have a 42% propensity to cross-purchase Jazz collections, providing a clear recommendation for automated playlist curation."
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

  // Global Chart.js styling
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.plugins.tooltip.backgroundColor = '#161922';
  Chart.defaults.plugins.tooltip.borderColor = 'rgba(255, 255, 255, 0.1)';
  Chart.defaults.plugins.tooltip.borderWidth = 1;

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
    print(f"Upper Threshold: {upper_bound:.2f} | Detected Anomalies: {len(anomalies)}")
    return anomalies

# Execution Demonstration
print("== Summary Statistics for Retail Basket Margin ==")
# Evaluated 50,000 retail records with 99.2% statistical confidence`,
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
    if (e.key === 'Escape') closeModals();
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
