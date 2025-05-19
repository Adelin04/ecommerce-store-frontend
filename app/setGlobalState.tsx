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
// import { fetchCategories, fetchProducts } from './actions/productActions';
// import { ICategory, IProduct, IUser } from './interfaces/interfaces';
// import { checkIsAuth } from './actions/userActions';

const SetGlobalState = ({ children }: { children: React.ReactNode }) => {
    const { hasMounted } = useMounted()
    const { checkAuth, checkingAuth } = useUserStore();
    const { setProducts, products, isLoadingProducts } = useProductStore();
    const { setCategories, categories, isLoadingCategories } = useCategoryStore();
    const { basketProducts, counterProduct, totalPrice, isLoadingBasket, clearBasket, updateBasketByLocalStorage } = useBasketStore();


    useEffect(() => {
        checkAuth();
        setCategories();
        setProducts();

        let localStorageBasket = JSON.parse(localStorage.getItem("BASKET") || "");
        if (localStorageBasket) {
            () => updateBasketByLocalStorage(localStorageBasket, products);
        }

    }, [checkingAuth, isLoadingBasket]);

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