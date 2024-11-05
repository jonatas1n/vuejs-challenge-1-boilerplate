<template>
  <PokemonDisplay v-if="state.selectedPokemon" :pokemon="state.selectedPokemon" />
  <ListContainer @selectPokemon="handleSelectPokemon" :pokemons="state.pokemons" :offset="state.offset" />
  <ListPagination :next="state.next" :prev="state.prev" :offset="state.offset"/>
</template>

<script setup lang="ts">
  import { reactive, onMounted } from 'vue';
  import pokemonApi from '@/api/pokemon';
  import ListContainer from '@/components/ListContainer.vue';
  import PokemonDisplay from '@/components/PokemonDisplay.vue';
  import ListPagination from '@/components/ListPagination.vue';

  const { fetchPokemons, fetchPokemonDetails, fetchPokemonSpecies } = pokemonApi;
  
  const state = reactive({
    pokemons: [],
    offset: 0,
    count: 0,
    next: () => null,
    prev: () => null,
    selectedPokemon: null,
  });

  const getPokemons = async (offset=0) => {
    if (offset !== 0 && !offset) return;

    const { results, offsetNext, offsetPrev, count } = await fetchPokemons(offset);
    state.offset = parseInt(offset)
    state.count = count
    state.prev = () => getPokemons(offsetPrev),
    state.next = () => getPokemons(offsetNext),
    state.pokemons = results;
  };

  const handleSelectPokemon = async (pokemonName) => {
    if (!pokemonName || state.selectedPokemon?.name === pokemonName) return;

    const pokemonDetails = await fetchPokemonDetails(pokemonName);
    const pokemonSpecies = await fetchPokemonSpecies(pokemonName);
    const enFlavorText = pokemonSpecies.flavor_text_entries.find(entry => entry.language.name === 'en');
    pokemonDetails.flavorText = enFlavorText.flavor_text;
    state.selectedPokemon = pokemonDetails;
  };

  onMounted(() => getPokemons());
</script>
