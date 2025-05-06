import { create } from "zustand";
import { IProduct } from "../interfaces/interfaces";

interface BasketState {
    basketProducts: IProduct[],
    counterProduct: number,
    totalPrice: number,
    addProductToBasket: (product: IProduct) => void,
    removeProductFromBasket: (id: string | number) => void,
    clearBasket: () => void
}

const INITIAL_STATE = {
    basketProducts: [],
    counterProduct: 0,
    totalPrice: 0,
    addProductToBasket: (product: IProduct) => { },
    removeProductFromBasket: (id: string | number) => { },
    clearBasket: () => { }
} as BasketState;

export const useBasketStore = create((set: any, get: any) => ({
    basketProducts: INITIAL_STATE.basketProducts,
    counterProduct: INITIAL_STATE.counterProduct,
    totalPrice: INITIAL_STATE.totalPrice,

    addProductToBasket: (product: IProduct, quantity: number, size: string) => {
        console.log(product, quantity, size);

        /* product.quantityPerSize.map((detailProduct: any) => {
            if (detailProduct.size === size) {
                detailProduct.quantity += quantity;
            }
        }); */
        
        set((state: any) => ({ basketProducts: [...state.basketProducts, product] }))
        set((state: any) => ({ counterProduct: state.counterProduct + 1 }))
        set((state: any) => ({ totalPrice: state.totalPrice + product.price }))

        // console.log(get().basket);
        // console.log(get().totalPrice);

    },

    // removeProductFromBasket: (id) =>
    //     set((state) => ({ basket: state.basket.filter((product) => product.id !== id) })),
    // clearBasket: () => set({ basket: [] }),
}

));

//  METHOD FOR CALCULATE THE TOTAL PRICE
const calculateTotalPrice = (basket: Array<any>) => {
    let totalPrice = 0;

    basket && basket.map((product: any) => {

        product &&
            product.quantityPerSize.map((detailProduct: any) => {
                totalPrice += product.price * detailProduct.quantity;
            });
    });
    return totalPrice;
};