import { createContext, useContext, useState } from "react"

const initialState = {
    cart: [],
    cartItemCount: () => 0,
    addToCart: () => null,
    removeFromCart: () => null,
    increaseQuantity: () => null,
    decreaseQuantity: () => null,
}

const CartContext = createContext(initialState)

const useCart = () => useContext(CartContext)

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(initialState.cart)

    /**
     * Returns the total number of items in the cart
     * @return {Number} The total number of items in the cart
     */
    const cartItemCount = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0)
    }

    /**
     * Adds a product to the cart or increases the quantity of the product if it already exists
     * @param {Object} product - The product object to add to the cart
     */
    const addToCart = (product) => {
        const productIdx = cart.findIndex((item) => item.product.id === product.id)
        if (productIdx !== -1) {
            increaseQuantity(product.id)
        } else {
            setCart([...cart, { product, quantity: 1 }])
        }
    }
    /**
     * Removes a product from the cart by its id
     * @param {Number} productId - The id of the product to remove
     */
    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.product.id !== productId))
    }
    /**
     * Increases the quantity of the product with the given id in the cart
     * @param {Number} productId - The id of the product to increase the quantity of
     */
    const increaseQuantity = (productId) => {
        const copy = [...cart]
        const productIdx = copy.findIndex((item) => item.product.id === productId)
        if (productIdx !== -1) {
            copy[productIdx].quantity += 1
            setCart(copy)
        }
    }

    /**
     * Decreases the quantity of the product with the given id in the cart
     * @param {Number} productId - The id of the product to decrease the quantity of
     * @returns {void}
     */

    /**
     * Decreases the quantity of the product with the given id in the cart
     * If the quantity of the product is more than 1, it decreases the quantity by 1
     * @param {Number} productId - The id of the product to decrease the quantity of
     * @returns {void}
     */
    const decreaseQuantity = (productId) => {
        const copy = [...cart]
        const productIdx = copy.findIndex((item) => item.product.id === productId)
        if (productIdx !== -1 && copy[productIdx].quantity > 1) {
            copy[productIdx].quantity -= 1
            setCart(copy)
        }
    }

    return (
        <CartContext.Provider
            value={{ cart, cartItemCount, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}
        >
            {children}
        </CartContext.Provider>
    )
}

export { useCart, CartProvider }
