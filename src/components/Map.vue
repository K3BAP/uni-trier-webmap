<template>
    <div id="map"></div>
</template>

<script>
import { Map, View } from 'ol';
import { defineLayerContainer } from '@/assets/js/defineLayerContainer';

const layers = defineLayerContainer();

export default {
    name: 'MapView',

    data() {
        return {
            active_layers: [
                layers['dop'],
                layers['grenzen'],
            ]
        }
    },
    mounted() {
        console.log("creating map");
        this.map = new Map({
            target: 'map',
            layers: this.active_layers,
            view: new View({
                center: [40818900, 6402500],
                zoom: 16
            })
        })
    }
}
</script>