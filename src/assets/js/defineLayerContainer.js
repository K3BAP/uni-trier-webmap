/* eslint-disable */
import {Tile} from 'ol/layer';
import {OSM, Stamen, BingMaps, TileWMS} from 'ol/source';

/**
 * Define layers to be displayed at all times
 */
export function defineBaseLayers(){
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
  ];

  return layers;
}