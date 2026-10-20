const portfolioProjects = [
  {
    id: "hr-attrition-powerbi",
    title: "HR Employee Attrition Analytics",
    category: "powerbi",
    badge: "Featured BI Dashboard",
    tools: ["Power BI", "DAX", "Data Modeling", "Power Query"],
    summary: "Interactive executive dashboard analyzing workforce structure, attrition trends, compensation disparity, and employee satisfaction using advanced DAX measures.",
    impact: "16.1% Attrition Drivers Identified",
    metrics: [
      { label: "Total Employees", value: "1,470" },
      { label: "Attrition Rate", value: "16.1%" },
      { label: "Avg Monthly Income", value: "$6,503" },
      { label: "High-Risk Department", value: "Sales & R&D" }
    ],
    highlights: [
      "Built star schema data model connecting employee demographics, job roles, and performance ratings.",
      "Engineered complex DAX calculations for dynamic attrition rate, YoY attrition change, and salary band categorization.",
      "Implemented dynamic slicers for department, education field, marital status, and job satisfaction tiers."
    ],
    github: "https://github.com/J-Mohamed-Fazil/HR-Employee-Attrition-Analytics-PowerBI",
    caseStudy: {
      problem: "Company was experiencing high unbudgeted employee turnover with no clear visibility into which departments or salary bands had the highest attrition risk.",
      methodology: "Data profiling in Power Query -> Schema normalization -> Star schema architecture -> DAX KPI measures -> Cross-filtered dashboard views.",
      outcome: "Discovered sales representatives with less than 2 years of tenure had an attrition rate above 39%. Recommended structured onboarding and review programs."
    }
  },
  {
    id: "olist-ecommerce-excel",
    title: "Olist E-Commerce Sales & Supply Chain Analytics",
    category: "excel",
    badge: "ETL & BI Modeling",
    tools: ["Advanced Excel", "Power Query", "Pivot Tables", "KPI Scorecards"],
    summary: "End-to-end sales intelligence dashboard built using the 100k+ record Olist Brazilian E-Commerce dataset, featuring automated Power Query ETL and logistic bottleneck identification.",
    impact: "100k+ Transactions Cleaned & Modeled",
    metrics: [
      { label: "Total Orders", value: "99.4K" },
      { label: "Gross Revenue", value: "$15.8M" },
      { label: "Avg Delivery Delay", value: "4.8 Days" },
      { label: "Top Region", value: "São Paulo (42%)" }
    ],
    highlights: [
      "Automated multi-table ETL with Power Query: merged customers, orders, payments, reviews, and geolocation datasets.",
      "Constructed interactive executive summary with automated KPI cards, dynamic slicers, and conditional formatting alerts.",
      "Identified critical freight delay hotspots causing customer review score drops from 4.8 to 2.1 stars."
    ],
    github: "https://github.com/J-Mohamed-Fazil/olist-sales-analytics-excel",
    caseStudy: {
      problem: "Fragmented multi-state customer order data made it challenging for executives to identify regional fulfillment bottlenecks and payment preferences.",
      methodology: "Power Query M-code transformations -> Relational data model in Excel -> Calculated Pivot metrics -> Slicer-driven executive layout.",
      outcome: "Pinpointed interstate logistics bottlenecks; showed credit cards accounted for 73.6% of GMV, enabling targeted payment gateway fee renegotiations."
    }
  },
  {
    id: "chinook-sql-cases",
    title: "SQL Business Case Studies (Chinook DB)",
    category: "sql",
    badge: "Advanced Querying",
    tools: ["SQL", "MySQL / SQLite", "Window Functions", "CTEs", "Cohort Analysis"],
    summary: "Real-world business case solutions querying the relational Chinook digital music store database, solving high-value stakeholder questions using advanced analytical SQL.",
    impact: "11 Complex Relational Tables Analyzed",
    metrics: [
      { label: "Tables Joined", value: "11" },
      { label: "Top Market", value: "USA & Canada" },
      { label: "Repeat Purchase Rate", value: "68%" },
      { label: "Query Execution Time", value: "< 24ms" }
    ],
    highlights: [
      "Utilized Window Functions (ROW_NUMBER, DENSE_RANK, LAG/LEAD) to calculate running customer totals and MoM revenue growth.",
      "Created Common Table Expressions (CTEs) for customer lifetime value (CLV) and cohort retention matrix.",
      "Analyzed sales rep performance vs target quotas using aggregate subqueries and multi-join views."
    ],
    github: "https://github.com/J-Mohamed-Fazil/SQL_Business_Case_Studies_Chinook",
    caseStudy: {
      problem: "Stakeholders lacked granular customer retention metrics and needed to identify which music genres generated the highest customer lifetime value.",
      methodology: "Data exploration -> Multi-level CTE architecture -> Windowed partition aggregations -> Optimized indexing queries.",
      outcome: "Delivered actionable revenue breakdown showing Rock and Latin genres accounted for over 65% of repeat revenue, driving playlist curation strategy."
    }
  },
  {
    id: "ai-resume-analyzer",
    title: "AI Resume Analyzer & NLP Scoring Engine",
    category: "python",
    badge: "NLP & Python",
    tools: ["Python", "NLP", "Scikit-Learn", "Pandas", "Regex"],
    summary: "Automated candidate resume parsing and job description matching system using Natural Language Processing, text tokenization, and semantic vector similarity scoring.",
    impact: "94% Skill Matching Accuracy",
    metrics: [
      { label: "Extraction Accuracy", value: "94%" },
      { label: "Processing Speed", value: "< 1.2s/doc" },
      { label: "Supported Formats", value: "PDF & DOCX" },
      { label: "Skill Taxonomy", value: "500+ Skills" }
    ],
    highlights: [
      "Engineered text preprocessing pipeline: stopword removal, lemmatization, and regular expression pattern extraction.",
      "Calculated cosine similarity between candidate skill vectors and job requirements to rank candidate relevance.",
      "Generates instant skill gap feedback with missing keywords and tailored recommendations."
    ],
    github: "https://github.com/J-Mohamed-Fazil/ai-resume-analyzer",
    caseStudy: {
      problem: "Manual screening of hundreds of resumes per job opening is slow, subjective, and prone to human bias.",
      methodology: "Text extraction -> Tokenization & TF-IDF Vectorization -> Cosine Similarity Scoring -> Structured JSON report output.",
      outcome: "Built a functional prototype that reduced candidate pre-screening review time by 80% with transparent similarity scoring."
    }
  },
  {
    id: "adventureworks-sales-excel",
    title: "AdventureWorks Sales Performance BI",
    category: "excel",
    badge: "Financial & Sales BI",
    tools: ["Microsoft Excel", "Data Modeling", "KPI Dashboards", "Pivot Charts"],
    summary: "End-to-end sales performance tracking system across global territories, product categories, and sales channels with automated variance analysis.",
    impact: "Global Sales Variance Tracking",
    metrics: [
      { label: "Sales Channels", value: "Online & Reseller" },
      { label: "Product Categories", value: "4 Main / 37 Sub" },
      { label: "Profit Margin Avg", value: "41.2%" },
      { label: "YoY Growth", value: "+14.6%" }
    ],
    highlights: [
      "Structured clean relational model linking FactSales with DimCustomer, DimProduct, and DimTerritory.",
      "Implemented dynamic target vs actual variance KPIs with visual traffic-light indicators.",
      "Interactive slicers for fiscal years, quarterly breakdowns, and geographical territories."
    ],
    github: "https://github.com/J-Mohamed-Fazil/AdventureWorks-Sales-Dashboard-Excel",
    caseStudy: {
      problem: "Global sales leadership needed a single-screen dashboard to identify underperforming territories and product category margin erosion.",
      methodology: "Data cleaning -> Normalization -> Dimension table architecture -> Dynamic Pivot Charts & Slicers.",
      outcome: "Highlighted high-margin mountain bike accessories as primary growth driver, while European clothing lines required inventory rationalization."
    }
  },
  {
    id: "dmart-sales-analysis",
    title: "Retail Sales Exploratory Data Analysis (EDA)",
    category: "python",
    badge: "Exploratory Data Analysis",
    tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    summary: "In-depth retail store transaction analytics discovering seasonal patterns, pricing elasticity, customer basket sizes, and outlier detection using statistical methods.",
    impact: "Statistical Distribution & Outlier Detection",
    metrics: [
      { label: "Transactions", value: "50K+ Rows" },
      { label: "Outliers Handled", value: "IQR Method" },
      { label: "Correlation Matrix", value: "18 Features" },
      { label: "Visualizations", value: "24+ Charts" }
    ],
    highlights: [
      "Conducted univariate, bivariate, and multivariate exploratory data analysis with statistical hypothesis checks.",
      "Built correlation heatmaps and distribution plots to uncover price discount elasticity across FMCG categories.",
      "Detected anomalous purchase quantities using Interquartile Range (IQR) and Z-score statistical tests."
    ],
    github: "https://github.com/J-Mohamed-Fazil/dmart-sales-analysis",
    caseStudy: {
      problem: "Retail managers had vast point-of-sale data but no clear insights on basket affinities or seasonal promotional efficiency.",
      methodology: "Missing value imputation -> Outlier capping -> Feature engineering -> Visual statistical storytelling.",
      outcome: "Identified high cross-sell basket combinations in household goods and groceries, yielding actionable floor layout recommendations."
    }
  },
  {
    id: "hr-attrition-excel",
    title: "HR Workforce Demographics & Attrition (Excel)",
    category: "excel",
    badge: "Workforce Analytics",
    tools: ["Excel", "Pivot Charts", "Conditional Formatting", "Formula Engine"],
    summary: "Dedicated HR workforce intelligence dashboard in Excel tracking employee tenure, compensation bands, overtime correlation, and attrition probabilities.",
    impact: "Deep Overtime vs Attrition Correlation",
    metrics: [
      { label: "Overtime Attrition", value: "30.5%" },
      { label: "Non-OT Attrition", value: "10.4%" },
      { label: "Key Tenures", value: "1-3 Years" },
      { label: "Satisfaction Index", value: "4 Tiers" }
    ],
    highlights: [
      "Engineered automated formulas using INDEX/MATCH, XLOOKUP, SUMIFS, and dynamic array calculations.",
      "Demonstrated that overtime workers experienced nearly 3x higher turnover compared to non-overtime employees.",
      "Designed clean, executive-ready dashboard UI with unified color-coded status badges and interactive slicers."
    ],
    github: "https://github.com/J-Mohamed-Fazil/HR-Employee-Attrition-Analytics-Excel",
    caseStudy: {
      problem: "HR team needed a lightweight, Excel-based solution without external database dependencies to monitor flight-risk employees.",
      methodology: "Raw HR data audit -> Formula engineering -> Pivot reporting engine -> UI styling with strict design hierarchy.",
      outcome: "Provided HR leaders with an immediate tool to isolate employees suffering from severe overtime burnout."
    }
  },
  {
    id: "tableau-analytics",
    title: "Tableau Visual Storytelling & BI Lab",
    category: "tableau",
    badge: "Visual Analytics",
    tools: ["Tableau", "Calculated Fields", "Storyboards", "Parameters"],
    summary: "Interactive visual analytics dashboards focusing on storytelling, heat maps, geo-spatial mapping, and parameter-driven executive drilldowns.",
    impact: "Dynamic Storyboard Visualizations",
    metrics: [
      { label: "Visual Dashboards", value: "4+ Storyboards" },
      { label: "Parameters", value: "Dynamic Thresholds" },
      { label: "Geo-Maps", value: "Global Sales" },
      { label: "Actions", value: "Filter & Highlight" }
    ],
    highlights: [
      "Created interactive story points guiding executive viewers through complex multi-variable business insights.",
      "Configured dynamic parameter controls allowing users to switch metrics (Profit, Revenue, Quantity) on the fly.",
      "Implemented dashboard actions for seamless drill-down from country-level to city-level performance."
    ],
    github: "https://github.com/J-Mohamed-Fazil/TableauItvedant",
    caseStudy: {
      problem: "Complex multi-layered data required intuitive visual storytelling that non-technical department heads could easily explore.",
      methodology: "Data connection -> Dimension & Measure setup -> Calculated field logic -> Storyboard composition.",
      outcome: "Delivered interactive dashboards enabling instant visual discovery of high-yield market segments."
    }
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioProjects;
}
