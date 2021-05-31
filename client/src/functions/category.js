import axios from "axios";

export const getCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_DEFAULT}/categories`);
};


export const category = async(slug) => {
    return await axios.get(`${process.env.REACT_APP_DEFAULT}/category/${slug}`);
};

export const updateCategory = async(authToken,category,slug) =>{

    return await axios.put(`${process.env.REACT_APP_DEFAULT}/admin/category/${slug}`,{
        authToken: authToken,
        name: category
    });

};

export const deleteCategory = async(authToken,slug) =>{
    console.log("Delete authToken:",authToken)
    console.log("SLUG:",slug)
    return await axios.post(`${process.env.REACT_APP_DEFAULT}/admin/category/delete/${slug}`,{
        authToken: authToken,
    });

};

export const createCategory = async(authToken,category) =>{

    return await axios.post(`${process.env.REACT_APP_DEFAULT}/admin/category`,{
        authToken: authToken,
        name: category
    });

};