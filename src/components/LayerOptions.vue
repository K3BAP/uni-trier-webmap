<template>
    <v-container>
        <v-card class="px-4 pb-5" shaped outlined elevation="5">
            <v-row class="mt-1 ms-1">
                <h3>{{ layerContainer.title }}</h3>
            </v-row>
            <v-row class="">
                <v-slider v-model="slider" thumb-label min="0" max="100" @change="setOpacity()" @start="locked = true"
                    @end="locked = false"></v-slider>
            </v-row>
            <v-row justify="center" class="">
                <v-btn class="mx-1" elevation="2" fab x-small @click="moveUp"><v-icon> mdi-arrow-up </v-icon></v-btn>
                <v-btn class="mx-1" elevation="2" fab x-small @click="moveDown"><v-icon> mdi-arrow-down </v-icon></v-btn>
                <v-btn v-if="layerContainer.hasSettings" class="mx-1" elevation="2" fab x-small @click.stop="dialog=true"><v-icon> mdi-cog </v-icon></v-btn>
                <v-btn class="mx-1" elevation="2" fab x-small @click="deleteLayer"><v-icon> mdi-close </v-icon></v-btn>
            </v-row>
        </v-card>

        <!-- Pop-Up Dialog für den Gebäude-Layer -->
        <v-dialog v-if="layerContainer.title == 'Gebäude'" v-model="dialog" max-width="290">
            <v-card class="rounded-xl">
                <v-card-title class="text-h5">
                    Gebäude suchen
                </v-card-title>

                <v-text-field
                    v-model="geb_searchstring"
                    class="mx-2"
                    label="Gebäude"
                    placeholder="alle"
                    outlined
                ></v-text-field>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="geb_searchstring=''; gebSearch();">
                        Verwerfen
                    </v-btn>
                    <v-btn color="green darken-1" text @click="gebSearch()">
                        Anwenden
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
export default {
    name: 'LayerOptions',
    props: ['layerContainer'],

    data() {
        return {
            slider: 50,
            locked: false,
            dialog: false,
            geb_searchstring: ''
        }
    },
    methods: {
        moveUp() {
            this.$emit('moveup');
        },
        moveDown() {
            this.$emit('movedown');
        },
        deleteLayer() {
            this.$emit('delete');
        },
        setOpacity() {
            let opacity = this.slider / 100;
            console.log('setting opacity ' + opacity)
            this.layerContainer.layer.setOpacity(this.slider / 100);
        },
        gebSearch() {
            this.layerContainer.layer.getSource().updateParams({'CQL_FILTER': 'Gebaeude like \'%' + this.geb_searchstring + '%\''});
            this.dialog=false;
        }
    },
    mounted() {
        this.slider = this.layerContainer.layer.getOpacity() * 100;
    },
    beforeUpdate() {
        if (!this.locked) this.slider = this.layerContainer.layer.getOpacity() * 100;
    }
}
</script>