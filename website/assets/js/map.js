import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import { Map, View } from 'ol';
import { Tile, Image, Group } from 'ol/layer';
import { OSM, ImageWMS } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import LayerSwitcher from 'ol-layerswitcher';

// 1. Setup Map Base Configurations
const initialZoom = 6;
const initialCoordinates = [2.2137, 46.2276];
const geoserverWmsUrl = 'http://localhost:8080/geoserver/Lab_group_03/wms';

let osm = new Tile({
    title: 'OpenStreetMap',
    type: 'base',
    visible: true,
    source: new OSM()
});

let map = new Map({
    target: document.getElementById('map'),
    layers: [],
    view: new View({
        center: fromLonLat(initialCoordinates),
        zoom: initialZoom,
        projection: 'EPSG:3857'
    })
});

// 2. Define the individual WMS Layers 
// Root Level Layers inside Overlay Group
var franceBoundaries = new Image({
    title: 'France boundaries',
    visible: true,
    source: new ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:gis_lab_case_studies__boundaries' }
    }),
    opacity: 0.5
    
});


var landCover = new Image({
    title: 'Land Cover Change',
    visible: false,
    source: new ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:France_LCC_2021_2023' }
    })
});

// Group: concentration map 2023
var pm10_concentration_map = new Image({
    title: 'Concentration pm10 2023',
    visible: false,
    source: new ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:France_pm10_concentration_map_2023' }
    })
});

var pm2p5_concentration_map = new Image({
    title: 'Concentration pm2p5 2023',
    visible: false,
    source: new ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:FRANCE_pm2p5_concentration_map_2023' }
    })
});

var no2_concentration_map = new Image({
    title: 'Concentration no2 2023',
    visible: false,
    source: new ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:France_no2_concentration_map_2023' }
    })
});

// Group: AMAC 2021-2023
var pm10_amac = new Image({
    title: 'AMAC pm10',
    visible: false,
    source: new ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:France_pm10_2021_2023_AMAC_map' }
    })
});

var pm2p5_amac = new Image({
    title: 'AMAC pm2p5',
    visible: false,
    source: new ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:FRANCE_pm2p5_2021_2023_AMAC_map' }
    })
});

var no2_amac = new Image({
    title: 'AMAC no2',
    visible: false,
    source: new ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:France_no2 _2021_2023_AMAC_map' }
    })
});

// Group: Bivariate Map
var pm10_bivariate = new Image({
    title: 'Bivariate map pm10',
    visible: false,
    source: new ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:france_pm10_2023_bivariate__france_pol_2023_bivariate' }
    })
});

var pm2p5_bivariate = new Image({
    title: 'Bivariate map pm2p5',
    visible: false,
    source: new ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:france_pm2p5_2023_zonal_stats' }
    })
});

var no2_bivariate = new Image({
    title: 'Bivariate map no2',
    visible: false,
    source: new ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:NO2_Bivariate' }
    })
});

// Group: CAMS December 2023
var no2_cams = new Image({
    title: 'CAMS no2',
    visible: false,
    source: new ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:France_CAMS_no2_2023_12' }
    })
});
var pm10_cams = new Image({
    title: 'CAMS pm10',
    visible: false,
    source: new ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:France_CAMS_PM10_2023_12' }
    })
});
var pm2p5_cams = new Image({
    title: 'CAMS pm2p5',
    visible: false,
    source: new ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:France_CAMS_pm2p5_2023_12' }
    })
});

// Group: Average Concentration 2023
var no2_average = new Image({
    title: 'Average no2 Concentration',
    visible: false,
    source: new ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:France_average_no2_2023' }
    })
});
var pm10_average = new Image({
    title: 'Average pm10 Concentration',
    visible: false,
    source: new ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:France_average_pm10_2023' }
    })
});
var pm2p5_average = new Image({
    title: 'Average pm2p5 Concentration',
    visible: false,
    source: new ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:FRANCE_average_PM2P5_2023' }
    })
});
// 3. Assemble Nested Layer Groups matching the hierarchy in the interface layout
let basemapLayers = new Group({
    title: 'Base Maps',
    layers: [osm]
});

let overlayLayers = new Group({
    title: 'Overlay Layers',
    layers: [
        franceBoundaries,
        landCover,  
        new Group({
            title: 'CAMS December 2023',
            layers: [pm10_cams, pm2p5_cams, no2_cams]
        }),
        new Group({
            title: 'Average Concentration 2023',
            layers: [pm10_average, pm2p5_average, no2_average]
        }),
        new Group({
            title: 'Concentration Map 2023',
            layers: [pm10_concentration_map, pm2p5_concentration_map, no2_concentration_map]
        }),
        new Group({
            title: 'AMAC 2021-2023',
            layers: [pm10_amac, pm2p5_amac, no2_amac]
        }),
        new Group({
            title: 'Bivariate Map',
            layers: [pm10_bivariate, pm2p5_bivariate, no2_bivariate]
        })
    ]
});

// 4. Bind Everything to Map Scope
map.addLayer(basemapLayers);
map.addLayer(overlayLayers);

// 5. Initialize Interactive Switcher Interface
var layerSwitcher = new LayerSwitcher({});
map.addControl(layerSwitcher);