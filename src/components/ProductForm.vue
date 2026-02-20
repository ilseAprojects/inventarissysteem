<script lang="ts" setup>
import type { InventoryItem } from '../store/inventory-store'
import { reactive, watch } from 'vue'
const emit = defineEmits(['submit'])
const props = defineProps<{
    product: Partial<InventoryItem>
}>()

const localForm = reactive({
    id: (props.product && 'id' in props.product) ? props.product.id : undefined,
    name: props.product?.name ?? '',
    actualAmount: props.product?.actualAmount ?? 0,
    minimumAmount: props.product?.minimumAmount ?? 0
})

watch(() => props.product, (p) => {
  localForm.id = (p && 'id' in p) ? p.id : undefined
  localForm.name = p?.name ?? ''
  localForm.actualAmount = p?.actualAmount ?? 0
  localForm.minimumAmount = p?.minimumAmount ?? 0
})

const handleSubmit = () => {
    emit('submit', { ...localForm })
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <div>
            <label for="name">Naam:</label>
            <input id="name" v-model="localForm.name" required />
        </div>
        <div>
            <label for="actualAmount">Huidige Voorraad:</label>
            <input id="actualAmount" type="number" v-model.number="localForm.actualAmount" required />
        </div>
        <div>
            <label for="minimumAmount">Minimale Voorraad:</label>
            <input id="minimumAmount" type="number" v-model.number="localForm.minimumAmount" required />
        </div>
        <button type="submit">Opslaan</button>
        <button type="button" @click.prevent="emit('submit', null)">Annuleren</button>
    </form>
</template>
