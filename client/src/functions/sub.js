import axios from "axios";

export const getSubCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_DEFAULT}/subcategories`);
};


export const subCategory = async(slug) => {
    return await axios.get(`${process.env.REACT_APP_DEFAULT}/subcategory/${slug}`);
};

export const updateSubCategory = async(authToken,subCategory,id,slug) =>{

    return await axios.put(`${process.env.REACT_APP_DEFAULT}/admin/subcategory/${slug}`,{
        authToken: authToken,
        name: subCategory,
        id: id,
    });

};

export const deleteSubCategory = async(authToken,slug) =>{
   
    return await axios.post(`${process.env.REACT_APP_DEFAULT}/admin/subcategory/delete/${slug}`,{
        authToken: authToken,
    });

};

export const createSubCategory = async(authToken,subCategory,id) =>{

    return await axios.post(`${process.env.REACT_APP_DEFAULT}/admin/subcategory`,{
        authToken: authToken,
        name: subCategory,
        id: id
    });

};