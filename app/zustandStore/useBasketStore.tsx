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

        //  SAVE THE NEW PRODUCT ADDED
        let newProduct: any = product;

        //  INCREASE THE COUNTER WITH NEW QUANTITY ADDED
        set((state: any) => ({ counterProduct: get().counterProduct + quantity }))

        //  SETT THE NEW QUANTITY AND SIZE OF THE CURRENT ADDED PRODUCT
        let productQtySize = {
            quantity: quantity,
            size: size,
        };

        let existProduct: any = get().basketProducts.filter(
            (existProduct: any) => {
                return existProduct.id === newProduct.id
            }
        );

        //  CHECK IF THE 'EXISTPRODUCT' IS AN ARRAY AND IF IT IS GREATER THEN 0...
        //  IF CONDITION IS TRUE THIS MEANS IT IS THE FIRST PRODUCT ADDED
        if (Array.isArray(existProduct) && existProduct.length === 0) {
            newProduct.quantityPerSize = [productQtySize];
            set((state: BasketState) => ({ basketProducts: [...state.basketProducts, newProduct as IProduct] }))
        } else {
            //  REST OF PRODUCT LIST
            let restOfProductsFromList = get().basketProducts.filter((product: any) => product.id !== newProduct.id);

            //  COPY THE PRODUCT QUANTITY AND SIZE TO UPDATE THE PRODUCT QUANTITY REQUESTED BY THE CUSTOMER
            let productQtySizeUpdated: any = {
            }

            //  UPDATE THE QUANTITY SIZE
            existProduct[0].quantityPerSize.map((qtySize: any) => {
                if (qtySize.size === size) {
                    productQtySizeUpdated['quantity'] = qtySize.quantity + quantity;
                    productQtySizeUpdated['size'] = qtySize.size
                    return
                }
            })

            let restOfQtySize = existProduct[0].quantityPerSize.filter((existProductQtySize: any) => {
                return size !== existProductQtySize.size
            })

            //  USE A TEMPORARY OBJECT FOR UPDATE THE TARGET PRODUCT
            const TMP_PRODUCT = {
                id: existProduct[0].id,
                color: existProduct[0].color,
                createdAt: existProduct[0].createdAt,
                updatedAt: existProduct[0].updateAt,
                currency: existProduct[0].currency,
                description: existProduct[0].description,
                name: existProduct[0].name,
                productImages: existProduct[0].productImages,
                price: existProduct[0].price,
                quantityPerSize: [...restOfQtySize, Object.keys(productQtySizeUpdated).length > 0 ? productQtySizeUpdated : productQtySize],
                stock: existProduct[0].stock,
            };
            set((state: any) => ({ basketProducts: [...restOfProductsFromList, TMP_PRODUCT] }))
        }

        // //  UPDATE THE TOTAL PRICE
        // if (Array.isArray(get().basketProducts) && get().basketProducts.length > 0) {
        //     set((state: any) => ({ totalPrice: calculateTotalPrice(get().basketProducts) }))
        // }


        // set((state: any) => ({ basketProducts: [...state.basketProducts, product] }))
        // set((state: any) => ({ counterProduct: state.counterProduct + 1 }))
        set((state: any) => ({ totalPrice: state.totalPrice + product.price }))


    },
    removeProductFromBasket: (id: string | number) => {
        set((state: any) => ({ totalPrice: state.totalPrice - parseFloat(get().basketProducts.filter((product: IProduct) => id === product._id)[0]?.price) }))
        set((state: any) => ({ basketProducts: state.basketProducts.filter((product: IProduct) => product._id !== id) }))
        set((state: any) => ({ counterProduct: state.counterProduct - 1 }))
    },

    increaseQuantity: (id: string | number) => {
        const targetProduct = get().basketProducts.filter((product: IProduct) => id === product._id)[0];

        targetProduct.quantityPerSize.map((detailProduct: any) => {
            if (detailProduct.size === targetProduct.sizeSelected) {
                ++detailProduct.quantity;
            }
        })

        set((state: any) => ({ counterProduct: ++state.counterProduct }))
        set((state: any) => ({ totalPrice: state.totalPrice + parseFloat(targetProduct?.price) }))

        console.log(targetProduct);
    },
    decreaseQuantity: (id: string | number) => {
        const targetProduct = get().basketProducts.filter((product: IProduct) => id === product._id)[0];

        if (targetProduct.quantityPerSize[0].quantity > 1) {

            set((state: any) => ({ counterProduct: state.counterProduct - 1 }))
            set((state: any) => ({ totalPrice: state.totalPrice - parseFloat(targetProduct?.price) }))
        }

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