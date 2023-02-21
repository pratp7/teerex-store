import { combineReducers } from 'redux'
import productsReducer from './products'
import cartReducer from './carts'
const reducers = combineReducers({
  productsReducer,
  cartReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>