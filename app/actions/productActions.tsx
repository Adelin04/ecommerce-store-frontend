'use server'

import { URI } from "../utils/URI";

export async function fetchProducts() {
    const products = await fetch(`${URI}products/getAllProducts`)
        .then((res) => { return res.json() })
        .then((data) => {
            return data
        })
        .catch(err => {
            console.log(err);
            return null
        })
    return products;
}

export async function fetchCategories() {

    const responseCategories = await fetch(`${URI}category/getAllCategories`)
        .then((res) => { return res.json() })
        .then((data) => {
            return data
        })
        .catch(err => {
            console.log(err);
            return null
        })

    return responseCategories
}


export async function fetchProductById(_id: string | number) {

    const response = await fetch(`${URI}products/getProductById/${_id}`);
    const product = await response.json();

    return product;
}