<script setup lang="ts">
import ProductsTable from '../components/ProductsTable.vue'
import { useInventoryStore } from '../store/inventory-store'

const { hasLowStock } = useInventoryStore()

</script>

<template>
  <div>
    <ProductsTable />
  </div>
  <div>
    <button @click="$router.push('/create')">Product Toevoegen</button>
    <button :class="{ 'order-urgent': hasLowStock }" @click="$router.push('/Order')">Bestellen</button>
  </div>
</template>

<style scoped>
button {
  margin: 0.5rem;
  padding: 0.6em 1.2em;
  font-size: 1em;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.25s;
}

button:hover {
  border-color: #646cff;
}

button.order-urgent {
  background-color: #d32f2f;
  color: white;
  font-weight: bold;
}

button.order-urgent:hover {
  background-color: #b71c1c;
  border-color: #ff6f6f;
}
</style>