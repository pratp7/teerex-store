import { RootState } from "."
import { Action, ActionTypes } from "../actions/actionTypes"
import { fetchedProductsType } from "../../utils/datatypes"

type InitialState = {
    cartItems:number,
    cartProducts:fetchedProductsType[],
    totalPrice:number
}

const initalState:InitialState = {
    cartItems: 0,
    cartProducts:[],
    totalPrice:0
}

const cartReducer = (state=initalState, action:Action) => {
    switch(action.type){
        case ActionTypes.CART_DATA:
            let updatedPrice = 0
            for(let item of action.payload){
                updatedPrice += item.price*item.addedQuantity 
            }
            return {
                cartItems:action.payload.length,
                cartProducts:action.payload,
                totalPrice:updatedPrice
            }
        case ActionTypes.CART_DATA_QUANTITY:
            let updatedPriceQuant = 0
            let updatedCartItems:fetchedProductsType[] = [...state.cartProducts]
            let {productObj, quantityAction} = action.payload
            // update quantity
            const idx = state.cartProducts.findIndex(product => product.id === productObj.id)
            if(quantityAction === 'increase'){
               updatedCartItems[idx]['addedQuantity'] = updatedCartItems[idx]['addedQuantity'] + 1
            }else if (quantityAction === 'decrease' &&  updatedCartItems[idx]) {
                updatedCartItems[idx]['addedQuantity'] = updatedCartItems[idx]['addedQuantity'] - 1
            }
            //update price
            for(let item of updatedCartItems){
                updatedPriceQuant += item.price*item.addedQuantity 
            }
            return {
                ...state,
                cartProducts:updatedCartItems,
                totalPrice:updatedPriceQuant
            }
        default:
         return state
    }

}

//selectors 
export const cartItemsSelector = (state:RootState) => state.cartReducer['cartItems']
export const cartProductsSelector = (state:RootState) => state.cartReducer['cartProducts']
export const totalPriceSelector = (state:RootState) => state.cartReducer['totalPrice']

export default cartReducer