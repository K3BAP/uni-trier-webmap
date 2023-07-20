<template>
    <div id="map"></div>
</template>

<script>
import { Map, View } from 'ol';
import { defineBaseLayers } from '@/assets/js/defineLayerContainer';

const baseLayers = defineBaseLayers();

export default {
    name: 'MapView',

    data() {
        return {
            map: null
        }
    },
    methods: {
        addLayer(layer) {
            console.log("yayy" + layer);
        }
    },
    mounted() {
        console.log("creating map");
        this.map = new Map({
            target: 'map',
            layers: baseLayers,
            view: new View({
                center: [40818900, 6402500],
                zoom: 16
            })
        })
    }
    
}
</script>