import React from 'react'
import classes from '../index.module.css'
import { filterType } from '../../../utils/datatypes'
type Props = {
    filterType:string,
    checkboxes:Set<string>,
    saveFilteredType:(value:string) => void,
    selectedItems:filterType
}
const FilterCheckBox = ({filterType, checkboxes, saveFilteredType, selectedItems}:Props) => {

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
            onChange ={() =>  saveFilteredType(checkboxData)}
            />
            <span>{checkboxData}</span>
        </div>
        )}
        </div>
  </div>
  )
}

export default FilterCheckBox