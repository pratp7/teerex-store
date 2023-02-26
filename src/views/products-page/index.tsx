import React, {useEffect, useState} from 'react'
import SearchBar from '../../components/search-bar/search-bar'
import DisplayProducts from './display-products'
import FilterSection from './filter-section'
import classes from './index.module.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import '../../utils/utilities.css'
import { fetchProducts, matchingProductsWithSearchedData, setInputValue, isEmpty } from '../../store/actions'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { productsDataSelector, isLoadingSelector, isErrorSelector, filteredDataSelector, searchedInputSelector } from '../../store/reducers/products'
import Loader from '../../utils/Loader'
import DisplayError from '../../utils/DisplayError'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const ProductPage = () => {
    const dispatch = useDispatch()
    const fetchProductsFunc = bindActionCreators(fetchProducts, dispatch)
    const searchedProductsFunc = bindActionCreators(matchingProductsWithSearchedData, dispatch)

    const fetchedProducts = useSelector(productsDataSelector)
    const isLoadingState = useSelector(isLoadingSelector)
    const isError = useSelector(isErrorSelector)
    const filteredData = useSelector(filteredDataSelector)
    const inputValue = useSelector(searchedInputSelector)
    
    const [showFilterSection, setShowFilterSection] = useState(true)
 
    const searchBarHandler = (value:string) => {
        if(value === ''){
            searchedProductsFunc(value, toast)
        }
        dispatch(setInputValue(value))
    }

    const searchProducts = (value:string) => {
        if(fetchedProducts && fetchedProducts.length && inputValue.length) {
            searchedProductsFunc(value, toast)
        }
    }

    const toggleShowFilterSection = () => {
        setShowFilterSection(!showFilterSection)
    }

    useEffect(()=> {
        fetchProductsFunc() 
         
    },[])

    useEffect(()=> {
        function handleResize() {
            if(window.innerWidth<=600){
                setShowFilterSection(false)
            }else{
                setShowFilterSection(true)
            }
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    if(isError) {
        return <DisplayError errorMessage={isError}/>
    }

  return (
    <>
    <ToastContainer position="top-right"
        autoClose={50}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
    />
    {!isError && isLoadingState ? <Loader/> : <div>
       <section className={classes['genre-panel']}>
            <SearchBar inputValue={inputValue} 
                searchBarHandler={searchBarHandler} 
                searchProducts={searchProducts}
                customClassName={classes['search-bar-layout']}
            />
          <div className={`action-button ${classes['show-Filter-button']}`} onClick={toggleShowFilterSection}><FilterAltIcon/></div> 
       </section>
       <div className={classes['product-lisitng']}>
        {showFilterSection && <FilterSection toast={toast} />}
        <DisplayProducts productsList={filteredData} toast={toast}/>
       </div>
    </div> }
    </>
  )
}

export default ProductPage