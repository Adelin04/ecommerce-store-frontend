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
        // console.log(product, quantity, size);

                console.log('...',product);
        let newProduct: any = product;
        let productQtySizeUpdated: any = {}
        let productQtySize = {
            quantity: quantity,
            size: size,
        };
        
        // CHECK IF THE PRODUCT IS ALREADY IN THE BASKET
        const existProduct = get().basketProducts.find((item: any) => item._id === newProduct._id);
        const restOfProductsFromList = get().basketProducts.filter((item: any) => item._id !== newProduct._id);

        if (!existProduct) {
            //  SAVE THE NEW PRODUCT ADDED
            let productQtySize = {
                quantity: quantity,
                size: size,
            };
            newProduct.productQtySize = [productQtySize];
            //  SAVE THE NEW PRODUCT ADDED
            //  ADD THE NEW PRODUCT AND INCREASE THE COUNTER WITH NEW QUANTITY ADDED
            set((state: any) => ({ basketProducts: [...state.basketProducts, newProduct] }))
            set((state: any) => ({ counterProduct: state.counterProduct + quantity }))
            set((state: any) => ({ totalPrice: state.totalPrice + newProduct.price}))
            return
        }

        if(existProduct.productQtySize.find((item: any) => item.size === size)) {
            // console.log('...',existProduct.price);
            
            existProduct.productQtySize.find((item: any) => item.size === size).quantity += quantity;;
            productQtySizeUpdated['quantity'] = existProduct.productQtySize.find((item: any) => item.size === size).quantity;
            productQtySizeUpdated['size'] = existProduct.productQtySize.find((item: any) => item.size === size).size;
            set((state: any) => ({ counterProduct: state.counterProduct + quantity }))
            set((state: any) => ({ totalPrice: state.totalPrice + existProduct.price}))
            
        } else {
            existProduct.productQtySize.push(productQtySize);
            productQtySizeUpdated['quantity'] = productQtySize.quantity;
            productQtySizeUpdated['size'] = productQtySize.size;
            set((state: any) => ({ counterProduct: state.counterProduct + quantity }))
            set((state: any) => ({ totalPrice: state.totalPrice + existProduct.price}))
        }

    },
    removeProductFromBasket: (id: string | number) => {
        set((state: any) => ({ totalPrice: state.totalPrice - parseFloat(get().basketProducts.filter((product: IProduct) => id === product._id)[0]?.price) }))
        set((state: any) => ({ basketProducts: state.basketProducts.filter((product: IProduct) => product._id !== id) }))
        set((state: any) => ({ counterProduct: state.counterProduct - 1 }))
    },

    increaseQuantity: (id: string | number) => {
        let targetProduct = get().basketProducts.filter((product: IProduct) => id === product._id)[0];
        let restOfProductsFromList = get().basketProducts.filter((product: any) => product.id !== targetProduct.id);

        get().basketProducts.filter((product: IProduct) => id === product._id)[0].quantityPerSize.map((detailProduct: any) => {
            if (detailProduct.size === targetProduct.sizeSelected) {
                ++detailProduct.quantity;
            }
            console.log(detailProduct.quantity);
        })

        set((state: any) => ({ counterProduct: ++state.counterProduct }))
        set((state: any) => ({ totalPrice: state.totalPrice + parseFloat(targetProduct?.price) }))
        set((state: any) => ({ basketProducts: [...restOfProductsFromList, targetProduct] }))


        // console.log(get().basketProducts);
        // console.log(targetProduct);
    },
    decreaseQuantity: (id: string | number) => {
        const targetProduct = get().basketProducts.filter((product: IProduct) => id === product._id)[0];

        set((state: any) => ({ counterProduct: --state.counterProduct }))
        set((state: any) => ({ totalPrice: state.totalPrice - parseFloat(targetProduct?.price) }))


        targetProduct.quantityPerSize.map((detailProduct: any) => {
            if (detailProduct.size === targetProduct.sizeSelected) {
                detailProduct.quantity -= 1;
            }
        })
        console.log(targetProduct.quantityPerSize[0]);

    },

    clearBasket: () => { set({ basketProducts: [] }), set({ counterProduct: 0 }), set({ totalPrice: 0 }) },
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