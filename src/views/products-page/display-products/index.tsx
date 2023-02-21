import React from 'react'
import classes from './index.module.css'
import '../../../utils/utilities.css'
import { fetchedProductsType } from '../../../utils/datatypes'
import { useDispatch } from 'react-redux'
import { getCartsInfo } from '../../../store/actions'

type Props = {
  productsList:fetchedProductsType[],
  toast:(value:string)=>any
}

const DisplayProducts = ({productsList, toast}:Props) => {
  const dispatch = useDispatch()
  const addToCartHandler = (productObject:fetchedProductsType) => {
    dispatch(getCartsInfo(productObject, toast))

  }

  return (
    <div className={classes['product-section']}>
     {productsList.map(productDetail => (
      <div key={productDetail.id} className={classes['product-card']}>
        <h3>{productDetail.name}</h3>
        <img src={productDetail.imageURL} alt={productDetail.name} />
        <div className={classes['product-price-action']}>
          <h4>Rs {productDetail.price}</h4>
          <button className='action-button' onClick={() => addToCartHandler(productDetail)}>Add To Cart</button>
        </div>
      </div>
     ))}
    </div>
  )
}

export default DisplayProducts