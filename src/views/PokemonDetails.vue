<template>
  <img :src="state.pokemon.sprites?.front_default" alt="Pokemon" />
  <h1>{{ state.pokemon.id }} - {{ state.pokemon.name }}</h1>
  <h2>Height: {{ state.pokemon.height }}</h2>
  <h2>Weight: {{ state.pokemon.weight }}</h2>
  <p>{{ state.flavorText }}</p>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import pokemonApi from '@/api/pokemon'

const { fetchPokemonDetails, fetchPokemonSpecies } = pokemonApi

const route = useRoute()

const state = reactive({
  pokemon: {},
  flavorText: ''
})

onMounted(() => {
  const pokemonId = route.params.id
  fetchPokemonDetails(pokemonId).then((response) => {
    state.pokemon = response.data
  })
  fetchPokemonSpecies(pokemonId).then(response => {
    const flavorTextEntries = response.data.flavor_text_entries
    const englishFlavorText = flavorTextEntries.find(entry => entry.language.name === 'en')
    state.flavorText = englishFlavorText.flavor_text
  })
})
</script>
