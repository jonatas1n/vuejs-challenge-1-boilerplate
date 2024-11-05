<template>
  <tr @click="handleClick" :class="{ selected: selected }">
    <td>{{ pokemonId }}</td>
    <td>{{ pokemon?.name }}</td>
  </tr>
</template>

<script setup>
  defineProps({
    pokemonId: {
      type: Number,
      required: true,
    },
    pokemon: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    }
  });

</script>