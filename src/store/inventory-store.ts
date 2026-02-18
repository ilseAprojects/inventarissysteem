import { ref } from 'vue'

export interface InventoryItem {
  id: number
  name: string
  actualAmount: number
  minimumAmount: number
}

export function useInventoryStore() {
  const products = ref<InventoryItem[]>([
    { id: 1, name: 'Placeholder', actualAmount: 99, minimumAmount: 10 },
    { id: 2, name: 'Placeholder', actualAmount: 99, minimumAmount: 10 },
    { id: 3, name: 'Placeholder', actualAmount: 99, minimumAmount: 10 },
    { id: 4, name: 'Placeholder', actualAmount: 99, minimumAmount: 10 },
    { id: 5, name: 'Placeholder', actualAmount: 99, minimumAmount: 10 },
    { id: 6, name: 'Placeholder', actualAmount: 99, minimumAmount: 10 },
    { id: 7, name: 'Placeholder', actualAmount: 99, minimumAmount: 10 }
  ])

  function updateProduct(id: number, actualAmount: number) {
    const product = products.value.find(p => p.id === id)
    if (product) {
      product.actualAmount = actualAmount
    }
  }

  return { products, updateProduct }
}
