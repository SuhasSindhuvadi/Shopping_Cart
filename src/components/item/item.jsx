import { Link } from "react-router-dom"

/**
 * Renders a single product item in a list of products.
 *
 * The component renders a grid with three columns. The first column
 * contains the product image, the second column contains the product
 * title, and the third column contains two elements: the product price
 * and a button to add the product to the cart. The product price is
 * converted to rupees using a fixed conversion rate, and the button
 * triggers the `addToCart` callback function when clicked.
 *
 * @param {{ data: { id: string, image: string, title: string, price: number }, addToCart: () => void }} props
 * @returns {JSX.Element}
 */
const Item = ({ data, addToCart }) => {
    const { id, image, title, price } = data

    // Assuming a fixed conversion rate, for example: 1 USD = 60 INR
    const conversionRate = 60;
    const priceInRupees = (price * conversionRate).toFixed(2);

    return (
        <div className="card">
            <div className="grid">
                <div className="image">
                    <img src={image} alt="" />
                </div>
                <div className="title">
                    <Link to={`/product/${id}`} className="link titleLink">
                        {title}
                    </Link>
                </div>
                <div className="flex">
                    <span className="price" style={{ marginRight: 15 }}>
                    &#8377;{priceInRupees}
                    </span>
                    <div className="cart" onClick={addToCart}>
                        <img className="cartImg" src="/cart.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item
