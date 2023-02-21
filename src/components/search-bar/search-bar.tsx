import classes from './search-bar.module.css'
import SearchIcon from '@mui/icons-material/Search';
import '../../utils/utilities.css'

type Props = {
  inputValue:string,
  searchBarHandler:(value:string)=> void,
  searchProducts:(value:string) => void,
  customClassName?: string
}

const SearchBar = ({inputValue, searchBarHandler, searchProducts, customClassName}:Props) => {

  const keyPressSearch = (key:string) => {
    if(key === 'Enter'){
      searchProducts(inputValue)
    }

  }

  return (
    <div className={`${classes['search-container']} ${customClassName}`}>
    <input
      type='text' placeholder='Search for Products...' className={classes['search-bar']}
      value={inputValue}
      onChange={(e)=>searchBarHandler(e.target.value)}
      onKeyPress={(e) => keyPressSearch(e.key)}
      />
      <div className='action-button' onClick={()=>searchProducts(inputValue)}>
        <SearchIcon />
     </div>
    </div>

  )
}

export default SearchBar