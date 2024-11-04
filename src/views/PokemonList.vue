<template>
  <!-- <div :if="state.selectedPokemon">
    <img :src="state.selectedPokemon.sprites?.front_default" alt="Pokemon" />
    <h1>{{ state.selectedPokemon.id }} - {{ state.selectedPokemon.name }}</h1>
    <h2>Height: {{ state.selectedPokemon.height }}</h2>
    <h2>Weight: {{ state.selectedPokemon.weight }}</h2>
    <p>{{ state.flavorText }}</p>
  </div> -->
  <ListContainer :pokemons="state.pokemons" :offset="state.offset" />
  <div>
    <button @click="state.prev()" :disabled="state.offset === 0">Previous</button>
    <button @click="state.next()">Next</button>
  </div>
</template>

<script setup lang="ts">
  import { reactive, onMounted } from 'vue';
  import pokemonApi from '@/api/pokemon';
  import ListContainer from '@/components/ListContainer.vue';

  const { fetchPokemons } = pokemonApi;
  
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

  onMounted(() => getPokemons());
</script>
