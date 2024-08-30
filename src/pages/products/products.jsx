import { useEffect, useState } from "react"
import { FakeStoreApi } from '../../services/fake-store-api'
import  Item  from "../../components/item/item"
import { useCart } from "../../context/cart"

/**
 * Component that renders a list of products from the Fake Store API.
 *
 * It fetches all products from the Fake Store API using the useEffect hook
 * and sets the 'products' state with the response. It also sets the 'loading'
 * state to false when the data is fetched.
 *
 * The component renders a grid of products, with each product being an Item component.
 * If the data is still being fetched, it renders a loader instead.
 *
 * @returns {JSX.Element} The component
 */
const Products = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart()


     /**
     * Fetches all products from the Fake Store API, sets the 'products' state with the response
     * and sets the 'loading' state to false.
     *
     * @returns {Promise<void>}
     */
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const products =await FakeStoreApi.fetchAllProducts();
            setProducts(products);
            setLoading(false);
        }
        /*
        if any error occurs catch that error and print it in the console
         */
        fetchProducts().catch(console.error)
    }, [])

    return (
        <>
            <div className="container">
                <div className="products my-5">
                    <div className="grid">
                        {loading ? (
                            <div className="loader" ></div>
                        ) : (
                            products.map((product) => (
                                <Item key={product.id} data={product} addToCart={() => addToCart(product)} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products;
