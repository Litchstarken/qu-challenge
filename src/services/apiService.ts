// src/services/apiService.ts
import axios from 'axios';

export interface Planet {
  id: number;
  name: string;
  climate: string;
  terrain: string;
  population: string;
  films: string[];
  residents: string[];
  [key: string]: string | number | string[]
}
export interface People {
  name: string;
  homeworld: string;
  films: string[];
}
export interface Films {
  episode_id: number;
  title: string;
  characters: string[];
  planets: string[];
  [key: string]: string | number | string[]
}

export async function fetchPlanets(): Promise<Planet[]> {
  try {
    const response = await axios.get('https://swapi.dev/api/planets/');
    return response.data.results as Planet[];
  } catch (error: any) {
    throw new Error('Failed to fetch planets: ' + error.message);
  }
}

export async function fetchPeople(): Promise<People[]> {
  try {
    const response = await axios.get('https://swapi.dev/api/people/');
    return response.data.results as People[];
  } catch (error: any) {
    throw new Error('Failed to fetch people: ' + error.message);
  }
}

export async function fetchFilms(): Promise<Films[]> {
  try {
    const response = await axios.get('https://swapi.dev/api/films/');
    return response.data.results as Films[];
  } catch (error: any) {
    throw new Error('Failed to fetch films: ' + error.message);
  }
}
