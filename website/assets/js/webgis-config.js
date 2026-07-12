/**
 * WebGIS configuration — Mapping Air Quality, France, Group 3
 * ------------------------------------------------------------------
 * Edit this file to point the map at your real data. Nothing else in
 * webgis.js needs to change for a normal swap of layers or basemaps.
 * ------------------------------------------------------------------
 */

// ============================================================
// >>> GROUP 3 TODO — GEOSERVER CONNECTION (fill in when ready) <<<
// The group decided to connect the WebGIS to the Polimi online
// GeoServer (https://www.gis-geoserver.polimi.it/) later. Until then
// USE_GEOSERVER stays false and the map uses the static placeholder
// layers below (served straight from this GitHub Pages site).
//
// To switch over:
//   1. Set USE_GEOSERVER to true.
//   2. Fill in GEOSERVER_URL and GEOSERVER_WORKSPACE below.
//   3. For each layer in STATIC_LAYERS, add a matching entry to
//      GEOSERVER_LAYER_NAMES (the "workspace:layer_name" published
//      on GeoServer for that dataset).
// webgis.js reads these values automatically — see buildLayer().
// ============================================================
const USE_GEOSERVER = false;
const GEOSERVER_URL = "";           // e.g. "https://www.gis-geoserver.polimi.it/geoserver/wms"
const GEOSERVER_WORKSPACE = "";     // e.g. "group3_france"
const GEOSERVER_LAYER_NAMES = {
  // static-layer id -> GeoServer layer name (without workspace prefix)
  "no2-amac": "",
  "pm25-amac": "",
  "pm10-amac": "",
  "landcover": "",
  "population": "",
  "aoi": "",
};

// ============================================================
// Map view
// ============================================================
const MAP_CENTER_LONLAT = [2.5, 46.6]; // France
const MAP_ZOOM = 6;
const FRANCE_EXTENT_LONLAT = [-5.2, 41.3, 9.6, 51.1]; // [minX, minY, maxX, maxY]

// ============================================================
// Basemaps — at least two required (OSM + one other), both free
// and attribution-compliant with no API key needed.
// ============================================================
const BASEMAPS = [
  {
    id: "osm",
    label: "OpenStreetMap",
    type: "osm",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
  },
  {
    id: "carto-light",
    label: "CARTO Positron",
    type: "xyz",
    url: "https://{a-d}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>',
  },
];
const DEFAULT_BASEMAP = "carto-light";

// ============================================================
// Data layers.
// type: "image" (static raster overlay covering `extent`) | "geojson" (vector)
// Placeholder images live in assets/img/webgis/ — swap the `url` for your
// real exported GeoTIFF converted to PNG/COG (see data/README.md), or flip
// USE_GEOSERVER above once your layers are published.
// ============================================================
const STATIC_LAYERS = [
  {
    id: "aoi",
    group: "Study Area",
    title: "France (AOI boundary)",
    type: "geojson",
    url: "data/layers/france_aoi.geojson",
    style: { stroke: "#0b2d48", strokeWidth: 2, fill: "rgba(11,45,72,0.03)" },
    visible: true,
  },
  {
    id: "no2-amac",
    group: "AMAC Change Maps · Step 4 (mandatory)",
    title: "NO2 — Annual Mean Change 2021→2023",
    type: "image",
    url: "assets/img/webgis/placeholder_no2_amac.svg",
    extent: FRANCE_EXTENT_LONLAT,
    legend: "diverging",
    visible: true,
    opacity: 0.75,
  },
  {
    id: "pm25-amac",
    group: "AMAC Change Maps · Step 4 (mandatory)",
    title: "PM2.5 — Annual Mean Change 2021→2023",
    type: "image",
    url: "assets/img/webgis/placeholder_pm25_amac.svg",
    extent: FRANCE_EXTENT_LONLAT,
    legend: "diverging",
    visible: false,
    opacity: 0.75,
  },
  {
    id: "pm10-amac",
    group: "AMAC Change Maps · Step 4 (mandatory)",
    title: "PM10 — Annual Mean Change 2021→2023",
    type: "image",
    url: "assets/img/webgis/placeholder_pm10_amac.svg",
    extent: FRANCE_EXTENT_LONLAT,
    legend: "diverging",
    visible: false,
    opacity: 0.75,
  },
  {
    id: "landcover",
    group: "Supporting Data (optional)",
    title: "Land Cover Change 2021–2023 (Step 5)",
    type: "image",
    url: "assets/img/webgis/placeholder_landcover.svg",
    extent: FRANCE_EXTENT_LONLAT,
    legend: "categorical",
    visible: false,
    opacity: 0.8,
  },
  {
    id: "population",
    group: "Supporting Data (optional)",
    title: "Population Density",
    type: "image",
    url: "assets/img/webgis/placeholder_population.svg",
    extent: FRANCE_EXTENT_LONLAT,
    legend: "sequential",
    visible: false,
    opacity: 0.75,
  },
];
