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
    console.log({ userId, productId, quantity, size });

    const payload = { userId, productId, quantity, size };
    const response = await fetch(`${URI}basket/addProductToBasket`, {
        method: 'POST',
        body: JSON.stringify(payload),
    })
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        .catch(err => {
            console.log(err);
        })

    return response
}