# 📊 Mohamed Fazil J — Data Analyst & Data Science Portfolio

> An interactive, high-performance portfolio website built specifically for **Mohamed Fazil J** to showcase data analytics, business intelligence dashboards, SQL case studies, and machine learning prototypes to hiring managers and recruiters.

---

## 🌟 Key Highlights & Features

- **🎯 Interactive Data Analytics Lab (Powered by Chart.js)**
  - Toggle between live business intelligence datasets:
    - **HR Attrition Analytics**: Department turnover rates, overtime impact, early tenure flight-risk isolation.
    - **Olist E-Commerce Sales (100k+ rows)**: Revenue by product category, delivery delay SLA vs. review score correlation.
    - **Chinook Digital Music SQL Analytics**: Genre revenue distribution, customer lifetime spend by country.
- **🔍 Filterable Project Showcase**
  - Instant live filtering by category: **Power BI**, **Advanced Excel**, **SQL Cases**, **Python & Machine Learning**, and **Tableau**.
  - Real-time search by tool, topic, or keyword.
  - Deep-dive **Case Study Modals** detailing Business Challenge, Methodology, Quantitative Metrics, and Direct Links to your [GitHub Repositories](https://github.com/J-Mohamed-Fazil).
- **💻 SQL & Python Code Sandbox**
  - Interactive browser query runner demonstrating CTEs, Window Functions (`ROW_NUMBER`, `DENSE_RANK`), and Python IQR outlier detection with simulated execution times (14–24ms) and formatted result tables.
- **📄 Built-in ATS-Friendly Resume Modal**
  - Complete, structured resume viewer with a single-click **"Print / Save as PDF"** button (optimized via `@media print`).
- **⚡ Modern Dark Glassmorphism Design System**
  - Built with pure HTML5, vanilla CSS3 custom properties, and JavaScript.
  - Fully responsive across desktop, tablet, and mobile devices.
  - Zero external build dependencies—ready for immediate hosting on **GitHub Pages**.

---

## 📁 Project Structure

```
fazil-data-portfolio/
├── index.html              # Core semantic HTML5 structure & accessibility
├── style.css               # Design system, glassmorphism, responsive styles & print rules
├── app.js                  # Interactive logic, Chart.js instances, query simulation, modals
├── projects-data.js        # Structured project dataset with metrics & case study notes
├── assets/
│   └── hero-banner.jpg     # 3D holographic data science visual asset
└── README.md               # Documentation & deployment guide
```

---

## 🚀 How to Run Locally

You can preview the portfolio using any local web server or VS Code Live Server:

### Option 1: Python HTTP Server (Built-in)
```bash
cd "C:\Users\Mohamed Fazil J\.gemini\antigravity-ide\scratch\fazil-data-portfolio"
python -m http.server 4321
```
Then open your browser at:
👉 **[http://localhost:4321](http://localhost:4321)**

### Option 2: Node `npx serve`
```bash
npx serve .
```

---

## 🌐 How to Deploy to GitHub Pages for FREE

Because this website is built with clean static HTML/CSS/JS, you can host it for free on GitHub Pages:

1. Create a repository on your GitHub named **`J-Mohamed-Fazil.github.io`** (or push to a branch in your repository).
2. Push the files in this folder to that repository:
   ```bash
   git init
   git add .
   git commit -m "feat: launch data analyst portfolio"
   git branch -M main
   git remote add origin https://github.com/J-Mohamed-Fazil/J-Mohamed-Fazil.github.io.git
   git push -u origin main
   ```
3. Your live portfolio will automatically go live at:
   👉 **`https://J-Mohamed-Fazil.github.io`**

---

## 👤 Author

- **Mohamed Fazil J**
- **GitHub**: [github.com/J-Mohamed-Fazil](https://github.com/J-Mohamed-Fazil)
- **Role**: Data Analyst & Aspiring Data Scientist
- **Specialization**: Power BI, Advanced SQL, Python, Excel BI Modeling, Tableau
