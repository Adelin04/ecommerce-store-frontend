import React from 'react'
import styled from 'styled-components'

interface PropsBasketPopUp {
    counter: number
}

const BasketPopUp = (counter: PropsBasketPopUp) => {
    return (
        <Counter>{counter.counter}</Counter>
    )
}

export default BasketPopUp

const Counter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    font-size: 13px;
    color: #ffffff;
    background-color: var(--button-color);
`