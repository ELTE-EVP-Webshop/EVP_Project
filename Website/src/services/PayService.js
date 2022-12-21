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



const PayService = {
completeOrder
}

export default PayService;