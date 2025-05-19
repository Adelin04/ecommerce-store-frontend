import { create } from "zustand";
import { IProduct } from "../interfaces/interfaces";

interface BasketState {
    basketProducts: IProduct[],
    counterProduct: number,
    totalPrice: number,
    isLoadingBasket: boolean,
    addProductToBasket: (product: IProduct) => void,
    removeProductFromBasket: (id: string | number) => void,
    clearBasket: () => void
}

const INITIAL_STATE = {
    basketProducts: [],
    counterProduct: 0,
    totalPrice: 0,
    isLoadingBasket: false,
    addProductToBasket: (product: IProduct) => { },
    removeProductFromBasket: (id: string | number) => { },
    clearBasket: () => { }
} as BasketState;

export const useBasketStore = create((set: any, get: any) => ({
    basketProducts: INITIAL_STATE.basketProducts,
    isLoadingBasket: INITIAL_STATE.isLoadingBasket,
    counterProduct: INITIAL_STATE.counterProduct,
    totalPrice: INITIAL_STATE.totalPrice,

    addProductToBasket: (product: IProduct, quantity: number, size: string) => {

        let newProduct: any = product;
        let productQtySizeUpdated: any = {}
        let productQtySize = {
            quantity: quantity,
            size: size,
        };

        // CHECK IF THE PRODUCT IS ALREADY IN THE BASKET
        const existProduct = get().basketProducts.find((item: any) => item._id === newProduct._id);

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
            set((state: any) => ({ totalPrice: state.totalPrice + newProduct.price }))

            // ADD THE NEW PRODUCT TO THE LOCALSTORAGE
            const tmp_localStorage = JSON.parse(localStorage.getItem("BASKET") || "[]");
            tmp_localStorage.push({ productId: newProduct._id, productQtySize: [productQtySize] });
            localStorage.setItem("BASKET", JSON.stringify(tmp_localStorage))
            return
        }

        if (existProduct.productQtySize.find((item: any) => item.size === size)) {
            existProduct.productQtySize.find((item: any) => item.size === size).quantity += quantity;
            productQtySizeUpdated['quantity'] = existProduct.productQtySize.find((item: any) => item.size === size).quantity;
            productQtySizeUpdated['size'] = existProduct.productQtySize.find((item: any) => item.size === size).size;
            set((state: any) => ({ counterProduct: state.counterProduct + quantity }))
            set((state: any) => ({ totalPrice: state.totalPrice + existProduct.price }))
        } else {
            existProduct.productQtySize.push(productQtySize);
            productQtySizeUpdated['quantity'] = productQtySize.quantity;
            productQtySizeUpdated['size'] = productQtySize.size;
            set((state: any) => ({ counterProduct: state.counterProduct + quantity }))
            set((state: any) => ({ totalPrice: state.totalPrice + existProduct.price }))
        }

        // UPDATE THE LOCALSTORAGE
        localStorage.removeItem("BASKET");
        let tmp_localStorage: { productId: any; productQtySize: any; }[] = [];
        get().basketProducts.map((product: any) => {
            tmp_localStorage.push({ productId: product._id, productQtySize: product.productQtySize })
        })

        localStorage.setItem("BASKET", JSON.stringify(tmp_localStorage))
    },
    removeSizeProductFromBasket: (id: string | number, size: string) => {
        const targetProduct = get().basketProducts.filter((product: IProduct) => id === product._id)
        targetProduct[0].productQtySize.map((detailProduct: any) => {
            if (detailProduct.size === size) {
                set((state: any) => ({ totalPrice: state.totalPrice - (targetProduct[0].price * parseFloat(detailProduct.quantity)) }))
                // detailProduct.quantity = detailProduct.quantity < 0 ? 0 : detailProduct.quantity                
                set((state: any) => ({ counterProduct: state.counterProduct - detailProduct.quantity }))
                detailProduct.quantity = 0;

            }
            if (detailProduct.quantity === 0) {
                targetProduct[0].productQtySize = targetProduct[0].productQtySize.filter((detailProduct: any) => detailProduct.size !== size);
            }
        })

        if (targetProduct[0].productQtySize.length === 0)
            set((state: any) => ({ basketProducts: state.basketProducts.filter((product: any) => product._id !== id) }));

        // UPDATE THE LOCALSTORAGE
        localStorage.removeItem("BASKET");
        let tmp_localStorage: { productId: any; productQtySize: any; }[] = [];
        get().basketProducts.map((product: any) => {
            tmp_localStorage.push({ productId: product._id, productQtySize: product.productQtySize })
        })

        localStorage.setItem("BASKET", JSON.stringify(tmp_localStorage))
    },

    increaseQuantityBySize: (id: string | number, size: string) => {
        const targetProduct = get().basketProducts.filter((product: IProduct) => id === product._id)[0];

        targetProduct.productQtySize.map((detailProduct: any) => {
            if (detailProduct.size === size) {
                ++detailProduct.quantity;
                set((state: any) => ({ counterProduct: state.counterProduct + 1 }))
                set((state: any) => ({ totalPrice: state.totalPrice + parseFloat(targetProduct?.price) }))
            }
        })

        // UPDATE THE LOCALSTORAGE
        localStorage.removeItem("BASKET");
        let tmp_localStorage: { productId: any; productQtySize: any; }[] = [];
        get().basketProducts.map((product: any) => {
            tmp_localStorage.push({ productId: product._id, productQtySize: product.productQtySize })
        })

        localStorage.setItem("BASKET", JSON.stringify(tmp_localStorage))
    },

    decreaseQuantityBySize: (id: string | number, size: string) => {
        const targetProduct = get().basketProducts.filter((product: IProduct) => id === product._id)[0];

        targetProduct.productQtySize.map((detailProduct: any) => {
            if (detailProduct.size === size) {
                --detailProduct.quantity;
                set((state: any) => ({ counterProduct: state.counterProduct - 1 }))
                set((state: any) => ({ totalPrice: state.totalPrice - parseFloat(targetProduct?.price) }))
            }

            if (detailProduct.quantity === 0) {
                targetProduct.productQtySize = targetProduct.productQtySize.filter((detailProduct: any) => detailProduct.size !== size);

                if (targetProduct.productQtySize.length === 0) {
                    set((state: any) => ({ basketProducts: state.basketProducts.filter((product: any) => product._id !== id) }));
                }
            }
        })

        // UPDATE THE LOCALSTORAGE
        localStorage.removeItem("BASKET");
        let tmp_localStorage: { productId: any; productQtySize: any; }[] = [];
        get().basketProducts.map((product: any) => {
            tmp_localStorage.push({ productId: product._id, productQtySize: product.productQtySize })
        })

        localStorage.setItem("BASKET", JSON.stringify(tmp_localStorage))
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

        // UPDATE THE LOCALSTORAGE
        localStorage.removeItem("BASKET");
        let tmp_localStorage: { productId: any; productQtySize: any; }[] = [];
        get().basketProducts.map((product: any) => {
            tmp_localStorage.push({ productId: product._id, productQtySize: product.productQtySize })
        })

        localStorage.setItem("BASKET", JSON.stringify(tmp_localStorage))
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

        // UPDATE THE LOCALSTORAGE
        localStorage.removeItem("BASKET");
        let tmp_localStorage: { productId: any; productQtySize: any; }[] = [];
        get().basketProducts.map((product: any) => {
            tmp_localStorage.push({ productId: product._id, productQtySize: product.productQtySize })
        })

        localStorage.setItem("BASKET", JSON.stringify(tmp_localStorage))
    },
    updateBasketByLocalStorage: (products: IProduct[],localStorageBasket: any) => {
        console.log(products);
        console.log(localStorageBasket);
        
        set(() => ({ isLoadingBasket: true }))

        localStorageBasket.map((item: any) => {
            products?.map((product: any) => {
                if (item.productId === product._id) {
                    set((state: any) => ({ basketProducts: [...state.basketProducts, { ...product, productQtySize: item.productQtySize }] }))
                    // set((state: any) => ({ counterProduct: state.counterProduct + item.productQtySize[0].quantity }))
                    // set((state: any) => ({ totalPrice: state.totalPrice + (product.price * item.productQtySize[0].quantity) }))
                }
            })
        })
        set(() => ({ isLoadingBasket: false }))
    },

    //  CLEAR THE BASKET
    clearBasket: () => {
        set({ basketProducts: [] }), set({ counterProduct: 0 }), set({ totalPrice: 0 }); localStorage.removeItem("BASKET");

        // UPDATE THE LOCALSTORAGE
        localStorage.removeItem("BASKET");
        let tmp_localStorage: { productId: any; productQtySize: any; }[] = [];
        get().basketProducts.map((product: any) => {
            tmp_localStorage.push({ productId: product._id, productQtySize: product.productQtySize })
        })

        localStorage.setItem("BASKET", JSON.stringify(tmp_localStorage))
    },
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