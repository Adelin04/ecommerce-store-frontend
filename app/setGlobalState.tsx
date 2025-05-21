'use client'

import './globals.css'
import { useProductStore } from "./zustandStore/useProductStore";
import React, { Suspense, useEffect } from "react";
import styled from 'styled-components';
import { useCategoryStore } from './zustandStore/useCategoryStore';
import Loading from './loading';
import { useMounted } from './component/useMounted';
import { useUserStore } from './zustandStore/useUserStore';
import { useBasketStore } from './zustandStore/useBasketStore';
import { fetchProductById } from './actions/productActions';
import { IProduct } from './interfaces/interfaces';
// import { ICategory, IProduct, IUser } from './interfaces/interfaces';
// import { checkIsAuth } from './actions/userActions';

const SetGlobalState = ({ children }: { children: React.ReactNode }) => {
    const { hasMounted } = useMounted()
    const { checkAuth, checkingAuth } = useUserStore();
    const { setProducts, isLoadingProducts } = useProductStore();
    const { setCategories, isLoadingCategories } = useCategoryStore();
    const { isLoadingBasket, updateBasketByLocalStorage, addProductToBasket, clearBasket } = useBasketStore();

    async function fetchedProductById(id: string | number) {
        const getProductById: IProduct = await fetchProductById(id).then((data) => { return data });
        return getProductById
    }

    useEffect(() => {

        checkAuth();
        setCategories();
        setProducts();

        const localStorage_BASKET = JSON.parse((localStorage.getItem("BASKET") || "[]"));
        clearBasket();
        localStorage_BASKET && localStorage_BASKET.map(async (item: any) => {
            const product = await fetchedProductById(item.productId).then((data) => { return data });
            item.productQtySize.map((qtySize: any) => {
                addProductToBasket(product, qtySize.quantity, qtySize.size);
            })
        });

    }, [checkingAuth]);

    if (!hasMounted || isLoadingCategories || isLoadingProducts || isLoadingBasket)
        return <Loading />
    return (
        <Container>
            {children}
        </Container>
    )
}

export default SetGlobalState;

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
width: 100%;
height: auto;
min-height: 100vh;
`