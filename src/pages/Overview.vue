<script setup lang="ts">
import ProductsTable from '../components/ProductsTable.vue' 
</script>

<template>
<div>
  <ProductsTable />
</div>
<div>
  <button @click ="$router.push('/create')">Product Toevoegen</button>
  <button @click ="$router.push('/Order')">Bestellen</button>
</div>
  </template> 