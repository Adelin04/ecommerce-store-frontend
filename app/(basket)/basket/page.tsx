'use client'
// import { useBasketStore } from '@/app/zustandStore/useBasketStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import BasketProduct from '@/app/component/basketProduct';
import Button from '@/app/component/ui/Button';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
`

const WrapperProducts = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: 100%;
    height: 100%;
`

const WrapperSummary = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

const WrapperButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

export default function BasketPage() {
  /*   const { basketProducts, removeProductFromBasket, totalPrice } = useBasketStore();
    const [isCheckout, setIsCheckout] = useState(false);
    const router = useRouter();

    const handleRemoveProduct = (productId: number) => {
        removeProductFromBasket(productId);
    }

    const handleCheckout = () => {
        setIsCheckout(true);
    }

    const handleBackToStore = () => {
        setIsCheckout(false);
    } */

    return (
        <Container>
            <WrapperProducts>
           {/*      {basketProducts.map((product:any)=> (
                    <BasketProduct
                        key={product.id}
                        product={product}
                        onRemoveProduct={handleRemoveProduct}
                    />
                ))} */}
            </WrapperProducts>
            <WrapperSummary>
                <p>Total: ${/* {totalPrice} */}</p>
            </WrapperSummary>
            <WrapperButton>
{/*                 {!isCheckout && (
                    <Button onClick={handleCheckout}>Checkout</Button>
                )}
                {isCheckout && (
                    <Button onClick={handleBackToStore}>Back to Store</Button>
                )} */}
            </WrapperButton>
        </Container>
    );
}