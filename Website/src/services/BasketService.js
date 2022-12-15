import axios from 'axios'

const API_URL = 'http://localhost:8080/api/user/';


const getBasketProduct = () => {
  return axios
    .get(API_URL + "getBasketProducts",
	{
        withCredentials: true
	})
    .then((response) => {
      
	  console.log(response.data);

      return response;
    });
};

const addBasketProduct = (productid, c) => {
   return axios
  .post(API_URL + "addItemToBasket",
  
    {
      
    },

    {
      withCredentials: true
    },

    {
      params : {
      Productid: productid,
      Count:c
    }
  }
      
)
  .then((response) => {
    
  console.log(response.data);

    return response;
  });
};


const BasketService = {
  getBasketProduct,
  addBasketProduct
}

export default BasketService;