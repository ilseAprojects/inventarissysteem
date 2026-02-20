<script lang="ts" setup>
import { useInventoryStore } from '../store/inventory-store'
import { useRouter } from 'vue-router'

const { products } = useInventoryStore()
const router = useRouter()

function editProduct(id: number) {
  router.push({ path: `/edit/${id}` })
}

function isLowStock(actualAmount: number, minimumAmount: number): boolean {
  return actualAmount < minimumAmount
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
        <th>Status</th>
        <th>Acties</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id" :class="{ 'low-stock': isLowStock(product.actualAmount, product.minimumAmount) }">
        <td>{{ product.name }}</td>
        <td>{{ product.actualAmount }}</td>
        <td>{{ product.minimumAmount }}</td>
        <td>
          <span v-if="isLowStock(product.actualAmount, product.minimumAmount)" class="status-warning">⚠️ Bijbestellen </span>
          <span v-else class="status-ok">✓ OK</span>
        </td>
        <td><button @click="editProduct(product.id)">Bewerken</button></td>
      </tr>
    </tbody>
  </table>
  </template>

<style scoped>
table tbody tr.low-stock {
  background-color: #ffcccc;
  color: #8b0000;
  font-weight: 500;
}
</style>