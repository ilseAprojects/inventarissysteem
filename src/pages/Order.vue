<script lang="ts" setup>
import { useInventoryStore } from '../store/inventory-store'   
import { computed } from 'vue'

const { products } = useInventoryStore()
const productsToOrder = computed(() => {
    return products.value.filter(p => p.actualAmount < p.minimumAmount)
})
</script>

<template>
<div>
    <h2>Te bestellen producten</h2>
    <ul>
        <li v-for="product in productsToOrder" :key="product.id">
            {{ product.name }} - Huidige hoeveelheid: {{ product.actualAmount }} - Minimum hoeveelheid: {{ product.minimumAmount }}
            {{ product.minimumAmount - product.actualAmount }} stuks bestellen
        </li>
    </ul>
</div>
   <button @click ="$router.push('/')">Terug naar overzicht</button>
</template>