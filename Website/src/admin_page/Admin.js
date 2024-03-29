import React, {useState, useEffect} from 'react'
import {user} from '../main_page/Header'
import ProductService from '../services/ProductService';


export default function ShoppingCart() {
  //Visibility of administrative features
  const [productVisible, setProductVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [productVariationVisible, setProductVariationVisible] = useState(false);
  const [categories, setCategoriesVisible] = useState(false);
  const [variations, setVariationsVisible] = useState(false);
  const [productToCategoryVisible, setProductToCategoryVisible] = useState(false)
  const [productToVariationVisible, setProductToVariationVisible] = useState(false)
  const [availableVariations, setAvailableVariations] = useState()
  const [availableCategories, setAvailableCategories] = useState()
  const [availableProducts, setAvailableProducts] = useState()
  const [loading, setLoading] = useState(true)
  //Form values (Getters & Setters)
  //Product
  const [prodId, setProdId] = useState(2)
  const [productbyId, setProductById] = useState(0)
  const [OtherProdInfoVisible, setOtherProdInfoVisible] = useState(false)
  const [prodName, setProdName] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [availCatId, setAvailCatId] = useState(1);
  const [availCatName, setAvailCatName] = useState("none");
  const [availVarId, setAvailVarId] = useState(1);
  const [availVarName, setAvailVarName] = useState("none");
  const [prodPrice, setProdPrice] = useState(0);
  const [prodSalePrice, setProdSalePrice] = useState(0);
  const [prodStock, setProdStock] = useState(0);
  const [prodImage, setProdImage] = useState("");
  const [prodVisible, setProdVisible] = useState("")
  var [prodVisible2, setProdVisible2] = useState(false)
  const [allProdVisible, setAllProdVisible] = useState(false)
  const [updateProductVisible, setUpdateProductVisible] = useState(false)
  //Category
  const [catId, setCatId] = useState(1)
  const [catName, setCatName] = useState("");
  const [catDesc, setCatDesc] = useState("");
  var [catInfo, setCatInfo] = useState([]);
  var [varInfo, setVarInfo] = useState([]);
  const [catPrior, setCatPrior] = useState(0);
  const [updateCategoryVisible, setUpdateCategoryVisible] = useState(false);
  //Variation
  const [varId, setVarId] = useState(1);
  const [varName, setVarName] = useState("");
  const [updateVariationVisible, setUpdateVariationVisible] = useState(false);
  const [VariDesc, setVariDesc] = useState("")

  //Orders
  var [orderId, setOrderId] = useState(0)
  var [orderState, setOrderState] = useState(-1)
  const [ordersVisible, setOrdersVisible] = useState(false)
  const [availalbeOrders, setAvailableOrders] = useState()
  const [UpdateOrderStateVisible, setUpdateOrderStateVisible] = useState(false);

  //Users
  const [availableUsers, setAvailableUsers] = useState([])
  const [usersVisible, setUsersVisible] = useState(false)
  const [userId, setUserId] = useState(0)
  const [UpdateUserRightsVisible, setUpdateUserRightsVisible] = useState(false)
  const [userRights, setUserRights] = useState([])
  var [userOrderVisible, setUserOrderVisible] = useState(false)
  var [roleInfo, setRoleInfo] = useState([])
  const [UserOrdersVis,setUserOrdersVis] = useState([])
  var [userOrders2, setUserOrders] = useState([])

  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    async function getVariations() {
        setLoading(true)
        var vari = await ProductService.getVariations();
        await setAvailableVariations(vari)
        
    }

    async function getCategories() {
        setLoading(true)
        var vari = await ProductService.getCategories();
        await setAvailableCategories(vari)
        //console.log(vari)
    }

    async function getProducts() {
        setLoading(true)
        var vari = await ProductService.getProducts();

        await setAvailableProducts(vari)
        await setLoading(false)
        
    }

    async function getAllOrder() {
        setLoading(true)
        var vari = await ProductService.getAllOrder();

        await setAvailableOrders(Object.values(vari))
        
        // console.log(JSON.stringify(vari))
    }
    
    async function getAllUsers() {
        setLoading(true)
        var vari = await ProductService.getUsers();

        await setAvailableUsers(Object.values(vari))
        
      
        //console.log(JSON.stringify(vari))
    }

    getVariations();
    getCategories();
    getAllOrder();
    getAllUsers();
    getProducts();
    

  }, []);

  async function handleChange (event, selected)  {
      //this.setState({count: event.target.value})
      switch(selected) {
              case 'prodName':
                      setProdName(event.target.value)
              break;
              case 'prodDesc':
                      setProdDesc(event.target.value)
              break;
              case 'availCat':
                  var index = event.target.selectedIndex
                  var optionElement = event.target.childNodes[index];
                  var optionElementId = optionElement.getAttribute('id');
                      setAvailCatId(optionElementId)
                      setAvailCatName(event.target.value)
              break;
              case 'availVar':
                  var index = event.target.selectedIndex
                  var optionElement = event.target.childNodes[index];
                  var optionElementId = optionElement.getAttribute('id');
                  setAvailVarId(optionElementId)
                  setAvailVarName(event.target.value)
              break;
              case 'prodPrice':
                      setProdPrice(event.target.value)
              break;
              case 'prodSalePrice':
                      setProdSalePrice(event.target.value)
              break;
              case 'prodStock':
                      setProdStock(event.target.value)
              break;
              case 'prodImage':
                  setProdImage(event.target.value)
                  {/*console.log(event.target.value);*/}
                  break;
              case 'prodVisible':
                  
                  setProdVisible(event.target.value)
                  
                  break;
                  case 'prodVisible2':
                      console.log(event.target.value === 'true')
                    await setProdVisible2(event.target.value === 'true')
                  
                  break;
              case 'catName':
                      setCatName(event.target.value)
                  break;
              case 'catDesc':
                      setCatDesc(event.target.value)
                    break;
              case 'catPrior':
                      setCatPrior(event.target.value)
                    break;
              case 'varName':
                  setVarName(event.target.value)
                  break;
              case 'availProd':
                  setProdId(event.target.value)
                  break;
              case 'availCat2':
                  setCatId(event.target.value)
                  break;
              case 'updateVarName':
                  setVarName(event.target.value)
                  break;
              case 'updateCatName':
                  setCatName(event.target.value)
                  break;
              case 'updateCatDesc':
                  setCatDesc(event.target.value)
                  break;
              case 'updateCatPrior':
                  setCatPrior(event.target.value)
                  break;
              case "ordnum":
                  setOrderState(event.target.value)
                  break;
              case "varidesc":
                  setVariDesc(event.target.value)
                  break;

      }
      
      //console.log(event.target.value)
      // console.log(availVarName)
      // console.log(availCatName)
  };

  const handleProdSubmit= (prodName, prodDesc,  prodPrice, prodSalePrice, prodStock, prodImage, prodVisible) => {
    //console.log(prodVisible)
    if(prodName != "" && prodDesc != "" && prodPrice > 0 && prodSalePrice > 0) {
    ProductService.addProduct(prodName, prodDesc, catInfo, varInfo, prodPrice, prodSalePrice, prodStock, prodImage, prodVisible);
    }
    else {
        alert("Lehetőleg valós adatokat adjon meg!")
        //console.log(prodName, prodDesc, prodPrice, prodSalePrice)
    }
    hideAll();
  }

  const getProductUpdateImageFormat = (prdImg) => {
    if(Array.isArray(prdImg)){
      //console.log(prdImg);
      let prodUpdateBackText = ""
      prdImg.forEach((limg)=>{
        prodUpdateBackText = prodUpdateBackText + limg.image_url + " " + limg.priority + "\n"
      })
      return prodUpdateBackText
    }
  }

  const updateProductConfirm = (prodId, prodName, prodDesc, prodPrice, prodSalePrice, prodStock, prodImage, asd) => {
    
    if(prodName != "" && prodDesc != "" && prodSalePrice > 0 && prodPrice > 0 && prodStock >= 0) {
        // prodId, prodName, prodDesc, prodPrice,prodSalePrice, prodVisible, prodStock, productImage
        ProductService.updateProduct(prodId, prodName, prodDesc, prodPrice, prodSalePrice, prodStock, prodImage, asd)
        // console.log(prodId, prodName, prodDesc, prodPrice, prodSalePrice, prodStock, prodVisible)
        hideAll();
        //console.log(prodName+"\n"+prodImage + " \n\n" + asd);
    } else {
        alert("Valós adatokat adj meg!")
    }
  }
    
  const handleCatSubmit= (catName, catDesc, catPrior) => {
    if(catName != "" && catDesc != "") {
    ProductService.createCategory(catName, catDesc, catPrior);
    } else {
        alert("Kérlek töltsd ki a kategória adatait!")
    }
    clearCatFields();
  }

  const handleVarSubmit = (varName) => {
    if(varName != "") {
        ProductService.createVariation(varName)
    } else {
        alert("Kérlek add meg a variáció nevét!")
    }
    setVarName("")
  }

  const handleProdToCatSubmit = (prodId, catId) => {
    if(prodId != 0 && catId != 0) {
        ProductService.addProductToCategory(prodId, catId)
    } else {
        alert("Kérlek válaszd ki a terméket és a hozzá tartozó kategóriát!")
    }

  }

  const clearCatFields = () => {
    setCatName("");
    setCatDesc("");
    setCatPrior(0);
  }

  const hideAll = () => {
      setProductVisible(false);
      setCategoryVisible(false);
      setProductVariationVisible(false);
      setCategoriesVisible(false);
      setVariationsVisible(false);
      setProductToCategoryVisible(false)
      setUpdateCategoryVisible(false)
      setUpdateVariationVisible(false)
      setAllProdVisible(false)
      setUpdateProductVisible(false)
      setOrdersVisible(false)
      setUpdateOrderStateVisible(false)
      setUsersVisible(false)
      setUpdateUserRightsVisible(false)
      setProductToVariationVisible(false)
      setUserOrderVisible(false)

  }
  const newProduct = () => {
      hideAll();
      setProductVisible(true);

      if(productVisible) {
          setProductVisible(false)
      }
      
    //  console.log(availableCategories)
    //  console.log(availableVariations)
      
  }

  const getAllOrder = () => {
      hideAll();
      setOrdersVisible(true);

      if(ordersVisible) {
          setOrdersVisible(false)
      }

  }

  const getAllUsers = () => {
      hideAll();
      setUsersVisible(true);

      if(usersVisible) {
          setUsersVisible(false)
      }

  }

  const getProducts = () => {
      hideAll();
      setAllProdVisible(true);

      if(allProdVisible) {
          setAllProdVisible(false)
      }
      
//  console.log(availableProducts)
      
  }

  const getVariations = () => {
      hideAll();
      setProductVariationVisible(true);

      if(productVariationVisible) {
          setProductVariationVisible(false)
      }
      
  
      
  }

  const getCategories = () => {
      hideAll();
      setCategoryVisible(true);

      if(categoryVisible) {
          setCategoryVisible(false)
      }
      
    // console.log(availableCategories)
      
  }

  const addCategory = () => {
      hideAll();
      setCategoriesVisible(true);

      if(categories) {
          setCategoriesVisible(false);
      }
  }

  const addVariation = () => {
          hideAll();
          setVariationsVisible(true);
  
          if(variations) {
              setVariationsVisible(false);
          }


  }

  const addProductToCategory = () => {
      hideAll();
      setProductToCategoryVisible(true);

      if(productToCategoryVisible) {
          setProductToCategoryVisible(false)
      }
  }

  const updateVariation = (varId, varName) => {
      hideAll();
      setUpdateVariationVisible(true)
      //setProductVariationVisible(true)
      setVarId(varId)
      setVarName(varName)
      if(updateVariationVisible) {
          setUpdateVariationVisible(false)
      }



  }

  const updateProduct = (prodId, prodName, prodDesc, prodPrice,prodSalePrice, prodVisible, prodStock,  prodImage) => {
      hideAll();
      setUpdateProductVisible(true)
      setProdId(prodId)
      setProdName(prodName)
      setProdDesc(prodDesc)
      setProdPrice(prodPrice)
      setProdSalePrice(prodSalePrice)
      setProdVisible(prodVisible)
      setProdStock(prodStock)
      setProdImage(getProductUpdateImageFormat(prodImage))
      console.log(prodImage)
      if(updateProductVisible) {
          setProductVisible(false)
      }
  }

  const updateVariationConfirm = (varid, varName) => {
  hideAll();
  if(varName != "") {
  ProductService.updateVariation(varId, varName)
  }  else {
      alert("Kérlek töltsd ki az új variáció nevét!")
  }
  setVarName("");
  }

  const updateCategory = (id, catname, catdesc, catprior) => {
      hideAll();
      setUpdateCategoryVisible(true)
      setCatId(id);
      setCatName(catname)
      setCatDesc(catdesc)
      setCatPrior(catprior)
      if(updateCategoryVisible) {
          setUpdateCategoryVisible(false)
      }
  }

  const updateCategoryConfirm = (id,  category, smallDesc,  priority) => {
      hideAll();
      if(category != "" && smallDesc != "") {
      ProductService.updateCategory(catId, category, smallDesc, priority)
      } else {
          alert("Kérlek töltsd ki az új kategória adatait!")
      }
      setCatName("");
      setCatDesc("");
  }

  const updateOrderState = (orderid) => {
      hideAll();
      setOrdersVisible(true)
      setUpdateOrderStateVisible(true)
      setOrderId(orderid);
      // console.log(orderid)
      if(UpdateOrderStateVisible) {
          setUpdateOrderStateVisible(false)
      }
      //EditModal();
  }

  async function confirmOrderStateChange()  {
      hideAll();
      // console.log("final id:" + orderId);
      // console.log("final orderstate:" + orderState);
      if(orderId != 0 && orderState != -1 && orderState <= 4 && orderState >= 0) {
         await ProductService.updateOrderState(orderId, orderState)
          
      } else {
          alert("Hiba történt a rendelés állapotának módosítása során!")
      }
      setOrderId(0);
      setOrderState(-1)
      
  }

  const updateUserRights = (userid) => {
      hideAll();
      setUsersVisible(true)
      setUpdateUserRightsVisible(true)
      setUserId(userid);
      // console.log(userid)
      if(UpdateUserRightsVisible) {
          setUpdateUserRightsVisible(false)
      }
  }

  async function confirmUpdateUserRights() {
      hideAll();
      // console.log(userId)
    //   console.log(roleInfo.length)
      if(userId != 0 && roleInfo.length > 0) {
        await ProductService.updateAdminRights(userId, roleInfo)
        setRoleInfo([])
      } else {
        alert("Hiba történt a felhasználó jogainak módosítása során!")
      }
      
  }

  const addProductToVariation = () => {
        hideAll();
        
        setProductToVariationVisible(true);

        if(productVariationVisible) {
            setProductToVariationVisible(false)
    }

  }

  const userOrders = () => {
    hideAll();
    setUsersVisible(true)
    setUserOrderVisible(true)

    if(userOrderVisible) {
        setUserOrderVisible(false)
    }
  }

  async function handleProdToVarSubmit(prodId) {
    if(prodId != 0 && availVarId != 0 && VariDesc != "") {
       await ProductService.addProductToVariation(prodId, availVarId, VariDesc)
       alert("Sikeres hozzáadás")
    } else {
        alert("Kérlek minden adatot adj meg!")
    }

  }

  async function deleteCategory(prodid, catid)  {
    if(prodid != 0 && catid != 0) {
      await ProductService.removeProductFromCategory(prodid, catid)
        alert("Sikeres törlés!")
    } else {
        alert("Sikertelen törlés!")
    }

  }

  async function deleteVariation(prodid, varid)  {
    if(prodid != 0 && varid != 0) {
      await ProductService.removeProductFromVariation(prodid, varid)
        alert("Sikeres törlés!")
    } else {
        alert("Sikertelen törlés!")
    }
  }

  async function getUserOrders(orderid) {
    setOrderId(orderId);
    setUserOrderVisible(true)
    if(userOrderVisible) {
      setUserOrderVisible(false)
    }
    if(OtherProdInfoVisible) {
      setOtherProdInfoVisible(false)
    }
    
    
    //var orderproducts = await ProductService.getOrderProducts(orderid);
    getUserOrdersOk(orderid)
 
    //console.log(orderproducts)


  }


  async function getUserOrdersOk(orderid) {
      var op = await ProductService.getOrderProducts(orderid);
      await setUserOrders(JSON.parse(op))
     // console.log(op)

    }

    async function otherProdInfo(productId)  {
    

   
      await getProductById(productId)
    }
    
    async function getProductById(productid) {
      if(productid != 0) {
       
        var getProductById = await ProductService.getProductById(productid)
       await setProductById((getProductById))
       if(OtherProdInfoVisible) {
        setOtherProdInfoVisible(false)
      } else {
        setOtherProdInfoVisible(true)
      }
     // console.log(getProductById)
      
      }
    }

  

  {/*async function EditModal() {
  // eeezzz ittt szaaaar
  var modal = document.getElementById("myModal2");
  modal.innerHTML =
    "<div class='modal-inside'>" +
    "<span class='close' id='close' name='close'>&times;</span>" +
    "<div class='modal-content'>" +
    "<label>Állapot módosítása: </label>" +
    "<div class='editdiv'>" +
    "<label  for='ordnum'>" +
    " Rendelés új állapota(0-4 közötti érték megengedett): " +
    "</label>" +
    "<input  class='orderedit number ordnum' name='ordnum' id='ordnum'  type='number' required></input>" +
    "<button class='orderedit savebtn'>Rendelés állapotának megváltoztatása</button>" +
    "</div>" +
    "</div>" +
    "</div>";
  modal.style.display = "block";
  var _ = this;

  await $("#close").click(function () {
    modal.style.display = "none";
  });

  await $(".savebtn").click(function () {
    modal.style.display = "none";
    confirmOrderStateChange();
  });

  await $("body").on("change", "#ordnum", async function (event) {
    // eeezzz ittt szaaaar
    await setOrderState(event.target.value);
    await alert(orderState);
    //await handleChange( event , "ordnum");
  });

  await window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
  }*/} 

  if(user.roles.includes('ROLE_ADMIN1') || user.roles.includes('ROLE_ADMIN2') ) {
  if(loading) {
    return (
        <div className='text-center'>Egy kis türelmet...</div>
      )
  }
    else {
      return(
        <div class="container-admin">
          <h1 className='text-center admin_tx'>Admin panel</h1>
          <div class="row gombtomb">
            <div class="col gombkulso"> <button  onClick={() => getAllOrder()} type='button' className='btn btn-primary admingomb'>Rendelések megtekintése</button></div>
            <div class="vl"></div>
            <div class="col gombkulso"> <button  onClick={() => getAllUsers()} type='button' className='btn btn-primary admingomb'>Felhasználók megtekintése</button></div>
            <div class="vl"></div>
            <div class="col gombkulso"><button  onClick={() => newProduct()} type='button' className='btn btn-primary admingomb'>Új termék létrehozása</button></div>
            <div class="vl"></div>
            <div class="col gombkulso"> <button onClick={() => addCategory()} type='button' className='btn btn-primary admingomb'>Kategória létrehozása</button></div>
            <div class="vl"></div>
            <div class="col gombkulso"> <button  onClick={() => addVariation()} type='button' className='btn btn-primary admingomb'>Variáció létrehozása</button></div>
            <div class=" sortores"><hr class="vonal"></hr></div>
            <div class="col gombkulso"> <button  onClick={() => getProducts()} type='button' className='btn btn-primary admingomb'>Termékek lekérése</button></div>
            <div class="vl"></div>
            <div class="col gombkulso">  <button  onClick={() => getCategories()} type='button' className='btn btn-primary admingomb'>Kategóriák lekérése</button></div>
            <div class="vl"></div>
            <div class="col gombkulso"> <button  onClick={() => getVariations()} type='button' className='btn btn-primary admingomb'>Variációk lekérése</button></div>
            <div class="vl"></div>
            <div class="col gombkulso"> <button  onClick={() => addProductToCategory()} type='button' className='btn btn-primary admingomb'>Termék felvétele/törlése a kiválasztott kategóriához/ból</button></div>
            <div class="vl"></div>
            <div class="col gombkulso"> <button  onClick={() => addProductToVariation()} type='button' className='btn btn-primary admingomb'>Termék felvétele/törlése a kiválasztott variációhoz/ból</button></div>
          </div>
          <div class="kiirasok">
            <div class="admin_doboz">
              <div>
                {ordersVisible && (
                  <div>
                    <h3 class="admin_focim">Összes rendelés</h3>
                    <div class="row">
                      <ul class="list-group">
                        {/*[{\"id\":1,\"order_date\":\"2022-12-17T18:44:51\",\"order_state\":0,\"payment_method\":1,\"payment_state\":0,\"delivery_method\":0,\"phone\":\"06203*/}

                        {JSON.parse(availalbeOrders).map((order) => (
                            <>
                            <li class="list-group-item">
                                <p>Azonosító: {order.id}</p>
                                <p>Rendelés dátuma: {order.order_date}</p>
                                <p>
                                Rendelés állapota: {order.order_state}
                                </p>
                                <p>Fizetés módja: {order.payment_method}</p>
                                <p>
                                Fizetés állapota: {order.payment_state}
                                </p>
                                <p>
                                Szállítás módja: {order.delivery_method}
                                </p>
                                <p>Telefonszám: {order.phone}</p>
                                <p>Ország: {order.country}</p>
                                <p>Megye: {order.country_1}</p>
                                <p>Irányítószám: {order.post_code}</p>
                                <p>Város: {order.city}</p>
                                <p>Utca: {order.street}</p>
                                <p>Házszám: {order.house_number}</p>
                                <p>Egyéb info:{order.post_other}</p>
                                <br></br>
                                <button onClick={() => updateOrderState(order.id)} class="btn btn-success editgomb">
                                  Rendelés állapotának módosítása
                                </button>
                                <button onClick={() => getUserOrders(order.id)} className='btn btn-info editgomb'>Felhasználó rendeléseinek megtekintése</button>
                            </li>
                            </>
                        ))}
                        <div id="myModal2" class="modal"></div>
                      </ul>
                      {userOrderVisible &&
                          <div class="orders">
                            <div class="lebeg">
                              <div class="lebegContent">
                                <label for="ordnum" class="lebegLabel"></label>
                                  <ul class="list-group">
                                    {userOrders2.map(oproduct =>
                                      <>
                                      <li class="list-group-item">
                                            <p>Mennyiség: {oproduct.count} db.</p>
                                            <p>Ár: {oproduct.price} Ft.</p>
                                            <p>Rendelési azonosító: {oproduct.order_id}</p>
                                            <button onClick={() => otherProdInfo(oproduct.product_id)} className='btn btn-secondary'>Termék további adatai</button>
                                            <br></br>
                                            </li>
                                      </>
                                    )}
                                  </ul>
                                  {OtherProdInfoVisible &&
                                      <>
                                        <div class="detailedOrder">
                                          <div>Termék további adatai:</div>
                                          <>
                                            <p>Termék neve: {productbyId.p.name}</p>
                                            <p>Termék ára: {productbyId.p.price} Ft.</p>
                                            <p>Termék eladási ára: {productbyId.p.sale_price} Ft.</p>
                                            <p>Termék leírása: {!productbyId.p.description ? "Nincs" : productbyId.p.description}</p>
                                          </>
                                              
                                        </div>
                                      </>
                                  }
                              </div>
                            </div>
                          </div>            
                      }
              
                      {UpdateOrderStateVisible && (
                        <>
                        <div class="lebeg">
                            <div class="lebegContent">
                                <label for="ordnum" class="lebegLabel">
                                {" "}
                                {/*MEGRENDELVE((byte)0),
                                              FELDOLGOZVA((byte)1),
                                              CSOMAGOLVA((byte)2),
                                              ATADVA_FUTARNAK((byte)3),
                                              KEZBESITVE((byte)4); */}
                                Rendelés új állapota: <br></br>
                                    0: MEGRENDELVE<br></br>
                                    1: FELDOLGOZVA<br></br>
                                    2: CSOMAGOLVA<br></br>
                                    3: ÁTADVA A FUTÁRNAK<br></br>
                                    4: KÉZBESÍTVE<br></br>
                                </label>
                                <input class="lebegInput admin_bevitel"
                                onChange={(e) => handleChange(e, "ordnum")}
                                id="ordnum"
                                type="number"
                                required
                                ></input><br></br>
                                <button
                                className="btn btn-danger lebegBTN"
                                onClick={() => confirmOrderStateChange()}
                                >
                                Rendelés állapotának megváltoztatása
                                </button>
                            </div>
                            </div>
                        </>
                      )}
                          
                    </div>
                  </div>
                )}

                {usersVisible &&
                  <div>
                      <h3 class="admin_focim">Összes felhasználó</h3>
                      <ul class="list-group">
                        {Object.values(availableUsers).map(user =>
                          <>
                            <li class="list-group-item">
                                {/* {\"userId\":1,\"username\":\"Admin\",\"email\":\"Admin\",\"mailConfirmed\":true,\"userOrders\":[],\"userRoles\":[]}*/}
                                <p>Felhasználó azonosítója: {user.userId}</p>
                                <p>Felhasználónév: {user.username}</p>
                                <p>Email cím: {user.email}</p>
                                <p>Email megerősítve: {user.mailConfirmed ? "Igaz" : "Hamis"}</p>

                                    {/*[{\"id\":21,\"order_date\":\"2022-12-26T23:59:50\",\"order_state\":0,\"payment_method\":2,\"payment_state\":0,\"delivery_method\":2,\"phone\":\"101234567\",\"country\":\"Magyarország\",\"country_1\":\"Győr-Moson Sopron\",\"city\":\"Sopron\",\"post_code\":1,\"street\":\"Teszt\",\"house_number\":\"1\",\"post_other\":\"1\",\"user_id\":19}] */}
                                
                                    {/*<button onClick={() => userOrders()} class="btn btn-info">Felhasználó rendeléseinek megtekintése:</button> 

                                    {userOrderVisible && 
                                            user.userOrders.map(orders=>
                                              <>
                                                <p>Rendelés azonosítója : {orders.id}</p>
                                                <p>Rendelés dátuma : {orders.order_date}</p>
                                                <p>Rendelés állapota : {orders.order_state}</p>
                                                <p>Fizetés mód : {orders.payment_state}</p>
                                                <p>Szállítás mód : {orders.delivery_method}</p>
                                                <p>Telefonszám : {orders.phone}</p>
                                                <p>Ország: {orders.country}</p>
                                                <p>Megye : {orders.country_1}</p>
                                                <p>Város: {orders.city}</p>
                                                <p>Irányítószám: {orders.post_code}</p>
                                                <p>Utca: {orders.street}</p>
                                                <p>Házszám: {orders.house_number}</p>
                                                <p>Egyéb: {orders.post_other}</p>
                                                <p>Felhasználó azonosítója: {orders.user_id}</p>
                                            </>
                                            )}*/}
                                            
                                <>
                                  <ul class="list-group">
                                      <p>Felhasználó rendelései: </p>
                                      {user.userOrders.map(orders=>
                                        <>
                                          <li class="list-group-item">
                                            <p>Rendelés azonosítója : {orders.id}</p>
                                            <p>Rendelés dátuma : {orders.order_date}</p>
                                            <p>Rendelés állapota : {orders.order_state}</p>
                                            <p>Fizetés mód : {orders.payment_state}</p>
                                            <p>Szállítás mód : {orders.delivery_method}</p>
                                            <p>Telefonszám : {orders.phone}</p>
                                            <p>Ország: {orders.country}</p>
                                            <p>Megye : {orders.country_1}</p>
                                            <p>Város: {orders.city}</p>
                                            <p>Irányítószám: {orders.post_code}</p>
                                            <p>Utca: {orders.street}</p>
                                            <p>Házszám: {orders.house_number}</p>
                                            <p>Egyéb: {orders.post_other}</p>
                                            <p>Felhasználó azonosítója: {orders.user_id}</p>
                                            <br></br>
                                          </li>
                                        </>
                                      )} 
                                    
                                  </ul>
                                  {user.userOrders.length < 1 && "Nincs"}    
                                </>
                                  
                                <p>Felhasználó jogai: 
                                  {user.userRoles.map(roles => 
                                    <>
                                      {roles.name}, 
                                    </>
                                  )}
                                  {user.userRoles.length < 1 && "Nincs"}
                                </p>
                                <br></br>
                                <button onClick={() => updateUserRights(user.userId)} className='btn btn-success editgomb'>Felhasználó jogainak módosítása</button>
                                
                            </li>
                          </>
                        )}
                      </ul>
                  </div>
                }
        
                {UpdateUserRightsVisible &&(
                  <>
                      <div class="lebeg">
                        <div class="lebegContent">
                          <label for="userRights"> Felhasználó jogköre: </label>
                          {/*ROLE_ADMIN1 ROLE_ADMIN2 ROLE_CUSTOMER    ROLE_VIPCUSTOMER */}
                            <>
                              <label>
                                <input  onChange={(e) => {
                                    // add to list
                                    if (e.target.checked) {
                                    
                                    setRoleInfo([
                                        ...roleInfo,
                                        roleInfo.push(e.target.value)
                                    ])
                                    } else {
                                    // remove from list
                                    setRoleInfo(
                                        roleInfo.filter((c) => c !== e.target.value),
                                    );
                                  // console.log(roleInfo)
                                    }
                                    var arr = roleInfo.filter(x => isNaN(x));
                                    setRoleInfo(arr)
                                
                                }} type="checkbox" id="ROLE_ADMIN1" value="ROLE_ADMIN1"/>
                                ROLE_ADMIN1
                              </label>

                              <label>
                                <input  onChange={(e) => {
                                    // add to list
                                    if (e.target.checked) {
                                    
                                    setRoleInfo([
                                        ...roleInfo,
                                        roleInfo.push(e.target.value)
                                    ])
                                    } else {
                                      // remove from list
                                      setRoleInfo(
                                          roleInfo.filter((c) => c !== e.target.value),
                                    );
                                    
                                    }
                                    var arr = roleInfo.filter(x => isNaN(x));
                                    setRoleInfo(arr)
                                }} type="checkbox" id="ROLE_CUSTOMER" value="ROLE_CUSTOMER"/> 
                                      ROLE_CUSTOMER
                              </label>

                              <label>
                                <input  onChange={(e) => {
                                      // add to list
                                      if (e.target.checked) {
                                      
                                      setRoleInfo([
                                          ...roleInfo,
                                          roleInfo.push(e.target.value)
                                      ])
                                      } else {
                                      // remove from list
                                      setRoleInfo(
                                          roleInfo.filter((c) => c !== e.target.value),
                                      );
                                      
                                      }
                                      var arr = roleInfo.filter(x => isNaN(x));
                                      setRoleInfo(arr)
                                }} type="checkbox" id="ROLE_ADMIN2" value="ROLE_ADMIN2"/>
                                ROLE_ADMIN2
                              </label>

                              <label>
                                <input  onChange={(e) => {
                                    // add to list
                                    if (e.target.checked) {
                                    
                                    setRoleInfo([
                                        ...roleInfo,
                                        roleInfo.push(e.target.value)
                                    ])
                                    } else {
                                    // remove from list
                                    setRoleInfo(
                                        roleInfo.filter((c) => c !== e.target.value),
                                    );
                                    
                                    }
                                    var arr = roleInfo.filter(x => isNaN(x));
                                    setRoleInfo(arr)
                                }} type="checkbox" id="ROLE_VIPCUSTOMER" value="ROLE_VIPCUSTOMER"/>
                                  ROLE_VIPCUSTOMER
                              </label>
                            </>
                            <button className='btn btn-danger' onClick={() => confirmUpdateUserRights()}>Felhasználó jogainak frissítése</button>
                        </div>
                      </div>
                  </>
                )}
                  
                {allProdVisible && (
                  <div>
                    <h3 class="admin_focim">Összes termék</h3>
                    <ul class="list-group">
                      {availableProducts.map((product) => (
                        <>
                          {/* prodName, prodDesc, availCatId, availCatName, availVarId, availVarName, prodPrice, prodSalePrice, prodStock, prodImage, prodVisible)*/}

                          <li class="list-group-item">
                            <p>Név: {product.p.name}</p>
                            <p>Leírás: {product.p.description}</p>
                            <p>Ár: {product.p.sale_price}</p>
                            <p>Raktár: {product.p.stock}</p>
                        
                            <p>
                              Termék láthatósága:{" "}
                              {product.p.visible ? "Igaz" : "Hamis"}
                            </p>
                            <button
                            // (prodId, prodName, prodDesc, prodPrice,prodSalePrice, prodVisible, prodStock
                              onClick={() => 
                                updateProduct(product.p.id, product.p.name, product.p.description, product.p.price, product.p.sale_price, product.p.visible, product.p.stock, product.images)
                              }
                              type="button"
                              className="btn btn-danger"
                            >
                              Módosítás
                            </button>
                          </li>
                        </>
                      ))}
                    </ul>
                  </div>
                )}

                {productVisible && (
                    <div>
                        <h3 class="admin_focim">Új termék adatai</h3>
                        <label class="admin_cimke" for="prodName">Termék neve: </label>
                        <input class="admin_bevitel"onChange={(e) => handleChange(e,"prodName")} id="prodName" type="text" placeholder='Kakós csiga' required></input><br></br>
                        <label class="admin_cimke" for="prodDesc">Termék leírása: </label>
                        <input class="admin_bevitel" onChange={(e) => handleChange(e,"prodDesc")} id="prodDesc" type="text" placeholder='Nagyon kakaós' required></input><br></br>
                        <label class="admin_cimke" for="prodCategory">Termék kategória (lehet több is): </label><br></br>
                        
                        {availableCategories.map(cat => 
                          <>
                            <label>
                              <input  onChange={(e) => {
                                  // add to list
                                  if (e.target.checked) {
                                    setCatInfo([
                                        ...catInfo,
                                        catInfo.push(cat.id)
                                    ])
                                  } else {
                                  // remove from list
                                    setCatInfo(
                                        catInfo.filter((c) => c.id !== cat.id),
                                    );
                                  }
                              }} type="checkbox" id={cat.id} value={cat.category}/> {cat.category}
                            </label>
                          </>
                        )}
                    
                        {/* <br></br><label class="admin_cimke" for="prodVariation">Termék variációja: </label>
                        <select class="admin_bevitel" onChange={(e) => handleChange(e,"availVar")}>
                        <option id="nincs" value="none">Nincs</option>
                            {availableVariations.map(vari =>
                            <>
                            
                            <option id={vari.id} value={vari.name}>{vari.name}</option>
                            
                            </>
                            )};
                            </select>*/}
                        <br></br>
                        <label class="admin_cimke" for="prodVariation">Termék variációja (lehet több is): </label>
                        <br></br>

                        {availableVariations.map(vari => 
                          <>
                            <label>
                              <input  onChange={(e) => {
                                // add to list
                                if (e.target.checked) {
                                  setVarInfo([
                                      ...varInfo,
                                      {
                                      id: vari.id,
                                      name : vari.name
                                      }
                                  ])
                                } else {
                                // remove from list
                                  setVarInfo(
                                      varInfo.filter((c) => c.id !== vari.id),
                                  );
                                }
                                // console.log(varInfo)
                              }}  type="checkbox" id={vari.id} value={vari.name}/> 
                              {vari.name}
                            </label>
                          </>
                        )}
                    

                        <br></br>
                        <label class="admin_cimke" for="prodPrice">Termék ára: </label>
                        <input class="admin_bevitel" onChange={(e) => handleChange(e,"prodPrice")} id="prodPrice" type="number" placeholder='500' required></input><br></br>
                        <label class="admin_cimke" for="prodSalePrice">Termék eladási ára: </label>
                        <input class="admin_bevitel" onChange={(e) => handleChange(e,"prodSalePrice")} id="prodSalePrice" type="number" placeholder='450' required></input><br></br>
                        <label class="admin_cimke" for="prodStock">Termék Készlet: </label>
                        <input class="admin_bevitel" onChange={(e) => handleChange(e,"prodStock")} id="prodStock" type="number" placeholder='69' required></input><br></br>
                        <label class="admin_cimke" for="prodImage">Képek formátum: 1/"enter" sortörés URL, "szóköz" prioritás</label>
                        <textarea id="story" placeholder="példa:&#10;https://api.hvg.hu/Img/7fcefbf8-ac48-4ee6-aef5-32203afa118c/5925235d-a6a9-4424-82fd-1a95a688e6cd.jpg 1&#10;https://media.makeameme.org/created/s-egy-csipetnyi.jpg 2 " class="admin_bevitel" name="story" rows="5" cols="33" onChange={(e) => handleChange(e,"prodImage")}></textarea><br></br>
                        {/*<input class="admin_bevitel" onChange={(e) => handleChange(e,"prodImage")} id="prodImage" type="textarea" required></input><br></br>*/}
                        <label class="admin_cimke" for="prodVisible">Termék láthatósága:</label>
                        <select class="admin_bevitel" onChange={(e) => handleChange(e,"prodVisible")}>
                            <option id="prodVisible" value="true">Igaz</option>
                            <option  id="prodVisible" value="false">Hamis</option>
                            </select>
                            <br></br>
                            <br></br>
                            <button onClick={() => handleProdSubmit(prodName, prodDesc, prodPrice, prodSalePrice, prodStock, prodImage, prodVisible)} className='btn btn-primary' type='button'>Új termék felvétele</button>
                    </div> 
                )}

                {productVariationVisible && (
                  <div>
                    <h3 class="admin_focim">Összes Variáció</h3>
                    <ul class="list-group">
                          {availableVariations.map((variation) => (
                            <>
                              <li class="list-group-item">
                                <p>
                                  {variation.id} - {variation.name}
                                </p>
                                <button onClick={() => updateVariation(variation.id, variation.name)}type="button"className="btn btn-danger">Módosítás</button>
                              </li>
                            </>
                          ))}
                    </ul>
                  </div>
                )}

                {updateProductVisible &&(
                  <div>
                    <h3 class="admin_focim">Termék Módosítása</h3>
                    <label class="admin_cimke" for="prodName">Termék neve: </label>
                    <input class="admin_bevitel"onChange={(e) => handleChange(e,"prodName")} id="prodName" type="text" defaultValue={prodName} required></input><br></br>
                    <label class="admin_cimke" for="prodDesc">Termék leírása: </label>
                    <input class="admin_bevitel" onChange={(e) => handleChange(e,"prodDesc")} id="prodDesc" type="text" defaultValue={prodDesc} required></input><br></br>
                    <br></br>
                    <label class="admin_cimke" for="prodPrice">Termék ára: </label>
                    <input class="admin_bevitel" onChange={(e) => handleChange(e,"prodPrice")} id="prodPrice" type="number" defaultValue={prodPrice}required></input><br></br>
                    <label class="admin_cimke" for="prodSalePrice">Termék eladási ára: </label>
                    <input class="admin_bevitel" onChange={(e) => handleChange(e,"prodSalePrice")} id="prodSalePrice" type="number" defaultValue={prodSalePrice}  required></input><br></br>
                    <label class="admin_cimke" for="prodStock">Termék Készlet: </label>
                    <input class="admin_bevitel" onChange={(e) => handleChange(e,"prodStock")} id="prodStock" type="number" defaultValue={prodStock} required></input><br></br>
                    <label class="admin_cimke" for="prodImage">Képek formátum: 1/"enter" sortörés URL, "szóköz" prioritás</label>
                    <textarea placeholder="példa:&#10;https://api.hvg.hu/Img/7fcefbf8-ac48-4ee6-aef5-32203afa118c/5925235d-a6a9-4424-82fd-1a95a688e6cd.jpg 1&#10;https://media.makeameme.org/created/s-egy-csipetnyi.jpg 2 " value={prodImage} class="admin_bevitel" id="story" name="story" rows="5" cols="33" onChange={(e) => handleChange(e,"prodImage")}></textarea>
                    <label class="admin_cimke" for="prodVisible2">Termék láthatósága:</label>
                    <select id ="prodVisible2" class="admin_bevitel" defaultValue={ prodVisible ? 'true' : 'false'} onChange={(e) => handleChange(e,"prodVisible2")}>
                        <option id="prodVisible2" value="true" >Igaz</option>
                        <option  id="prodVisible2" value="false" >Hamis</option>
                    </select>
                    <br></br>
                    <button onClick={() => updateProductConfirm(prodId, prodName, prodDesc, prodPrice, prodSalePrice, prodStock,prodImage, prodVisible2)} className='btn btn-primary' type='button'>Termék módosítása</button>
                  </div>                   
                )}

                {updateVariationVisible &&(
                  <>
                    <p class="admin_focim">Variáció neve:</p>
                    <input class="admin_bevitel" onChange={(e) => handleChange(e, "updateVarName")} type="text" defaultValue={varName} required></input>
                    <button type="button" className='btn btn-info' onClick={() => updateVariationConfirm(varId, varName)}>Módosít</button>
                  </>
                )}

                {categoryVisible && (
                  <div>
                    <h3 class="admin_focim">Összes kategória</h3>
                    <ul class="list-group">
                        {availableCategories.map((cat) => (
                          <>
                            <li class="list-group-item">
                              <p>
                                ID: {cat.id} <br></br> Kategória neve: {cat.category} <br></br> Kategória leírása: {cat.description}  <br></br> Kategória prioritása:  {cat.priority}
                              </p>
                              <button onClick={() => updateCategory(cat.id, cat.category, cat.description, cat.priority)} type="button" className="btn btn-danger">
                                Módosítás
                              </button>
                            </li>
                          </>
                        ))}
                    </ul>
                  </div>
                )}

                {updateCategoryVisible &&(
                  <>
                    <p class="admin_cimke">Kategória neve:</p>
                    <input class="admin_bevitel"  onChange={(e) => handleChange(e, "updateCatName")} id="updCatName" type="text" defaultValue={catName} required></input>
                    <p class="admin_cimke">Kategória leírása:</p>
                    <input class="admin_bevitel" onChange={(e) => handleChange(e, "updateCatDesc")}  id="updCatDesc" type="text" defaultValue={catDesc} required></input>
                    <p class="admin_cimke">Kategória prioritása:</p>
                    <input class="admin_bevitel" onChange={(e) => handleChange(e, "updateCatPrior")}  id="updCatPrior" type="number" defaultValue={catPrior} required></input>
                    <button type="button" className='btn btn-info' onClick={() => updateCategoryConfirm(catId, catName, catDesc, catPrior)}>Módosít</button>
                  </>
                )}

                {categories &&(
                  <div>
                      <h3 class="admin_focim">Új kategória adatai</h3>
                      <label class="admin_cimke" for="catName">Kategória neve: </label>
                      <input class="admin_bevitel" onChange={(e) => handleChange(e,"catName")} id="catName" type="text" placeholder='Felvágott' required></input>
                      <label class="admin_cimke" for="catDesc">Kategória leírása: </label>
                      <input class="admin_bevitel" onChange={(e) => handleChange(e,"catDesc")} id="catDesc" type="text" placeholder='Fel szokták vágni' required></input>
                      <label class="admin_cimke" for="catPrior">Kategória prioritása: </label>
                      <input class="admin_bevitel" onChange={(e) => handleChange(e,"catPrior")} id="prodDesc" type="number" placeholder='1' required></input>
                      <button onClick={() => handleCatSubmit(catName, catDesc, catPrior)} className='btn btn-primary' type='button'>Új kategória felvétele</button>
                  </div>
                )}

                {variations &&(
                  <div>
                      <h3 class="admin_focim">Új variáció adatai</h3>
                      <label class="admin_cimke" for="varName">Variáció neve: </label>
                      <input class="admin_bevitel" onChange={(e) => handleChange(e,"varName")} id="varName" type="text"  placeholder='Keserű' required></input>
                      <button onClick={() => handleVarSubmit(varName)} className='btn btn-primary' type='button'>Új variáció felvétele</button>
                  </div>  
                )}

                {productToCategoryVisible && (
                  <div>
                    <h3 class="admin_focim">
                      Termék felvétele/törlése kategóriához/ból
                    </h3>
                    <label class="admin_cimke">Termék: </label>
                    <select class="admin_bevitel" onChange={(e) => handleChange(e, "availProd")}>
                      {availableProducts.map((prod) => (
                        <>
                          <option id={prod.p.id} value={prod.p.id}>
                            {prod.p.name}
                          </option>
                        </>
                      ))}
                      ;
                    </select>
                    <br></br>
                    <label class="admin_cimke">Kategória: </label>
                    <select class="admin_bevitel" onChange={(e) => handleChange(e, "availCat2")}>
                      {availableCategories.map((cat) => (
                        <>
                          <option id={cat.id} value={cat.id}>
                            {cat.category}
                          </option>
                        </>
                      ))}
                      ;
                    </select>
                    <br></br>
                    <button
                      onClick={() => handleProdToCatSubmit(prodId, catId)}
                      className="btn btn-primary"
                      type="button"
                    >
                      Termék felvétele a kiválasztott kategóriához
                    </button>
                    <br></br>
                    <button
                      onClick={() => deleteCategory(prodId, catId)}
                      className="btn btn-danger"
                    >
                      Termék törlése a kiválasztott kategóriából
                    </button>
                  </div>
                )}

                {productToVariationVisible && (
                <div>
                  <h3 class="admin_focim">
                    Termék felvétele/törlése variációhoz/ból
                  </h3>
                  <label class="admin_cimke">Termék: </label>
                  <select class="admin_bevitel" onChange={(e) => handleChange(e, "availProd")}>
                    {availableProducts.map((prod) => (
                      <>
                        <option id={prod.p.id} value={prod.p.id}>
                          {prod.p.name}
                        </option>
                      </>
                    ))}
                    ;
                  </select>
                  <br></br>
                  <label class="admin_cimke">Variáció: </label>
                  <select class="admin_bevitel" onChange={(e) => handleChange(e, "availVar")}>
                    {availableVariations.map((vari) => (
                      <>
                        <option id={vari.id} value={vari.id}>
                          {vari.name}
                        </option>
                      </>
                    ))}
                    ;
                  </select>
                  <br></br>
                  <label class="admin_cimke">Leírás: </label>
                  <input
                    onChange={(e) => handleChange(e, "varidesc")}
                    class="admin_bevitel"
                    id="desc"
                    type="text"
                  ></input>
                  <br></br>
                  <button
                    onClick={() => handleProdToVarSubmit(prodId, availVarId)}
                    className="btn btn-primary"
                    type="button"
                  >
                    Termék felvétele a kiválasztott variációhoz
                  </button>
                  <br></br>
                  <button
                    onClick={() => deleteVariation(prodId, availVarId)}
                    className="btn btn-danger"
                  >
                    Termék törlése a kiválasztott variációból
                  </button>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) 
    }
  }
  else 
  {
    return (
      <div>
        <h1 className='text-center'>Nincs admin jogosítványod!</h1>
      </div>
    )
  }       
}
            
        
      

            
            