'use client'

import ProductsList from '@/app/component/products/productList';
import { useMounted } from '@/app/component/useMounted';
import { IProduct } from '@/app/interfaces/interfaces';
import Loading from '@/app/loading';
import { useProductStore } from '@/app/zustandStore/useProductStore';
import { useEffect } from 'react';
import styled from 'styled-components'
import { redirect } from 'next/navigation'

const ProductsPage = () => {
    const { selectedProducts, selectedByCategory, products,isLoadingProducts }: any = useProductStore();
    const { hasMounted } = useMounted()

    useEffect(() => {
        if (!selectedProducts) return selectedByCategory(localStorage.getItem('category-selected'), localStorage.getItem('gender')?.toLowerCase());
        if (!localStorage.getItem('category-selected') || !localStorage.getItem('gender')) return redirect('/');
    }, [products,isLoadingProducts])


    if (!hasMounted || isLoadingProducts)
        return <Loading />

    return (
        <Container className='products-container'>
            {selectedProducts && <ProductsList products={selectedProducts} />}
            {selectedProducts && !selectedProducts.length && <ProductsList products={products.filter((product: any) => product.category === localStorage.getItem('category-selected') && product.gender.gender === localStorage.getItem('gender')?.toLowerCase())} isLoading={isLoadingProducts}/>}
        </Container>
    )
}

export default ProductsPage

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
`