'use client'
import { useBasketStore } from '@/app/zustandStore/useBasketStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import BasketProduct from '@/app/component/basketProduct';
import Button from '@/app/component/ui/Button';
import styled from 'styled-components';
import BasketProduct from './component/BasketProductCard';
import { useUserStore } from '@/app/zustandStore/useUserStore';



export default function BasketPage() {
    const { user } = useUserStore();
    const { basketProducts, counterProduct, totalPrice } = useBasketStore();
    const [isCheckout, setIsCheckout] = useState(false);
    const router = useRouter();

    // const handleRemoveProduct = (productId: number) => {
    //     removeProductFromBasket(productId);
    // }

    // const handleCheckout = () => {
    //     setIsCheckout(true);
    // }

    // const handleBackToStore = () => {
    //     setIsCheckout(false);
    // }

    console.log({ basketProducts, counterProduct, totalPrice });

    return (
        <Container>
            <WrapperUserName>
                <h3 className="basket-title">
                    {" BASKET "}
                </h3>
                <h3 className="basket-title">
                    {"|"}
                </h3>
                <h3 className="user-name-title">
                    {user && `${(user?.firstName.toUpperCase()) || ""} `}
                </h3>
            </WrapperUserName>

            <WrapperProducts>
                {basketProducts.map((product: any) => (
                    <BasketProduct
                        key={product.id}
                        product={product}
                    />
                ))}
            </WrapperProducts>

            <WrapperSummary className='wrapper-summary'>
                <p>Total: ${totalPrice}</p>
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

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
`

const WrapperUserName = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        height: auto;
        margin: 5px;
        padding: 5px;
        border-radius: 10px;

        /* .basket-title {
            margin: 5px;
            padding: 5px;
        } */
        
        .basket-title,
        .user-name-basket{
            font-size: 20px;
            margin: 5px;
            padding: 5px;

        }
    `

const WrapperProducts = styled.div`
    position: relative;
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
    width: 300px;
    height: 250px;
    background: green

`

const WrapperButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`