import PokemonListVue from '@/views/PokemonList.vue'
import PokemonDetailsVue from '@/views/PokemonDetails.vue'
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
    },
    {
      path: '/pokedex/:id',
      name: 'pokemon-details',
      component: PokemonDetailsVue
    }
  ]
})

export default router
