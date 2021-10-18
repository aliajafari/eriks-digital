import axios from 'axios';

export const getProducts = async () => {
    return await axios.get(`http://5c35e7f96fc11c0014d32fcd.mockapi.io/compare/products`);
}