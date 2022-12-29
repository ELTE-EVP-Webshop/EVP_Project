import axios from 'axios'

const API_URL = 'http://localhost:8080/api/user/';


const completeOrder = (phone, country, country2, city, street, housenumber, paymethod, deliverymethod) => {
  return axios
    .post(API_URL + "completeOrder",
    {},
    {
		params: {
            phone: phone,
            country:country,
            country_l:country2,
            city: city,
            street: street,
            house_number: housenumber,
            post_code: housenumber,
            post_other: housenumber,
            paymentMethod: paymethod,
            deliveryMethod: deliverymethod
		},
		withCredentials: true
    })
    .then((response) => {
      alert(response.data.message)
      window.location.assign("/")

      return response.data;
    });
};

const getDeliveryAddress = () => {
  return axios
  .get(API_URL + "getDeliveryAddress",
  {},
  {
  params: {
  },
  withCredentials: true
  })
  .then((response) => {
    //alert(response.data.message)
    //console.log(response.data)

    return response.data;
  });

}

const updateDeliveryAddress = ( phone, country, country_l,  city,  post_code, street,  house_number,  post_other) => {
  return axios
  .post(API_URL + "updateDeliveryAddress",
  {},
  {
  params: {
    phone : phone,
    country : country,
    country_l : country_l,
    city : city,
    post_code : post_code,
    street : street,
    house_number : house_number,
    post_other : post_other

  },
  withCredentials: true
  })
  .then((response) => {
    alert("Sikeres módosítás!")
    console.log(response.data)

    return response.data;
  });

}

const getOrders = () => {
  return axios
  .get(API_URL + "getOrders",
  {},
  {
  params: {
  },
  withCredentials: true
  })
  .then((response) => {
    alert(response.data.message)
    console.log(response.data)
   
    return response.data;
  });

}


const getOrderProducts = (orderId) => {
  return axios
  .get(API_URL + "getOrderProducts",
  {},
  {
  params: {
    orderId : orderId
  },
  withCredentials: true
  })
  .then((response) => {
    alert(response.data.message)
    console.log(response.data)
   
    return response.data;
  });

}


const PayService = {
completeOrder,
getDeliveryAddress,
updateDeliveryAddress,
getOrders,
getOrderProducts
}

export default PayService;