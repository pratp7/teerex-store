import axios from 'axios';
import { Dispatch } from 'redux'
import {ActionTypes, Action} from './actionTypes'
import { fetchedProductsType, filterType } from '../../utils/datatypes';
// fetch products
export const fetchProducts = () => async(dispatch:Dispatch<Action>, getState:()=> any) => {
    // make the api call
    dispatch({
        type:ActionTypes.IS_LOADING
    })
    try {
        // clearing filters on empty search value
        clearFilterCategories(getState().productsReducer['filterObject'])

        // using api directly just in case .env does not works on evaluation
        // const listOfProducts = await axios.get(process.env.REACT_APP_FETCH_PRODUCTS_API as string)
        const listOfProducts = await axios.get('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json')
        dispatch({
            type:ActionTypes.FETCH_PRODUCTS,
            payload:listOfProducts?.data
        })
    } catch (error) {
        console.log(error as string)
        dispatch({
            type:ActionTypes.IS_ERROR,
            payload:'Oops!! Something went Wrong'
        })
    }
     
    
}

// update searched Value 

export const setInputValue = (value:string) => {
    return {
        type:ActionTypes.UPDATE_INPUT_VALUE,
        payload:value
    }
}
// Display searched Data
export const matchingProductsWithSearchedData = (value:string, toast:(value:string)=>any) => (dispatch:Dispatch<Action>, getState: () => any ) => {
    const valueChangedToLowercase = value.toLowerCase()
    const fetchedProducts:fetchedProductsType[] = getState().productsReducer['productsData']
    let filteredData:fetchedProductsType[] = checkSearchAndFilterData(fetchedProducts, getState().productsReducer['filterObject'], valueChangedToLowercase)
    if(!filteredData.length){
       toast('No Such Products Exist')
       return
    } 
      dispatch({
        type:ActionTypes.FILTERED_DATA,
        payload: filteredData
    })
}

// Display filtered Data
export const filterProductsWithCategories = (checkedItems:filterType, toast:(value:string)=>any) => (dispatch:Dispatch<Action>, getState: () => any) => {
    let  filteredData:fetchedProductsType[] = []
    const inputValue:string =  getState().productsReducer['searchedInput'].toLowerCase()
    const fetchedProducts:fetchedProductsType[] = getState().productsReducer['productsData']
    filteredData = checkSearchAndFilterData(fetchedProducts, checkedItems, inputValue)

    if(!filteredData.length){
        toast('No Such Products Exist ')  
    } 

    dispatch({
        type:ActionTypes.FILTERED_DATA,
        payload: filteredData
    })
}
// returns the list of searched and filtered products
function checkSearchAndFilterData(data:fetchedProductsType[], checkedItems:filterType, inputValue:string) {
    return data.filter((product) => {
     if(inputValue && !product.name.toLowerCase().includes(inputValue) && !product.color.toLowerCase().includes(inputValue) && !product.type.toLowerCase().includes(inputValue) ) return false
     if(!isEmpty(checkedItems)){
       if(!checkedItems['color'].size && !checkedItems['gender'].size && !checkedItems['price'].size && !checkedItems['type'].size) return false
       if (checkedItems['color'].size > 0 && !checkedItems['color'].has(product.color)) {
           return false;
         }
       
         if (checkedItems['gender'].size > 0 && !checkedItems['gender'].has(product.gender)) {
           return false;
         }
       
         if (checkedItems['type'].size > 0 && !checkedItems['type'].has(product.type)) {
           return false;
         }
         if(checkedItems['price'].size > 0 && !getPriceInfo(checkedItems['price'], product.price)){
           return false
         }
     }
         return true
   
       
   }) 
   }

export function isEmpty(checkedItems:filterType){
    let keys = Object.keys(checkedItems)
    for(let key of keys){
        if(checkedItems[key].size != 0) return false
    }
    return true
}

function clearFilterCategories(obj:filterType) {
    Object.keys(obj).forEach(key => obj[key].clear())
}

function getPriceInfo(priceSet:Set<string>, price:number){
    if(priceSet.has('0-Rs250') && price <=250){
        return true
    }

    if(priceSet.has('Rs251-Rs450') && (price >250 && price <=450)){
        return true
    }

    if(priceSet.has('Rs450+') && price>450){
        return true
    }

    return false
}


// Cart Actions --------------------------------------------------
let  cartProducts:fetchedProductsType[] = []
export const getCartsInfo = (productAdded:fetchedProductsType, toast:(value:string)=>any) => {
    let isProductExist = objectExists(productAdded, cartProducts)

    productAdded = {...productAdded, addedQuantity:1}
    if(isProductExist){
        toast('product already in cart')
    }else{
        cartProducts.push(productAdded)
    }
    return {
        type:ActionTypes.CART_DATA,
        payload: cartProducts
    }
}

export const deleteCartsInfo = (productDeleted:fetchedProductsType) => {

   cartProducts = cartProducts.filter(product => product.id !== productDeleted.id)
    return {
        type:ActionTypes.CART_DATA,
        payload:cartProducts
    }
}

export const changeQuantity = (productObj:fetchedProductsType, quantityAction:string) =>  {
  return{
        type:ActionTypes.CART_DATA_QUANTITY,
        payload:{productObj, quantityAction}
    }
}

const objectExists = (product:fetchedProductsType, cartArray:fetchedProductsType[]) => {
    for (let item of cartArray) {
        if (item.id === product.id) {
            return true;
        }
    }

    return false;
}

