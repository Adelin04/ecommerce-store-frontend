'use client'

import React, { useState } from 'react'
import { IProduct } from '@/app/interfaces/interfaces'
import styled from 'styled-components'
import Image from 'next/image'
import usePriceFormatted from '@/app/utils/usePriceFormatted'
import Button from '../ui/Button'
import { useBasketStore } from '@/app/zustandStore/useBasketStore'
import { FaMinus, FaPlus } from 'react-icons/fa'
import exclamation from '../../../assets/exclamation.png'

export default function cardProductDetails({ product }: { product: IProduct | any }) {
    const { addProductToBasket } = useBasketStore();
    const [selectedImage, setSelectedImage] = useState(0)
    const [productSize, setProductSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [sizesProductAvailable, setSizesProductAvailable] = useState(['S', 'M', 'L', 'XL']);

    //  Add new product to basket
    const handleAddToCart = () => {

        // GET THE LOCALSTORAGE BASKET
        let localStorage_BASKET = localStorage.getItem("BASKET") && JSON.parse(localStorage.getItem("BASKET") || "") || [];

        //  FILTERED LOCALSTORAGE
        let filterLocalStorage: any = localStorage_BASKET && localStorage_BASKET.filter(
            (item: any) => item.productId === product.id && item.size === productSize
        );

        //  CHECK IF THE 'EXISTPRODUCT' IS AN ARRAY AND IF IT IS GREATER THEN 0...
        //  IF CONDITION IS TRUE THIS MEANS IT IS THE FIRST PRODUCT ADDED
        if (filterLocalStorage && filterLocalStorage.length > 0) {
            filterLocalStorage[0].quantity += quantity;
        } else {
            // localStorage_BASKET = []
            localStorage_BASKET.push({
                productId: product._id,
                quantity: quantity,
                size: productSize,
            });
        }

        //  ZUSTAND basketStore - ADD THE NEW PRODUCT IN SHOPPING CART LIST 
        addProductToBasket(
            product,
            quantity,
            productSize
        )



        //  SET THE LOCALSTORAGE AFTER UPDATE THE BASKET
        localStorage.setItem("BASKET", JSON.stringify(localStorage_BASKET));

    };

    return (
        <Container className='container-product-details-card'>
            <ContainerImagesProductCard className='container-images-product-card' style={{ display: 'flex', justifyContent: 'space-between', width: '50%' }}>

                <WrapperLeftImagesProductDetails className='wrapper-left-images-product-details' >
                    {product?.images.map((image: any, index: number) => {
                        return (
                            <div className='img-product-details-card' key={index}>
                                <Image className='img-product-card' src={image?.image} alt={product?.name} width={200} height={300} priority loading='eager' onClick={() => setSelectedImage(index)} />
                            </div>

                        )
                    })}
                </WrapperLeftImagesProductDetails>

                <ContainerSelectedImages className='container-selected-images'>

                    <WrapperSelectedImage className='wrapper-selected-image'>
                        <ContainerDetailsProductCard className='container-details-product-card'>
                            <div className='details-product-card'>
                                <p className='name'>{product?.name}</p>
                                <div className='container-price'>
                                    <span className='currency'>{product?.currency.currency}</span>
                                    <span className='price'>{usePriceFormatted({ price: product?.price || null })}</span>
                                </div>
                            </div >

                            {/*  <div className='wrapper-description-product-card' >
                        <p className='description'>{product?.description}{product?.description}</p>
                    </div> */}
                        </ContainerDetailsProductCard>

                        {product && <Image className='img-product-card-selected' src={product?.images[selectedImage].image} alt={product?.name} width={200} height={300} priority loading='eager' />}

                        <ContainerAddToCart className='container-add-to-cart'>

                            <div className='wrapper-quantity-size' >
                                <div className='wrapper-quantity'>
                                    <Button
                                        className='button-plus-quantity'
                                        style={{ marginRight: '10px' }}
                                        onClick={() => { quantity < 2 ? setQuantity(1) : setQuantity(quantity - 1); }}>
                                        <i className="" ><FaMinus /></i>
                                    </Button>

                                    <div className='quantity' >
                                        {quantity}
                                    </div>

                                    <Button
                                        className='button-minus-quantity'
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => { setQuantity(quantity + 1); }}>
                                        <i className=""><FaPlus /></i>
                                    </Button>
                                </div>

                                <div className='wrapper-select-size'>
                                    <select className='select-size' value={productSize} onChange={(e) => setProductSize(e.target.value)}>
                                        < option value={"None"} > None </option>
                                        {
                                            sizesProductAvailable?.map((size: any, index: number) => {
                                                return (
                                                    < option key={index} value={size} > {size}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    {(productSize === 'None' || productSize === '') && <Image className='img-exclamation' src={exclamation} alt="exclamation" width={50} height={50} />}
                                </div>

                            </div>


                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                                <Button type='button' style={{ width: '70%', height: '35px' }} className='button-add-to-cart' disabled={(productSize === 'None' || productSize === '') ? true : false} onClick={handleAddToCart}> Add to cart </Button>
                            </div>

                        </ContainerAddToCart>
                    </WrapperSelectedImage>
                </ContainerSelectedImages>

            </ContainerImagesProductCard>









        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    margin: 40px;
`

const ContainerImagesProductCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    `

const WrapperLeftImagesProductDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 100%;
    margin: auto;
    padding: 10px;
    border-radius: 10px;

    .img-product-details-card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 10px;
        width: 200px;
        height: 100%;
        border-radius: 10px;
        object-fit: cover;
    }

    .img-product-card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100%;
        border-radius: 10px;
        object-fit: cover;
        cursor: pointer;
    }

@media (max-width: 600px) {
    width: 100px;
}

`

const ContainerSelectedImages = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: auto;
    padding: 10px;
    border-radius: 10px;
`


const WrapperSelectedImage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
    height: 70vh;
    margin: auto;
    padding: 10px;
    border-radius: 10px;
    
    .img-product-card-selected {
        position: relative;
        margin: 10px;
        width: auto;
        max-width: 100%;
        height: 60%;
        border-radius: 10px;
        object-fit: cover;

    }

    .details-product-card {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        margin: 5px;
        color: white;
        font-size: 15px;
        font-weight: bold;
    }

`



const ContainerDetailsProductCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* height: 100%;
    margin: auto; */
    padding: 10px;
    border-radius: 10px;

    
    .container-price {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .name,
    .currency,
    .price {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 20px;
        font-weight: bold;
        padding: 5px;
        }

        

    .wrapper-description-product-card {
        width: 100%;
        max-height: 150px;
        margin: 5px;
        text-align: justify;
        color: white;
        font-size: 15px;
        font-weight: bold;
        overflow: auto;
        padding: 10px;
        background-color: var(--secondary-color);
        border-radius: 10px;
    }

    .description {
        color: white;
        font-size: 15px;
        font-weight: bold;
        text-align: center;
    }

`

const ContainerAddToCart = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* height: 100%; */
    margin: 0 auto;
    padding: 10px;
    border-radius: 10px;

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
        width: 100%;
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

    .wrapper-select-size {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 5px;
        /* background-color: var(--secondary-color); */
    }
    
    .select-size {
        text-align: center;
        width: 50%;
        height: 30px;
        border:none;
        color: white;
        font-size: 15px;
        font-weight: bold;
        border-radius: 5px;
        outline: none;
        background-color: var(--button-color);
    }

    .img-exclamation {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        right: 30px;
        width: 35px;
        height: 35px;
        margin: 0px;
    }

    .wrapper-size-category {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        padding: 5px;
        
        label {
            margin: 0px 5px ;
            padding: 5px;
        }
        
        option {
            background-color: #ffffff;
        }
    }

    .wrapper-size{
        display: flex;
        justify-content: center;
        align-items: center;

    }
`  