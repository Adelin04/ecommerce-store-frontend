'use server'

import { URI } from "../utils/URI";

export async function fetchBasket(id: string | number) {
    const basket = await fetch(`${URI}`)
        .then((res) => { return res.json() })
        .then((data) => {
            return data
        })
        .catch(err => {
            console.log(err);
            return null
        })
    return basket;
}

export async function addProductToBasket_Server(userId: string | number, productId: string | number, quantity: number, size: string) {

    const payload = { userId, productId, quantity, size };

    const response = await fetch(`${URI}basket/addProductToBasket`, {
        method: 'POST',
        body: JSON.stringify(payload),
        // credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log('data => ', data);

            return data
        })
        .catch(err => {
            console.log(err);
        })


    return response
}