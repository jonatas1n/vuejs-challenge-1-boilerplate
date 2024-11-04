<template>
  <li @click="handleClick" :class="{ selected: selected }">
    {{ pokemonId }} - {{ pokemon.name }}
  </li>
</template>

<script setup>
  defineProps({
    pokemon: {
      type: Object,
      required: true,
    },
    pokemonId: {
      type: Number,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    }
  });
</script>