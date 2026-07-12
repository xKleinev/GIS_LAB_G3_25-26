<<<<<<< HEAD
# Mapping Air Quality in France — GIS Group 3

Website and WebGIS for the Politecnico di Milano GIS course (A.A. 2025/26),
Lab 5 deliverable. Maps NO2, PM2.5 and PM10 concentrations and their
2021→2023 change across France, built on a heavily customized version of the
[OnePage](https://bootstrapmade.com/onepage-multipurpose-bootstrap-template/)
Bootstrap template.

## Pages

| Page | File | Content |
|---|---|---|
| Home | `index.html` | Project overview, key facts, processing pipeline summary, team |
| Data & Methods | `methods.html` | Data sources, technologies, the 8 processing steps, choices & challenges |
| Results | `results.html` | Land cover change table, zonal statistics + charts, bivariate maps + legend, population exposure pie charts, download links |
| WebGIS | `webgis.html` | Interactive OpenLayers map: 2 basemaps, layer toggles, scale line / full screen / mouse position controls, legend |

## ⚠️ Before you submit: replace the placeholders

This site ships fully working end-to-end with clearly-marked **sample data**
so it's easy to review and deploy immediately. Search for these markers and
replace them with your group's real content:

- **`edit-note` boxes** (dashed yellow callouts) across `index.html` /
  `methods.html` — narrative text only you can write (why France, choices
  made, problems encountered, team member names).
- **`figure-placeholder` boxes** (dashed empty states) in `results.html` /
  `methods.html` — drop your exported QGIS screenshots into
  `assets/img/results/` with the filenames shown in each box.
- **Sample numbers** in `results.html`'s tables and in
  `assets/js/results-charts.js` — replace with the real values from your
  `.gpkg` zonal statistics / bivariate / chart layers.
- **Placeholder WebGIS layers** in `assets/img/webgis/` and
  `data/layers/france_aoi.geojson` — see `data/README.md` for exactly how to
  swap in your real GeoTIFF/GeoPackage outputs, and how to switch the map
  over to the Polimi online GeoServer when it's ready (look for the
  `GROUP 3 TODO` block in `assets/js/webgis-config.js`).
- **Download links** in `results.html` (`href="#"`) — point them at your
  uploaded files (GitHub raw links, OneDrive, Google Drive or WeTransfer),
  per the Lab Submission instructions.

## Run locally

No build step — it's static HTML/CSS/JS. From this folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

OpenLayers and Chart.js are vendored in `assets/vendor/` (not loaded from a
CDN), so the site — including the WebGIS map itself — works fully offline
except for the basemap tiles (OpenStreetMap / CARTO), which always need an
internet connection since no one can pre-download the whole world.

## Deploy to GitHub Pages

1. Push this repository to GitHub (see branch note below).
2. Repo Settings → Pages → Source: Deploy from branch → pick the branch and
   `/ (root)`.
3. The site will be live at `https://<user>.github.io/<repo>/`.

A `.nojekyll` file is included so GitHub Pages serves the `assets/` folder
as-is without running it through Jekyll.

## Project structure

```
index.html / methods.html / results.html / webgis.html
assets/
  css/        main.css (template) + custom.css (project theme, edit this one)
  js/         main.js (template) + webgis.js, webgis-config.js, results-charts.js
  vendor/     bootstrap, bootstrap-icons, aos, glightbox, purecounter, ol, chartjs
  img/        favicon, webgis/ (placeholder layer graphics), results/ (drop your screenshots here)
data/
  layers/     france_aoi.geojson (placeholder AOI) — add your converted GeoJSON layers here
  README.md   conversion instructions (GeoTIFF → PNG/COG, GeoPackage → GeoJSON) and GeoServer switch-over
```

## Credits

Base template: [OnePage by BootstrapMade](https://bootstrapmade.com/onepage-multipurpose-bootstrap-template/)
(free license — footer credit retained per license terms).
Mapping: [OpenLayers](https://openlayers.org/). Charts: [Chart.js](https://www.chartjs.org/).
Basemaps: © OpenStreetMap contributors, © CARTO.
Data: Copernicus Atmosphere Monitoring Service (CAMS), Copernicus Land
Monitoring Service (CORINE Land Cover), Eurostat/GISCO.
=======
# GIS_LAB_G3_25-26
>>>>>>> b45860c59a8b566b70c3b2d1fe304d3416113c14
