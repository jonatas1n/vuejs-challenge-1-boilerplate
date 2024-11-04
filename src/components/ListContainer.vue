<template>
  <ul>
    <ListItem
      v-for="(pokemon, index) in props.pokemons"
      @click="handleClick(pokemon.name)"
      :key="pokemon.name"
      :pokemon="pokemon"
      :pokemonId="index + props.offset + 1"
    />
  </ul>
</template>

<script setup>
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

  const emit = defineEmits(['selectPokemon']);

  const handleClick = (pokemonId) => {
    emit('selectPokemon', pokemonId);
  }
</script>
