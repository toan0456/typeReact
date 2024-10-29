export interface IProduct {
    id?: string| number,
    name: string,
    price: number,
    desc: string
}

export type formProduct= Pick<IProduct, "name"| "price" | "desc">

export interface IAuth {
    id? :number | string,
    email: string,
    password: string
}

export type authForm= Pick<IAuth, "email" | "password">