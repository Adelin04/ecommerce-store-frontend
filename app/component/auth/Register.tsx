import React, { useState } from 'react'
import styled from 'styled-components'
import { TfiEmail } from "react-icons/tfi";
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';
import { register } from '@/app/actions/userActions';
import { useExistEmptyFields } from '@/app/utils/useExistEmptyFields';

const Register = () => {
    const router = useRouter()

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [message, setMessage] = useState<string>('')


    const cleanMessage = () => {
        setTimeout(() => setMessage(''), 3000)
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (useExistEmptyFields([firstName, lastName, email, password, confirmPassword])) { setMessage('Please fill all the fields'); cleanMessage(); return }
        if (password !== confirmPassword) { setMessage('Passwords do not match'); cleanMessage(); return }

        const userRegistered = await register({ firstName, lastName, email, password, confirmPassword });

        if (!userRegistered.success) {
            setMessage(userRegistered.message);
            return cleanMessage()
        };

        if (userRegistered.success) { return router.refresh() }
    }

    return (
        <Container className='register-container'>
            <div className='register-message'>{message}</div>

            <h3 className='register-title'>Create your account</h3>

            <form style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} onSubmit={(e) => { handleSubmit(e) }}>
                <WrapperRegister className='wrapper-logout'>

                    <WrapperLabelInput>
                        <label className='firstName-label'>First Name</label>
                        <input className='firstName-input' type='text' required name='firstName' id='firstName' placeholder='First Name' autoFocus defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <FaRegUser style={{ position: 'absolute', left: '10px', top: '27px', color: 'grey' }} />
                    </WrapperLabelInput>

                    <WrapperLabelInput>
                        <label className='lastName-label'>Last Name</label>
                        <input className='lastName-input' type='text' required name='lastName' id='lastName' placeholder='Last Name' defaultValue={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <FaRegUser style={{ position: 'absolute', left: '10px', top: '27px', color: 'grey' }} />
                    </WrapperLabelInput>

                    <WrapperLabelInput>
                        <label className='email-label'>Email</label>
                        <input className='email-input' type='email' required name='email' id='email' placeholder='email@example.com' defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                        <TfiEmail style={{ position: 'absolute', left: '10px', top: '27px', color: 'grey' }} />
                    </WrapperLabelInput>

                    <WrapperLabelInput>
                        <label className='password-label'>Password</label>
                        <input className='password-input' type='password' required name='password' id='password' placeholder='password' defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
                        <MdOutlinePassword style={{ position: 'absolute', left: '10px', top: '27px', color: 'grey' }} />
                    </WrapperLabelInput>

                    <WrapperLabelInput>
                        <label className='confirmPassword-label'>Confirm Password</label>
                        <input className='confirmPassword-input' type='password' required name='confirmPassword' id='confirmPassword' placeholder='confirm password' defaultValue={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <MdOutlinePassword style={{ position: 'absolute', left: '10px', top: '27px', color: 'grey' }} />
                    </WrapperLabelInput>


                </WrapperRegister>
                <Button className='component-register-button' type='submit' >Register</Button>
            </form>

        </Container >
    )
}

export default Register;

const Container = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    width: 30%;
    min-width: 300px;
    padding: 20px;
    min-height: 500px;
    margin: auto;
    border-radius: 5px;
    background-color: var(--secondary-color);

    .register-message{
        display:inherit;
        justify-content: center;
        align-items : center;
        text-align: center;
        width: auto;
        height: 30px;
        color: salmon;
        font-size: 17px;
        font-weight: bold;
    }

    .component-register-button{
        width:  97%;
        height: 30px;
        outline: none;
        border: none;
        border-radius: 5px;
        margin: 15px 0px;
        background-color: var(--button-color);
        color: #ffffff;
        cursor: pointer;
    }

    .register-title{
        color: #ffffff;
        font-weight: bold;
        font-size: 15px;
        padding-bottom: 15px;
    }
`

const WrapperRegister = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    width:100%;
    height: auto;
    margin: auto;
    border-radius: 5px;

    .email-label,
    .password-label,
    .firstName-label,
    .lastName-label,
    .confirmPassword-label{
        color: grey;
        font-size: 12px;
        width: 99%;
        margin: 1px 0px;
        padding-left: 2px;
        text-align:left;
    }
    
    input{
        width: 100%;
        height: 30px;
        outline: none;
        border: none;
        border-radius: 5px;
        margin: 0px;
        background-color: #8080801c;
        text-align:center;
        color: #ffffff;
    }

    input::placeholder{
        font-size: 15px;
        color: grey;
    }

`

const WrapperLabelInput = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 5px;
`