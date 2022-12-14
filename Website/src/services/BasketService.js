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

const BasketService = {
  getBasketProduct,
}

export default BasketService;