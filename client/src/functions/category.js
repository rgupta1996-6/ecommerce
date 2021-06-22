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



export const createDeviceType = async(name,desc) =>{

    return await axios.post(`${process.env.REACT_APP_DEFAULT}/device`,{
        id: name,
        description: desc
    });

};

export const createDestination = async(name,bucket) =>{

    return await axios.post(`${process.env.REACT_APP_DEFAULT}/destinations/60c1f194654caf000a146adc`,{
        type: "cloudant",
        name: name,
        configuration : {
      bucketInterval: bucket
    }
    });

};

export const getDeviceType = async () => {
    return await axios.get(`${process.env.REACT_APP_DEFAULT}/devicetypes`);
  };

  export const getDestinations = async () => {
    return await axios.get(`${process.env.REACT_APP_DEFAULT}/destinations/60c1f194654caf000a146adc`);
  };

  export const createForwardRule = async(name,destination,device,eventID) =>{

    return await axios.post(`${process.env.REACT_APP_DEFAULT}/forwardrules/60c1f194654caf000a146adc`,{
        name: name,
        destinationName: destination,
        type: "event",
        selector: {
          deviceType: device,
          eventId: eventID
        }
    });

};