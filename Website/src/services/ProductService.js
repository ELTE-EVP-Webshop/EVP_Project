import axios from 'axios'
import prodImgClass from '../components/prodImgClass'

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
      const addProduct = (prodName, prodDesc, catInfo, varInfo, prodPrice, prodSalePrice, prodStock, prodImage, prodVisible) => {
        var bodyFormData = new FormData();
      /*  var categories = [{a:a, b:b
        },{ 
        a:a2,
        b:b2
        }]*/

    bodyFormData.append('name', prodName);
    bodyFormData.append('description', prodDesc);
    bodyFormData.append('price', prodPrice);
    bodyFormData.append('salePrice', prodSalePrice);
    bodyFormData.append('stock', prodStock);
    bodyFormData.append('visible', prodVisible);
   
       // prodCatJSON = {"variation": prodCategoryId, "description": prodCategoryName}

       if(varInfo.length > 0) {
         // bodyFormData.append('variations', prodVariationId);
        //bodyFormData.append('variations', prodVariationName);
        bodyFormData.append('variation', varInfo)
          }

       if(catInfo.length > 0) {
        console.log(catInfo)
        bodyFormData.append('categories',JSON.stringify(catInfo));
       }



       const images = [];
        var lines = prodImage.split('\n');
        for(var i = 0;i < lines.length;i++){
          if(lines[i].includes(";"))
            images.push(new prodImgClass(lines[i].split(';')[0], lines[i].split(';')[1]));
        }

        bodyFormData.append('images', JSON.stringify(images));

        console.log(bodyFormData);

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
// Admin feature : Update product

const updateProduct = (productId,prodName, prodDesc, prodPrice, prodSalePrice, prodStock, prodImage) => {
  var bodyFormData = new FormData();


bodyFormData.append('name', prodName);
bodyFormData.append('description', prodDesc);
bodyFormData.append('price', prodPrice);
bodyFormData.append('salePrice', prodSalePrice);
bodyFormData.append('stock', prodStock);
bodyFormData.append('visible', true);

   // prodCatJSON = {"variation": prodCategoryId, "description": prodCategoryName}

  {/* if(prodVariationName != "none") {
     // bodyFormData.append('variations', prodVariationId);
    //bodyFormData.append('variations', prodVariationName);
   }
   if(prodCategoryName != "none") {
    bodyFormData.append('categories', prodCategoryId);
    bodyFormData.append('categories', prodCategoryName);
   }

   if(prodImage != "Nincs") {
    bodyFormData.append('images',imgArray);
   } */}
   const images = [];
   var lines = prodImage.split('\n');
   for(var i = 0;i < lines.length;i++){
     if(lines[i].includes(";"))
       images.push(new prodImgClass(lines[i].split(';')[0], lines[i].split(';')[1]));
   }

   bodyFormData.append('images', JSON.stringify(images));
  return axios({
      method: "post",
      url: PRODUCTS_REST_API_URL_ADMIN + "updateProduct",
      data: bodyFormData,
      headers: { 'Content-Type': 'application/json' },
      params: {
        productId : productId
      },
      withCredentials: true
    })
      .then(function (response) {
        //handle success
        //console.log(response);
        alert("Sikeres módosítás")
        window.location.assign("/admin")
      })
      .catch(function (response) {
        //handle error
        alert("Hiba lépett fel a módosítás során!")
        window.location.assign("/admin")
      });

 
}


  
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
		  },
      withCredentials: true
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

    return response.data;
  });
}

// getAllOrder
const getAllOrder = () => { 
  return axios
  .get(PRODUCTS_REST_API_URL_ADMIN + "getAllOrder",
  {},
		{
		  params:{
			 // categoryId : categoryId
		  },
      withCredentials: true
		})
  .then((response) => {
    
    console.log(response.data);

    return  response.data;
  });
}

// updateOrderState

const updateOrderState = (orderId, newState) => {
  return axios
  .post(PRODUCTS_REST_API_URL_ADMIN + "updateOrderState",
  {},
  {
    params: {
      orderId: orderId,
      newState : newState
    },
    withCredentials: true
  })
  .then((response) => {
    alert(response.data.message)
    window.location.assign("/admin")
    return response.data;
  });
}

// getUsers

const getUsers = () => { 
  return axios
  .get(PRODUCTS_REST_API_URL_ADMIN + "getUsers",
  {},
		{
		  params:{

		  },
      withCredentials: true
		})
  .then((response) => {
    
    console.log(response.data);

    return  response.data;
  });
}

// updateAdminRights

const updateAdminRights = (userId, rolesJson) => {
  var bodyFormData = new FormData();


  bodyFormData.append('userId', userId);
  const rolesJsonArray = [];
  rolesJsonArray.push(rolesJson)

  return axios({
    method: "post",
    url: PRODUCTS_REST_API_URL_ADMIN + "updateAdminRights",
    data: bodyFormData,
    headers: { 'Content-Type': 'application/json' },
    params: {
      userId: userId,
      rolesJson : JSON.stringify(rolesJsonArray)
    },
    withCredentials: true
  })
    .then(function (response) {
      //handle success
      //console.log(response);
      alert("Sikeres módosítás")
      window.location.assign("/admin")
    })
    .catch(function (response) {
      //handle error
      alert("Hiba lépett fel a módosítás során!")
      window.location.assign("/admin")
    });



}

// getProductById

const getProductById = (prodId) => {
  return axios
  .get(PRODUCTS_REST_API_URL + "getProductById",
		{
		  params:{
			  prodId : prodId
		  }
		})
  .then((response) => {
    
  //  console.log(response.data);

    return response.data;
  });
}

// removeProductFromCategory

const removeProductFromCategory = (prodId, catId) => {
  return axios
  .delete(PRODUCTS_REST_API_URL_ADMIN + "removeProductFromCategory",
		{
		  params:{
			  prodId : prodId,
        catId : catId
		  }
		})
  .then((response) => {
    
  //  console.log(response.data);

    return response.data;
  });
}

const addProductToVariation = ( prodId,  varId, desc) => {
  return axios
  .post(PRODUCTS_REST_API_URL_ADMIN + "addProductToVariation",
  {},
		{
		  params:{
			  prodId : prodId,
        varId : varId,
        desc : desc
		  }
		})
  .then((response) => {
    
  //  console.log(response.data);

    return response.data;
  });
}

const removeProductFromVariation = ( prodId,  varId) => {
  return axios
  .delete(PRODUCTS_REST_API_URL_ADMIN + "removeProductFromVariation",
		{
		  params:{
			  prodId : prodId,
        varId : varId,
		  }
		})
  .then((response) => {
    
  //  console.log(response.data);

    return response.data;
  });
}


      const ProductService = {
        getProducts,
        getProductById,
        getVariations,
        getCategories,
        addProduct,
        updateProduct,
        getUsers,
        updateAdminRights,
        getAllOrder,
        updateOrderState,
        createCategory,
        createVariation,
        addProductToCategory,
        addProductToVariation,
        updateCategory,
        updateVariation,
        findProductsByFilterText,
        findProductsByKeywordAny,
        findProductsByKeywordAll,
        findProductsByCategory,
        removeProductFromCategory,
        removeProductFromVariation
      }

      export default ProductService