<script lang="ts" setup>
import { useInventoryStore, type InventoryItem } from '../store/inventory-store'
import ProductForm from '../components/ProductForm.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const props = defineProps<{ id?: string }>()

const route = useRoute()
const router = useRouter()
const { getProductById, updateProduct } = useInventoryStore()

const productToEdit = computed(() =>
    getProductById(id) || ({} as InventoryItem)
)

const id = Number(route.params.id || props.id)


const handleSubmit = (updatedProduct: InventoryItem | null) => {
    if (updatedProduct) {
        updateProduct(updatedProduct)
    }
    router.push('/')
}
</script>

<template>
    <div class="page-container">
        <h2>Product Bewerken</h2>
        <div v-if="productToEdit.id">
            <ProductForm :product="productToEdit" @submit="handleSubmit" />
        </div>
        <div v-else>
            <p>Product niet gevonden.</p>
        </div>
    </div>
</template>