'use client'

import './globals.css'
import { useProductStore } from "./zustandStore/useProductStore";
import React, { Suspense, useEffect } from "react";
import styled from 'styled-components';
import { useCategoryStore } from './zustandStore/useCategoryStore';
import Loading from './loading';
import { useMounted } from './component/useMounted';
import { useUserStore } from './zustandStore/useUserStore';
import { fetchCategories, fetchProducts } from './actions/productActions';
import { ICategory, IProduct, IUser } from './interfaces/interfaces';
import { checkIsAuth } from './actions/userActions';

const SetGlobalState = ({ children }: { children: React.ReactNode }) => {
    const { hasMounted } = useMounted()
    const { checkAuth, checkingAuth } = useUserStore();
    const { setProducts, products } = useProductStore();
    const { setCategories, categories } = useCategoryStore();

    async function fetchData() {
        // const categories: Array<ICategory> = await fetchCategories().then((data) => { return data });
        // const products: Array<IProduct> = await fetchProducts().then((data) => { return data });
        // const userResult: any = await checkIsAuth().then((data) => { return data });


        // categories ? setCategories(categories) : setCategories([]);
        // products ? setProducts(products) : setProducts([]);

        // userResult ? checkAuth(userResult.user) : checkAuth(null);
        // console.log({ categories, products, userResult });

    }

    useEffect(() => {
        checkAuth();
        setCategories();
        setProducts();

    }, [checkingAuth]);

    if (!hasMounted)
        return <Loading />
    return (
        <Container>
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
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