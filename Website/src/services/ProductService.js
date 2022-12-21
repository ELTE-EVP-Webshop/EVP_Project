import axios from 'axios'

const PRODUCTS_REST_API_URL = 'http://localhost:8080/api/app/';
const PRODUCTS_REST_API_URL_ADMIN = 'http://localhost:8080/api/admin/';



    const getProducts = () => {
        return axios
          .get(PRODUCTS_REST_API_URL + "productsListing")

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
        .get(PRODUCTS_REST_API_URL + "categoriesListing")

        .then((response) => {
          
        //  console.log(response.data);
    
          return response.data;
        });
      };

    /*  const addProduct = (prodName, prodDesc, prodCategoryId, prodCategoryName, prodVariationId, prodVariationName, prodPrice, prodSalePrice, prodStock, prodImage, prodVisible) => {
        return axios
        .post(PRODUCTS_REST_API_URL_ADMIN + "insertNewProduct",
        {},
        {
        params: {
          name: prodName,
          description: prodDesc,
          price: prodPrice,
          salePrice: prodSalePrice,
          stock: prodStock,
          visible: prodVisible,
          categories: [prodCategoryId, prodCategoryName],
          variations: [prodVariationId, prodVariationName],
          images: [prodImage]

        },
        withCredentials: true
        })
        .then((response) => {
          alert(response.data.message)
      
    
          return response.data;
        });
      }*/

      const addProduct = (prodName, prodDesc, prodCategoryId, prodCategoryName, prodVariationId, prodVariationName, prodPrice, prodSalePrice, prodStock, prodImage, prodVisible) => {
        var bodyFormData = new FormData();
      /*  var categories = [{a:a, b:b
        },{ 
        a:a2,
        b:b2
        }]*/
       var image = {"images": [{"url": prodImage,"priority": 1}]}
       // prodCatJSON = {"variation": prodCategoryId, "description": prodCategoryName}
        bodyFormData.append('name', prodName);
        bodyFormData.append('description', prodDesc);
        bodyFormData.append('price', prodPrice);
        bodyFormData.append('salePrice', prodSalePrice);
        bodyFormData.append('stock', prodStock);
        bodyFormData.append('visible', prodVisible);
        bodyFormData.append('categories', prodCategoryId);
        bodyFormData.append('categories', prodCategoryName);
       // bodyFormData.append('variations', prodVariationId);
        //bodyFormData.append('variations', prodVariationName);
        bodyFormData.append('images',image);

      return axios({
          method: "post",
          url: PRODUCTS_REST_API_URL_ADMIN + "insertNewProduct",
          data: bodyFormData,
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })
          .then(function (response) {
            //handle success
            console.log(response);
            alert(response.data.message)
          })
          .catch(function (response) {
            //handle error
            console.log(response);
          });
      };

      const createCategory = (category, smallDesc, priority) => {
        return axios
        .post(PRODUCTS_REST_API_URL_ADMIN + "createCategory",
        {},
        {
          params: {
            category: category,
            smallDesc: smallDesc,
            piority: priority
          },
          withCredentials: true
        })
        .then((response) => {
          alert(response.data.message)

          return response.data;
        });

       
      }



      const createVariation = (variation) => {
        return axios
        .post(PRODUCTS_REST_API_URL_ADMIN + "createVariation",
        {},
        {
          params: {
            variation: variation
          },
          withCredentials: true
        })
        .then((response) => {
          alert(response.data.message)

          return response.data;
        });
      }

        const addProductToCategory = (prodId, catId) => {
          return axios
          .post(PRODUCTS_REST_API_URL_ADMIN + "addProductToCategory",
          {},
          {
            params: {
              prodId: prodId,
              catId : catId
            },
            withCredentials: true
          })
          .then((response) => {
            alert(response.data.message)
  
            return response.data;
          });

        }

        const updateCategory = (id, category, smallDesc,  priority) => {
          return axios
          .post(PRODUCTS_REST_API_URL_ADMIN + "updateCategory",
          {},
          {
            params: {
              id: id,
              category : category,
              smallDesc : smallDesc,
              priority : priority
            },
            withCredentials: true
          })
          .then((response) => {
            alert(response.data.message)
  
            return response.data;
          });
        }

        const updateVariation = (id, variation) => {
          return axios
          .post(PRODUCTS_REST_API_URL_ADMIN + "updateVariation",
          {},
          {
            params: {
              id: id,
              variation : variation
            },
            withCredentials: true
          })
          .then((response) => {
            alert(response.data.message)
  
            return response.data;
          });
        }

        //Searches
//findProductsByFilterText
const findProductsByFilterText = (filterText) => {
  return axios
  .get(PRODUCTS_REST_API_URL + "findProductsByFilterText",
      {},
          {
            body: {
              filterText : filterText
            }

          })
  .then((response) => {
    
  //  console.log(response.data);

    return response.data;
  });
};

// findProductsByKeywordAny
const findProductsByKeywordAny = (filterText) => {
  return axios
  .get(PRODUCTS_REST_API_URL + "findProductsByKeywordAny",
      {},
          {
            body: {
              keywordText : filterText
            }

          })
  .then((response) => {
    
  //  console.log(response.data);

    return response.data;
  });
};

// findProductsByKeywordAll
 const findProductsByKeywordAll = (filterText) => {
   return axios
  .get(PRODUCTS_REST_API_URL + "findProductsByKeywordAll",
      {},
          {
            body: {
              keywordText : filterText
            }

          })
  .then((response) => {
    
  //  console.log(response.data);

    return  response.data;
  });
};


      const ProductService = {
        getProducts,
        getVariations,
        getCategories,
        addProduct,
        createCategory,
        createVariation,
        addProductToCategory,
        updateCategory,
        updateVariation,
        findProductsByFilterText,
        findProductsByKeywordAny,
        findProductsByKeywordAll
      }

      export default ProductService