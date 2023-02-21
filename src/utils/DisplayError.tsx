import React from 'react'
import './utilities.css'
import ErrorIcon from '@mui/icons-material/Error';

type Props = {
    errorMessage:string
}

const DisplayError = ({errorMessage}:Props) => {
  return (
    <div className='error-display'>
      <ErrorIcon/>
      {errorMessage}
    </div>
  )
}

export default DisplayError