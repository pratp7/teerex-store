import React from 'react'
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp'
import classes from './header.module.css'
import {useNavigate} from 'react-router-dom'
import '../../utils/utilities.css'
import { useSelector } from 'react-redux'
import { cartItemsSelector } from '../../store/reducers/carts'


const Header = () => {
  const itemsInCart = useSelector(cartItemsSelector)
  const navigate = useNavigate()
  const gotoProductsPage = () => {
    // navigate to products page
    navigate('/')
  }

  const gotoCartPage = () => {
    // navigate to carts page
    navigate('/cart-page')
  }
  return (
    <div className={classes['header-section']}>
      
        <header onClick={gotoProductsPage}>
            <h1>TeeRex Store</h1>          
        </header>
        <nav className={classes['nav-items']}>
            <button className={classes['product-button']} onClick={gotoProductsPage}>
              Products
              <div className={classes['under-line']}></div>
            </button>
           
            <div className={`action-button ${classes['cart-icon']}`} onClick={gotoCartPage}>
              <div className={classes['items-in-cart']}>{itemsInCart}</div>
              <ShoppingCartSharpIcon fontSize='medium'/>
            </div>
        </nav>
    </div>
  )
}

export default Header