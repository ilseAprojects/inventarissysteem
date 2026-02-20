import { createRouter, createWebHistory } from 'vue-router'
import overview from '../pages/Overview.vue'
import Create from '../pages/Create.vue'
import Edit from '../pages/Edit.vue'
import Order from '../pages/Order.vue'

const routes = [
  { path: '/', component: overview },
  { path: '/create', component: Create },
  { path: '/edit/:id', component: Edit, props: true },
  { path: '/order', component: Order }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
