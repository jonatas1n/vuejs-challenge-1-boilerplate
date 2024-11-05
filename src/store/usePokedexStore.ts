import { defineStore } from 'pinia';
import pokemonApi from '@/api/pokemon';
import type { stringOrNumber, PokedexProps } from '@/types';

const { fetchPokemons, fetchPokemonDetails, fetchPokemonSpecies } = pokemonApi;

export const usePokedexStore = defineStore('pokedex', {
  state: (): PokedexProps => ({
    pokemons: [],
    selectedPokemon: null,
    teamPokemons: [],
    isLoading: false,
    limit: 20,
  }),

  actions: {
    async fetchPokemonsList(offset: number) {
      if (offset + this.limit <= this.pokemons.length) return;

      this.isLoading = true;
      try {
        const { results } = await fetchPokemons(offset);
        const slicedResults = results.slice(this.pokemons.length - offset, offset + this.limit);
        this.pokemons.push(...slicedResults);
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchPokemonDetails(id: stringOrNumber) {
      if (this.selectedPokemon && this.selectedPokemon.id === id) return;

      this.isLoading = true;
      try {
        const pokemon = await fetchPokemonDetails(id);
        const pokemonSpecies = await fetchPokemonSpecies(id);
        const flavorText = pokemonSpecies.flavor_text_entries.find((entry: any) => entry.language.name === 'en');
        pokemon.flavorText = flavorText['flavor_text'];
        this.selectedPokemon = pokemon;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    addTeamPokemon(pokemonId: stringOrNumber) {
      if (this.teamPokemons.length >= 6) return;
      if (this.teamPokemons.includes(pokemonId)) return;
      this.teamPokemons.push(pokemonId);
    },

    removeTeamPokemon(pokemonId: stringOrNumber) {
      if (this.teamPokemons.length === 0) return;
      if (!this.teamPokemons.includes(pokemonId)) return;
      this.teamPokemons = this.teamPokemons.filter((id: stringOrNumber) => id !== pokemonId);
    }
  },

  getters: {
    teamPokemonsCount: (state) => state.teamPokemons.length,
    isOnTeam: (state) => (pokemonId: stringOrNumber) => state.teamPokemons.includes(pokemonId),
  },
});
