import { fetchedProductsType } from "../../utils/datatypes"

export enum ActionTypes {
    FETCH_PRODUCTS = 'FETCH_PRODUCTS',
    IS_LOADING='IS_LOADING',
    IS_ERROR='IS_ERROR',
    FILTERED_DATA='FILTERED_DATA',
    CART_DATA='CART_DATA',
    CART_DATA_QUANTITY='CART_DATA_QUANTITY',
    UPDATE_INPUT_VALUE='UPDATE_INPUT_VALUE'
}

interface fetchFilterCartProducts {
    type: ActionTypes.FETCH_PRODUCTS |ActionTypes.FILTERED_DATA | ActionTypes.CART_DATA,
    payload:fetchedProductsType[]
}

interface isLoading {
    type: ActionTypes.IS_LOADING,
}

interface isError{
    type: ActionTypes.IS_ERROR,
    payload: string
}

interface cartQuantity {
    type:ActionTypes.CART_DATA_QUANTITY,
    payload:{productObj:fetchedProductsType, quantityAction:string}
}
 
interface updateSearchValue {
    type:ActionTypes.UPDATE_INPUT_VALUE,
    payload:string
}


export type Action = fetchFilterCartProducts | isLoading | isError | cartQuantity | updateSearchValue