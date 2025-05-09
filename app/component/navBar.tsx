'use client'

import styled from 'styled-components';
import Logo from './logo';
import basketLogo from '../../assets/basket.svg';
import React, { useEffect, useState } from 'react';
import { useCategoryStore } from '../zustandStore/useCategoryStore';
import { useProductStore } from '../zustandStore/useProductStore';
import UserProfile from './userProfile';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../zustandStore/useUserStore';
import BasketPopUp from '../(basket)/basket/component/basketPopUp';
import { useBasketStore } from '../zustandStore/useBasketStore';
import Image from 'next/image';
import Link from 'next/link';

const NavBar = ({ navBarMenu }: any) => {
    const router = useRouter()
    const { user } = useUserStore()
    const { products, resetSelectedProducts } = useProductStore()
    const { counterProduct } = useBasketStore()
    const { setCategoryClicked, categorySelected }: any = useCategoryStore()

    const [windowDimensions, setWindowDimensions] = useState<any>({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [clickedGender, setClickedGender] = useState(() => localStorage.getItem('gender') || 'MEN')

    const handleClickNavBarMenu = (menuName: string) => {
        localStorage.setItem('gender', menuName)

        setClickedGender(menuName)
        setCategoryClicked(menuName)
        resetSelectedProducts()
        router.push(`/`)
    }

    useEffect(() => {
        setCategoryClicked(localStorage.getItem('gender') || 'MEN')

        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [products]);

    return (
        <Container className='nav-container'>
            {windowDimensions.width > 790 ?
                (< WrapperNavBar className='wrapper-nav-bar'>


                    <WrapperLogo className='wrapper-logo'>
                        <Logo />
                    </WrapperLogo>

                    <MenuNavBar className='wrapper-nav-link'>
                        {navBarMenu && navBarMenu.map((menu: any, index: number) => {
                            return (
                                <WrapperLink key={index} className='wrapper-link'>
                                    <p className='link' style={{ color: clickedGender === menu.name ? 'var(--button-color)' : '#ffffff' }} onClick={() => handleClickNavBarMenu(menu.name)}>{menu.name}</p>
                                </WrapperLink>
                            )
                        })}
                    </MenuNavBar>

                    <WrapperUserProfile className='wrapper-user-profile' style={{ background: 'while' }}>
                        <UserProfile user={user} />
                    </WrapperUserProfile>

                    <WrapperBasket className='wrapper-basket'>
                        <Link href={'/basket'}>
                            <Image className='img-basket' src={basketLogo} alt="Basket" width={40} height={40} />
                        </Link>
                        <div className='wrapper-basket-popup' >
                            <BasketPopUp counter={counterProduct} />
                        </div>
                    </WrapperBasket>

                </WrapperNavBar>)
                :
                (<ResponsiveBrowser className='responsive-browser-nav-bar'>

                    <WrapperLogoUserProfile>

                        <WrapperLogoResponsive className='wrapper-logo'>
                            <Logo />
                        </WrapperLogoResponsive>


                        <WrapperUserProfileResponsive className='wrapper-user-profile'>
                            <UserProfile user={user} />
                        </WrapperUserProfileResponsive>
                        <WrapperBasket className='wrapper-basket'>
                            <Link href={'/basket'}>
                                <Image className='img-basket' src={basketLogo} alt="Basket" width={40} height={40} />
                            </Link>
                            <div className='wrapper-basket-popup' >
                                <BasketPopUp counter={counterProduct} />
                            </div>
                        </WrapperBasket>
                    </WrapperLogoUserProfile>

                    <MenuNavBar className='wrapper-nav-link'>
                        {navBarMenu && navBarMenu.map((menu: any, index: number) => {
                            return (
                                <WrapperLink key={index} className='wrapper-link'>
                                    <p className='link' style={{ color: clickedGender === menu.name ? 'var(--button-color)' : '#ffffff' }} onClick={() => handleClickNavBarMenu(menu.name)}>{menu.name}</p>
                                </WrapperLink>
                            )
                        })}

                    </MenuNavBar>

                </ResponsiveBrowser>)
            }
        </Container >
    )
}

export default NavBar;

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    /* height: auto; */
    max-height: 130px;
    background-color: var(--secondary-color);
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border-color);
    z-index: 100;

    .wrapper-link{
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        height: 100%;
        /* background-color: green; */
    }

    .link{
        text-decoration: none;
        color: #ffffff;
        font-size: auto;
        font-weight: 500;
        cursor: pointer;
        padding: 0px 30px
    }

    @media (max-width: 400px) {
      .link{
        transition: all 0.2s ease-in-out;
        font-size: 5px;
  }

    .link{
      font-size: 10px;
    }


  }
`

const WrapperNavBar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    /* background-color: green; */
`



const MenuNavBar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 40%;
    width: auto;
    height: 100%;
    padding: 10px;
    /* background-color: red; */
`

const WrapperLogo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width:25%;
    height: 100%;
    padding: 10px;
    /* background-color: blue; */
`

const WrapperLink = styled.div`
    padding: '10px';
    /* background-color: yellow; */
`

const WrapperUserProfile = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* width:25%; */
    height: 100%;
    padding: 10px;
    /* background-color: blue; */

`

const WrapperBasket = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    /* width:25%; */
    height: 100%;
    padding: 10px;
    /* background-color: green; */

    .img-basket {
        color: #ffffff;
        cursor: pointer;
    }
    
    .wrapper-basket-popup {
        position: absolute;
        bottom: 0px;
        right: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        height: auto;
        /* background-color: blue; */
    }
`


//  RESPONSIVE
const ResponsiveBrowser = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    /* background-color: green; */
`

const WrapperLogoUserProfile = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    /* background-color: green; */
`

const WrapperUserProfileResponsive = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 10px;
    /* background-color: green; */
    `

const WrapperLogoResponsive = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 20px;
    /* background-color: green; */
`