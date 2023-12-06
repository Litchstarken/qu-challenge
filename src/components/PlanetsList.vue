<template>
  <v-app-bar class="pl-10 text-h6" color="primary" density="compact">The Swapi planets Challenge</v-app-bar>
  <v-container>
    <v-row>
      <v-col v-for="planet in planets" :key="planet.id" cols="12" sm="6" md="4" lg="3">
        <v-card :loading="loading" class="mx-auto my-12" max-width="374">
          <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
          </template>

          <v-img cover height="250" src="https://picsum.photos/200/300"></v-img>

          <v-card-item>
            <v-card-title> {{ planet.name }} </v-card-title>

            <v-card-subtitle class="pt-4">
              Films appeareance: {{ planet.films.length }}
            </v-card-subtitle>
          </v-card-item>

          <v-card-text>
            <div>
              Terrain: {{ planet.terrain }}
            </div>
          </v-card-text>

          <v-card-text>
            <div>
              Climate: {{ planet.climate }}
            </div>
          </v-card-text>
          <v-divider class="mx-4 mb-1"></v-divider>

          <!-- <v-card-title>Star Wars Planets</v-card-title> -->

          <v-card-actions>
            <v-btn color="orange" variant="text" @click="snackbar = true">
              Explore
            </v-btn>
            <v-snackbar v-model="snackbar">
              {{ text }}

              <template v-slot:actions>
                <v-btn color="pink" variant="text" @click="snackbar = false">
                  Close
                </v-btn>
              </template>
            </v-snackbar>
          </v-card-actions>
          <div>

          </div>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
  <v-footer color="primary" class="text-center d-flex flex-column">
    <div class="pt-0">
      Vite, TypeScript, Vuetify, Axios, & Vitest for Star Wars API integration.
      Leveraged Vuex for state management & custom store handling in tests.
    </div>

    <v-divider></v-divider>

    <div>
      {{ new Date().toLocaleDateString() }} — <strong>John Castillo</strong> —
    </div>
  </v-footer>
</template>
  
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { usePlanetModule } from '../store/PlanetModule'; // Adjust the path



export default defineComponent({
  data: () => ({
    snackbar: false,
    text: `Soon, very soon!!!`,
  }),
  setup() {
    const { planets, loading, error } = usePlanetModule();

    return {
      planets: computed(() => planets.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
    };
  },
});
</script>
  
<style scoped>
.planet-card {
  margin: 1rem;
}
</style>
  