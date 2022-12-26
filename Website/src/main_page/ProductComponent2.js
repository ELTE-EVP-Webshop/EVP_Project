import React,{ useState, useEffect } from "react";
import ProductService from "../services/ProductService";
import BasketService from "../services/BasketService";
import $ from "jquery";
import { user } from "./Header";
export default function ProductComponent2() {

var [products, setProducts] = useState([])
var [productLoading, setProductLoading] = useState(true)
var [basket] = useState([])
var [searchmethod, setSearchMethod] = useState("textSearch")
var [searchquery, setSearchQuery] = useState("")

var cartAddOne = false;
basket = BasketService.getBasketProduct();

useEffect(() => {
    async function getProducts() {
        var fetchProducts = await ProductService.getProducts();
        
        setProducts(fetchProducts);
        setProductLoading(false)
    }
    /*async function getBasket() {
        var fetchBasket = await BasketService.getBasketProduct();
        setBasket(fetchBasket);
    }*/

    getProducts()
    
     //getBasket();

    
      
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


  function ModaliuszLeviosza (product, kepindex) {
    if (!cartAddOne) {
      var modal = document.getElementById("myModal2");
      modal.style.display = "block";
      document.getElementById("myModal2").innerHTML =
        "<div class='modal-inside'>" +
          "<span class='close' id='close' name='close'>&times;</span>" +
          "<div class='modal-content'>" +
            "<img class='modalIMG' src='" +vanekep(product, kepindex) + "' alt='Easter egg' ></img>" +
            "<div class='modal-content-detail'>" +
              "<p class='modalName'>" +product.p.name + "</p> " +
              "<p class='modalDesc'>" +product.p.description +"</p>" +
              "<p class='modalPrice'>" + product.p.price + "Ft. /db</p>" +
              "<p class='modalNumberTag modalDesc'>Ennyit a kosárba:</p>" +
              "<div class='row modalNumDIV'>"+
              "<input type='number' id='cartAddMultipleNUM' class='modalNumberNum' value='1' min='0'></input>"+
              "<div id='cartAddMultipleBTN'>"+
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

                  <h2 class="new">Új termékek</h2>
                </div>
                {productLoading &&
                  <h1>Termékek betöltése...</h1>
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
              </div>
            </div>
            <div class="row">
                
              {products.map((product, index) => (
                product.p ?
                <div key={product.p.id} class="col-md-6 col-lg-4 col-xl-3">
                  <div id={product.p.id} class="single-product">
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

                      <span class="new">new</span>
                    </div>

                    <div class="part-2">
                      <h3 class="product-title">{product.p.name}</h3>
                      <h4 class="product-price">{product.p.price}Ft.</h4>
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
    );
  
                                                                                                        }
