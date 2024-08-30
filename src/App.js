import { Routes, Route } from "react-router-dom"

import  NavBar from './components/navbar/navbar'
import  Products  from "./pages/products/products"
import  Product  from "./pages/product/product"
import  Cart  from "./pages/cart/cart"
import  NotFound  from "./pages/not-found/not-found"

import { useCart } from './context/cart'

function App() {

  const { cartItemCount } = useCart()
  
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
