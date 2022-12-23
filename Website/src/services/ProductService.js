import axios from 'axios'

const PRODUCTS_REST_API_URL = 'http://localhost:8080/api/app/';
const PRODUCTS_REST_API_URL_ADMIN = 'http://localhost:8080/api/admin/';


// Get all products
    const getProducts = () => {
        return axios
          .get(PRODUCTS_REST_API_URL + "productsListing")

          .then((response) => {
            
          //  console.log(response.data);
      
            return response.data;
          });
      };
    // Get all variations
      const getVariations = () => {
        return axios
          .get(PRODUCTS_REST_API_URL_ADMIN + "getVariations")

          .then((response) => {
            
          //  console.log(response.data);
      
            return response.data;
          });
      };
// Get all categories
      const getCategories = () => {
        return axios
        .get(PRODUCTS_REST_API_URL + "categoriesListing")

        .then((response) => {
          
        //  console.log(response.data);
    
          return response.data;
        });
      };


    //  Admin feature : Product insert
      const addProduct = (prodName, prodDesc, prodCategoryId, prodCategoryName, prodVariationId, prodVariationName, prodPrice, prodSalePrice, prodStock, prodImage, prodVisible) => {
        var bodyFormData = new FormData();
      /*  var categories = [{a:a, b:b
        },{ 
        a:a2,
        b:b2
        }]*/
		const img = {
			url: prodImage,
			priority : 1
		};
		let imgArray = [];
		imgArray.push(img);
    bodyFormData.append('name', prodName);
    bodyFormData.append('description', prodDesc);
    bodyFormData.append('price', prodPrice);
    bodyFormData.append('salePrice', prodSalePrice);
    bodyFormData.append('stock', prodStock);
    bodyFormData.append('visible', prodVisible);
   
       // prodCatJSON = {"variation": prodCategoryId, "description": prodCategoryName}

       if(prodVariationName != "none") {
         // bodyFormData.append('variations', prodVariationId);
        //bodyFormData.append('variations', prodVariationName);
       }
       if(prodCategoryName != "none") {
        bodyFormData.append('categories', prodCategoryId);
        bodyFormData.append('categories', prodCategoryName);
       }

       if(prodImage != "Nincs") {
        bodyFormData.append('images',imgArray);
       } 

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
// Admin feature : Category creation
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

//Admin feature :Variation creation 

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
// Product add to category
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
// Category update
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
//Variation update
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
		{
		  params:{
			  filterText : filterText
		  }
		})
  .then((response) => {
    
    //console.log(response.data);
	
    return response.data;
  });
};

// findProductsByKeywordAny
const findProductsByKeywordAny = (filterText) => {
  return axios
  .get(PRODUCTS_REST_API_URL + "findProductsByKeywordAny",
      {
		  params:{
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
		{
		  params:{
			  keywordText : filterText
		  }
		})
  .then((response) => {
    
  //  console.log(response.data);

    return  response.data;
  });
};

// Find product by category id
const findProductsByCategory = (categoryId) => {
  return axios
  .get(PRODUCTS_REST_API_URL + "findProductsByCategory",
		{
		  params:{
			  categoryId : categoryId
		  }
		})
  .then((response) => {
    
  //  console.log(response.data);

    return  response.data;
  });
}


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
        findProductsByKeywordAll,
        findProductsByCategory
      }

      export default ProductService