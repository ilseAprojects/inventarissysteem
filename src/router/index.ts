import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Create from '../pages/Create.vue'
import Edit from '../pages/Edit.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/create', component: Create },
  { path: '/edit/:id', component: Edit, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
