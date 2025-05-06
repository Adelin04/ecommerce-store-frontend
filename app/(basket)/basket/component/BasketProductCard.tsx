import React from 'react'
import styled from 'styled-components'
import { IProduct } from '@/app/interfaces/interfaces';
import { useProductStore } from '@/app/zustandStore/useProductStore';
import { useRouter } from 'next/navigation';
import EditIcon from '../../../../assets/edit_icon.svg';
import DeleteIcon from '../../../../assets/delete_icon.svg';
import Image from 'next/image';
import EditProduct from '@/app/(dashboard)/dashboard/component/product/editProduct';

interface PropsBasketCard {
    product: IProduct | null
}

export default function BasketProductCard({ product }: PropsBasketCard) {
    const router = useRouter()
    const { selectProduct } = useProductStore();
    const { name, color, price, brand, size, currency, gender, category, images, seller } = product as IProduct | any
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        product && selectProduct(product._id)
        product && router.push(`/product-details/${product._id}`);
    };
    console.log(product);

    return (
        <Container className='container-basket-product-card' style={{ overflow: `${open ? 'hidden' : 'auto'}` }}>



            <WrapperBasketProductCard className='wrapper-basket-product-card' >
                <div className='wrapper-img-product-card'>
                    <img className='img-product-card' src={images[0].image} alt={product?.name} onClick={handleClick} />
                </div>

                <div className='wrapper-info1-product-card'>
                    <p className='name'>{name?.toUpperCase()}</p>
                    <p className='brand'>{brand?.brand.toUpperCase()}</p>
                </div>


                <div className='wrapper-info2-product-card'>
                    <p className='color'>{color.color}</p>
                    <p className='size'>{size.size}</p>
                    <p className='seller'>{seller?.toUpperCase()}</p>
                    <p className='gender'>{gender.gender}</p>
                    <p className='category'>{category.category}</p>
                </div>

                <div>
                    {/* <p>{product.quantity}</p> */}
                </div>

                <div className='wrapper-price-product-card'>
                    <p className='price'>{price}{" "}{currency.currency}</p>
                </div>

            </WrapperBasketProductCard>

            {open && <EditProduct product={product as IProduct} user={null} close={() => setOpen(false)} />}

            <WrapperButtonsBasketProductCard className='wrapper-buttons-product-card' >
                <Image className='button-delete' src={DeleteIcon} alt={'delete icon'} />
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
            cursor: pointer;
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