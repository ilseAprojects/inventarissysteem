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

  function addProduct(newProduct: Omit<InventoryItem, 'id'>) {
    const maxId = products.value.reduce((max, p) => Math.max(max, p.id), 0)
    const product: InventoryItem = { id: maxId + 1, ...newProduct }
    products.value.push(product)
  }

  function updateProduct(updated: InventoryItem) {
    const index = products.value.findIndex(p => p.id === updated.id)
    if (index !== -1) {
      products.value[index] = { ...products.value[index], ...updated }
    }
  }

  return { products, addProduct, updateProduct }
}
