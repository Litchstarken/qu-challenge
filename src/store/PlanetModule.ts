// src/store/planetModule.ts
import { ref, computed, onMounted } from 'vue';
import { Planet, fetchPlanets } from '../services/apiService';

export function usePlanetModule() {
  const planets = ref<Planet[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchPlanetsData = async () => {
    loading.value = true;
    error.value = null;

    try {
      const fetchedPlanets = await fetchPlanets();
      planets.value = fetchedPlanets;
    } catch (err: any) {
      error.value = `Failed to fetch planets: ${err.message}`;
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchPlanetsData();
  });

  return {
    planets: computed(() => planets.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
  };
}
