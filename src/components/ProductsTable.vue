<script lang="ts" setup>
import { useInventoryStore } from '../store/inventory-store'
import { useRouter } from 'vue-router'

const { products } = useInventoryStore()
const router = useRouter()

function editProduct(id: number) {
  router.push({ path: `/edit/${id}` })
}
</script>

<template> 
 <h1>Inventaris Systeem</h1>
  <table>
    <thead>
      <tr>
        <th>Product</th>
        <th>Huidige Voorraad</th>
        <th>Minimale Voorraad</th>
        <th>Acties</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.name }}</td>
        <td>{{ product.actualAmount }}</td>
        <td>{{ product.minimumAmount }}</td>
        <td><button @click="editProduct(product.id)">Bewerken</button></td>
      </tr>
    </tbody>
  </table>
  </template>