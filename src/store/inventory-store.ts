import { ref, computed } from "vue";

export interface InventoryItem {
  id: number;
  name: string;
  actualAmount: number;
  minimumAmount: number;
}

let store: ReturnType<typeof createInventoryStore> | null = null;

function createInventoryStore() {
  const products = ref<InventoryItem[]>([
    { id: 1, name: "Placeholder", actualAmount: 99, minimumAmount: 10 },
    { id: 2, name: "Placeholder", actualAmount: 99, minimumAmount: 10 },
    { id: 3, name: "Placeholder", actualAmount: 99, minimumAmount: 10 },
    { id: 4, name: "Placeholder", actualAmount: 99, minimumAmount: 10 },
    { id: 5, name: "Placeholder", actualAmount: 99, minimumAmount: 10 },
    { id: 6, name: "Placeholder", actualAmount: 99, minimumAmount: 10 },
    { id: 7, name: "Placeholder", actualAmount: 99, minimumAmount: 10 },
  ]);

  function addProduct(newProduct: Omit<InventoryItem, "id">) {
    const maxId = products.value.reduce((max, p) => Math.max(max, p.id), 0);
    const product: InventoryItem = { id: maxId + 1, ...newProduct };
    products.value.push(product);
  }

  function updateProduct(updated: InventoryItem) {
    const index = products.value.findIndex((p) => p.id === updated.id);
    if (index !== -1) {
      products.value[index] = { ...products.value[index], ...updated };
    }
  }

  function restockProduct(id: number, quantity: number) {
    const product = products.value.find((p) => p.id === id);
    if (product && quantity > 0) {
      product.actualAmount += quantity;
    }
  }

  function getProductById(id: number) {
    return products.value.find((p) => p.id === id);
  }

  const productsBelowMinimum = computed(() =>
    products.value.filter((p) => p.actualAmount < p.minimumAmount),
  );

  const hasLowStock = computed(() => productsBelowMinimum.value.length > 0);

  function isLowStock(item: InventoryItem): boolean {
    return item.actualAmount < item.minimumAmount;
  }

  function isLowStockByAmounts(actual: number, minimum: number): boolean {
    return actual < minimum;
  }

  return {
    products,
    addProduct,
    updateProduct,
    productsBelowMinimum,
    restockProduct,
    getProductById,
    hasLowStock,
    isLowStock,
    isLowStockByAmounts,
  };
}

export function useInventoryStore() {
  if (!store) {
    store = createInventoryStore();
  }
  return store;
}
