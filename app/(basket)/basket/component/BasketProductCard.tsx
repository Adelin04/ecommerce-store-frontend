import React, { useState } from 'react'
import styled from 'styled-components'
import { IProduct } from '@/app/interfaces/interfaces';
import { useProductStore } from '@/app/zustandStore/useProductStore';
import { useRouter } from 'next/navigation';
import DeleteIcon from '../../../../assets/delete_icon.svg';
import Image from 'next/image';
import Button from '@/app/component/ui/Button';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useBasketStore } from '@/app/zustandStore/useBasketStore';

interface PropsBasketCard {
    product: IProduct | null
}

export default function BasketProductCard({ product }: any) {
    const router = useRouter()
    const { selectProduct } = useProductStore();
    const { removeProductFromBasket, decreaseQuantity, increaseQuantity, counterProduct } = useBasketStore();
    const { name, color, price, brand, size, currency, gender, category, images, seller } = product as IProduct | any
    const [open, setOpen] = React.useState(false);
    const [quantity, setQuantity] = useState(1);


    const handleClick = () => {
        product && selectProduct(product._id)
        product && router.push(`/product-details/${product._id}`);
    };


    return (
        <Container className='container-basket-product-card' style={{ overflow: `${open ? 'hidden' : 'auto'}` }}>

            <WrapperBasketProductCard className='wrapper-basket-product-card' >
                <div className='wrapper-img-product-card'>
                    <img className='img-product-card' src={product?.images[0].image} alt={product?.name} onClick={handleClick} />
                </div>

                <div className='wrapper-info1-product-card'>
                    <p className='name'>{name?.toUpperCase()}</p>
                    <p className='brand'>{brand?.brand.toUpperCase()}</p>
                </div>


                <div className='wrapper-info2-product-card'>
                    <p className='color'>{color.color}</p>
                    {/* <p className='size'>{product?.productQtySize[0].size}</p> */}
                    {Array.isArray(product?.productQtySize) }
                    <p className='seller'>{seller?.toUpperCase()}</p>
                    <p className='gender'>{gender.gender}</p>
                    <p className='category'>{category.category}</p>
                </div>

                <div className='wrapper-quantity'>
                    <Button
                        className='button-plus-quantity'
                        style={{ marginRight: '10px' }}
                        onClick={() => { counterProduct >= 1 && product && decreaseQuantity(product?._id) }}>
                        <i className="" ><FaMinus /></i>
                    </Button>

                    <div className='quantity' >
                        {console.log(product?.productQtySize[0].quantity)}
                        {product?.productQtySize[0].quantity}
                    </div>

                    <Button
                        className='button-minus-quantity'
                        style={{ marginLeft: '10px' }}
                        onClick={() => { product && increaseQuantity(product?._id) }}>
                        <i className=""><FaPlus /></i>
                    </Button>
                </div>

                <div className='wrapper-price-product-card'>
                    <p className='price'>{price}{" "}{currency.currency}</p>
                </div>

            </WrapperBasketProductCard>

            <WrapperButtonsBasketProductCard className='wrapper-buttons-product-card' >
                <Image className='button-delete' src={DeleteIcon} alt={'delete icon'} onClick={() => product && removeProductFromBasket(product._id)} />
            </WrapperButtonsBasketProductCard>


        </Container>
    )
}


const Container = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: auto;
        margin: 3px;
        border: 1px solid salmon;
        border-radius: 10px;
    `

const WrapperBasketProductCard = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80%;
        height: 100%;
        margin: 5px 0px;
        padding: 5px;
        border-radius: 10px;

        .wrapper-img-product-card{
            display: flex;
            justify-content: center;
            align-items: center;
            width: auto;
            height: 100%;
            border-radius: 10px;
        }
    
        .img-product-card{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 70px;
            height: 100px;
            margin: 5px 10px;
            border-radius: 10px;
            object-fit: cover;
            cursor: pointer;
        }

        .wrapper-info1-product-card,
        .wrapper-info2-product-card {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: start;
            width: auto;
            height: 100%;
            margin: 5px;
            border-radius: 10px;
        }
    
        p{
            display: flex;
            justify-content: center;
            align-items: center;
            width: auto;
            height: 100%;
            margin: 5px;
            text-align: center;
            border-radius: 10px;
        }

        .wrapper-quantity-size {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 5px;
    }
    .wrapper-quantity {
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        margin: 5px;
    }

    .quantity {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25px;
        height: 25px;
        border-radius: 25%;
        font-size: 13px;
        color: #ffffff;
        background-color: var(--button-color);
    }   
    
    .button-plus-quantity,
    .button-minus-quantity {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        font-size: 13px;
        color: #ffffff;
        background-color: var(--button-color);
    }
    `

const WrapperButtonsBasketProductCard = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        height: 100%;
        margin: auto;
        padding: 5px;
        border-radius: 10px;
    
        .button-edit, .button-delete{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            border-radius: 10px;
            border: none;
            cursor: pointer;
        }
        
        .button-delete,
        .button-edit{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 40px;
            padding: 5px;
            margin: 2px;
            border-radius: 10px;
            border: none;
            cursor: pointer;
        }
    `