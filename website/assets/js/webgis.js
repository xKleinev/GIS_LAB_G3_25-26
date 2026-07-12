/**
 * WebGIS map logic — Mapping Air Quality, France, Group 3.
 * Reads assets/js/webgis-config.js and builds an OpenLayers map with:
 *   - 2 basemaps (OSM + CARTO Positron)
 *   - ScaleLine, FullScreen and MousePosition controls
 *   - toggleable data layers with opacity sliders
 *   - a legend box that reacts to which layers are visible
 */
(function () {
  "use strict";

  if (typeof ol === "undefined") {
    console.error("OpenLayers failed to load — check your internet connection (loaded from CDN).");
    return;
  }

  // Size the map shell to exactly fill the viewport below the sticky header
  // (which already occupies its own space in normal flow — only the height
  // needs adjusting, no extra top offset).
  const headerEl = document.getElementById("header");
  const shellEl = document.querySelector(".webgis-shell");
  function layoutShell() {
    const h = headerEl.offsetHeight;
    shellEl.style.height = `calc(100vh - ${h}px)`;
  }
  layoutShell();
  window.addEventListener("resize", layoutShell);

  const franceExtent3857 = ol.proj.transformExtent(FRANCE_EXTENT_LONLAT, "EPSG:4326", "EPSG:3857");

  // ---------------------------------------------------------------
  // Basemaps
  // ---------------------------------------------------------------
  const basemapLayers = {};
  BASEMAPS.forEach((bm) => {
    let source;
    if (bm.type === "osm") {
      source = new ol.source.OSM({ attributions: bm.attribution });
    } else {
      source = new ol.source.XYZ({ url: bm.url, attributions: bm.attribution, maxZoom: 19 });
    }
    basemapLayers[bm.id] = new ol.layer.Tile({
      source: source,
      visible: bm.id === DEFAULT_BASEMAP,
      properties: { basemapId: bm.id },
    });
  });

  // ---------------------------------------------------------------
  // Data layers
  // ---------------------------------------------------------------
  const dataLayers = {};

  function buildLayer(cfg) {
    if (cfg.type === "geojson") {
      const vectorSource = new ol.source.Vector({
        url: cfg.url,
        format: new ol.format.GeoJSON(),
      });
      return new ol.layer.Vector({
        source: vectorSource,
        visible: !!cfg.visible,
        style: new ol.style.Style({
          stroke: new ol.style.Stroke({ color: cfg.style.stroke, width: cfg.style.strokeWidth }),
          fill: new ol.style.Fill({ color: cfg.style.fill }),
        }),
        properties: { layerId: cfg.id },
      });
    }

    // type === "image"
    const geoserverName = GEOSERVER_LAYER_NAMES[cfg.id];
    if (USE_GEOSERVER && GEOSERVER_URL && geoserverName) {
      return new ol.layer.Image({
        source: new ol.source.ImageWMS({
          url: GEOSERVER_URL,
          params: { LAYERS: `${GEOSERVER_WORKSPACE}:${geoserverName}`, TILED: false },
          serverType: "geoserver",
        }),
        visible: !!cfg.visible,
        opacity: cfg.opacity ?? 1,
        properties: { layerId: cfg.id },
      });
    }

    return new ol.layer.Image({
      source: new ol.source.ImageStatic({
        url: cfg.url,
        imageExtent: ol.proj.transformExtent(cfg.extent, "EPSG:4326", "EPSG:3857"),
        projection: "EPSG:3857",
      }),
      visible: !!cfg.visible,
      opacity: cfg.opacity ?? 1,
      properties: { layerId: cfg.id },
    });
  }

  STATIC_LAYERS.forEach((cfg) => {
    dataLayers[cfg.id] = buildLayer(cfg);
  });

  // ---------------------------------------------------------------
  // Controls
  // ---------------------------------------------------------------
  const mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: "EPSG:4326",
    className: "ol-mouse-position",
    target: undefined,
  });

  const controls = ol.control.defaults.defaults({ attributionOptions: { collapsible: true } }).extend([
    new ol.control.ScaleLine({ units: "metric" }),
    new ol.control.FullScreen(),
    mousePositionControl,
  ]);

  // ---------------------------------------------------------------
  // Map
  // ---------------------------------------------------------------
  const map = new ol.Map({
    target: "map",
    layers: [
      ...Object.values(basemapLayers),
      ...STATIC_LAYERS.map((cfg) => dataLayers[cfg.id]),
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat(MAP_CENTER_LONLAT),
      zoom: MAP_ZOOM,
      minZoom: 4,
      maxZoom: 18,
    }),
    controls: controls,
  });

  window.addEventListener("resize", () => map.updateSize());

  // Extra control: reset view to France
  const resetBtn = document.createElement("button");
  resetBtn.innerHTML = '<i class="bi bi-house"></i>';
  resetBtn.title = "Reset view to France";
  const resetEl = document.createElement("div");
  resetEl.className = "ol-unselectable ol-control ol-reset-view";
  resetEl.style.top = "10px";
  resetEl.style.right = "3.5em";
  resetEl.appendChild(resetBtn);
  resetBtn.addEventListener("click", () => {
    map.getView().animate({ center: ol.proj.fromLonLat(MAP_CENTER_LONLAT), zoom: MAP_ZOOM, duration: 400 });
  });
  map.addControl(new ol.control.Control({ element: resetEl }));

  // ---------------------------------------------------------------
  // Sidebar — basemap switcher
  // ---------------------------------------------------------------
  const basemapPicker = document.getElementById("basemapPicker");
  BASEMAPS.forEach((bm) => {
    const wrap = document.createElement("div");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "basemap";
    input.id = `basemap-${bm.id}`;
    input.checked = bm.id === DEFAULT_BASEMAP;
    const label = document.createElement("label");
    label.htmlFor = input.id;
    label.textContent = bm.label;
    wrap.appendChild(input);
    wrap.appendChild(label);
    basemapPicker.appendChild(wrap);

    input.addEventListener("change", () => {
      Object.values(basemapLayers).forEach((l) => l.setVisible(false));
      basemapLayers[bm.id].setVisible(true);
    });
  });

  // ---------------------------------------------------------------
  // Sidebar — data layers, grouped
  // ---------------------------------------------------------------
  const layerList = document.getElementById("layerList");
  const groups = {};
  STATIC_LAYERS.forEach((cfg) => {
    if (!groups[cfg.group]) groups[cfg.group] = [];
    groups[cfg.group].push(cfg);
  });

  Object.entries(groups).forEach(([groupName, layers]) => {
    const h6 = document.createElement("h6");
    h6.textContent = groupName;
    layerList.appendChild(h6);

    layers.forEach((cfg) => {
      const row = document.createElement("div");
      row.className = "form-check";

      const input = document.createElement("input");
      input.className = "form-check-input";
      input.type = "checkbox";
      input.id = `layer-${cfg.id}`;
      input.checked = !!cfg.visible;

      const label = document.createElement("label");
      label.className = "form-check-label";
      label.htmlFor = input.id;
      label.textContent = cfg.title;

      row.appendChild(input);
      row.appendChild(label);
      layerList.appendChild(row);

      input.addEventListener("change", () => {
        dataLayers[cfg.id].setVisible(input.checked);
        updateLegend();
      });

      if (cfg.type === "image") {
        const opacityRow = document.createElement("input");
        opacityRow.type = "range";
        opacityRow.className = "form-range mb-2";
        opacityRow.min = 0;
        opacityRow.max = 1;
        opacityRow.step = 0.05;
        opacityRow.value = cfg.opacity ?? 1;
        opacityRow.addEventListener("input", () => {
          dataLayers[cfg.id].setOpacity(parseFloat(opacityRow.value));
        });
        layerList.appendChild(opacityRow);
      }
    });
  });

  // ---------------------------------------------------------------
  // Legend — reacts to visible layers
  // ---------------------------------------------------------------
  function updateLegend() {
    const box = document.getElementById("mapLegend");
    box.innerHTML = "";

    const anyAmacVisible = ["no2-amac", "pm25-amac", "pm10-amac"].some((id) => dataLayers[id].getVisible());
    if (anyAmacVisible) {
      box.innerHTML += `
        <h6>Annual Mean Change 2021→2023</h6>
        <div class="legend-ramp"></div>
        <div class="legend-ramp-labels"><span>Decrease</span><span>No change</span><span>Increase</span></div>
      `;
    }

    if (dataLayers["landcover"].getVisible()) {
      box.innerHTML += `
        <h6 class="mt-2">Land Cover</h6>
        <div><span class="legend-swatch" style="background:#7fae6b"></span>Forest / semi-natural</div>
        <div><span class="legend-swatch" style="background:#e6d99b"></span>Agricultural</div>
        <div><span class="legend-swatch" style="background:#9a9a9a"></span>Artificial / urban</div>
        <div><span class="legend-swatch" style="background:#5aa0c9"></span>Water</div>
      `;
    }

    if (dataLayers["population"].getVisible()) {
      box.innerHTML += `
        <h6 class="mt-2">Population Density</h6>
        <div class="legend-ramp" style="background:linear-gradient(90deg,#eaf3fa,#a8d1ea,#8a3b2f,#4a1c14)"></div>
        <div class="legend-ramp-labels"><span>Low</span><span>High</span></div>
      `;
    }

    if (dataLayers["aoi"].getVisible()) {
      box.innerHTML += `
        <h6 class="mt-2">Study Area</h6>
        <div><span class="legend-swatch" style="background:transparent;border:2px solid #0b2d48"></span>France (AOI)</div>
      `;
    }

    if (!box.innerHTML) {
      box.innerHTML = `<span class="text-muted small">Toggle a layer to see its legend.</span>`;
    }
  }

  updateLegend();
})();
