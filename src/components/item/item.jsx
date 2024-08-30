import { Link } from "react-router-dom"

const Item = ({ data, addToCart }) => {
    const { id, image, title, price } = data

    // Assuming a fixed conversion rate, for example: 1 USD = 75 INR
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
                        ₹{priceInRupees}
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
