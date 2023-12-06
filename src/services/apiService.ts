// src/services/apiService.ts
import axios from 'axios';

export interface Planet {
  id: number;
  name: string;
  climate: string;
  terrain: string;
  population: string;
  films: string[];
}

export async function fetchPlanets(): Promise<Planet[]> {
  try {
    const response = await axios.get('https://swapi.dev/api/planets/');
    return response.data.results as Planet[];
  } catch (error: any) {
    throw new Error('Failed to fetch planets: ' + error.message);
  }
}
