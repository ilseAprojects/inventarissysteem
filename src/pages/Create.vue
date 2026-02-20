<script setup lang="ts">
import { useInventoryStore } from '../store/inventory-store'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import ProductForm from '../components/ProductForm.vue'

const router = useRouter()

const product = reactive({
  name: '',
  actualAmount: 0,
  minimumAmount: 0
})
const { addProduct } = useInventoryStore()

const handleSubmit = (newProduct: typeof product | null) => {
  if (newProduct) {
    const { name, actualAmount, minimumAmount } = newProduct
    addProduct({ name, actualAmount, minimumAmount })
  }
  router.push('/')
}
</script>  

<template>
    <div class="page-container">
        <h2>Product Toevoegen</h2>
        <ProductForm :product="product" @submit="handleSubmit" />
    </div>
</template>