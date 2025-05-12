'use client'
import { useBasketStore } from '@/app/zustandStore/useBasketStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import BasketProduct from '@/app/component/basketProduct';
import Button from '@/app/component/ui/Button';
import styled from 'styled-components';
import BasketProduct from './component/BasketProductCard';
import { useUserStore } from '@/app/zustandStore/useUserStore';
import { IProduct } from '@/app/interfaces/interfaces';
import Clear_basket from '../../../assets/clear_basket.svg';
import Image from 'next/image';


export default function BasketPage() {
    const { user } = useUserStore();
    const { basketProducts, counterProduct, totalPrice, clearBasket } = useBasketStore();
    const router = useRouter();

    
    return (
        <Container className='container-basket'>
            <WrapperUserName>
                <h3 className="basket-title">
                    {" SHOPPING CART "}
                </h3>
                {user && <h3 className="basket-title">
                    {"|"}
                </h3>}
                <h3 className="user-name-title">
                    {user && `${(user?.firstName.toUpperCase()) || ""} `}
                </h3>
            </WrapperUserName>

            <WrapperProducts>
                {basketProducts.map((product: IProduct, key: number) => (

                    <BasketProduct
                        key={key}
                        product={product}
                    />
                ))}
            </WrapperProducts>

            <WrapperSummary className='wrapper-summary'>
                <div className='summary'>
                    <p> Items: {counterProduct}</p>
                    <p>Total: ${totalPrice}</p>
                    <div className='wrapper-clear-basket-button'>
                        <Image className='clear-basket-button' src={Clear_basket} alt={'delete icon'} width={40} height={40} onClick={() => clearBasket()} />
                    </div>
                </div>
            </WrapperSummary>

            {
                basketProducts.length > 0 && <WrapperButton>
                    <Button className='next-step-button' disabled={basketProducts.length === 0} onClick={() => router.push('/Address')}> NEXT STEP </Button>
                </WrapperButton>
            }

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
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

const WrapperSummary = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
    margin-top: 25px;
    width: 100%;
    height: 100%;
    /* background: green; */
    
    .summary{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 300px;
        height: 250px;
        margin: 5px;
        padding: 5px;
        border-radius: 10px;
        border: 1px solid var(--border-color);
        background: var(--button-color);
    }

    .wrapper-clear-basket-button {
        display: flex;
        justify-content: end;
        align-items: center;
        width: 100%;
        margin: 0px 5px;
    }

    .clear-basket-button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px;
        cursor: pointer;
    }

`

const WrapperButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .next-step-button {
        margin: 5px;
        padding: 5px;
    }
`