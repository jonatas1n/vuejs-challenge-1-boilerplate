<template>
  <PokemonDisplay v-if="pokedexStore.selectedPokemon" :pokemon="pokedexStore.selectedPokemon" />
  <ListContainer @selectPokemon="handleSelectPokemon" :pokemons="state.pokemons" :offset="state.offset" />
  <ListPagination v-if="state.pokemons.length" :next="state.next" :prev="state.prev" :offset="state.offset"/>
</template>

<script setup lang="ts">
  import { reactive, onMounted } from 'vue';
  import { usePokedexStore } from '@/store/usePokedexStore';
  import ListContainer from '@/components/ListContainer.vue';
  import PokemonDisplay from '@/components/PokemonDisplay.vue';
  import ListPagination from '@/components/ListPagination.vue';

  const LIMIT = 20;

  const pokedexStore = usePokedexStore();
  const state = reactive({
    pokemons: [],
    offset: 0,
    next: () => null,
    prev: () => null,
  });

  const getPokemons = async (offset=0) => {
    if (offset < 0 || (!offset && offset !== 0)) return;

    await pokedexStore.fetchPokemonsList(offset);
    state.pokemons = pokedexStore.pokemons.slice(offset, offset + LIMIT);
    state.offset = parseInt(offset);
    state.prev = () => getPokemons(offset - LIMIT);
    state.next = () => getPokemons(offset + LIMIT);
  };

  const handleSelectPokemon = async (pokemonName) => {
    if (!pokemonName || state.selectedPokemon?.name === pokemonName) return;
    await pokedexStore.fetchPokemonDetails(pokemonName);
  };

  onMounted(() => getPokemons());
</script>
