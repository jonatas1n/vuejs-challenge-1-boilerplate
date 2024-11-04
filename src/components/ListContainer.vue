<template>
  <ul>
    <ListItem
      v-for="(pokemon, index) in props.pokemons"
      :key="pokemon.name"
      :pokemon="pokemon"
      :pokemonId="index + props.offset + 1"
    />
  </ul>
</template>

<script setup>
  import { defineProps } from 'vue';
  import ListItem from '@/components/ListItem.vue';

  const props = defineProps({
    pokemons: {
      type: Array,
      required: true,
    },
    offset: {
      type: Number,
      required: true,
    }
  })
</script>
