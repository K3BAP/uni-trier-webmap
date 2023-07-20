/* eslint-disable */
import {Tile} from 'ol/layer';
import {OSM, Stamen, BingMaps, TileWMS} from 'ol/source';

export function defineLayerContainer() {

  var layers = {};

  // Add proprietary SERVER BACKENDS..............................
  // Define OSM Layer
  layers['osmLayer'] = new Tile({
    source: new OSM()
  });

  // Define STAMEN
  layers['stamenLayer'] = new Tile({
    source: new Stamen({
      layer: 'watercolor'
    })
  });
  layers['toner'] = new Tile({
    source: new Stamen({
      layer: 'toner'
    })
  });

  // Define bingLayer
  layers['bingLayer'] = new Tile({
    source: new BingMaps({
      key: 'enter your key here',
      imagerySet: 'Aerial'
    })
  });

  layers['dop'] = new Tile({
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/wms',
      params: { 'LAYERS': 'KI:rp_dop', 'TILED': true },
      serverType: 'geoserver'
    })
  });
  //...................................................................

  // Add GEOSERVER layers

  layers['gebaeude'] = new Tile({
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/wms',
      params: { 'LAYERS': 'PROJ:gebaeude', 'TILED': true },
      serverType: 'geoserver'
    })
  });
  layers['gebaeude'].title = 'Länder'

  layers['grenzen'] = new Tile({
    source: new TileWMS({
      url: 'http://localhost:8080/geoserver/wms',
      params: { 'LAYERS': 'PROJ:grenzen', 'TILED': true },
      serverType: 'geoserver'
    })
  });
  layers['grenzen'].title = 'Grenzen'

  return layers;
}