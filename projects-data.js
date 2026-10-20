const portfolioProjects = [
  {
    id: "olist-ecommerce-excel",
    title: "Brazilian E-Commerce Sales Analysis",
    role: "Lead Analyst · End-to-End Excel BI Project",
    category: "excel",
    badge: "Microsoft Excel & Power Query",
    tools: ["Microsoft Excel", "Power Query", "PivotTables", "PivotCharts", "Slicers", "ETL"],
    summary: "Comprehensive multi-table sales and logistics performance analysis using the 100k+ record Olist Brazilian E-Commerce dataset. Built automated Power Query ETL pipelines, dynamic KPI scorecards, and regional fulfillment delay models.",
    impact: "100k+ Rows Cleaned · 5-Dataset Star Model",
    metrics: [
      { label: "Orders Analyzed", value: "99,441" },
      { label: "Gross Revenue", value: "$15.8M" },
      { label: "Average Delivery SLA", value: "12.5 Days" },
      { label: "Delayed Order Impact", value: "-2.8★ Rating" }
    ],
    github: "https://github.com/J-Mohamed-Fazil/olist-sales-analytics-excel",
    hasWorkingModel: false,
    
    // The 9-part project presentation structure
    caseStudy: {
      overview: {
        domain: "E-Commerce & Supply Chain Logistics",
        tools: "Microsoft Excel, Power Query, PivotTables, Calculated Columns, Slicers",
        description: "An end-to-end business intelligence analysis of Brazilian e-commerce transactions evaluating sales velocity, customer geographic distribution, payment behaviors, and freight delivery bottlenecks."
      },
      businessProblem: "Executive leadership lacked unified visibility into regional delivery delays and revenue concentration across Brazilian states. Fragmented CSV exports across orders, payments, products, and reviews made it difficult to isolate why certain regions suffered severe customer review drops.",
      datasetSource: "Olist Brazilian E-Commerce public dataset comprising 9 relational tables (Orders, Order Items, Customers, Products, Payments, Reviews, Sellers, Geolocation, Category Translations) totaling over 100,000 verified transaction records.",
      dataPreparation: [
        "Imported raw CSVs into Excel using Power Query (Get & Transform Data).",
        "Handled missing values in customer review scores and delivery timestamps using conditional replacement logic.",
        "Created custom calculated columns in M-code: Delivery_Delay_Days (Actual Delivery - Estimated Delivery Date).",
        "Standardized Portuguese-to-English product category translations and validated date-time data types across 99k+ rows.",
        "Merged order items with product dimensions to ensure clean 1-to-many relationship modeling."
      ],
      analysisMethodology: "Constructed relational PivotTables connected via Power Query data models. Built dynamic slicers for Fiscal Year, Order Status, Brazilian State (UF), and Product Category. Formulated executive KPI cards tracking Total GMV, Average Freight Cost, On-Time Delivery Rate, and Review Distribution.",
      keyFindings: [
        "Regional Concentration: São Paulo (SP) represents 42.1% of all customer orders ($6.65M GMV), followed by Rio de Janeiro (12.8%) and Minas Gerais (11.6%).",
        "Payment Channel Preference: Credit cards account for 73.6% of gross marketplace volume ($11.6M), while Boleto bancário represents 19.4% and Vouchers 5.2%.",
        "Critical SLA Threshold: When orders are delivered within the estimated window, average review score is 4.65★. Once an order is delayed past 3 days, review scores plunge to 2.75★, increasing customer churn probability by 64%.",
        "Top Revenue Categories: Health & Beauty ($1.44M), Watches & Gifts ($1.31M), and Bed Bath & Table ($1.25M) generated the highest gross revenue.",
        "Logistics Bottlenecks: Interstate fulfillment routes into Rio de Janeiro and Northern states suffered the highest average freight delay (4.8 days late vs 0.9 days in São Paulo)."
      ],
      businessRecommendations: [
        "Establish regional fulfillment staging hubs in Rio de Janeiro to reduce interstate transit delay penalties.",
        "Implement proactive automated SMS/Email notifications when orders exceed 2 days in transit to buffer customer satisfaction.",
        "Renegotiate credit card processing gateway agreements given that 73.6% of all revenue flows through credit cards."
      ],
      projectFiles: {
        repo: "https://github.com/J-Mohamed-Fazil/olist-sales-analytics-excel",
        type: "Excel Workbook (.xlsx) & Power Query ETL Documentation"
      }
    }
  },

  {
    id: "hr-attrition-powerbi",
    title: "HR Employee Attrition Analytics",
    role: "BI Developer · Power BI & DAX Project",
    category: "powerbi",
    badge: "Microsoft Power BI & DAX",
    tools: ["Microsoft Power BI", "DAX Measures", "Star Schema Modeling", "Power Query", "Interactive Visuals"],
    summary: "Executive-grade workforce analytics dashboard tracking turnover patterns, compensation equity, and employee satisfaction across 1,470 employees. Engineered star-schema data models and reusable DAX KPI measures to uncover root-cause flight risks.",
    impact: "16.1% Turnover Isolated · Overtime Fatigue Discovered",
    metrics: [
      { label: "Total Headcount", value: "1,470" },
      { label: "Overall Attrition", value: "16.1%" },
      { label: "Overtime Turnover", value: "30.5%" },
      { label: "Early-Tenure Hazard", value: "39.2%" }
    ],
    github: "https://github.com/J-Mohamed-Fazil/HR-Employee-Attrition-Analytics-PowerBI",
    hasWorkingModel: false,

    caseStudy: {
      overview: {
        domain: "Human Resources & Workforce Intelligence",
        tools: "Microsoft Power BI Desktop, DAX Studio, Power Query, Star Schema Relational Modeling",
        description: "An interactive analytical report analyzing workforce demographics, compensation, job satisfaction, and turnover patterns across 1,470 employees to diagnose why key talent leaves the organization."
      },
      businessProblem: "The organization faced an escalating turnover rate of 16.1% with no centralized visibility into which departments, tenure bands, or compensation tiers were driving the departures. HR leadership required a dynamic dashboard to isolate flight-risk employees before resignations occurred.",
      datasetSource: "Standardized enterprise HR attrition dataset comprising 1,470 employee records across 35 attributes (Demographics, Compensation, Performance Ratings, Job Roles, Education Field, Overtime Status).",
      dataPreparation: [
        "Cleaned raw employee records in Power Query: checked null counts, removed unneeded single-value columns (Over18, StandardHours).",
        "Split unstructured attributes and created structured age bands (18-25, 26-35, 36-45, 46-55, 55+) and tenure cohorts (<1 yr, 1-2 yrs, 3-5 yrs, 6-10 yrs, 10+ yrs).",
        "Designed star schema separating FactAttrition from DimEmployee, DimDepartment, and DimCompensation."
      ],
      analysisMethodology: "Authored 15+ custom DAX measures including [Total Employees], [Active Employees], [Attrition Count], [Attrition Rate %], [Avg Monthly Income], and [YoY Attrition Variance]. Implemented interactive slicers, cross-filtering matrices, and drill-through pages by department.",
      keyFindings: [
        "Departmental Disparity: Sales has the highest attrition rate (20.6%), followed by Human Resources (19.0%), while R&D demonstrated the highest retention (13.8% attrition).",
        "Overtime Burnout Correlation: Employees working frequent overtime experience a 30.5% attrition rate compared to only 10.4% for employees without overtime (nearly 3x higher hazard).",
        "Early Career Vulnerability: Sales Representatives with less than 2 years of company tenure exhibited an acute 39.2% attrition rate, predominantly clustered in lower salary bands (<$3,000/mo).",
        "Job Satisfaction Inverse Trend: Employees reporting Level 1 (Low) Environment Satisfaction had more than double the departure rate of Level 4 (High) satisfaction peers.",
        "Stock Option Retention Effect: Employees with Stock Option Level 0 had an attrition rate of 24.4%, whereas employees granted Level 1 or 2 stock options dropped to under 9% attrition."
      ],
      businessRecommendations: [
        "Implement structured 30-60-90 day onboarding and mentorship check-ins specifically for early-tenure sales representatives.",
        "Establish an overtime monitoring threshold: alert managers whenever non-exempt staff exceed 15 hours of overtime per month.",
        "Review entry-level compensation packages for high-attrition roles to align base salaries with market medians and expand stock option eligibility."
      ],
      projectFiles: {
        repo: "https://github.com/J-Mohamed-Fazil/HR-Employee-Attrition-Analytics-PowerBI",
        type: "Power BI Report (.pbix), Data Model Diagram & DAX Measure Scripts"
      }
    }
  },

  {
    id: "retail-analytics-mysql",
    title: "Retail Analytics & Database Architecture (MySQL)",
    role: "Database & SQL Analyst · Relational Design",
    category: "sql",
    badge: "MySQL & Relational SQL",
    tools: ["MySQL", "Relational Design", "Window Functions", "CTEs", "Subqueries", "Multi-Table Joins"],
    summary: "Production-ready relational SQL case studies analyzing customer lifetime value, cohort retention, and employee quota achievement across 11 normalized database entities. Demonstrates advanced query optimization and business-focused reporting.",
    impact: "11 Relational Tables · Sub-25ms Query Performance",
    metrics: [
      { label: "Tables Modeled", value: "11" },
      { label: "Repeat Buyer Rate", value: "68.2%" },
      { label: "Dominant Category", value: "Rock & Latin (70%)" },
      { label: "Query Speed", value: "< 24ms" }
    ],
    github: "https://github.com/J-Mohamed-Fazil/SQL_Business_Case_Studies_Chinook",
    hasWorkingModel: false,

    caseStudy: {
      overview: {
        domain: "Retail & Digital Media Commerce",
        tools: "MySQL 8.0, Relational Schema Design, Window Functions, Common Table Expressions (CTEs)",
        description: "Comprehensive relational database analysis answering high-priority stakeholder questions regarding customer lifetime spend, product portfolio contribution, and sales support performance."
      },
      businessProblem: "Stakeholders lacked unified SQL reporting to evaluate which customer cohorts generated the highest repeat revenue, how musical genres contributed to store margin, and how support representatives ranked in quota attainment.",
      datasetSource: "Chinook relational digital store database containing 11 normalized tables: Customer, Invoice, InvoiceLine, Track, Album, Artist, Genre, MediaType, Employee, Playlist, and PlaylistTrack.",
      dataPreparation: [
        "Verified 1NF–3NF relational normalization across all 11 entities.",
        "Audited primary key (PK) and foreign key (FK) constraints to ensure zero orphan invoice records.",
        "Created optimized indexes on CustomerId, InvoiceDate, and TrackId to accelerate join latency."
      ],
      analysisMethodology: "Engineered multi-level Common Table Expressions (CTEs) combined with SQL Window Functions (ROW_NUMBER, DENSE_RANK, SUM OVER, LAG/LEAD). Formulated business queries demonstrating joins across 5+ tables simultaneously.",
      keyFindings: [
        "Customer Lifetime Value: The top 5 global customers generated between $45.62 and $49.62 in total spend across an average of 7 distinct purchase orders.",
        "Geographic Revenue Leaders: USA ($523.06) and Canada ($303.96) account for over 51% of total store invoiced revenue.",
        "Genre Revenue Concentration: Rock (53.4%) and Latin (16.8%) together generate over 70% of gross music sales.",
        "Sales Rep Quota Performance: Jane Peacock ranked #1 with $833.04 (35.8% of total revenue), followed by Margaret Park ($775.40, 33.3%) and Steve Johnson ($720.16, 30.9%).",
        "Basket Cross-Sell Affinity: Customers purchasing Latin tracks exhibited a 42% statistical co-occurrence with Jazz and World music catalogs."
      ],
      businessRecommendations: [
        "Focus catalog acquisition budgets on Rock and Latin re-issues where customer lifetime value is highest.",
        "Implement automated email re-engagement for customers at the 60-day post-first-order mark to boost the 68.2% repeat buyer rate.",
        "Standardize sales support compensation incentive models based on revenue generated rather than account volume."
      ],
      projectFiles: {
        repo: "https://github.com/J-Mohamed-Fazil/SQL_Business_Case_Studies_Chinook",
        type: "Structured SQL Scripts (.sql), Schema Diagram & Query Execution Logs"
      }
    }
  },

  {
    id: "datanova-ai",
    title: "DATOVA AI — Universal AI Data Analyst Platform",
    role: "Full-Stack Creator · Python & React Platform",
    category: "flagship",
    badge: "⭐ Flagship Full-Stack Platform",
    tools: ["React 18", "TypeScript", "FastAPI", "Python", "EER Model Studio", "SQLAlchemy", "Pandas"],
    summary: "Full-stack enterprise AI data analytics platform featuring an interactive in-browser EER Database Model Studio, automated schema profiling, data health auditing (0–100 score), statistical anomaly detection (IQR/Z-score), and conversational analytics (Ask DATOVA).",
    impact: "Working Interactive Model Studio · 100% Deterministic Engine",
    metrics: [
      { label: "Data Health Score", value: "94/100" },
      { label: "Supported Formats", value: "CSV, XLSX, TSV" },
      { label: "Calculation Engine", value: "100% Deterministic" },
      { label: "EER Studio", value: "Interactive CAD/ERD" }
    ],
    github: "https://github.com/J-Mohamed-Fazil/dataova",
    hasWorkingModel: true,

    caseStudy: {
      overview: {
        domain: "AI Data Analytics & Developer Tooling",
        tools: "React 18, TypeScript, FastAPI, Python 3.14, SQLAlchemy 2.0, Pandas, Recharts",
        description: "An enterprise-grade, domain-agnostic data analytics web application that automatically ingests tabular datasets, audits data health, renders interactive EER relational schemas, and performs plain-English conversational analytics without hallucinations."
      },
      businessProblem: "Data analysts and business stakeholders lose valuable days manually inspecting unfamiliar CSV/Excel exports, identifying foreign keys, auditing missing values, and generating baseline charts before answering simple strategic questions.",
      datasetSource: "Built to ingest multi-table archives across Retail, HR Workforce, Commercial Banking, Academic Performance, and Healthcare domains.",
      dataPreparation: [
        "Engineered automatic schema profiler detecting semantic types (Numeric, DateTime, Boolean, Categorical, Identifier).",
        "Implemented deterministic data health scoring (0–100) assessing null ratios, duplicate rows, and schema integrity.",
        "Built statistical outlier detection utilizing Interquartile Range (IQR) and Z-score calculations in Pandas."
      ],
      analysisMethodology: "Created an interactive EER (Enhanced Entity-Relationship) Model Studio with CAD-style relationship connectors and 1:N cardinality. Integrated 'Ask DATOVA' conversational AI grounded strictly on dataset facts.",
      keyFindings: [
        "Automated schema discovery reduces initial dataset exploratory auditing time from hours to under 3 seconds.",
        "Interactive EER Studio visualizes foreign key relationships and enables 1-click relational join simulations directly in the browser.",
        "Zero hallucination guarantee: All summary metrics and correlation coefficients are computed deterministically via Pandas."
      ],
      businessRecommendations: [
        "Utilize DATOVA AI as an initial automated data profiling and schema validation gate before loading raw data into production data warehouses.",
        "Leverage the built-in executive brief generator to export publication-ready reports for leadership review."
      ],
      projectFiles: {
        repo: "https://github.com/J-Mohamed-Fazil/dataova",
        type: "Full-Stack Source Code (Frontend: React/Vite/TS · Backend: FastAPI/Python)"
      }
    }
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioProjects;
}
