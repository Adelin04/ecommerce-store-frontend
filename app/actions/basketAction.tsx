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

export async function addProductToBasket_Server(productId: any, quantity: number, size: string) {
    console.log({ productId, quantity, size });

    const response = await fetch(`${URI}basket/addProductToBasket`, {
        method: 'POST',
        body: JSON.stringify({ productId, quantity, size })
    })
        .then((res) => res.json())
        .then((data) => {
            return data
        })

    return { succes: true, response }
}