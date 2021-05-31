import axios from 'axios';

export const createProduct = async(authToken,title,description,price,quantity,brand,shipping,color,category,subCategory) => {

    return await axios.post(`${process.env.REACT_APP_DEFAULT}/admin/product`,{
        authToken: authToken,
        title,
        description,
        price,
        quantity,
        brand,
        shipping,
        color,
        category,
        subCategory
 });

};