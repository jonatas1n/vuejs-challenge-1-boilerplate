<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <header>
      <h1>Revolve Labs Pokédex</h1>
    </header>
    <main>
      <RouterView class="router-view" />
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.router-view {
  display: flex;
  flex-direction: column;
}
</style>
