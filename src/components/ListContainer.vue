<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      <RowItem
        v-for="(pokemon, index) in pokemons"
        @click="handleClick(pokemon.name)"
        :key="pokemon.name"
        :pokemon="pokemon"
        :pokemonId="index + offset + 1"
      />
    </tbody>
  </table>
</template>

<script setup>
  import RowItem from '@/components/RowItem.vue';

  defineProps({
    pokemons: {
      type: Array,
      required: true,
    },
    offset: {
      type: Number,
      required: true,
    }
  })

  const emit = defineEmits(['selectPokemon']);

  const handleClick = (pokemonId) => {
    emit('selectPokemon', pokemonId);
  }
</script>
