import React,{ useState, useEffect } from "react";
import ProductService from "../services/ProductService";
import BasketService from "../services/BasketService";
import EventBus from "../user/EventBus";
import AuthService from "../services/AuthService";
import { Link } from "react-router-dom";
import $ from "jquery";
//import { user } from "./Header";
export const user = AuthService.getCurrentUser();
export default function ProductComponent() {

var [products, setProducts] = useState([])
var [productLoading, setProductLoading] = useState(true)
var [productFilter, setProductFilter] = useState(false)
var [basket] = useState([])
var [searchmethod, setSearchMethod] = useState("textSearch")
var [searchquery, setSearchQuery] = useState("")

const [showModeratorBoard, setShowModeratorBoard] = useState(false);
const [showAdminBoard, setShowAdminBoard] = useState(false);
const [currentUser, setCurrentUser] = useState(undefined);
const [categories, setCategories] = useState("");
const [selectedCategory, setSelectedCategory] = useState(0)



var cartAddOne = false;
basket = BasketService.getBasketProduct();

const logOut = () => {
  AuthService.logout();
  setShowModeratorBoard(false);
  setShowAdminBoard(false);
  setCurrentUser(undefined);
};

useEffect(() => {
  if (user) {



    setCurrentUser(user);
    setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
    async function getCategories() {
      var cat = await ProductService.getCategories();
      await setCategories(cat)
      //alert(AuthService.getCookie('ikwebshopToken'))
      //console.log(categories)
  }


  getCategories();
    setShowAdminBoard(
      user.roles.includes("ROLE_ADMIN1") || user.roles.includes("ROLE_ADMIN2")
    );
  } 

  EventBus.on("logout", () => {
    logOut();
  });





    async function getProducts() {
        var fetchProducts = await ProductService.getProducts();
        
       await setProducts(fetchProducts);
        setProductLoading(false)
    };

    
    getProducts();
  // prodByCat();
   // getProductsByCategoryId()

    return () => {
      EventBus.remove("logout");
    };
      
  }, []);

  async function handleSearchSubmit(searchType)  {
    switch (searchType) {
      case "textSearch":
        var filteredProducts = await ProductService.findProductsByFilterText(
          searchquery
        );
        //this.setState({ products: filteredProducts });
        setProductLoading(true)
        setProducts(filteredProducts)
        break;
      case "inaccurateSearch":
        var filteredProducts = await ProductService.findProductsByKeywordAny(
            searchquery
        );
       // this.setState({ filterProducts: filteredProducts });
       setProductLoading(true)
        setProducts(filteredProducts)
        break;
      case "accurateSearch":
        var filteredProducts = await ProductService.findProductsByKeywordAll(
            searchquery
        );
      //  this.setState({ filterProducts: filteredProducts });
        setProductLoading(true)
        setProducts(filteredProducts)
        break;
    }
    setProductLoading(false)
  };


  async function prodByCat(event) {
    setProductFilter(true)
    var prodByCat =  await ProductService.findProductsByCategory(event);
    await setProducts(prodByCat)
    //console.log(products)
    setProductFilter(false)
  
}

  function handleChange(event, id) {
    switch (id) {
      case "searchmethod":
        switch (event.target.value) {
          case "textSearch":
            //this.setState({ searchMethod: event.target.value });
            setSearchMethod(event.target.value)
            break;
          case "inaccurateSearch":
           // this.setState({ searchMethod: event.target.value });
            setSearchMethod(event.target.value)
            break;
          case "accurateSearch":
           // this.setState({ searchMethod: event.target.value });
            setSearchMethod(event.target.value)
            break;
        }

        break;
      case "searchquery":
       // this.setState({ searchQuery: event.target.value });
        setSearchQuery(event.target.value)
        //console.log(event.target.value);
        break;
    }
  };
      
  function CatKick()  {
    console.log("A macska rúgja meg!");
  };

  function addToCart (productid, count)  {
    cartAddOne = true;
    BasketService.addBasketProduct(productid, count);
  };

  function vanekep(product, index)  {
    return product &&
      product.images[index] &&
      product.images[index].image_url &&
      product.images[index].image_url
      ? product.images[index].image_url
      : "https://thumbs.dreamstime.com/b/error-not-found-symbol-logo-design-vector-232023001.jpg";
  };


  function getMainImage(product) {
    if (product && product.images.length > 0)
      return product.images.sort((img1, img2) =>
        img1.priority > img2.priority ? 1 : -1
      )[0].image_url;
    return "https://thumbs.dreamstime.com/b/error-not-found-symbol-logo-design-vector-232023001.jpg";
  };



  function ModaliuszLeviosza (product) {
    if (!cartAddOne) {
      var desc = product.p.description ? product.p.description : "Nincs leírás";
      var imagecounter=1;
      var imagecounter2=1;
      var modal = document.getElementById("myModal2");
      modal.style.display = "block";
      document.getElementById("myModal2").innerHTML =
        "<div class='modal-inside'>" +
          "<span class='close' id='close' name='close'>&times;</span>" +
          "<div class='modal-content'>" +
          "<div class='slideshow-container'>"+
            product.images.map((p) =>
              "<div class='mySlides fade'>"+
                "<div class='numbertext'>"+imagecounter++ +"/"+ product.images.length+"</div>"+
                "<img src="+p.image_url+" class='modalIMG' style='width:100%'>"+
              "</div>"
            ).join(' ')+
            "<div style='text-align:center'>"+
            product.images.map((p) =>
            "<span class='dot' onclick='currentSlide("+ imagecounter2++ +")'></span>"
            ).join(' ')+
            "</div>"+
            "<a class='prev' onclick='plusSlides(-1)'>❮</a>"+
            "<a class='next' onclick='plusSlides(1)'>❯</a>"+
          "</div>"+
            "<div class='modal-content-detail'>" +
              "<p class='modalName'>" +product.p.name + "</p> " +
              "<p class='modalDesc'>" +desc  +"</p>" +
              "<p class='modalPrice'>" + product.p.price + "Ft. /db</p>" +
              "<p class='modalNumberTag modalDesc'>Ennyit a kosárba:</p>" +
              "<div class='row modalNumDIV'>"+
              "<input type='number' id='cartAddMultipleNUM' class='modalNumberNum' value='1' min='0'></input>"+
              "<div id='cartAddMultipleBTN' class='modalNumberBTN'>"+
                "<i class='fa-solid fa-check fa-2x'></i> "+
              "</div>"+
              "</div>"+
            "</div>" +
          "</div>" +
        "</div>";
      var _ = this;
      $("#close").click(function () {
        modal.style.display = "none";
        CatKick();
      });
      $("#cartAddMultipleBTN").click(function () {
        modal.style.display = "none";
       addToCart(product.p.id, $( "#cartAddMultipleNUM" ).val())
      });
      var modal = document.getElementById("myModal2");
      window.addEventListener("click", function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      });
    }
    cartAddOne = false;
  };


  function melyikvalasztva(resz) {
    switch (resz) {
      case 1:
        if (searchmethod == "textSearch") {
          return "<option id='search' value='textSearch' selected>";
        } else {
          return "<option id='search' value='textSearch'>";
        }
        break;

      case 2:
        if (searchmethod == "inaccurateSearch") {
          return "<option id='search' value='inaccurateSearch' selected>";
        } else {
          return "<option id='search' value='inaccurateSearch'>";
        }
        break;

      case 3:
        if (searchmethod== "accurateSearch") {
          return "<option id='search' value='accurateSearch' selected>";
        } else {
          return "<option id='search' value='accurateSearch' >";
        }
        break;
    }
  };


  function SearchMethodChangeModal() {
    var modal = document.getElementById("myModal2");
    modal.style.display = "block";

    document.getElementById("myModal2").innerHTML =
      "<div class='modal-inside'>" +
          "<span class='close' id='close' name='close'>&times;</span>" +
          "<div class='modal-content'>" +
            "<label>Keresés típúsa: </label>" +
            "<select id='search' class='keresModValaszt' >" +
              melyikvalasztva(1) +
                "Szöveges (Termék címe, leírása alapján)" +
              "</option>" +
              melyikvalasztva(2) +
                "'Pontatlan' kulcsszavas (A kulcsszó bármelyik tárgynál szerepelhet)" +
              "</option>" +
              melyikvalasztva(3) +
                "'Pontos' kulcsszavas (A kulcsszavak mindegyike szerepel a tárgynál)" +
              "</option>" +
            "</select>" +
          "</div>" +
        "</div>";
    var _ = this;
    $("#close").click(function () {
      modal.style.display = "none";
      CatKick();
    });
    $("#search").change(function (event) {
      modal.style.display = "none";
      handleChange(event, "searchmethod");
    });
    var modal = document.getElementById("myModal2");
    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  }
  

    return (
     <>
      <header class="site-navbar" role="banner">
      

      {currentUser ? (
        <div class="container">
          <div class="row align-items-center">
            <div class="col-11 col-xl-2">
              <h1 class="mb-0 site-logo">
                <a href="/" class="text-white mb-0">
                  IK webshop
                </a>
              </h1>
            </div>
            <div class="col-12 col-md-10 d-none d-xl-block">
              <nav
                class="site-navigation position-relative text-right"
                role="navigation"
              >
                <ul class="site-menu js-clone-nav mr-auto d-none d-lg-block">
                  <li className="nav-item">
                    <Link to={"/user"} class="nav-item"></Link>
                  </li>

                  <li class="nav-item active">
                    <a href="/">
                      <span>Főoldal</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a>
                      <span>
                        <Link to="/cart">Kosár</Link>
                      </span>
                    </a>
                  </li>
                  <li class="has-children nav-item">
                    <a href="#">
                      <span>Kategóriák</span>
                    </a>
                    {categories &&
                    <ul class="dropdown arrow-top">
                      <>
                   { categories.map(cat =>
                    
                      <li key={cat.id} value={cat.id}>
                        <button value={cat.id}  onClick={(e) => prodByCat(e.target.value)}>{cat.category}</button>
                      </li>
                      )}
                      </>

                    </ul>
                }
                  </li>

                  
                  <li class="nav-item">
                    <a>
                      <span>
                        <Link to="/contact">Kapcsolat</Link>
                      </span>
                    </a>
                  </li>
                  <li class="has-children nav-item">
                    <a href="#">
                      <span>{currentUser.username}</span>
                    </a>
                    <ul class="dropdown arrow-top">
                      <li>
                        <a href="/profile">Profil</a>
                      </li> 
                      {showModeratorBoard && (
                        <li>
                          <Link to={"/mod"} class="nav-item">
                            Moderator Board
                          </Link>
                        </li>
                      )}
                      {showAdminBoard && (
                        <li>
                          <Link to={"/admin"} class="nav-item">
                            Admin Panel
                          </Link>
                        </li>
                      )}
                      <li>
                          <a href="/orders">Rendelések</a>
                        </li>
                      <li>
                        <a href="/login" onClick={logOut}>
                          Kijelentkezés
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <div
              class="d-inline-block d-xl-none ml-md-0 mr-auto py-3"
              id="phonemenu"
            >
              <a href="#" class="site-menu-toggle js-menu-toggle text-white">
                <span class="icon-menu h3"></span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div class="container">
          <div class="row align-items-center">
            <div class="col-11 col-xl-2">
              <h1 class="mb-0 site-logo">
                <a href="/" class="text-white mb-0">
                  IK webshop
                </a>
              </h1>
            </div>
            <div class="col-12 col-md-10 d-none d-xl-block">
              <nav
                class="site-navigation position-relative text-right"
                role="navigation"
              >
                <ul class="site-menu js-clone-nav mr-auto d-none d-lg-block">
                  <li class="nav-item active">
                    <Link to="/">
                      <span>Főoldal</span>
                    </Link>
                  </li>
                  <li class="has-children nav-item">
                    <a href="#">
                      <span>Kategóriák</span>
                    </a>
                    {categories &&
                    <ul class="dropdown arrow-top">
                      <>
                   { categories.map(cat =>
                    
                      <li key={cat.id} value={cat.id}>
                         <button value={cat.id}  onClick={(e) => prodByCat(e.target.value)}>{cat.category}</button>
                      </li>
                      )}
                      </>

                    </ul>
                }
                  </li>

                  <li class="nav-item">
                    <Link to="/contact">
                      <span>Kapcsolat</span>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      <span class="login-button">Bejelentkezés</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div
              class="d-inline-block d-xl-none ml-md-0 mr-auto py-3"
              id="phonemenu"
            >
              <a href="#" class="site-menu-toggle js-menu-toggle text-white">
                <span class="icon-menu h3"></span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
     
      <div>
        <div class=" keresosavdiv">
                  <div class="searchbar">
                    <input
                      class="search_input"
                      id="searchquery"
                      type="text"
                      onChange={(e) => handleChange(e, "searchquery")}
                      placeholder="Keresés..."
                    ></input>
                    <a
                      href="#"
                      class="search_icon"
                      onClick={() => SearchMethodChangeModal()}
                    >
                      <i class="fa-solid fa-gear"></i>
                    </a>
                    <a
                      href="#"
                      class="search_icon"
                      onClick={() =>
                        handleSearchSubmit(searchmethod)
                      }
                    >
                      <i class="fas fa-search"></i>
                    </a>
                  </div>
                </div>
                <div id="myModal2" class="modal"></div>
        <section class="section-products">
          <div class="container-product">
            <div class="row justify-content-center text-center">
              <div class="col-md-8 col-lg-6">
                <div class="header">
                    {products.length > 0 && 
                      <h2 class="new">Új termékek</h2>
                    }
                </div>
                {productLoading &&
                  <h1>Termékek betöltése...</h1>
                }
                {
                  productFilter &&
                  <h1>Termékek szűrése...</h1>
                }
                {/*<label>Keresés típúsa: </label>
                <select
                  onChange={(e) => this.handleChange(e, "searchmethod")}
                  id="search"
                >
                  <option id="search" value="textSearch">
                    Szöveges (Termék címe, leírása alapján)
                  </option>
                  <option id="search" value="inaccurateSearch">
                    "Pontatlan" kulcsszavas (A kulcsszó bármelyik tárgynál
                    szerepelhet)
                  </option>
                  <option id="search" value="accurateSearch">
                    "Pontos" kulcsszavas (A kulcsszavak mindegyike szerepel a
                    tárgynál)
                  </option>
                </select>*/}
                {products.length < 1 && !productLoading && !productFilter &&
                  <h1>Nincsenek elérhető termékek!</h1>
                }
              </div>
            </div>
            <div class="row">
                 
              {products.map((product, index) => (
                product.p ?
                <div key={product.p.id} class="col-md-6 col-lg-4 col-xl-3 single-product-card">
                  <div id={product.p.id}  name="single-product" class="single-product">
                    <div
                      onClick={() => ModaliuszLeviosza(product, index)}
                      class="part-1"
                      style={{
                        backgroundImage: `url(${getMainImage(product)})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    >
                      {user !== null && (
                        <ul>
                          <li>
                            <a
                              onClick={() => addToCart(product.p.id, 1)}
                              href="#"
                            >
                              <i
                                class="fa fa-lg fa-cart-plus"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </li>
                        </ul>
                      )}
                      {product.p.sale_price != product.p.price  ?
                      <>
                      <h2 class="discount">Akciós</h2>
                      </>
                      :
                      <>
                      <span class="new">Új</span>
                      </>
                    }
                      
                     
                    
                    </div>
                    {product.p.sale_price != product.p.price && 
                        <div>AKCIÓS TERMÉK!</div>
                      }
                    <div class="part-2">
                    
                      <h3 class="product-title">{product.p.name}</h3>
                      
                      {product.p.sale_price != product.p.price && product.p.sale_price < product.p.price ?
                      <>
                      <h4 class="product-price">{product.p.price} Ft helyett: </h4>
                      <h4> {product.p.sale_price} Ft.</h4>
                      </>
                      :
                      <>
                      <h4 class="product-price">{product.p.price}Ft.</h4>
                      </>
                 }
                      {/*{product && product.images[index] && product.images[index].image_url && product.images[index].image_url ? <h4 class="product-price"><img src={product.images[index].image_url} alt="cs"></img></h4>
                                                                                                         : <h4 class="product-price"><img alt="cs"></img></h4>}*/}
                    </div>
                  </div>
                </div>
                
                :
                 null
              ))}
              
             
              </div>
              </div>
        </section>
      </div>
      </>
    );
  
                                                                                                        }
