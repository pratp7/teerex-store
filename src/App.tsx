import Header from './components/header/header';
import ProductPage from './views/products-page';
import CartPage from './views/cart-page';
import {Routes, Route, Navigate} from 'react-router-dom'

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<ProductPage/>}/>
        <Route path='/cart-page' element={<CartPage/>}/>
        <Route path="*" element={<Navigate to='/' replace />}/>
      </Routes>
    </div>
  );
}

export default App;
