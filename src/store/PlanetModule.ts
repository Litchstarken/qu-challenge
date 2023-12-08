import { ref, computed, onMounted } from 'vue';
import { Planet, fetchPlanets, Films, fetchFilms, People, fetchPeople } from '../services/apiService';

export function usePlanetModule() {
  const planets = ref<Planet[]>([]);
  const films = ref<Films[]>([]);
  const characters = ref<People[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const searchQuery = ref<string>(''); // For combined search
  const sortBy = ref<string>('name');
  const sortDirection = ref<'asc' | 'desc'>('asc');

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

  const fetchFilmData = async () => {
    loading.value = true;
    error.value = null;

    try {
      const fetchedFilm = await fetchFilms();
      films.value = fetchedFilm;
    } catch (err: any) {
      error.value = `Failed to fetch films: ${err.message}`;
    } finally {
      loading.value = false;
    }
  };

  const fetchCharacterData = async () => {
    loading.value = true;
    error.value = null;

    try {
      const fetchedCharacters = await fetchPeople();
      characters.value = fetchedCharacters;
    } catch (err: any) {
      error.value = `Failed to fetch characters: ${err.message}`;
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchPlanetsData();
    fetchFilmData();
    fetchCharacterData();
  });
  

// filter fn() to list of people corresponding to the planet
const getPlanetCharacters = (residents: string[]): People[] => {
  return characters.value.filter(char => residents.includes(char.url));
}
// filter fn() to list of the films that belongs to the planet
const getPlanetFilms = (planetFilms: string[]): Films[] => {
  return films.value.filter(film => planetFilms.includes(film.url));
}

// Filter planets based on search query
const filteredResults = computed(() => {
  const lowerCaseQuery = searchQuery.value.toLowerCase();
  // Filter planets based on name
  return planets.value.filter((planet) => {
    const characters = getPlanetCharacters(planet.residents)
    const films = getPlanetFilms(planet.films)
    
    const matchCharacter = characters.filter( char => char.name.toLowerCase().includes(lowerCaseQuery)).length > 0;
    const matchFilms = films.filter( film => film.title.toLowerCase().includes(lowerCaseQuery)).length > 0;
    const matchPlanet = planet.name.toLowerCase().includes(lowerCaseQuery);

    return matchCharacter || matchPlanet || matchFilms
  });
});

  // Sort the combined results based on the selected sorting option
  const sortedResults = computed(() => {
    return filteredResults.value.slice().sort((a, b) => {
      if (sortBy.value === 'residents') {
        const result =
          ((a as Planet).residents?.length || 0) - ((b as Planet).residents?.length || 0);
        return sortDirection.value === 'asc' ? result : -result;
      } else if (sortBy.value === 'films') {
        const result = ((a as Planet).films?.length || 0) - ((b as Planet).films?.length || 0);
        return sortDirection.value === 'asc' ? result : -result;
      } else if (sortBy.value === 'population') {
        const result =
          (parseInt((a as Planet).population) || 0) - (parseInt((b as Planet).population) || 0);
        return sortDirection.value === 'asc' ? result : -result;
      } else {
        const result =
          ((a as Record<string, any>)[sortBy.value]?.toString() || '').localeCompare(
            ((b as Record<string, any>)[sortBy.value]?.toString() || '')
          );
        return sortDirection.value === 'asc' ? result : -result;
      }
    });
  });

  const toggleSortDirection = () => {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  };

  return {
    results: sortedResults,
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    searchQuery,
    toggleSortDirection,
    sortBy,
  };
}
