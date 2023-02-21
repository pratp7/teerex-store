import React from 'react'
import classes from '../index.module.css'
import { filterType } from '../../../utils/datatypes'
type Props = {
    filterType:string,
    checkboxes:Set<string>,
    saveFilteredType:(value:string, type:string) => void,
    selectedItems:filterType
}
const FilterCheckBox = ({filterType, checkboxes, saveFilteredType, selectedItems}:Props) => {
    // const [checkboxSelected, setCheckBoxSelected] = useState(new Set<string>())

    const handleOnChangeChecked = (value:string) => {

      // setCheckBoxSelected((prevSet:Set<string>) => {
      //   const newSet = new Set<string>(prevSet)
      //   if(newSet.has(value)){
      //       newSet.delete(value)
      //   }else{
      //       newSet.add(value)
      //   }
      //   return newSet
      //  })
       saveFilteredType(value, filterType)
      
    }
  return (
    <div>
        <h3>{filterType}</h3>
        <div>
        {Array.from(checkboxes).map((checkboxData, index) => <div key={index} className={classes['checkbox-area']}>
        <input 
            type="checkbox" 
            id={checkboxData} 
            name={checkboxData} 
            value={checkboxData}
            checked = {selectedItems[filterType.toLowerCase()]?.has(checkboxData)?true:false}
            onChange ={() => handleOnChangeChecked(checkboxData)}
            />
            <span>{checkboxData}</span>
        </div>
        )}
        </div>
  </div>
  )
}

export default FilterCheckBox