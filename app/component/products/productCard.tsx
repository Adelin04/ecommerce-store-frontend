import React, { useState } from 'react'
import styled from 'styled-components'
import { IProduct } from '@/app/interfaces/interfaces';
import { useProductStore } from '@/app/zustandStore/useProductStore';
import { useRouter } from 'next/navigation';
import usePriceFormatted from '@/app/utils/usePriceFormatted';
import Button from '../ui/Button';
import { FaMinus, FaPlus } from 'react-icons/fa';
import Image from 'next/image';
import exclamation from '../../../assets/exclamation.png'
import { useBasketStore } from '@/app/zustandStore/useBasketStore';

interface PropsProductCard {
    product: IProduct | null
}

const ProductCard = ({ product }: PropsProductCard | any) => {
    const router = useRouter()
    const { selectProduct } = useProductStore();
    const { addProductToBasket } = useBasketStore();

    const [selectedImage, setSelectedImage] = useState(0)
    const [productSize, setProductSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [sizesProductAvailable, setSizesProductAvailable] = useState(['S', 'M', 'L', 'XL']);

    // console.log(product?.price);


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
                productId: product.id,
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

        setProductSize('');
    };

    function handleClick() {
        product && selectProduct(product._id);
        product && router.push(`/product-details/${product._id}`);
    }

    return (
        <Container className='container-product-card'>

            <img className='img-product-card' src={product?.images[0].image} alt={product?.name} onClick={handleClick} />

            <WrapperDetailsProductCard className='wrapper-details-product-card' >
                <WrapperPrice className='wrapper-price' >
                    <div className='container-price'>
                        <span className='currency'>{product?.currency.currency}</span>
                        <span className='price'>{usePriceFormatted({ price: product?.price || null })}</span>
                    </div>
                </WrapperPrice>



            </WrapperDetailsProductCard>


            <WrapperName className='wrapper-name'>
                <span className='name'>{product?.name}</span>
            </WrapperName >

            <Color>
                <span className='color'>{product?.color.color}</span>
            </Color>

            <ContainerAddToCart className='container-add-to-cart'>

                <div className='wrapper-quantity-size' >
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

        </Container>
    )
}

export default ProductCard

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 250px;
    height: auto;
    margin: 40px;
    /* border: 1px solid black; */
    border-radius: 10px;
    border-top: transparent;
    border: 1px solid #fa807273;
    
    .img-product-card {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        z-index: 0;
        width: 100%;
        height: 300px;
        border-radius: 10px;
        object-fit: cover;
        cursor: pointer;
    }

    .container-buttons {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100px;
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

.button-add-to-card {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70%;
        height: 30px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border: none;
        background-color: var(--button-color);
        font-size: 15px;
        font-weight: bold;
        color: white;
        cursor: pointer;
    }
`

const WrapperPrice = styled.div`
    display: flex;
    justify-content: start;
    align-items: start;
    width: auto;
    height: auto;
    
    .container-price {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
        top: 0px;
        right: 0px;
        border-top-right-radius: 10px;
        /* background-color: green; */
        background-color: var(--button-color);
    }

    .currency,
    .price {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20px;
        padding: 5px;
        font-size: 17px;
        font-weight: bold;
        color: white;
    }

`
const WrapperDetailsProductCard = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    top: 0;
    right: 0;
    width: auto;
    height: auto;
    margin: auto;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    /* border: 1px solid var(--border-color); */
    /* background: linear-gradient(0deg, #3c3e44 0%, #3a3a3b 100%); */
`

const WrapperName = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    margin: 5px auto;
    font-size: 20px;
    font-weight: bold;
    color: white;
    text-align: center;

    .name{
        /* position: absolute; */
        color: white;
        top: 15px;
        left: 20px;
    }
`

const Color = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 5px 0px; 
    margin: 10px auto;
    /* background-color: red; */
`