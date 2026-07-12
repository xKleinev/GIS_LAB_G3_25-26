/**
 * Results page charts (Chart.js) and bivariate legend swatches.
 *
 * Every array below is SAMPLE DATA so the Results page renders correctly
 * out of the box. Replace the numbers with the real values extracted from
 * your zonal-statistics / bivariate / chart .gpkg attribute tables.
 */
(function () {
  "use strict";

  const COLORS = {
    no2: "#1b6ca8",
    pm25: "#c0392b",
    pm10: "#d68910",
    grid: "rgba(11,45,72,0.08)",
  };

  const REGIONS = [
    "Île-de-France",
    "Auvergne-Rhône-Alpes",
    "Hauts-de-France",
    "Provence-Alpes-Côte d'Azur",
    "Nouvelle-Aquitaine",
  ];

  const sharedScales = {
    y: { beginAtZero: true, grid: { color: COLORS.grid } },
    x: { grid: { display: false } },
  };

  function barChart(canvasId, label, data, color) {
    const el = document.getElementById(canvasId);
    if (!el || typeof Chart === "undefined") return;
    new Chart(el, {
      type: "bar",
      data: {
        labels: REGIONS,
        datasets: [{
          label: label,
          data: data,
          backgroundColor: color,
          borderRadius: 6,
          maxBarThickness: 42,
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: sharedScales,
      },
    });
  }

  // Step 6 — mean concentration per region (sample data, µg/m³)
  barChart("chart-no2-bar", "NO2 mean (µg/m³)", [24.8, 19.3, 17.6, 18.9, 13.1], COLORS.no2);
  barChart("chart-pm25-bar", "PM2.5 mean (µg/m³)", [12.4, 11.7, 10.9, 9.6, 8.8], COLORS.pm25);
  barChart("chart-pm10-bar", "PM10 mean (µg/m³)", [18.2, 17.5, 16.8, 15.4, 13.9], COLORS.pm10);

  // Step 4 — national AMAC change 2021 -> 2023 (sample data)
  (function () {
    const el = document.getElementById("chart-amac");
    if (!el || typeof Chart === "undefined") return;
    const values = [-1.8, -0.6, 0.4];
    new Chart(el, {
      type: "bar",
      data: {
        labels: ["NO2", "PM2.5", "PM10"],
        datasets: [{
          label: "Mean change 2021→2023 (µg/m³)",
          data: values,
          backgroundColor: values.map((v) => (v < 0 ? "#2166ac" : "#b2182b")),
          borderRadius: 6,
          maxBarThickness: 60,
        }],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: COLORS.grid } },
          y: { grid: { display: false } },
        },
      },
    });
  })();

  // Step 8 — population exposure pie charts (sample data, % of population)
  function pieChart(canvasId, color) {
    const el = document.getElementById(canvasId);
    if (!el || typeof Chart === "undefined") return;
    new Chart(el, {
      type: "pie",
      data: {
        labels: ["Very low", "Low", "Moderate", "High", "Very high"],
        datasets: [{
          data: [8, 22, 35, 24, 11],
          backgroundColor: [
            "#eaf3fa",
            "#a8d1ea",
            color,
            "#8a3b2f",
            "#4a1c14",
          ],
          borderWidth: 2,
          borderColor: "#ffffff",
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } } },
      },
    });
  }

  pieChart("chart-pie-no2", COLORS.no2);
  pieChart("chart-pie-pm25", COLORS.pm25);
  pieChart("chart-pie-pm10", COLORS.pm10);

  // Bivariate 3x3 legends (population x pollution). Classic blue/pink bivariate palette —
  // swap for the ramp exported from your QGIS bivariate style if it differs.
  const BIVARIATE_PALETTE = [
    // low pollution -> high pollution (columns), low pop -> high pop (rows, bottom to top)
    ["#e8e8e8", "#dfb0d6", "#be64ac"], // low population row
    ["#ace4e4", "#a5add3", "#8c62aa"], // mid population row
    ["#5ac8c8", "#5698b9", "#3b4994"], // high population row
  ];

  function renderBivariateLegend(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    BIVARIATE_PALETTE.forEach((row) => {
      row.forEach((color) => {
        const cell = document.createElement("div");
        cell.style.background = color;
        container.appendChild(cell);
      });
    });
  }

  renderBivariateLegend("bivariateLegendNo2");
  renderBivariateLegend("bivariateLegendPm25");
  renderBivariateLegend("bivariateLegendPm10");
})();
