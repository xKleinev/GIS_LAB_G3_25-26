# Data folder — how to plug in your real outputs

This folder currently only holds a placeholder AOI (`layers/france_aoi.geojson`).
The WebGIS's raster layers (NO2 / PM2.5 / PM10 AMAC, land cover, population) are
placeholder SVGs in `../assets/img/webgis/`, wired up from
`../assets/js/webgis-config.js`.

## 1. Swap in your real files

Replace the sample outputs listed in the Lab 5 slides (naming convention
`FRANCE_*`) once they are exported from QGIS:

| Lab output | Suggested web format | Where it's used |
|---|---|---|
| `FRANCE_no2_2021_2023_AMAC_map.tif` (+ `.qml`) | PNG or Cloud-Optimized GeoTIFF (COG) | WebGIS layer `no2-amac` |
| `FRANCE_pm2p5_2021_2023_AMAC_map.tif` (+ `.qml`) | PNG / COG | WebGIS layer `pm25-amac` |
| `FRANCE_pm10_2021_2023_AMAC_map.tif` (+ `.qml`) | PNG / COG | WebGIS layer `pm10-amac` |
| `FRANCE_LCC_2021_2023.tif` | PNG / COG | WebGIS layer `landcover` |
| `FRANCE_*_zonal_statistics_2021_2023.gpkg` | GeoJSON (for map) + numbers copied into the Results table/charts | `results.html`, `assets/js/results-charts.js` |
| `FRANCE_*_2023_bivariate.gpkg` | GeoJSON or exported map image | `results.html` bivariate section |
| `FRANCE_*_2023_chart.gpkg` | numbers copied into the Step 8 pie charts | `assets/js/results-charts.js` |

## 2. Converting GeoTIFF → web-friendly raster

**Quick option (static PNG, works with the current `ImageStatic` setup):**
Export a PNG directly from QGIS (Project → Import/Export → Export Map to
Image), matching the raster's extent. Note the extent's lon/lat bounding box
and update the corresponding `extent` in `webgis-config.js`.

**Better option (Cloud-Optimized GeoTIFF, if you later add a tile server or
GeoServer):**
```bash
gdal_translate -of COG -co COMPRESS=DEFLATE input.tif output_cog.tif
```

## 3. Converting GeoPackage → GeoJSON (for vector layers in OpenLayers)

```bash
ogr2ogr -f GeoJSON -t_srs EPSG:4326 output.geojson input.gpkg
```
Drop the result in `data/layers/` and add a new entry to `STATIC_LAYERS` in
`assets/js/webgis-config.js` (copy the `aoi` entry as a template).

## 4. Switching the WebGIS to the Polimi GeoServer

Once your group has GeoServer credentials and has published the layers, open
`assets/js/webgis-config.js` and fill in the block marked:

```
// >>> GROUP 3 TODO — GEOSERVER CONNECTION (fill in when ready) <<<
```

Set `USE_GEOSERVER = true`, fill in `GEOSERVER_URL` / `GEOSERVER_WORKSPACE`,
and map each layer id to its published GeoServer layer name in
`GEOSERVER_LAYER_NAMES`. No other code changes are needed — `webgis.js`
automatically builds a WMS layer instead of the static image/GeoJSON once
this is set.
