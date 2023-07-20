<template>
  <v-app>
    <v-app-bar
      app
      dense
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Campuskarte Uni Trier</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <h1>Layer-Optionen</h1>
          <v-divider class="my-2"></v-divider>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                Hinzufügen
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="layer in availableLayers"
                :key="availableLayers.indexOf(layer)"
              >
                <v-list-item-title>{{ layer.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <LayerOptions v-for="layer in activeLayers" :layer-container="availableLayers[layer]" :key="availableLayers.indexOf(layer)"/>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


    <v-main>
      <MapView/>
    </v-main>
    <v-footer padless class="d-none d-lg-block">
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>Fabian Sponholz</strong> (Projekt Seminar Kartographische Informatik)
    </v-col>
  </v-footer>
  </v-app>
</template>

<script>
import MapView from './components/Map.vue';
import LayerOptions from './components/LayerOptions.vue';
import { defineLayerContainer } from './assets/js/defineLayerContainer';

export default {
  name: 'App',

  components: {
    MapView,
    LayerOptions
},

  data: () => ({
    drawer: false,
    group: null,

    availableLayers: defineLayerContainer(),
    activeLayers:[
      0,
    ]
  }),

  watch: {
      group () {
        //this.drawer = false
      },
    },  
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
 
html, body, #map, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>