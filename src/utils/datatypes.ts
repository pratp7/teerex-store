export interface fetchedProductsType {
    id: number,
    imageURL: string,
    name: string,
    type: string,
    price: number,
    currency: string,
    color: string,
    gender: string,
    quantity: number,
    addedQuantity:number

}


export interface filterType {
    color: Set<string>,
    type: Set<string>,
    gender: Set<string>,
    price:Set<string>,
    [key: string]: Set<string>


}

export const colorArr = new Set<string>()
export const genderArr = new Set<string>()
export const priceArr = new Set<string>()
export const typeArr = new Set<string>()