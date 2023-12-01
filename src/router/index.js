import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue')
    },
     {
      path: '/movies',
      name: 'Movies',
      component: () => import('@/views/MoviesView.vue')
     },
     {
      path: '/series',
      name: 'Series',
      component: () => import('@/views/SeriesView.vue')
     },
     {
      path: '/item/:type/:id',
      name: 'Item',
      component: ()=> import('@/views/DetailsView.vue'),
      props: true,
     },
     {
      path: '/search/:query',
      name: 'Search',
      component: ()=> import('../views/SearchView.vue'),
      props: true,
     }
  ]
})

export default router
