import { Link } from "react-router-dom";
import { useCart } from "../../context/cart";
import "./cart.css";

const SHIPPING_CHARGES = 98.63;
/**
 * Renders the cart page, which shows the items in the cart, their price, and total amount to pay.
 *
 * The component also provides a button to increase or decrease the quantity of each item in the cart.
 *
 * If the cart is empty, it renders a message saying "Cart is empty."
 *
 * @returns {JSX.Element} The cart page
 */
const Cart = () => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

    // Function to calculate the total price of items in the cart
    const calculateTotalPrice = () => {
        return cart.reduce((acc, item) => {
            const itemPrice = item.product.price * item.quantity;
            return acc + itemPrice;
        }, 0);
    };

    // Function to round numbers to specified decimals
    const round = (value, decimals) => {
        return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    };

    // Assuming a fixed conversion rate, for example: 1 USD = 60 INR
    const conversionRate =60;
    
    // Function to convert price from USD to INR
    const convertToRupees = (price) => {
        return (price * conversionRate).toFixed(2);
    };

    // Calculate total cart price in INR
    const totalCartPriceInRupees = round(calculateTotalPrice() * conversionRate, 2);

    // Determine shipping charges based on cart total
    const shippingCharges = totalCartPriceInRupees > 2000 ? 0 : SHIPPING_CHARGES;

    // Calculate total amount to pay in INR including shipping charges
    const totalInRupees = round(totalCartPriceInRupees + shippingCharges, 2);

    return (
        <div className="cartWrapper">
            <div className="container">
                {cart.length >= 1 ? (
                    <div className="grid my-5">
                        <div className="cartItem p-3">
                            <h2>Order Summary</h2>
                            {cart.map((item) => (
                                <div className="item" key={item.product.id}>
                                    <div className="grid py-3">
                                        <div className="itemImage">
                                            <img src={item.product.image} alt="" />
                                        </div>
                                        <div className="itemDesc">
                                            <div className="title">
                                                <Link to={"/product/" + item.product.id} className="titleLink">
                                                    {item.product.title}
                                                </Link>
                                            </div>
                                            <span className="price">&#8377;{convertToRupees(round(item.product.price,2))}</span>
                                        </div>
                                        <div className="itemControl flex">
                                            <div>
                                                <button
                                                    onClick={() => decreaseQuantity(item.product.id)}
                                                    disabled={item.quantity === 1}
                                                    className="removeQty"
                                                >
                                                    -
                                                </button>
                                                <span className="mx-1">{item.quantity}</span>
                                                <button
                                                    onClick={() => increaseQuantity(item.product.id)}
                                                    className="addQty"
                                                >
                                                    +
                                                </button>
                                                <div
                                                    className="remove my-1"
                                                    onClick={() => removeFromCart(item.product.id)}
                                                >
                                                    Remove
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="payment p-3">
                            <h2>Payment Summary</h2>
                            <div className="summary py-3 my-2">
                                <div className="flex py-1">
                                    <span>Subtotal:</span>
                                    <span className="price">&#8377;{totalCartPriceInRupees}</span>
                                </div>
                                <div className="flex py-1">
                                    <span>Shipping Fee:</span>
                                    <span className="price">&#8377;{shippingCharges}</span>
                                </div>
                                <div className="flex py-1">
                                    <span>Total:</span>
                                    <span className="price">&#8377;{totalInRupees}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="error">
                        <p>&#9432; Cart is empty</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
