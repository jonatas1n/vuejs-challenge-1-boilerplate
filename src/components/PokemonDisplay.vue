<template>
  <div>
    <h1>{{ pokemon.id }} - {{ pokemon.name }}</h1>
    <h2>Height: {{ pokemon.height }}</h2>
    <h2>Weight: {{ pokemon.weight }}</h2>
    <p>{{ pokemon.flavorText }}</p> 
  </div>
  <div>
    <RouterLink :to="{name: 'pokemon-details', params: { id: pokemon.id }}">View</RouterLink>
  </div>
</template>

<script setup>
  import { RouterLink } from 'vue-router';

  defineProps({
    pokemon: {
      type: Object,
      required: true,
    },
  });
</script>
