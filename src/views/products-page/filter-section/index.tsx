import React, {useState} from 'react'
import classes from '../index.module.css'
import FilterCheckBox from './filter-checkbox'
import { filterProductsWithCategories } from '../../../store/actions'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { filterType, colorArr, genderArr, priceArr, typeArr } from '../../../utils/datatypes'


const colorData = new Set<string>(['Red', 'Blue', 'Green', 'Black'])
const gender = new Set<string>(['Men', 'Women'])
const price = new Set<string>(['0-Rs250', 'Rs251-Rs450', 'Rs450+'])
const type = new Set<string>(['Polo', 'Hoodie', 'Basic'])


type Props = {
  toast:(value:string)=>any
}


const FilterSection = ({toast}:Props) => {
  const [selectedItems] = useState<filterType>({color:colorArr, gender:genderArr, price:priceArr, type:typeArr})
  const dispatch = useDispatch()
  const filteredFunc = bindActionCreators(filterProductsWithCategories, dispatch)

  const saveFilteredType = (value: string, filterType:string) => {
    if(colorData.has(value)){
      if(colorArr.has(value)) colorArr.delete(value)
      else colorArr.add(value)
    }else if (gender.has(value)){
      if(genderArr.has(value)) genderArr.delete(value)
      else genderArr.add(value)
    }else if (price.has(value)){
      if(priceArr.has(value)) priceArr.delete(value)
      else priceArr.add(value)
    }else if (type.has(value)) {
      if(typeArr.has(value)) typeArr.delete(value)
      else typeArr.add(value)
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