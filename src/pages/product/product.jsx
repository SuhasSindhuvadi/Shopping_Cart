import './product.css';
import { useEffect, useState } from "react";
import { FakeStoreApi } from '../../services/fake-store-api';
import { Link, useParams } from "react-router-dom";
import { useCart } from "../../context/cart";

/**
 * Component that renders a single product from the Fake Store API.
 *
 * It fetches a single product from the Fake Store API using the useEffect hook
 * and sets the 'product' state with the response. It also sets the 'loading'
 * state to false when the data is fetched.
 *
 * The component renders a card with the product image, title, description, price
 * and a button to add the product to the cart. If the data is still being fetched,
 * it renders a loader instead. If the product is not found, it renders a message
 * to visit the home page.
 *
 * @returns {JSX.Element} The component
 */
const Product = () => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const { productId } = useParams();
    const { addToCart } = useCart();

    useEffect(() => {
        /**
         * Fetches a single product from the Fake Store API, sets the 'product' state with the response
         * and sets the 'loading' state to false.
         *
         * @returns {Promise<void>}
         */
        const fetchProduct = async () => {
            console.log(productId);
            
            setLoading(true);
            try {
                const product = await FakeStoreApi.fetchProductById(productId);
                setProduct(product);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    if (!loading && !product) {
        return (
            <div className="container">
                <div className="product py-2">
                    <div className="details p-3">
                        Product not found. Please visit{" "}
                        <Link to="/" replace>
                            home
                        </Link>{" "}
                        to see all available products
                    </div>
                </div>
            </div>
        );
    }

    // Function to convert price to rupees
    const convertToRupees = (price) => {
        const conversionRate = 60; 
        // Example conversion rate: 1 USD = 60 INR
        return (price * conversionRate).toFixed(2);
    };

    return (
        <div className="container">
            {loading ? (
                <div className={"loader"}></div>
            ) : (
                <div className="product py-2">
                    <div className="details grid p-3">
                        <div className="product-image">
                            <img src={product.image} alt="" />
                        </div>
                        <div className="info">
                            <div className="description">
                                <h3>{product.title}</h3>
                                <p className="my-2">{product.description}</p>
                            </div>
                            <div className="flex">
                                <span className="price">&#8377;{convertToRupees(product.price)}</span>
                                <span className="cart" onClick={() => addToCart(product)}>
                                    <img src="/cart.svg" alt="Add to Cart" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;
