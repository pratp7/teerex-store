import { Bars } from  'react-loader-spinner'
import './utilities.css'

const Loader = () => {
  return (
  <div className='loader-style'>
      <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
      />
</div>

  )
}

export default Loader