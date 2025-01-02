import { create } from "zustand";

type Product = {
  id: string;
  productName: string;
  productDescription: string;
  labelImage?: string | null;
  ean: string;
};

type ComparisonStore = {
  product1?: Product;
  product2?: Product;
  addProduct: (product: Product, slot: "product1" | "product2") => void;
  removeProduct: (slot: "product1" | "product2") => void;
  replaceProduct: (product: Product, slot: "product1" | "product2") => void;
  clearProducts: () => void;
};

export const useComparisonStore = create<ComparisonStore>((set) => ({
  product1: JSON.parse(localStorage.getItem("product1") || "null") || undefined,
  product2: JSON.parse(localStorage.getItem("product2") || "null") || undefined,
  addProduct: (product: Product, slot: "product1" | "product2") =>
    set((state) => {
      localStorage.setItem(slot, JSON.stringify(product));
      return { ...state, [slot]: product };
    }),
  removeProduct: (slot: "product1" | "product2") =>
    set((state) => {
      const updatedState = { ...state };
      if (state[slot]) {
        localStorage.removeItem(slot);
        updatedState[slot] = undefined;
      }
      return updatedState;
    }),
  replaceProduct: (product: Product, slot: "product1" | "product2") =>
    set((state) => {
      const otherSlot = slot === "product1" ? "product2" : "product1";
      const currentProduct = state[slot];
      const otherProduct = state[otherSlot];

      if (otherProduct === undefined) {
        localStorage.setItem(slot, JSON.stringify(product));
        return { ...state, [slot]: product };
      }

      if (currentProduct && otherProduct) {
        localStorage.setItem(otherSlot, JSON.stringify(currentProduct));
        localStorage.setItem(slot, JSON.stringify(product));

        return {
          ...state,
          [slot]: product,
          [otherSlot]: currentProduct,
        };
      } else if (otherProduct.id === product.id) {
        localStorage.removeItem(otherSlot);
        localStorage.setItem(slot, JSON.stringify(product));
        return { ...state, [slot]: product, [otherSlot]: undefined };
      } else {
        localStorage.setItem(slot, JSON.stringify(product));
        return { ...state, [slot]: product };
      }
    }),
  clearProducts: () =>
    set(() => {
      localStorage.removeItem("product1");
      localStorage.removeItem("product2");
      const clearedState = { product1: undefined, product2: undefined };
      return clearedState;
    }),
}));
