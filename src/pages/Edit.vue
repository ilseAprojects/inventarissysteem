<script lang="ts" setup>
import { useInventoryStore, type InventoryItem } from '../store/inventory-store'
import ProductForm from '../components/ProductForm.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const props = defineProps<{ id?: string }>()

const route = useRoute()
const router = useRouter()
const { products, updateProduct } = useInventoryStore()

const id = Number(route.params.id || props.id)
const productToEdit = computed(() => {
    return products.value.find(p => p.id === id) || ({} as InventoryItem)
})

const handleSubmit = (updatedProduct: InventoryItem | null) => {
        if (!updatedProduct) return
        updateProduct(updatedProduct)
        router.push('/')
}
</script>

<template>
    <h2>Product bewerken</h2>
    <div v-if="productToEdit">
        <h2>Product bewerken</h2>
        <ProductForm :product="productToEdit" @submit="handleSubmit" />
    </div>

    <div v-else>
        <p>Product niet gevonden.</p>
    </div>
</template>