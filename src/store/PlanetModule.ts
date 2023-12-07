import { ref, computed, onMounted } from 'vue';
import { Planet, fetchPlanets, Films, fetchFilms } from '../services/apiService';

export function usePlanetModule() {
  const planets = ref<Planet[]>([]);
  const films = ref<Films[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const searchQuery = ref<string>(''); 
  const searchQueryFilms= ref<string>(''); 
  const sortBy = ref<string>('name');

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

  onMounted(() => {
    fetchPlanetsData();
    fetchFilmData();
  });

  // Filter planets based on search query
  const filteredPlanets = computed(() => {
    return planets.value.filter((planet) => {
      const lowerCaseQuery = searchQuery.value.toLowerCase();
      return (
        planet.name.toLowerCase().includes(lowerCaseQuery) ||
        planet.films.some((film) => film.toLowerCase().includes(lowerCaseQuery))
      );
    });
  });

  // Sort planets based on the selected sorting option
  const sortedPlanets = computed(() => {
    return filteredPlanets.value.slice().sort((a, b) => {
      if (sortBy.value === 'residents') {
        return (a.residents.length as number) - (b.residents.length as number);
      }else if (sortBy.value === 'films') {
        return (a.films.length as number) - (b.films.length as number);
      }else if (sortBy.value === 'population') {
        return (
          parseInt(a.population) - parseInt(b.population)
        ) as number;
      } else {
        return (a[sortBy.value] as string).localeCompare(
          b[sortBy.value] as string
        );
      }
    });
  });

  // Filter films based on search query
  const filteredFilms = computed(() => {
    return films.value.filter((film) => {
      const lowerCaseQuery = searchQueryFilms.value.toLowerCase();
      return (
        film.title.toLowerCase().includes(lowerCaseQuery) ||
        film.planets.some((film) => film.toLowerCase().includes(lowerCaseQuery))
      );
    });
  });

  const sortedFilms = computed(() => {
    return filteredFilms.value.slice().sort((a, b) => {
      if (sortBy.value === 'title') {
        return (a.planets.length as number) - (b.planets.length as number);
      } else if (sortBy.value === 'planets') {
        return (
          parseInt(a.title) - parseInt(b.title)
        ) as number;
      } else {
        return (a[sortBy.value] as string).localeCompare(
          b[sortBy.value] as string
        );
      }
    });
  });

  function getPlanetsByFilmTitle(films: any, title: any) {
    for (let film of films) {
      if (film.title === title) {
        return film.planets;
      }
    }
  }
  

  return {
    planets: sortedPlanets,
    films: getPlanetsByFilmTitle,
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    searchQuery,
    searchQueryFilms,
    sortBy,
  };
}
