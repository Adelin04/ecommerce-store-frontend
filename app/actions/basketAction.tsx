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
    console.log('payload => ', payload);
    const response = await fetch(`${URI}basket/addProductToBasket`, {
        method: 'POST',
        body: JSON.stringify(payload),
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