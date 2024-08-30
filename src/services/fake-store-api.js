import axios from "axios";
const FakeStoreApi = {
    fetchAllProducts: async () => {
        const result = await axios.get('https://fakestoreapi.com/products');
        // console.log(result);
        
        return result.data;
    },
    fetchProductById: async (productId) => {
        const result = await axios.get(`https://fakestoreapi.com/products/${productId}`)
        return result.data;
    }
}

export { FakeStoreApi }