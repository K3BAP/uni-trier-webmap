/* eslint-disable */
import { Tile, Vector } from 'ol/layer';
import { TileWMS, Vector as SourceVector } from 'ol/source';
import { GeoJSON } from 'ol/format';
import { Style, Circle, Fill, Stroke } from 'ol/style';
 
/**
 * Define layers to be displayed at all times
 */
export function defineBaseLayers() {
  var layers = [
    // DOP Layer
    new Tile({
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/wms',
        params: { 'LAYERS': 'KI:rp_dop', 'TILED': true },
        serverType: 'geoserver'
      })
    }),

    // digitalization borders
    new Tile({
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/wms',
        params: { 'LAYERS': 'PROJ:grenzen', 'TILED': true },
        serverType: 'geoserver'
      })
    })
  ];

  return layers;
}

/**
 * Define layers to be available for user
 */
export function defineLayerContainer() {

  var layers = [
    {
      title: 'Gebäude',
      hasSettings: true,
      layer: new Tile({
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: { 'LAYERS': 'PROJ:gebaeude', 'TILED': true },
          serverType: 'geoserver'
        }),
        opacity: 0.7
      })
    },
    {
      title: 'Fußwege',
      hasSettings: false,
      layer: new Tile({
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: { 'LAYERS': 'PROJ:fusswege', 'TILED': true },
          serverType: 'geoserver'
        })
      })
    },
    {
      title: 'Bushaltestellen',
      hasSettings: true,
      layer: new Vector({
        source: new SourceVector({
          format: new GeoJSON(),
          url: 'http://localhost:8080/geoserver/wfs?service=WFS&' +
               'version=1.1.0' +
               '&request=GetFeature' +
               '&typename=PROJ:bushaltestellen' +
               '&outputFormat=application/json'
        }),
        style: new Style({
          image: new Circle({
               fill: new Fill({
                color: 'rgb(0, 0, 255)'
              }),
               radius: 8,
               stroke: new Stroke({
                color: 'rgb(0, 0, 0)',
                width: 0.8
              })
             })
          })
      })
    },
    {
      title: 'Parkplätze',
      hasSettings: false,
      layer: new Tile({
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: { 'LAYERS': 'PROJ:parkplaetze', 'TILED': true },
          serverType: 'geoserver'
        }),
        opacity: 0.7
      })
    },
    {
      title: 'Wohnheime',
      hasSettings: true,
      layer: new Tile({
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: { 'LAYERS': 'PROJ:wohnheime', 'TILED': true },
          serverType: 'geoserver'
        }),
        opacity: 0.7
      })
    },
    {
      title: 'Sportanlagen',
      hasSettings: false,
      layer: new Tile({
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: { 'LAYERS': 'PROJ:sportanlage', 'TILED': true },
          serverType: 'geoserver'
        }),
        opacity: 0.7
      })
    },
    {
      title: 'Gewächshäuser',
      hasSettings: false,
      layer: new Tile({
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: { 'LAYERS': 'PROJ:gewaechshaeuser', 'TILED': true },
          serverType: 'geoserver'
        }),
        opacity: 0.7
      })
    },
    {
      title: 'Wasserfläche',
      hasSettings: false,
      layer: new Tile({
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: { 'LAYERS': 'PROJ:wasserflaeche', 'TILED': true },
          serverType: 'geoserver'
        }),
        opacity: 0.7
      })
    },
  ];

  return layers;
}