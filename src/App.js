import { Routes, Route } from "react-router-dom"

import  NavBar from './components/navbar/navbar'
import  Products  from "./pages/products/products"
import  Product  from "./pages/product/product"
import  Cart  from "./pages/cart/cart"
import  NotFound  from "./pages/not-found/not-found"

import { useCart } from './context/cart'

/**
 * App component renders the navigation bar and all the routes
 * available in the application
 * 
 * @returns {JSX.Element}
 */
function App() {

  const { cartItemCount } = useCart() //custom hook for cart item count
  
  return (
    <>
      <NavBar  cartItemCount={cartItemCount()} />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
