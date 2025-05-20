'use client'

import styled from 'styled-components'
import { useCategoryStore } from '../zustandStore/useCategoryStore';
import CategoriesList from '../component/products/categoriesList';
import { useMounted } from '../component/useMounted';
import Loading from '../loading';
import { useProductStore } from '../zustandStore/useProductStore';
import zzz from '../../assets/zzz.svg';
import Image from 'next/image';
import Button from '../component/ui/Button';
import { useState } from 'react';

const HomePage = () => {
  const { hasMounted } = useMounted()
  const { categorySelected, isLoadingCategories, categories }: any = useCategoryStore();
  const { selectedProducts }: any = useProductStore();
  const [message, setMessage]: any = useState(`
    No products available at the moment.
    Please leave your email and we will notify you when our site is ready.
    A lot of love, Team Boutique.
`);

  if (!hasMounted || isLoadingCategories)
    return <Loading />

  if (categories === null) {
    return (
      <ContainerZzz>

        <div className='wrapper-zzz'>
          <div className='message'> {message} </div>

          <div className='zzz_1'>
            <Image src={zzz} width={100} height={100} alt='zzz' />
          </div>
          <div className='zzz_2'>
            <Image src={zzz} width={100} height={100} alt='zzz' />
          </div>
          <div className='zzz_3'>
            <Image src={zzz} width={100} height={100} alt='zzz' />
          </div>
          <div className='zzz_4'>
            <Image src={zzz} width={100} height={100} alt='zzz' />
          </div>
          <div className='zzz_5'>
            <Image src={zzz} width={100} height={100} alt='zzz' />
          </div>
          <div className='zzz_6'>
            <Image src={zzz} width={100} height={100} alt='zzz' />
          </div>
          <div className='zzz_7'>
            <Image src={zzz} width={100} height={100} alt='zzz' />
          </div>
        </div>

        <div className='notify-me'>
          <input type="email" id="notify-me" placeholder='email' />
          <Button className='notify-me-button'> Notify me </Button>
        </div>

      </ContainerZzz>
    )
  }

  return (
    <Container className='home-container'>

      {(categorySelected !== null) && <CategoriesList categories={categorySelected} />}

    </Container>
  )
}

export default HomePage

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;

`

const ContainerZzz = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;



.wrapper-zzz{
      position: fixed;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;
      /* background-color: green; */
      z-index: -1;
    }

    .message {
      position: absolute;
      top: 20%;
      display:flex;
      flex-direction:column;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 80%;
      max-width: 600px;
      min-width: 300px;
      font-size: 20px;
      color: salmon;
      z-index: 1;
    }

    .zzz_1{
      position: absolute;
      top: 20%;
      left: 10%;
    }

    .zzz_2{
      position: absolute;
      top: 20%;
      right: 20%;
    }

    .zzz_3{
      position: absolute;
      bottom: 45%;
      left: 60%;
    }

    .zzz_4{
      position: absolute;
      bottom: 20%;
      right: 20%;
    }

    .zzz_5{  
      position: absolute;
      bottom: 10%;
      left: 10%;
    }

    .zzz_6{
      position: absolute;
      top:55%;
      right: 60%;
    }
    
    .zzz_7{
      position: absolute;
      top:5%;
      right: 55%;
    }

    .notify-me{
      position: absolute;
      top: 50%;
      display:flex;
      flex-direction:column;
      align-items: center;
      justify-content: center;
      width: 20%;
      max-width: 200px;
      min-width: 200px;
    }
    
    input{
      display:inherit;
      width: 100%;
      height: 30px;
      outline: none;
      border: none;
      border-radius: 5px;
      margin: 0px;
      background-color: #ffffff;
      color: #000000;
      text-align:center;
    }
    
    ::placeholder{
      display:inherit;
      color: grey;
      font-size: 13px;
    }
    
    .notify-me-button {
      font-size: 15px;
      width:  97%;
      height: 30px;
      outline: none;
      border: none;
      border-radius: 5px;
      margin: 15px 0px;
      color: salmon;
      cursor: pointer;
      /* background-color: var(--button-color); */
    }
`