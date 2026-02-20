<script lang="ts" setup>
import { useInventoryStore } from '../store/inventory-store'   
import { computed } from 'vue'

const { products } = useInventoryStore()
const productsToOrder = computed(() => {
    return products.value.filter(p => p.actualAmount < p.minimumAmount)
})
</script>

<template>
    <div class="page-container">
        <h2>Te Bestellen Producten</h2>
        <ul v-if="productsToOrder.length > 0">
            <li v-for="product in productsToOrder" :key="product.id">
                <strong>{{ product.name }}</strong><br/>
                Huidige hoeveelheid: <span class="status-warning">{{ product.actualAmount }}</span> | 
                Minimum: {{ product.minimumAmount }} | 
                <span class="status-warning">{{ product.minimumAmount - product.actualAmount }} stuks bestellen</span>
            </li>
        </ul>
        <p v-else>Geen producten onder de minimale hoeveelheid.</p>
        <div style="text-align: center; margin-top: 2rem;">
            <button @click="$router.push('/')">Terug naar Overzicht</button>
        </div>
    </div>
</template>