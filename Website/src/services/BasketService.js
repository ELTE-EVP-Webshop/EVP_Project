import axios from 'axios'

const API_URL = 'http://localhost:8080/api/user/';


const getBasketProduct = () => {
  return axios
    .get(API_URL + "getBasketProducts",
	{
        withCredentials: true
	})
    .then((response) => {
      
	//  console.log(response.data);

      return response.data;
    });
};

const addBasketProduct = (productid, c) => {
   return axios
  .post(API_URL + "addItemToBasket",
	{},
    {
		params: {
			productId: productid,
			count:c
		},
		withCredentials: true
    }
)
  .then((response) => {
    
  alert(response.data.message);

    return response;
  });
};

const removeBasketProduct = (productid) => {
  return axios
  .post(API_URL + "removeItemFromBasket",
	{},
    {
		params: {
			productId: productid
		},
		withCredentials: true
	}
)
  .then((response) => {
    
  alert(response.data.message);
   window.location.reload()
    return response;
  });
};

const updateBasketProduct = (productid, c) => {
  return axios
  .post(API_URL + "updateProductCountInBasket",
	{},
    {
		params: {
			productId: productid,
			newCount:c
		},
		withCredentials: true
    }
)
  .then((response) => {
    
  alert(response.data.message);
  window.location.reload()
    return response;
  });
}



const BasketService = {
  getBasketProduct,
  addBasketProduct,
  removeBasketProduct,
  updateBasketProduct
}

export default BasketService;