import axios from 'axios'

const PRODUCTS_REST_API_URL = 'http://localhost:8080/api/app/productsListing';
const PRODUCTS_REST_API_URL_ADMIN = 'http://localhost:8080/api/admin/';



    const getProducts = () => {
        return axios
          .get(PRODUCTS_REST_API_URL)

          .then((response) => {
            
          //  console.log(response.data);
      
            return response.data;
          });
      };
    
      const getVariations = () => {
        return axios
          .get(PRODUCTS_REST_API_URL_ADMIN + "getVariations")

          .then((response) => {
            
          //  console.log(response.data);
      
            return response.data;
          });
      };

      const getCategories = () => {
        return axios
        .get(PRODUCTS_REST_API_URL_ADMIN + "getCategories")

        .then((response) => {
          
        //  console.log(response.data);
    
          return response.data;
        });
      };

      const addProduct = (prodName, prodDesc, prodCategory, prodVariation, prodPrice, prodSalePrice, prodStock, prodImage, prodVisible) => {
        return axios
        .post(PRODUCTS_REST_API_URL_ADMIN + "insertNewProduct",
        {},
        {
        params: {
        
        },
        withCredentials: true
        })
        .then((response) => {
          alert(response.data.message)
      
    
          return response.data;
        });
      }



      const ProductService = {
        getProducts,
        getVariations,
        getCategories,
        addProduct
      }

      export default ProductService