import axios from 'axios';
import { Dispatch } from 'redux'
import {ActionTypes, Action} from './actionTypes'
import { fetchedProductsType, filterType } from '../../utils/datatypes';
// fetch products
export const fetchProducts = () => async(dispatch:Dispatch<Action>) => {
    // make the api call
    dispatch({
        type:ActionTypes.IS_LOADING
    })
    try {
        // setting localStorage to minimise api calls 
        // if(!localStorage.getItem('products')){
        //     const listOfProducts = await axios.get(process.env.REACT_APP_FETCH_PRODUCTS_API as string)
        //     localStorage.setItem('products', JSON.stringify(listOfProducts?.data))
        // }

        // let list = JSON.parse(localStorage.getItem('products') || '[]')

        // setTimeout(()=> {
        //     localStorage.removeItem('products')
        // }, 1000000)
        
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

export const matchingProductsWithSearchedData = (value:string, setInputValue:any, toast:(value:string)=>any) => (dispatch:Dispatch<Action>, getState: () => any ) => {
    const valueChangedToLowercase = value.toLowerCase()
    const fetchedProducts:fetchedProductsType[] = getState().productsReducer['productsData']
    let tempFilteredArray:fetchedProductsType[] = getState().productsReducer['filteredProducts']
    if(!tempFilteredArray.length){
        tempFilteredArray = [...fetchedProducts]
    }
    const filteredData:fetchedProductsType[] = tempFilteredArray.filter(product=> (
        product.name.toLowerCase().includes(valueChangedToLowercase) || 
        product.color.toLowerCase().includes(valueChangedToLowercase) || 
        product.type.toLowerCase().includes(valueChangedToLowercase)
    ))
    if(!filteredData.length && setInputValue){
       toast('Displaying All Products')
        setInputValue('')
    } 
      dispatch({
        type:ActionTypes.FILTERED_DATA,
        payload: filteredData
    })
}

export const filterProductsWithCategories = (checkedItems:filterType, toast:(value:string)=>any) => (dispatch:Dispatch<Action>, getState: () => any) => {
   
    let  filteredData:fetchedProductsType[] = []
    const fetchedProducts:fetchedProductsType[] = getState().productsReducer['productsData']
    filteredData = fetchedProducts.filter(product => {
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
          return true
        
    }) 

    if(!filteredData.length){
        toast('Displaying All Products')  
     } 

    dispatch({
        type:ActionTypes.FILTERED_DATA,
        payload: filteredData
    })
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