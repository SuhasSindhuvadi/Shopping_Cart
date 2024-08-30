import { Link } from "react-router-dom"

const NavBar = ({ cartItemCount }) => {

    return (
        <div className="wrapper">
            <header className="container">
                <div className="header py-2">
                    <div className="grid">
                        <Link to="/" className="link">
                            <h1 className="brand">Easy-Cart</h1>
                        </Link>
                        <Link to="/cart" className="link headerCart">
                            <img className="cartImg" src="/cart.svg" alt="cart" />
                            {cartItemCount > 0 && (
                                <div className="cartCounter">{cartItemCount <= 9 ? cartItemCount : "9+"}</div>
                            )}
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default NavBar