import PokemonListVue from '@/views/PokemonList.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      redirect: (to) => {
        return 'pokedex'
      }
    },
    {
      path: '/pokedex',
      name: 'pokedex',
      component: PokemonListVue
    }
  ]
})

export default router
