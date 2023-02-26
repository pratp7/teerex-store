import React from 'react'
import classes from '../index.module.css'
import FilterCheckBox from './filter-checkbox'
import { filterProductsWithCategories } from '../../../store/actions'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { filterObjectSelector } from '../../../store/reducers/products'


const colorData = new Set<string>(['Red', 'Blue', 'Green', 'Black'])
const gender = new Set<string>(['Men', 'Women'])
const price = new Set<string>(['0-Rs250', 'Rs251-Rs450', 'Rs450+'])
const type = new Set<string>(['Polo', 'Hoodie', 'Basic'])


type Props = {
  toast:(value:string)=>any
}


const FilterSection = ({toast}:Props) => {
  const selectedItems = useSelector(filterObjectSelector)
  const dispatch = useDispatch()
  const filteredFunc = bindActionCreators(filterProductsWithCategories, dispatch)

  const saveFilteredType = (value: string) => {
    if(colorData.has(value)){
      if(selectedItems['color'].has(value)) selectedItems['color'].delete(value)
      else selectedItems['color'].add(value)
    }else if (gender.has(value)){
      if(selectedItems['gender'].has(value)) selectedItems['gender'].delete(value)
      else selectedItems['gender'].add(value)

    }else if (price.has(value)){
      if(selectedItems['price'].has(value)) selectedItems['price'].delete(value)
      else selectedItems['price'].add(value)

    }else if (type.has(value)) {
      if(selectedItems['type'].has(value)) selectedItems['type'].delete(value)
      else selectedItems['type'].add(value)
    }
    filteredFunc(selectedItems, toast)
  }

  return (
    <div className={classes['filter-section']}>
      <FilterCheckBox 
        filterType='Color' 
        checkboxes={colorData} 
        saveFilteredType={saveFilteredType}
        selectedItems={selectedItems}
       />
        <FilterCheckBox 
        filterType='Gender' 
        checkboxes={gender} 
        saveFilteredType={saveFilteredType}
        selectedItems={selectedItems}
       />
        <FilterCheckBox 
        filterType='Price' 
        checkboxes={price} 
        saveFilteredType={saveFilteredType}
        selectedItems={selectedItems}
       />
        <FilterCheckBox 
        filterType='Type' 
        checkboxes={type} 
        saveFilteredType={saveFilteredType}
        selectedItems={selectedItems}
       />
    </div>
  )
}

export default FilterSection