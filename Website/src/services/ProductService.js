import axios from 'axios'

const PRODUCTS_REST_API_URL = 'http://localhost:8080/api/app/productsListing';




    const getProducts = () => {
        return axios
          .get(PRODUCTS_REST_API_URL)

          .then((response) => {
            
          //  console.log(response.data);
      
            return response.data;
          });
      };



      const ProductService = {
        getProducts
      }

      export default ProductService