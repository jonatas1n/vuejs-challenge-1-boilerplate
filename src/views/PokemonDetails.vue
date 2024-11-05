<template>
  <RouterLink :to="{name: 'pokedex'}">Back to List</RouterLink>
  <div v-if="pokedexStore.selectedPokemon">
    <img v-if="state.selectedSprite" :src="state.selectedSprite" alt="Pokemon" />
    <h1>{{ pokedexStore.selectedPokemon.id }} - {{ pokedexStore.selectedPokemon.name }}</h1>
    <h2>Height: {{ pokedexStore.selectedPokemon.height }}</h2>
    <h2>Weight: {{ pokedexStore.selectedPokemon.weight }}</h2>
    <p>{{ state.flavorText }}</p>
  </div>
</template>

<script setup>
  import { onMounted, reactive } from 'vue';
  import { RouterLink, useRoute } from 'vue-router';
  import { usePokedexStore } from '@/store/usePokedexStore';

  const pokedexStore = usePokedexStore();
  const route = useRoute();

  const state = reactive({
    selectedSprite: '',
    sprites: [],
  });

  const spritesInterval = () => {
    let index = 0
    setInterval(() => {
      state.selectedSprite = state.sprites[index]
      index = (index + 1) % state.sprites.length
    }, 1500);
  }

  const setSprites = async () => {
    const sprites = Object.values(pokedexStore.selectedPokemon.sprites);
    state.selectedSprite = sprites[0];
    state.sprites = sprites.filter(sprite => sprite && typeof sprite === 'string');
    spritesInterval();
  }

  onMounted(async () => {
    const { id: pokemonId } = route.params;
    await pokedexStore.fetchPokemonDetails(pokemonId);
    setSprites();
  })

</script>
