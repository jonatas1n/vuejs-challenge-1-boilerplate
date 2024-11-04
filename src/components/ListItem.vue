<template>
  <li @click="handleClick" :class="{ selected: selected }">
    {{pokemonId }} - {{ pokemon.name }}
  </li>
</template>

<script setup>
  import { defineProps, defineEmits } from 'vue';

  const props = defineProps({
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

  const emit = defineEmits(['selectPokemon']);

  const handleClick = () => {
    emit('selectPokemon', props.pokemonId);
  }

</script>