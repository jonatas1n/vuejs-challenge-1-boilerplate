<template>
  <div>
    <button @click="prev()" :disabled="offset === 0">Previous</button>
    <button @click="next()">Next</button>
  </div>
</template>

<script setup>
  defineProps({
    next: Function,
    prev: Function,
    offset: Number,
  })
</script>