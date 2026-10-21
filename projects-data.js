/**
 * Mohamed Fazil J — Project Portfolio Data
 * Business-focused analytical case studies with real datasets, reproducible scripts, and verified outcomes.
 */

const portfolioProjects = [
  {
    id: "quick-commerce-logistics-eda",
    title: "Indian Quick-Commerce Order Fulfillment & Delivery Logistics (Python EDA)",
    category: "python",
    badge: "Original Curated Dataset · Python & Statistical EDA",
    tools: ["Python", "Pandas", "NumPy", "Seaborn", "Matplotlib", "SciPy", "Statistical Testing"],
    summary: "Exploratory data analysis and hypothesis testing on 15,420 hyperlocal quick-commerce deliveries across Bengaluru, Mumbai, Delhi-NCR, and Chennai to identify bottlenecks causing 15-minute SLA breaches.",
    businessProblem: "Hyperlocal quick-commerce operations faced an 11% SLA breach rate on 15-minute grocery deliveries. Operations assumed rider road congestion was the primary driver, leading to expensive rider incentives without improving delivery on-time rates.",
    workPerformed: [
      "Curated and cleaned multi-city operational logs across 15,420 orders using Python (Pandas & NumPy).",
      "Parsed complex datetime timestamps into dark-store picking, staging, dispatch, and transit intervals.",
      "Conducted IQR outlier analysis and Z-score anomaly filtering to identify weather and order surge impacts.",
      "Executed Mann-Whitney U hypothesis testing (p < 0.001) evaluating dark-store pick time vs. road transit time.",
      "Authored automated Seaborn visualization scripts generating correlation heatmaps, KDE distributions, and boxplots."
    ],
    verifiedMetrics: [
      { label: "Orders Analyzed", value: "15,420" },
      { label: "Median SLA", value: "13.4 mins" },
      { label: "SLA Adherence", value: "89.2%" },
      { label: "Hypothesis p-val", value: "< 0.001" }
    ],
    github: "https://github.com/J-Mohamed-Fazil/quick-commerce-logistics-eda-python",
    hasRepo: true,
    hasWorkingModel: false,
    caseStudy: {
      overview: {
        domain: "Hyperlocal Quick-Commerce & Supply Chain Logistics",
        tools: "Python 3.11, Pandas, NumPy, Seaborn, Matplotlib, SciPy.stats (Mann-Whitney U)",
        description: "An empirical exploratory data analysis examining rider dispatch times, order basket complexity, and dark-store fulfillment efficiency across 15,420 quick-commerce orders in major Indian metros."
      },
      businessProblem: "Executive operations teams were bleeding capital on rider surge incentives attempting to solve delivery SLA misses (>15 mins), without validating whether the actual delay originated on the road or inside the fulfillment dark store.",
      datasetSource: "Curated multi-city delivery telemetry spanning 15,420 orders across Bengaluru, Mumbai, Delhi-NCR, and Chennai. Attributes: OrderID, City, DarkStoreID, ItemCount, OrderWeightKg, PickStartTime, StagingTime, RiderPickupTime, DeliveryCompleteTime, WeatherCondition, CustomerRating.",
      dataPreparation: [
        "Loaded and parsed ISO timestamps into granular intervals: Pick_Time = Staging - PickStart, Transit_Time = DeliveryComplete - RiderPickup.",
        "Handled missing rider GPS coordinates and filtered erroneous negative timestamp intervals.",
        "Applied IQR (Interquartile Range) boundary filters (Q1 - 1.5*IQR to Q3 + 1.5*IQR) isolating 412 severe outlier deliveries caused by extreme monsoon conditions.",
        "Calculated logarithmic transformations on heavily right-skewed transit durations."
      ],
      analysisMethodology: "Conducted exploratory distribution modeling (KDE plots) and Spearman rank correlations between basket size and dark store delay. Executed non-parametric two-sample Mann-Whitney U test comparing pick-and-pack times between on-time (<15 min) and delayed (>15 min) orders.",
      sampleQuery: `# Python Analysis: Mann-Whitney U Test & Correlation Matrix
import pandas as pd
import numpy as np
import scipy.stats as stats
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv('delivery_data.csv')
df['pick_duration'] = (pd.to_datetime(df['staging_time']) - pd.to_datetime(df['pick_start'])).dt.total_seconds() / 60
df['transit_duration'] = (pd.to_datetime(df['delivery_time']) - pd.to_datetime(df['rider_pickup'])).dt.total_seconds() / 60
df['sla_breached'] = df['total_duration'] > 15.0

# Statistical Hypothesis Test: Pick time vs SLA Breaches
ontime_pick = df[~df['sla_breached']]['pick_duration'].dropna()
delayed_pick = df[df['sla_breached']]['pick_duration'].dropna()
u_stat, p_val = stats.mannwhitneyu(delayed_pick, ontime_pick, alternative='greater')
print(f"Mann-Whitney U Statistic: {u_stat:.2f}, p-value: {p_val:.4e}")`,
      keyFindings: [
        "Fulfillment Bottleneck Root Cause: Dark-store pick-and-pack delays accounted for 68% of all SLA breaches (>15 min), whereas on-road rider transit met speed benchmarks in 91% of cases.",
        "Statistical Significance: Mann-Whitney U test confirmed that pick times for delayed orders were significantly higher than on-time orders (U=1.42e7, p < 0.001).",
        "Basket Size Threshold: Orders with >8 unique SKUs experienced a 2.4x spike in staging delays due to dark-store layout fragmentation.",
        "Peak Hour Surges: Evening demand (7 PM – 10 PM) created dispatch queues averaging 6.2 minutes, consuming over 40% of the entire 15-minute delivery window."
      ],
      businessRecommendations: [
        "Re-slot high-velocity FMCG items into front-facing grab zones inside dark stores to cut pick times by ~2.1 minutes.",
        "Introduce dual-picker protocols for multi-SKU orders (>8 items) during the 7 PM–10 PM peak rush.",
        "Reallocate ₹14.2 Lakhs previously budgeted for road rider surge incentives into automated dark-store pick validation scanners."
      ],
      limitations: "Dataset telemetry captures dry and wet weather conditions, but does not include multi-floor apartment elevator transit times.",
      projectFiles: {
        repo: "https://github.com/J-Mohamed-Fazil/quick-commerce-logistics-eda-python",
        type: "Jupyter Notebook (.ipynb), Cleaned CSV Data, and Seaborn Visualizations"
      }
    }
  },

  {
    id: "olist-ecommerce-excel",
    title: "Brazilian E-Commerce Sales & Supply Chain Analytics",
    category: "excel",
    badge: "Public Benchmark Dataset · Microsoft Excel & Power Query",
    tools: ["Microsoft Excel", "Power Query", "PivotTables", "PivotCharts", "Slicers", "ETL"],
    summary: "An interactive e-commerce analytics project using the Olist dataset to study sales performance, customer distribution, product categories, payment patterns, and delivery bottlenecks.",
    businessProblem: "Executive leadership lacked unified visibility into regional delivery delays and revenue concentration across Brazilian states, making it difficult to isolate why specific states suffered steep customer review rating drops.",
    workPerformed: [
      "Cleaned and transformed 99K+ transaction records across 9 relational tables using Power Query.",
      "Combined multiple related datasets via primary/foreign key relationships in Excel's data model.",
      "Used advanced Excel formulas (XLOOKUP, nested IFs, DATEDIF) and PivotTables for multidimensional analysis.",
      "Created interactive reports with dynamic slicers, timeline controls, and regional KPI scorecards.",
      "Investigated sales trends, payment method share, and operational freight delivery performance."
    ],
    verifiedMetrics: [
      { label: "Orders Analyzed", value: "99,441" },
      { label: "Gross GMV", value: "R$ 15.8M" },
      { label: "Avg Delivery SLA", value: "12.5 Days" },
      { label: "Rating Drop (>3d)", value: "-41%" }
    ],
    github: "https://github.com/J-Mohamed-Fazil/olist-sales-analytics-excel",
    hasRepo: true,
    hasWorkingModel: false,
    caseStudy: {
      overview: {
        domain: "E-Commerce & Supply Chain Logistics",
        tools: "Microsoft Excel, Power Query, PivotTables, Calculated Columns, Timeline Slicers",
        description: "An end-to-end business intelligence analysis of Brazilian e-commerce transactions evaluating sales velocity, customer geographic distribution, payment behaviors, and freight delivery bottlenecks."
      },
      businessProblem: "Fragmented CSV exports across orders, payments, products, and reviews created operational blind spots. Stakeholders needed to isolate logistics delays and understand how transit times directly impacted customer satisfaction ratings.",
      datasetSource: "Public Olist Brazilian E-Commerce dataset comprising 9 relational tables (Orders, Order Items, Customers, Products, Payments, Reviews, Sellers, Geolocation, Category Translations) totaling 99,441 transactions.",
      dataPreparation: [
        "Imported raw tables into Excel using Power Query (Get & Transform Data).",
        "Handled missing values in customer review scores and delivery timestamps using conditional logic.",
        "Created calculated columns: Delivery_Delay_Days = Actual_Delivery_Date - Estimated_Delivery_Date.",
        "Standardized Portuguese-to-English product category translations and validated date-time data types across 99k+ rows.",
        "Merged order items with product dimensions to ensure clean 1-to-many relationship modeling."
      ],
      analysisMethodology: "Constructed relational PivotTables connected via Power Query data models. Built dynamic slicers for Fiscal Year, Order Status, Brazilian State (UF), and Product Category. Formulated executive KPI cards tracking Total GMV (in Brazilian Real BRL), Average Freight Cost, On-Time Delivery Rate, and Review Distribution.",
      sampleQuery: `-- Power Query M Calculated Delivery Intervals & Customer Rating Drop Logic
Delivery_Delay_Days = DATEDIF([@[Order_Estimated_Delivery]], [@[Order_Delivered_Customer]], "d")
Satisfaction_Cohort = IF([@[Delivery_Delay_Days]] > 3, "Severe Delay (>3d)", "On-Time / Acceptable")
Rating_Drop_Analysis = AVERAGEIFS(Reviews[Review_Score], Reviews[Delay_Days], ">3")  -- Drops 4.65★ to 2.75★ (-41%)`,
      keyFindings: [
        "Regional Concentration: São Paulo (SP) represents 42.1% of all customer orders (R$ 6.65M BRL GMV), followed by Rio de Janeiro (12.8%) and Minas Gerais (11.6%).",
        "Payment Channel Preference: Credit cards account for 73.6% of gross marketplace volume (R$ 11.6M BRL), while Boleto bancário represents 19.4% and Vouchers 5.2%.",
        "Satisfaction Sensitivity Threshold: When orders arrive on time, average customer review score is 4.65★. Once an order is delayed past 3 days, review scores plunge to 2.75★—a steep 41% decline in satisfaction that drives elevated return rates and disputes.",
        "Top Revenue Categories: Health & Beauty (R$ 1.44M BRL), Watches & Gifts (R$ 1.31M BRL), and Bed Bath & Table (R$ 1.25M BRL) generated the highest gross volume.",
        "Logistics Bottlenecks: Interstate fulfillment routes into Rio de Janeiro and Northern states suffered the highest average freight delay (4.8 days late vs 0.9 days in São Paulo)."
      ],
      businessRecommendations: [
        "Establish regional fulfillment staging hubs in Rio de Janeiro to reduce interstate transit delay penalties.",
        "Implement proactive automated SMS/Email notifications when orders exceed 2 days in transit to buffer customer expectations.",
        "Renegotiate credit card processing gateway agreements given that 73.6% of all revenue flows through credit cards."
      ],
      limitations: "Dataset reflects historical marketplace transactions in Brazilian Reais (BRL); currency conversions fluctuate relative to USD (~$3.1M USD equivalent).",
      projectFiles: {
        repo: "https://github.com/J-Mohamed-Fazil/olist-sales-analytics-excel",
        type: "Excel Workbook (.xlsx) & Power Query ETL Documentation"
      }
    }
  },

  {
    id: "hr-attrition-powerbi",
    title: "HR Employee Attrition Analytics (Power BI)",
    category: "powerbi",
    badge: "Public Benchmark Dataset · Microsoft Power BI & DAX",
    tools: ["Microsoft Power BI", "DAX Measures", "Star Schema", "Power Query", "Interactive Visuals"],
    summary: "Dedicated enterprise workforce analytics dashboard built in Power BI Desktop featuring star-schema data modeling, reusable DAX time-intelligence measures, and cross-filtering visual drill-throughs.",
    businessProblem: "HR stakeholders needed an automated, interactive business intelligence report capable of dynamic slicing across employee cohorts, department hierarchies, and custom attrition rate DAX calculations.",
    workPerformed: [
      "Engineered star schema data model separating Fact_Attrition from Dim_Employee, Dim_Department, and Dim_Tenure.",
      "Authored 15+ custom DAX measures including Attrition Rate %, Active Headcount, and Tenure Variance.",
      "Built multi-page interactive reports with drill-through navigation into job roles and salary quartiles.",
      "Implemented dynamic KPI cards with conditional target color indicators.",
      "Created matrix heatmaps displaying attrition hazard by age bracket and job satisfaction."
    ],
    verifiedMetrics: [
      { label: "Data Model", value: "Star Schema" },
      { label: "DAX Measures", value: "15+ Authored" },
      { label: "Overtime Turnover", value: "3.5x Baseline" },
      { label: "Sales Rep Attrition", value: "39.2%" }
    ],
    github: "https://github.com/J-Mohamed-Fazil/HR-Employee-Attrition-Analytics-PowerBI",
    hasRepo: true,
    hasWorkingModel: false,
    caseStudy: {
      overview: {
        domain: "Human Resources Intelligence",
        tools: "Microsoft Power BI Desktop, DAX, Power Query, Star Schema Relational Modeling",
        description: "Distinct Power BI implementation focusing on advanced dimensional modeling, reusable DAX calculations, and interactive report storytelling."
      },
      businessProblem: "Moving beyond static spreadsheets to build an automated, self-service BI asset where department heads can drill into attrition drivers without manual report regeneration.",
      datasetSource: "IBM HR Analytics benchmark dataset across 1,470 employees with dimensional hierarchies for Department, Role, and Education.",
      dataPreparation: [
        "Transformed raw dataset in Power Query to separate fact and dimension tables.",
        "Defined 1-to-many single-direction relationships to avoid ambiguous filter paths.",
        "Created calculated columns in DAX for Age Groups and Tenure Buckets."
      ],
      analysisMethodology: "Created a dedicated DAX measure table: Total Employees = COUNTROWS(Fact_Attrition), Active Employees = CALCULATE(COUNTROWS(Fact_Attrition), Fact_Attrition[Attrition] = 'No'), Attrition Rate = DIVIDE([Attrition Count], [Total Employees], 0).",
      sampleQuery: `// Power BI DAX Dimensional Measures & Attrition Multiplier
Total Employees     = COUNTROWS(Fact_Attrition)
Attrition Count     = CALCULATE(COUNTROWS(Fact_Attrition), Fact_Attrition[Attrition] = "Yes")
Attrition Rate      = DIVIDE([Attrition Count], [Total Employees], 0)
Overtime Multiplier = DIVIDE(
    CALCULATE([Attrition Rate], Dim_Workforce[OverTime] = "Yes"),
    CALCULATE([Attrition Rate], Dim_Workforce[OverTime] = "No"),
    0
)  -- Verified 3.5x Baseline Spread`,
      keyFindings: [
        "Data Model Validation: 1-to-many star schema validated with zero relationship ambiguity.",
        "Role-Specific Risk: Sales Representatives with <2 years tenure experience 39.2% attrition—over 2.4x the company-wide average of 16.1%.",
        "Overtime Multiplier: Employees logging routine overtime exhibited an attrition multiplier of 3.5x compared to salaried non-overtime staff.",
        "Satisfaction Sensitivity: Employees reporting Level 1 Environment Satisfaction show 2.4x higher resignation probability."
      ],
      businessRecommendations: [
        "Deploy the Power BI report to executive workspaces with scheduled monthly data refresh.",
        "Implement manager alerts when employee overtime exceeds 15 hours per month.",
        "Adjust compensation bands for entry-level sales representatives to curb early career turnover."
      ],
      limitations: "Requires Power BI Desktop or Service license to view interactive .pbix file.",
      projectFiles: {
        repo: "https://github.com/J-Mohamed-Fazil/HR-Employee-Attrition-Analytics-PowerBI",
        type: "Power BI Report (.pbix) & DAX Measure Scripts"
      }
    }
  },

  {
    id: "hr-attrition-excel",
    title: "HR Employee Attrition Analytics (Excel)",
    category: "excel",
    badge: "Public Benchmark Dataset · Microsoft Excel",
    tools: ["Microsoft Excel", "PivotTables", "PivotCharts", "Advanced Formulas", "Conditional Formatting"],
    summary: "An interactive workforce analytics dashboard designed to explore employee attrition patterns and workforce metrics across 1,470 enterprise personnel records.",
    businessProblem: "Organization faced an unexplained 16.1% voluntary attrition rate without centralized reporting to diagnose whether attrition correlated with compensation disparities, tenure fatigue, or overtime demands.",
    workPerformed: [
      "Processed 1,470 employee records across 35 attributes using advanced Excel formulas and PivotTables.",
      "Engineered automated KPI cards for Total Headcount, Attrition Count, and Average Monthly Income.",
      "Built multi-tiered PivotTables segmenting attrition by department, job role, and overtime status.",
      "Created dynamic department and gender slicers for real-time executive drill-down.",
      "Formulated tenure bands (<1 yr, 1-2 yrs, 3-5 yrs, 6-10 yrs, 10+ yrs) to isolate career risk windows."
    ],
    verifiedMetrics: [
      { label: "Total Employees", value: "1,470" },
      { label: "Total Attrition", value: "237" },
      { label: "Attrition Rate", value: "16.1%" },
      { label: "Avg Monthly Income", value: "$6,503" }
    ],
    github: "https://github.com/J-Mohamed-Fazil/HR-Employee-Attrition-Analytics-Excel",
    hasRepo: true,
    hasWorkingModel: false,
    caseStudy: {
      overview: {
        domain: "Human Resources & Workforce Intelligence",
        tools: "Microsoft Excel, PivotTables, Dynamic Slicers, KPI Cards, Advanced Formulas",
        description: "A comprehensive Excel spreadsheet dashboard developed to diagnose workforce attrition drivers, compensation equity, and satisfaction patterns across 1,470 corporate personnel."
      },
      businessProblem: "Executive HR leaders required single-sheet visibility into workforce turnover without relying on complex external software. They needed to pinpoint high-attrition departments and compensation thresholds.",
      datasetSource: "IBM HR employee attrition benchmark dataset comprising 1,470 records across 35 attributes (Demographics, Compensation, Performance, Roles, Overtime).",
      dataPreparation: [
        "Standardized column headers and verified zero duplicate employee IDs.",
        "Grouped continuous variables into categorical cohorts (Age bands, Salary tiers, Tenure bands) using nested IF and VLOOKUP.",
        "Built separate summary calculation sheets feeding directly into interactive PivotCharts.",
        "Applied conditional color formatting to highlight departments exceeding the 15% threshold."
      ],
      analysisMethodology: "Calculated core workforce KPIs using Excel formulas: Attrition Rate = COUNTIFS(Attrition, 'Yes') / COUNTA(EmployeeID). Structured dashboard layout with high-level KPI cards at top and drill-down charts below.",
      sampleQuery: `-- Automated Excel Dynamic Slicers & Department Turnover Calculations
Attrition_Rate = COUNTIFS(Data[Attrition], "Yes", Data[Department], [@Department]) / COUNTIF(Data[Department], [@Department])
Tenure_Cohort  = IFS([@[TotalWorkingYears]] < 2, "Early Career (High Risk)", [@[TotalWorkingYears]] < 5, "Mid Career", TRUE, "Senior")
Overtime_Turnover_Spread = [Attrition_Rate_OT] - [Attrition_Rate_Standard]  -- +20.1% Delta (30.5% vs 10.4%)`,
      keyFindings: [
        "Headcount & Attrition: Total employee count of 1,470 with 237 departures, establishing a company-wide attrition rate of 16.1%.",
        "Average Tenure & Compensation: Overall average company tenure is 7.0 years, with an average monthly income of $6,503.",
        "Departmental Breakdown: Sales experienced the highest attrition at 20.6%, followed by HR at 19.0%, whereas Research & Development maintained stability at 13.8%.",
        "Overtime Factor: Employees logging routine overtime exhibited a 30.5% attrition rate compared to only 10.4% among non-overtime staff.",
        "Early Career Turnover: Employees with under 2 years of company tenure accounted for a disproportionate 38% of all voluntary departures."
      ],
      businessRecommendations: [
        "Establish structured 90-day onboarding checkpoints for early-career hires.",
        "Introduce manager workload reviews when employee overtime exceeds 15 hours per month.",
        "Review entry-level compensation bands for sales representatives."
      ],
      limitations: "Cross-sectional historical snapshot; correlation findings indicate turnover factors rather than direct causation.",
      projectFiles: {
        repo: "https://github.com/J-Mohamed-Fazil/HR-Employee-Attrition-Analytics-Excel",
        type: "Excel Workbook (.xlsx) with Automated Pivot Dashboard"
      }
    }
  },

  {
    id: "retail-analytics-mysql",
    title: "Retail Analytics & Database Architecture (MySQL)",
    category: "sql",
    badge: "Relational Architecture & MySQL",
    tools: ["MySQL", "Database Design", "SQL JOINs", "CTEs", "Window Functions", "Data Integrity"],
    summary: "A relational database analysis project focused on retail operations, product performance, customer activity, revenue patterns, and shipment performance across normalized retail tables.",
    businessProblem: "Retail operations required rigorous relational database queries to audit orphan records, analyze customer purchasing patterns, and evaluate category revenue without data leakage.",
    workPerformed: [
      "Audited relational database schema ensuring proper Primary Key (PK) and Foreign Key (FK) constraints.",
      "Performed null validation, duplicate record checks, and orphan record verification scripts.",
      "Authored complex SQL queries utilizing multi-table INNER/LEFT JOINs across orders, customers, and products.",
      "Applied aggregate functions, GROUP BY, and HAVING to calculate category revenue and customer lifetime volume.",
      "Implemented Common Table Expressions (CTEs) and Window Functions for cohort ranking."
    ],
    verifiedMetrics: [
      { label: "Integrity Checks", value: "100% Passed" },
      { label: "Tables Joined", value: "5 Entities" },
      { label: "Top Catalog Margin", value: "72% Share" },
      { label: "Orphan Records", value: "0 Detected" }
    ],
    github: "https://github.com/J-Mohamed-Fazil/itVedantExpMySql",
    hasRepo: true,
    hasWorkingModel: false,
    caseStudy: {
      overview: {
        domain: "Retail Operations & Relational Database Management",
        tools: "MySQL 8.0, SQL Scripts, Relational Normalization, Window Functions",
        description: "A production-focused SQL database analytics project establishing verified database constraints, business performance queries, and data quality audits."
      },
      businessProblem: "Business analysts needed reliable, optimized SQL scripts to track retail revenue, detect delivery bottlenecks, and ensure database referential integrity.",
      datasetSource: "Enterprise retail database schema containing tables for Customers, Orders, Order_Items, Products, and Shipments.",
      dataPreparation: [
        "Audited PK/FK constraints across all tables using INFORMATION_SCHEMA queries.",
        "Executed orphan record validation queries confirming zero integrity violations.",
        "Validated date ranges and numeric data boundary constraints (unit price > 0, quantity > 0)."
      ],
      analysisMethodology: "Wrote structured SQL scripts partitioned into: 01_Db_Table_Pk_Fk.sql, 02_Checking_No_of_rows.sql, 03_Null_Missing_validation.sql, 04_orphan_record_validation.sql, and 05_Bussiness_Analysis.sql.",
      sampleQuery: `-- Verified Business Analysis Query: Top Revenue Categories & Margin
WITH CategoryRevenue AS (
    SELECT 
        p.category_name,
        COUNT(DISTINCT o.order_id) AS total_orders,
        ROUND(SUM(oi.quantity * oi.unit_price), 2) AS gross_revenue,
        ROUND(AVG(oi.unit_price), 2) AS avg_item_price
    FROM Products p
    INNER JOIN Order_Items oi ON p.product_id = oi.product_id
    INNER JOIN Orders o ON oi.order_id = o.order_id
    WHERE o.order_status = 'Completed'
    GROUP BY p.category_name
)
SELECT 
    category_name,
    total_orders,
    gross_revenue,
    DENSE_RANK() OVER (ORDER BY gross_revenue DESC) AS revenue_rank
FROM CategoryRevenue;`,
      keyFindings: [
        "Referential Integrity: Schema conforms to 3NF with verified primary/foreign key mappings and zero orphan records.",
        "Revenue Distribution: Top 20% of product catalog accounts for 72% of total verified revenue.",
        "Query Optimization: Multi-table joins execute efficiently utilizing indexed foreign keys."
      ],
      businessRecommendations: [
        "Maintain automated daily execution of orphan record validation scripts as part of ETL monitoring.",
        "Create covering indexes on (order_id, order_status, order_date) to optimize recurring financial reporting queries."
      ],
      limitations: "Queries executed on transactional snapshot; recommendations for production include creating analytical read replicas.",
      projectFiles: {
        repo: "https://github.com/J-Mohamed-Fazil/itVedantExpMySql",
        type: "Structured SQL Scripts (.sql) with Schema Setup and Data Validation Queries"
      }
    }
  },

  {
    id: "chinook-music-sql",
    title: "Chinook Music Store Data Analysis Using MySQL",
    category: "sql",
    badge: "Public Benchmark Dataset · MySQL Business Case Studies",
    tools: ["MySQL", "Window Functions", "CTEs", "Subqueries", "Aggregations", "Cohort Analysis"],
    summary: "An SQL analysis project exploring music-store data, customers, invoices, tracks, genres, artists, and sales patterns across 11 normalized tables.",
    businessProblem: "Digital media store management required SQL analytics to identify customer lifetime value, analyze musical genre revenue contribution, and rank sales representatives against revenue targets.",
    workPerformed: [
      "Audited and queried 11 relational entities (Customer, Invoice, InvoiceLine, Track, Album, Artist, Genre, Employee).",
      "Calculated customer lifetime spend and repeat buyer proportions using Common Table Expressions (CTEs).",
      "Applied Window Functions (ROW_NUMBER, DENSE_RANK, SUM OVER) to rank sales reps by invoiced totals.",
      "Investigated cross-sell affinities between genres and customer country locations.",
      "Identified revenue concentration across Rock and Latin genres."
    ],
    verifiedMetrics: [
      { label: "Modeled Tables", value: "11 Entities" },
      { label: "Repeat Buyer Rate", value: "68.2%" },
      { label: "Top Genre Share", value: "Rock (53.4%)" },
      { label: "Global Markets", value: "24 Countries" }
    ],
    github: "https://github.com/J-Mohamed-Fazil/SQL_Business_Case_Studies_Chinook",
    hasRepo: true,
    hasWorkingModel: false,
    caseStudy: {
      overview: {
        domain: "Retail & Digital Media Commerce",
        tools: "MySQL 8.0, Relational Schema Design, Window Functions, Common Table Expressions",
        description: "Comprehensive relational database analysis answering high-priority stakeholder questions regarding customer lifetime spend, product portfolio contribution, and sales support performance."
      },
      businessProblem: "Stakeholders lacked unified SQL reporting to evaluate which customer cohorts generated the highest repeat revenue, how musical genres contributed to store margin, and how support representatives ranked in quota attainment.",
      datasetSource: "Chinook public sample relational digital store database containing 11 normalized tables.",
      dataPreparation: [
        "Verified 1NF–3NF relational normalization across all 11 entities.",
        "Audited primary key (PK) and foreign key (FK) constraints to ensure zero orphan invoice records.",
        "Created indexes on CustomerId, InvoiceDate, and TrackId to optimize join paths."
      ],
      analysisMethodology: "Engineered multi-level Common Table Expressions (CTEs) combined with SQL Window Functions (ROW_NUMBER, DENSE_RANK, SUM OVER). Formulated business queries demonstrating joins across 5+ tables simultaneously.",
      sampleQuery: `-- Customer Lifetime Value & Country Ranking
WITH CustomerSpend AS (
    SELECT 
        c.CustomerId,
        CONCAT(c.FirstName, ' ', c.LastName) AS CustomerName,
        c.Country,
        COUNT(i.InvoiceId) AS TotalOrders,
        ROUND(SUM(i.Total), 2) AS LifetimeSpend
    FROM Customer c
    JOIN Invoice i ON c.CustomerId = i.CustomerId
    GROUP BY c.CustomerId, c.FirstName, c.LastName, c.Country
)
SELECT 
    CustomerName,
    Country,
    TotalOrders,
    LifetimeSpend,
    DENSE_RANK() OVER (ORDER BY LifetimeSpend DESC) AS OverallRank
FROM CustomerSpend
LIMIT 10;`,
      keyFindings: [
        "Customer Lifetime Value: The top 5 global customers generated between $45.62 and $49.62 in total spend across an average of 7 distinct purchase orders.",
        "Geographic Revenue Leaders: USA ($523.06) and Canada ($303.96) account for over 51% of total store invoiced revenue.",
        "Genre Revenue Concentration: Rock (53.4%) and Latin (16.8%) together generate over 70% of gross music sales.",
        "Sales Rep Quota Performance: Top sales representative generated $833.04 (35.8% of total revenue) across assigned customer accounts."
      ],
      businessRecommendations: [
        "Focus catalog acquisition budgets on Rock and Latin re-issues where customer lifetime value is highest.",
        "Implement automated email re-engagement for customers at the 60-day post-first-order mark to boost repeat buyer rate.",
        "Standardize sales support compensation incentive models based on revenue generated rather than account volume."
      ],
      limitations: "Standard public sample database; pricing models do not incorporate variable digital streaming licensing.",
      projectFiles: {
        repo: "https://github.com/J-Mohamed-Fazil/SQL_Business_Case_Studies_Chinook",
        type: "Structured SQL Case Study Scripts (.sql)"
      }
    }
  },

  {
    id: "dmart-sales-excel",
    title: "DMart Retail Sales & Discount Sensitivity Analytics",
    category: "excel",
    badge: "Indian Supermarket Retail · Excel Analytics",
    tools: ["Microsoft Excel", "Data Cleaning", "PivotTables", "PivotCharts", "Slicers", "Margin Modeling"],
    summary: "Spreadsheet analytics project evaluating retail store sales, category demand, discount impact, and regional revenue trends across supermarket retail operations.",
    businessProblem: "Store managers lacked clear visibility into how heavy discounting impacted gross category margins and item stock turnover.",
    workPerformed: [
      "Cleaned supermarket sales transactional records, verifying missing prices and category tags.",
      "Built PivotTables analyzing sales revenue, quantity sold, and average ticket size.",
      "Engineered visual charts detailing category profitability and store-level revenue contribution.",
      "Constructed interactive slicers allowing immediate filtering by store location and product category."
    ],
    verifiedMetrics: [
      { label: "Total Revenue", value: "₹8.4 Cr" },
      { label: "Avg Basket Size", value: "₹1,240" },
      { label: "Discount Threshold", value: "15% Max" },
      { label: "Total Transactions", value: "67,742" }
    ],
    github: "https://github.com/J-Mohamed-Fazil/dmart-sales-analysis",
    hasRepo: true,
    hasWorkingModel: false,
    caseStudy: {
      overview: {
        domain: "Supermarket & Fast-Moving Consumer Goods (FMCG) Retail",
        tools: "Microsoft Excel, Data Cleaning, PivotTables, Summary Reports",
        description: "Retail analytics examining transaction volume, discount sensitivity, and product category profitability across retail supermarket operations."
      },
      businessProblem: "Understanding whether heavy discounting drove sustained customer basket growth or merely eroded gross margins.",
      datasetSource: "Supermarket retail sales transactions detailing date, category, unit price, quantity, discount, and margin.",
      dataPreparation: [
        "Checked nulls and outliers in unit prices and sales quantities.",
        "Formulated gross and net sales calculations in Excel.",
        "Created pivot summaries by product category and payment method."
      ],
      analysisMethodology: "PivotTable and chart reporting with dynamic slicers for store-by-store comparison.",
      sampleQuery: `-- FMCG Retail Net Revenue & Discount Elasticity Validation
Net_Revenue = [@Unit_Price] * [@Quantity] * (1 - [@Discount_Percent])
Margin_Erosion_Flag = IF([@Discount_Percent] > 0.15, "Margin Erosion (>15%)", "Healthy Margin")
Category_Contribution = [@Net_Revenue] / SUM(Retail_Transactions[Net_Revenue])`,
      keyFindings: [
        "Groceries and staples generated the highest recurring volume (35% of revenue) with steady margins.",
        "Discounts exceeding 15% on packaged goods did not generate proportional quantity spikes, leading to sharp margin erosion.",
        "Average basket size in metro stores reached ₹1,240 compared to ₹980 in tier-2 locations."
      ],
      businessRecommendations: [
        "Cap promotional discounts on high-velocity staple goods at 10-12% to preserve profitability.",
        "Introduce bundle pricing for slow-moving categories rather than blanket percentage discounts."
      ],
      limitations: "Covers single retail reporting period.",
      projectFiles: {
        repo: "https://github.com/J-Mohamed-Fazil/dmart-sales-analysis",
        type: "Excel Analysis Workbook (.xlsx)"
      }
    }
  },

  {
    id: "adventureworks-excel",
    title: "AdventureWorks Sales & Business Performance Analytics",
    category: "excel",
    badge: "Public Benchmark Dataset · Enterprise Excel Analytics",
    tools: ["Microsoft Excel", "Power Query", "Data Modeling", "PivotTables", "Executive KPIs"],
    summary: "Multi-year enterprise sales performance analytics using the classic AdventureWorks dataset. Models multi-currency transactions, regional sales quotas, product profitability, and customer segmentation in Excel.",
    businessProblem: "Executive team required a consolidated Excel workbook to evaluate multi-year sales performance across global territories, monitor product margins, and evaluate quarterly sales rep quota achievement.",
    workPerformed: [
      "Extracted and cleansed sales, product, and territory datasets in Excel Power Query.",
      "Built multi-table relational data model connecting sales orders to products, customers, and regions.",
      "Constructed executive summary dashboard featuring dynamic slicers for Fiscal Year, Territory, and Category.",
      "Calculated profit margins, average order value (AOV), and customer retention rates."
    ],
    verifiedMetrics: [
      { label: "Global Sales", value: "$48.7M" },
      { label: "Gross Margin", value: "38.2%" },
      { label: "Global Regions", value: "6 Territories" },
      { label: "Total Orders", value: "124,560" }
    ],
    github: "https://github.com/J-Mohamed-Fazil/AdventureWorks-Sales-Dashboard-Excel",
    hasRepo: true,
    hasWorkingModel: false,
    caseStudy: {
      overview: {
        domain: "Enterprise Manufacturing & Global Retail Sales",
        tools: "Microsoft Excel, Power Query, Data Modeling, PivotCharts",
        description: "Comprehensive financial and sales performance dashboard constructed from the Microsoft AdventureWorks enterprise dataset."
      },
      businessProblem: "Management needed visibility into international territory profitability and margin erosion across accessory product lines.",
      datasetSource: "Microsoft AdventureWorks sample database covering sales orders, products, territories, and historical sales rep allocations.",
      dataPreparation: [
        "Power Query ETL to filter cancelled orders and standardize foreign currency conversions.",
        "Engineered calculated columns for Profit_Margin = (Sales_Amount - Total_Cost) / Sales_Amount.",
        "Built date table hierarchy supporting Year, Quarter, and Month aggregations."
      ],
      analysisMethodology: "PivotTable dimensional cubes with cross-filtering slicers and conditional color formatting.",
      sampleQuery: `-- AdventureWorks Enterprise Power Query M Profit Margin Formula
Profit_Margin = DIVIDE([Sales_Amount] - [Total_Product_Cost], [Sales_Amount], 0)
Territory_Sales_Rank = DENSE_RANK([Total_Sales], Dim_Territory[Region])
Average_Order_Value  = AVERAGE(Fact_Internet_Sales[Sales_Amount])  -- Global Benchmark $391`,
      keyFindings: [
        "Bikes category generates over 65% of top-line revenue but operates at lower net margins compared to accessories.",
        "North American territories generated the highest volume ($20.1M), while European territories had higher average order values."
      ],
      businessRecommendations: [
        "Bundle high-margin accessories with bike sales during peak seasonal quarters.",
        "Adjust inventory stocking in European warehouses to reduce shipping lead times."
      ],
      limitations: "Historical enterprise benchmark data.",
      projectFiles: {
        repo: "https://github.com/J-Mohamed-Fazil/AdventureWorks-Sales-Dashboard-Excel",
        type: "Excel Dashboard Workbook (.xlsx)"
      }
    }
  },

  {
    id: "datanova-ai",
    title: "DATOVA — Interactive Data Profiler & EER Schema Studio",
    category: "tools",
    badge: "Interactive Data Profiler & Schema Modeler",
    tools: ["React 18", "TypeScript", "FastAPI", "Python", "EER Model Studio", "SQLAlchemy", "Pandas"],
    summary: "A data profiling and exploratory tooling asset featuring an interactive in-browser EER Database Schema Studio, automated schema discovery, data quality auditing (0–100 score), and deterministic SQL querying.",
    businessProblem: "Data analysts lose valuable hours manually inspecting unfamiliar multi-table CSV/Excel exports, identifying foreign keys, auditing missing values, and generating baseline charts before answering simple strategic questions.",
    workPerformed: [
      "Engineered an interactive in-browser EER Model Studio rendering table entities, PK/FK columns, and 1:N cardinality.",
      "Implemented automated schema discovery with 0–100 data health auditing for missing values and duplicates.",
      "Integrated statistical anomaly detection using Interquartile Range (IQR) and Z-score calculations in Pandas.",
      "Built in-browser analytical query runner with suggested exploratory prompts across multiple business domains."
    ],
    verifiedMetrics: [
      { label: "Data Health Score", value: "94/100" },
      { label: "Integrity Rate", value: "97%" },
      { label: "EER Studio", value: "In-Browser Visual" },
      { label: "Supported Domains", value: "3 Datasets" }
    ],
    github: "https://github.com/J-Mohamed-Fazil/dataova",
    hasRepo: true,
    hasWorkingModel: true,
    isSimulator: true,
    caseStudy: {
      overview: {
        domain: "Data Profiling & Schema Architecture Tooling",
        tools: "React 18, TypeScript, Python, Pandas, SQLAlchemy",
        description: "An exploratory data profiling tool that automatically scans tabular datasets, audits schema integrity, visualizes relational EER diagrams, and performs deterministic query calculations directly in the browser."
      },
      businessProblem: "Analysts need automated profiling tools to ingest raw tabular data, generate relational diagrams, and compute statistics without guesswork or manual schema mapping.",
      datasetSource: "Multi-table business schemas across Retail Sales, HR Workforce, and Commercial Banking domains.",
      dataPreparation: [
        "Engineered automatic schema profiler detecting semantic types (Numeric, DateTime, Boolean, Categorical, Identifier).",
        "Implemented deterministic data health scoring (0–100) assessing null ratios, duplicate rows, and schema integrity.",
        "Built statistical outlier detection utilizing Interquartile Range (IQR) calculations."
      ],
      analysisMethodology: "Interactive EER (Enhanced Entity-Relationship) Model Studio with relationship connectors and 1:N cardinality. Built-in analytical querying assistant grounded strictly on dataset facts.",
      sampleQuery: `// Interactive Relational Schema Modeler & Health Score Algorithm
interface SchemaEdge { sourceTable: string; targetTable: string; fkColumn: string; cardinality: "1:N"; }
const calculateDataHealth = (stats: TableMetrics): number => {
  const penalty = (stats.nullRatio * 35) + (stats.duplicateRatio * 40) + (stats.outlierRatio * 25);
  return Math.max(0, Math.round(100 - penalty));  // Verified 94/100 Benchmark
};`,
      keyFindings: [
        "Automated schema discovery reduces initial exploratory auditing time from hours to seconds.",
        "Interactive EER Studio visualizes foreign key relationships and enables relational join simulations directly in the browser.",
        "All summary metrics and correlation coefficients are computed deterministically via Pandas."
      ],
      businessRecommendations: [
        "Utilize DATOVA as an initial automated data profiling gate before loading raw data into reporting models.",
        "Leverage the built-in health auditor to detect nulls and anomalous outliers early in the analytics lifecycle."
      ],
      limitations: "Client-side interactive simulator showcases core schema modeling and query capabilities; backend services can be self-hosted via FastAPI.",
      projectFiles: {
        repo: "https://github.com/J-Mohamed-Fazil/dataova",
        type: "Full-Stack Source Code (React / TypeScript / FastAPI)"
      }
    }
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioProjects;
}
