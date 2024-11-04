import axios from 'axios';

type stringOrNumber = string | number;

const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 10000,
});

export default {
  async fetchPokemons(offset: number = 0, limit: number = 20) {
    const response = await apiClient.get(`pokemon?limit=${limit}&offset=${offset}`);
    const { results, count, next, previous } = response.data;
    
    const offsetNext = new URL(next).searchParams.get('offset');
    const offsetPrev = previous ? new URL(previous).searchParams.get('offset') : null;

    return { results, count, offset, offsetNext, offsetPrev };
  },

  async fetchPokemonDetails(id: stringOrNumber) {
    const response = await apiClient.get(`pokemon/${id}`);
    return response.data;
  },

  async fetchPokemonSpecies(id: stringOrNumber) {
    const response = await apiClient.get(`pokemon-species/${id}`);
    return response.data;
  }
}