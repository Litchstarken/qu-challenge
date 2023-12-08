<template>
  <v-app-bar class="pl-10 text-h6" color="primary" density="compact">The Swapi planets Challenge</v-app-bar>
  <!-- Search input -->
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <v-text-field v-model="searchQuery" hide-details="auto" label="Filter by planet name, film, or character"
            placeholder="Filter by planet, film, or character" type="text"></v-text-field>
        </v-sheet>
      </v-col>
      <!-- Sorting select -->
      <v-col cols="2">
        <v-sheet class="pa-2 ma-2">
          <div class="drop-down-wrapper">
            <select v-model="sortBy" class="dropdown-selected-option" label="Select">
              <option :value="null" disabled selected>Choose an option to</option>
              <option value="name">By Alphabetic Order</option>
              <option value="residents">By Residents</option>
              <option value="population">By Population</option>
              <option value="films">By Films Appearance</option>
            </select>
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="2">
        <v-sheet class="pa-2 ma-2">
          <v-btn @click="toggleSortDirection">
            Toggle Sort Direction
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row>
      <v-col v-for="(result, index) in results" :key="index" cols="12" sm="6" md="4" lg="3">
        <v-card :loading="loading" class="mx-auto my-12" max-width="374">
          <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
          </template>

          <v-img cover height="250" src="https://picsum.photos/200/300"></v-img>

          <v-card-item>
            <v-card-title> {{ result.name }} </v-card-title>

            <v-card-subtitle class="pt-4">
              Films appearance: {{ result.films.length }}
            </v-card-subtitle>
          </v-card-item>
          <v-card-text>
            <div>
              Population: {{ result.population }}
            </div>
          </v-card-text>
          <v-card-text>
            <div>
              Residents: {{ result.residents.length }}
            </div>
          </v-card-text>

          <v-divider class="mx-4 mb-1"></v-divider>

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
import { usePlanetModule } from '../store/PlanetModule';

export default defineComponent({
  data: () => ({
    snackbar: false,
    text: `Soon, very soon!!!`,
  }),

  setup() {
    const {
      results, // Use the results computed property 
      loading,
      error,
      searchQuery,
      sortBy,
      toggleSortDirection,
    } = usePlanetModule();

    return {
      results: computed(() => results.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
      searchQuery,
      sortBy,
      toggleSortDirection,
    };
  },
});
</script>

<style scoped>
.planet-card {
  margin: 1rem;
}

.drop-down-wrapper {
  cursor: pointer;
  max-width: 200px;
  margin: 0 auto;
}

.dropdown-selected-option {
  padding: 16px;
  border: solid 1px #2c3e50;
  border-radius: 8px;
  box-sizing: border-box;
  margin-bottom: 4px;
  cursor: pointer;
}
</style>
