import { create } from "zustand";
import { IProduct } from "../interfaces/interfaces";
import axios from "axios";
import { URI } from "../utils/URI";
import { fetchProductById, fetchProducts } from "../actions/productActions";

interface ProductState {
    products: Array<IProduct>,
    filteredProducts: Array<any> | null,
    productById: any | null,
    productByName: any | null,
    categoriesProductAvailable: any | null,
    superCategoriesProductAvailable: any | null,
    sizesProductAvailable: any | null,
    newProductsAdded: [],
    selectedProduct: IProduct | null,
    selectedProducts: Array<IProduct> | null,
    isLoadingProducts: boolean
}

// Initialize a default state
const INITIAL_STATE: ProductState = {
    products: [],
    filteredProducts: null,
    productById: null,
    productByName: null,
    categoriesProductAvailable: null,
    superCategoriesProductAvailable: null,
    sizesProductAvailable: null,
    newProductsAdded: [],
    selectedProduct: null,
    selectedProducts: null,
    isLoadingProducts: false
}

export const useProductStore = create((set: any, get: any) => ({
    ...INITIAL_STATE,

    createNewProduct: async (product: any) => {
        set(() => ({ isLoadingProducts: true }));
        const response = await axios.post(`${process.env.DEV_URI}products/createProduct`, product, { withCredentials: true });

        set(() => ({ newProductsAdded: [...get().newProductsAdded, response.data] }))
        set(() => ({ isLoadingProducts: false }));
        return response.data
    },

    setProducts: async () => {
        set(() => ({ isLoadingProducts: true }));
        const fetchedProducts: Array<IProduct> = await fetchProducts().then((data) => { return data });

        set(() => ({ products: fetchedProducts }));

        set(() => ({ isLoadingProducts: false }));
    },

    setProductById: async (id: string | number) => {

        set(() => ({ isLoadingProducts: true }))

        const fethedProducById = await fetchProductById(id).then((data) => { return data });

        set(() => ({ productById: fethedProducById }));
        set(() => ({ isLoadingProducts: false }))
    },

    selectProduct: (id: string) => {
        set(() => ({ isLoadingProducts: true }))
        set(() => ({ selectedProduct: get().products.filter((product: IProduct) => product._id === id)[0] }))
        set(() => ({ isLoadingProducts: false }))
    },

    selectedByCategory: (category: any, genderSelected: string) => {
        set(() => ({ selectedProducts: get().products.filter((product: any) => product.gender.gender === genderSelected && product.category === category) }))
    },

    resetSelectedProducts: () => {
        set(() => ({ selectedProducts: null }))
    },

    updateProduct: async (product: any) => {
        set(() => ({ isLoadingProducts: true }));
        const response = await axios.put(`${process.env.DEV_URI}products/updateProduct/${product._id}`, product, { withCredentials: true });
        set(() => ({ isLoadingProducts: false }));
        return response.data
    },

}))