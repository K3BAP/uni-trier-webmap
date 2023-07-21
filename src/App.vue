<template>
  <v-app>
    <v-app-bar app dense color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Campuskarte Uni Trier</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <h1>Layer-Optionen</h1>
          <v-divider class="my-2"></v-divider>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Hinzufügen
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="layer in availableLayersNotActive" :key="availableLayers.indexOf(layer)" @click="addLayer(layer)">
                <v-list-item-title>{{ layer.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <LayerOptions 
            v-for="layerId in activeLayers" 
            :layer-container="availableLayers[layerId]"
            :key="availableLayers.indexOf(layerId)" 
            @delete="deleteLayer(layerId)"
            @moveup="moveUp(layerId)"
            @movedown="moveDown(layerId)"
          />
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


    <v-main>
      <div id="map"></div>
    </v-main>
    <v-footer padless class="d-none d-lg-block">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Fabian Sponholz</strong> (Projekt Seminar Kartographische Informatik)
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { Map, View } from 'ol';
import LayerOptions from './components/LayerOptions.vue';
import { defineLayerContainer, defineBaseLayers } from './assets/js/defineLayerContainer';

const baseLayers = defineBaseLayers()

export default {
  name: 'App',

  components: {
    LayerOptions
  },

  data: () => ({
    drawer: false,
    group: null,
    map: null,

    availableLayers: defineLayerContainer(),
    activeLayers: [
      0,
    ]
  }),
  mounted() {
    console.log("creating map");
    this.map = new Map({
      target: 'map',
      layers: baseLayers,
      view: new View({
        center: [40818900, 6402500],
        zoom: 16,
        minZoom: 14
      })
    });
    // Add initial layers to map
    this.activeLayers.forEach(layerId => {
      this.map.addLayer(this.availableLayers[layerId].layer);
    })

    this.orderLayers();
  },
  methods: {
    addLayer(layerContainer) {
      let layerId = this.availableLayers.indexOf(layerContainer);
      if (this.activeLayers.includes(layerId)) return;

      this.activeLayers.unshift(layerId);
      this.map.addLayer(layerContainer.layer);
      this.orderLayers();
    },
    deleteLayer(layerId) {
      console.log("delete layer");
      let layerContainer = this.availableLayers[layerId];
      let indexOfLayer = this.activeLayers.indexOf(layerId);

      this.activeLayers.splice(indexOfLayer, 1);
      this.map.removeLayer(layerContainer.layer);
    },
    moveUp(layerId) {
      const layerIndex = this.activeLayers.indexOf(layerId)
      console.log(layerIndex);
      if (layerIndex == 0) return;

      // swap positions in activeLayers Array
      const temp = this.activeLayers.splice(layerIndex, 1);
      this.activeLayers.splice(layerIndex - 1, 0, temp);

      this.orderLayers();
    },
    moveDown(layerId) {
      const layerIndex = this.activeLayers.indexOf(layerId)
      console.log(layerIndex);
      if (layerIndex == this.activeLayers.length - 1) return;

      // swap positions in activeLayers Array
      const temp = this.activeLayers.splice(layerIndex, 1);
      this.activeLayers.splice(layerIndex + 1, 0, temp);

      this.orderLayers();
    },
    orderLayers() {
      this.activeLayers.forEach(layerId => {
        this.availableLayers[layerId].layer.setZIndex(this.activeLayers.length - 1 - this.activeLayers.indexOf(layerId));
      })
    }
  },
  computed: {
    availableLayersNotActive() {
      let layers = [];
      this.availableLayers.forEach(layerContainer => {
        if (!this.activeLayers.includes(this.availableLayers.indexOf(layerContainer))) {
          layers.push(layerContainer);
        }
      })

      return layers;
    }
  }
};
</script>

<style>
@import url('../node_modules/ol/ol.css');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html,
body,
#map,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>