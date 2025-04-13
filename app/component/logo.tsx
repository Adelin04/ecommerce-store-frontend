'use client'

import LogoIcon from '../../assets/logoIcon.svg'
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useProductStore } from '../zustandStore/useProductStore';

const Logo = () => {
    const { resetSelectedProducts } = useProductStore();

    return (
        <Container className="log-container">
            <Link className='link-logo' href="/" onClick={() => resetSelectedProducts()}>
                <Image className='img-logo' priority src={LogoIcon} alt='Logo' />
                <LabelLogo> BOUTIQUE </LabelLogo>
            </Link>
        </Container>
    )
}

export default Logo;


const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    
    .link-logo{
        display: flex;    
        justify-content: center;
        align-items: center;
        text-decoration: none;
        outline: none;
    }

    .img-logo{
        width: 80px;
        height: auto;
        cursor: pointer;
        padding: 5px;
        background: var(--primary-color);
        border-radius: 50%;
    }

    @media (max-width: 400px) {
      .img-logo{
        transition: all 0.2s ease-in-out;
        width: 50px;
    }
  }
`

const LabelLogo = styled.label`
    padding: 15px;
    color: #ffffff;
    font-size: 25px;
    font-weight: 500;
    cursor: pointer;
`