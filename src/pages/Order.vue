<script lang="ts" setup>
import { useInventoryStore } from '../store/inventory-store'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'


const router = useRouter()

const orderedItems = reactive<Record<number, { ordered: boolean; quantity: number }>>({})

const { productsBelowMinimum, restockProduct } = useInventoryStore()

const hasOrdered = computed(() => {
    return productsBelowMinimum.value.some(p => orderedItems[p.id]?.ordered)
})

const handleOrderSubmit = (): void => {
    productsBelowMinimum.value.forEach(product => {
        const order = orderedItems[product.id]
        if (order?.ordered && order.quantity > 0) {
            restockProduct(product.id, order.quantity)
        }
    })

    Object.keys(orderedItems).forEach(key => {
        delete orderedItems[parseInt(key)]
    })

    router.push('/')
}
</script>

<template>
    <div class="page-container">
        <h2>Te Bestellen Producten</h2>
        <div v-if="productsBelowMinimum.length > 0">
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Huidige Hoeveelheid</th>
                        <th>Minimale Hoeveelheid</th>
                        <th>Te Bestellen</th>
                        <th>Besteld?</th>
                        <th>Hoeveelheid Ontvangen</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in productsBelowMinimum" :key="product.id">
                        <td><strong>{{ product.name }}</strong></td>
                        <td><span class="status-warning">{{ product.actualAmount }}</span></td>
                        <td>{{ product.minimumAmount }}</td>
                        <td><span class="status-warning"><strong>{{ product.minimumAmount - product.actualAmount }}
                                </strong></span></td>
                        <td>
                            <input type="checkbox" :checked="orderedItems[product.id]?.ordered || false" @change="(e) => {
                                if (!orderedItems[product.id]) {
                                    orderedItems[product.id] = { ordered: false, quantity: 0 }
                                }
                                const item = orderedItems[product.id]
                                const checked = (e.target as HTMLInputElement).checked
                                if (item) {
                                    item.ordered = checked
                                    if (checked) {
                                        const prefill = Math.max(0, product.minimumAmount - product.actualAmount)
                                        if (!item.quantity || item.quantity === 0) {
                                            item.quantity = prefill
                                        }
                                    }
                                }
                            }" />
                        </td>
                        <td>
                            <input v-if="orderedItems[product.id]?.ordered" type="number" min="0"
                                :value="orderedItems[product.id]?.quantity || 0" @input="(e) => {
                                    if (!orderedItems[product.id]) {
                                        orderedItems[product.id] = { ordered: true, quantity: 0 }
                                    }
                                    const item = orderedItems[product.id]
                                    if (item) item.quantity = parseInt((e.target as HTMLInputElement).value) || 0
                                }" placeholder="Aantal" class="quantity-input" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style="text-align: center; margin-top: 2rem;">
                <button v-if="hasOrdered" @click="handleOrderSubmit" class="submit-order-btn">Nieuwe Producten
                    Besteld</button>
                <button v-if="hasOrdered" @click="$router.push('/')" class="cancel-submit-order-btn">Nog niet
                    besteld</button>
            </div>
        </div>
        <p v-else>Geen producten onder de minimale hoeveelheid.</p>
        <div style="text-align: center; margin-top: 2rem;">
            <button @click="$router.push('/')">Terug naar Overzicht</button>
        </div>
    </div>
</template>

<style scoped>
.quantity-input {
    width: 80px;
    padding: 0.5rem;
    border: 1px solid #444;
    border-radius: 4px;
    background-color: #2a2a2a;
    color: rgba(255, 255, 255, 0.87);
}

.submit-order-btn {
    background-color: #388e3c;
    color: white;
    font-weight: bold;
    margin-right: 1rem;
}

.submit-order-btn:hover {
    background-color: #2e7d32;
}

.cancel-submit-order-btn {
    background-color: #f44336;
    color: white;
    font-weight: bold;
}

.cancel-submit-order-btn:hover {
    background-color: #d32f2f;
}

@media (prefers-color-scheme: light) {
    .quantity-input {
        background-color: #ffffff;
        border-color: #ddd;
        color: #213547;
    }

    .submit-order-btn {
        background-color: #4caf50;
    }

    .submit-order-btn:hover {
        background-color: #388e3c;
    }
}
</style>