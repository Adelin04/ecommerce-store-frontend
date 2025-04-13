'use client'

import React, { useEffect, useState } from 'react'
import Login from '../../component/auth/Login'
import Register from '../../component/auth/Register'
import styled from 'styled-components'
import { useUserStore } from '@/app/zustandStore/useUserStore'
import { redirect } from 'next/navigation'
import Button from '@/app/component/ui/Button'

const AuthPage = () => {
    const { user } = useUserStore();
    const [toggle, setToggle] = useState(true);

    useEffect(() => {
        if (user) {
            return redirect('/');
        }
    }, [user])

    return (
        <Container className='auth-page-container'>

            <WrapperAuthPage className='wrapper-auth-page'>
                {toggle ?
                    <div>
                        <div className="login-account">
                            <span> Don't you have an account? </span>
                            <Button className='register-button' onClick={() => setToggle(!toggle)}> Register </Button>
                        </div>
                        <Login />
                    </div>
                    :
                    <div>

                        <div className="register-account">
                            <span> Do you have an account? </span>
                            <Button className='login-button' onClick={() => setToggle(!toggle)}> Login </Button>
                        </div>
                        <Register />

                    </div>
                }
            </WrapperAuthPage>

        </Container>
    )
}

export default AuthPage

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`

const WrapperAuthPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: 20px;

    .login-account,
    .register-account {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        width: 100%;
        height: 25px;
        margin: 10px auto;
        
        span {
            font-size: 11px;
            font-weight: bold;
            color: white;
            padding-right: 10px;
            margin: 5px;
        }
    }

   .login-button,
   .register-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width:  auto;
        height: 17px;
        padding: 10px;
        font-size: 12px;
        cursor: pointer;
    }
`