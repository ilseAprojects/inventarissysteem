<script setup lang="ts">
import { useInventoryStore, type InventoryItem } from '../store/inventory-store'

const { products, updateProduct } = useInventoryStore()
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
        <td>
          <button @click="updateProduct(product.id, product.actualAmount + 1)">+</button>
          <button @click="updateProduct(product.id, product.actualAmount - 1)">-</button>
        </td>
      </tr>
    </tbody>
  </table>
  </template> 