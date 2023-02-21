import { RootState } from '.'
import { ActionTypes, Action } from '../actions/actionTypes'
import { fetchedProductsType, filterType } from '../../utils/datatypes'

type InitialState = {
    isLoading:boolean,
    productsData: fetchedProductsType[],
    error:string,
    filteredProducts: fetchedProductsType[],
    // searchFilteredProducts: fetchedProductsType[],
    // searchedInput:string,
    // filteredInput:filterType


}

const initalState:InitialState = {
    isLoading:false,
    productsData: [],
    error: '',
    filteredProducts:[],
    // searchFilteredProducts:[],
    // searchedInput:'',
    // filteredInput:{color:new Set<string>, gender:new Set<string>, price:new Set<string>, type:new Set<string>}
}



const productsReducer = (state=initalState, action:Action) => {
    switch(action.type){
       case ActionTypes.FETCH_PRODUCTS:
         return {
            ...state,
            isLoading:false,
            productsData: action.payload,
            filteredProducts:[]
         }
        case ActionTypes.IS_LOADING:
            return {
                ...state,
                isLoading:true
            }
        case ActionTypes.IS_ERROR:
            return {
                ...state,
                isLoading:false,
                error: action.payload
            }
        case ActionTypes.FILTERED_DATA:
            return {
                ...state,
                filteredProducts: action.payload
                }
        default:
            return state
    }
    
}


// selectors

export const productsDataSelector = (state:RootState) => state.productsReducer['productsData']
export const filteredDataSelector = (state:RootState) => state.productsReducer['filteredProducts']
// export const searchFilteredDataSelector = (state:RootState) => state.productsReducer['searchFilteredProducts']
export const isLoadingSelector = (state:RootState) => state.productsReducer['isLoading']
export const isErrorSelector = (state:RootState) => state.productsReducer['error']
// export const searchedInputSelector = (state:RootState) => state.productsReducer['searchedInput']


export default productsReducer