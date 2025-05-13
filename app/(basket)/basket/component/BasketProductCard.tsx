import React, { useEffect, useState } from 'react'
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
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        product && product.productQtySize.map((item: any) => {
                setQuantity(quantity + item.quantity)
                console.log('item',item.quantity);
                console.log('quantity',quantity);
                
            })

        
    }, []);
    
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

                    <p className='seller'>{seller?.toUpperCase()}</p>
                    <p className='gender'>{gender.gender}</p>
                    <p className='category'>{category.category}</p>
                </div>


                <div className='wrapper-info3-product-card' style={{ display: 'flex', flexDirection: 'row' }}>

                    <div className='container-quantity' >
                        {product.productQtySize.map((item: any, index: number) => (
                            <div key={index} className='wrapper-btns-quantity-size-icon'>
                                <div  className='wrapper-btns-quantity-size' >
                                
                                    <div className='wrapper-btns'>
                                        <Button
                                            className='button-plus-quantity'
                                            style={{ marginRight: '10px' }}
                                            onClick={() => { counterProduct >= 1 && product && decreaseQuantity(product?._id) }}>
                                            <i className="" ><FaMinus /></i>
                                        </Button>
                                            <p className='size' >{item?.size}</p>
                                            <p className='quantity' >{item?.quantity}</p>
                                        <Button
                                            className='button-minus-quantity'
                                            style={{ marginLeft: '10px' }}
                                            onClick={() => { product && increaseQuantity(product?._id) }}>
                                            <i className=""><FaPlus /></i>
                                        </Button>
                                    </div>

                                    
                                    <p className='price'>{product.price * item?.quantity}{" "}{currency.currency}</p>
                                    <div className='wrapper-button-delete'>
                                        <Image className='button-delete' src={DeleteIcon} alt={'delete icon'} onClick={() => product && removeProductFromBasket(product._id)} />
                                    </div>

                                </div>
                            </div>

                        ))}
                    </div>


                </div>

{/* 
                <div className='wrapper-price-product-card'>
                    
                    <p className='price'>{price * quantity}{" "}{currency.currency}</p>
                </div> */}

            </WrapperBasketProductCard>

            {/* <WrapperButtonsBasketProductCard className='wrapper-buttons-product-card' >
                <Image className='button-delete' src={DeleteIcon} alt={'delete icon'} onClick={() => product && removeProductFromBasket(product._id)} />
            </WrapperButtonsBasketProductCard> */}


        </Container>
    )
}


const Container = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90%;
        height: 100%;
        margin: 3px;
        padding: 5px 0px;
        border: 1px solid salmon;
        border-radius: 10px;
        overflow: hidden;
    `

const WrapperBasketProductCard = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        height: 100%;
        margin: 5px 0px;
        padding: 10px;
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
        .wrapper-info3-product-card,
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
    
        .name,
        .brand,
        .color,
        .seller,
        .gender,
        .category{
            display: flex;
            justify-content: center;
            align-items: center;
            width: auto;
            height: auto;
            margin: 5px;
            border-radius: 5px;
            color: #ffffff;
            /* background-color: var(--button-color); */
        }
     
        .wrapper-btns-quantity-size-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 300px;
            height: 100%;
            margin: 5px;
        }
       
    
    .container-quantity {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: auto;
        height: auto;
        padding: 5px;
        font-size: 13px;
        border-radius: 5px;
        color: #ffffff;
        /* background-color: var(--button-color); */
    }   
    
/*     .container-quantity p {
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        height: auto;
        margin: 5px;
        border-radius: 5px;
        color: #ffffff;
        background-color: var(--button-color);
    } */
    
    .wrapper-btns-quantity-size {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin: 5px;
        padding: 0px 5px;
        border-radius: 10px;
        border: 1px solid var(--border-color);
    }

    .wrapper-btns{
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;

        
    }

    
    .button-plus-quantity,
    .button-minus-quantity {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25px;
        height: 35px;
        font-size: 13px;
        color: #ffffff;
        background-color: var(--button-color);
    }

    .wrapper-button-delete {
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        height: 100%;
        margin: 5px;
        border-radius: 10px;
    }

    .button-delete {
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

    .price {
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        height: 100%;
        margin: 5px;
        font-size: 18px;
        font-weight: bold;
    }

// const WrapperButtonsBasketProductCard = styled.div`
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         width: auto;
//         height: 100%;
//         margin: auto;
//         padding: 5px;
//         border-radius: 10px;
        
//         .button-delete,
//         .button-edit{
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             width: 100%;
//             height: 40px;
//             padding: 5px;
//             margin: 2px;
//             border-radius: 10px;
//             border: none;
//             cursor: pointer;
//         }
//     `