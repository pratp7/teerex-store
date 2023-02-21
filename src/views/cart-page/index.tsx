import React from 'react'
import classes from './index.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { cartProductsSelector,totalPriceSelector } from '../../store/reducers/carts'
import '../../utils/utilities.css'
import { fetchedProductsType } from '../../utils/datatypes'
import { deleteCartsInfo, changeQuantity } from '../../store/actions'
import { bindActionCreators } from 'redux'
const CartPage = () => {
  const dispatch = useDispatch()
  const productsInCart:fetchedProductsType[] = useSelector(cartProductsSelector)
  const totalPrice:number = useSelector(totalPriceSelector)
  const changeQauntityFunc = bindActionCreators(changeQuantity, dispatch)
 

  if(!productsInCart.length){
    return <h2 className={classes['empty-cart-page']}>Cart Empty!! Please Add Items in Cart</h2>
  }

  const increaseQuantity = (product:fetchedProductsType) => {
    changeQauntityFunc(product, 'increase')
  }

  const decreaseQuantity = (product:fetchedProductsType) => {
    if(product.addedQuantity === 1){
      dispatch(deleteCartsInfo(product))
    }
    changeQauntityFunc(product, 'decrease')
  }

  const deleteItemFromCart = (deletedItem:fetchedProductsType) => {
    dispatch(deleteCartsInfo(deletedItem))
  }

  return (
    <div className={classes['cart-page']}>
      <header>
        <h2>Shopping Cart</h2>
      </header>
      <section className={classes['cart-list']}>
        {productsInCart.map(product => (
          <section key={product.id} className={classes['cart-Section']}>
            <div className={classes['cart-product-image']}><img src={product.imageURL} alt={product.name} /></div>
            <div>
              <h4>{product.name}</h4>
              <h5>Rs {product.price}</h5>
            </div>
            <div className={classes['buttons-section']}>
              <button className='action-button' onClick={()=> decreaseQuantity(product)}>-</button>
              <div>{product['addedQuantity']}</div>
              <button className='action-button' onClick={()=> increaseQuantity(product)} disabled={product.addedQuantity === product.quantity}>+</button> 
              <button className='action-button' onClick={() => deleteItemFromCart(product)}>Delete</button>
            </div>
          </section>
        ))}
        <div className={classes['hr-line']}></div>
      </section>
      <section className={classes['amount-section']}>
        <h2>Total amount </h2> 
        <p>Rs {totalPrice || 0}</p>
      </section>
    </div>
  )
}

export default CartPage