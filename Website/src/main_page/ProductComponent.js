import React, { useState, useEffect } from "react";
import { user } from "./Header";
import BasketService from "../services/BasketService";
import ProductService from "../services/ProductService";
import Header from "./Header";
import $ from "jquery";
import ReactDOMServer from "react-dom/server";

class ProductComponent extends React.Component {
  state = {
    products: [],
    filterProducts: [],
    categories: 0,
    result: [],
    searchMethod: "textSearch",
    searchQuery: "",
  };
  basket = BasketService.getBasketProduct();

  cartAddOne = false;

  async componentDidMount() {
    //Fetch verzió
    //const response = await fetch('http://localhost:8080/api/app/productsListing')
    // const body = await response.json();
    //  this.setState({ products: body });
    //Axios verzió
    const productAxios = await ProductService.getProducts();
    this.setState({ products: productAxios });
    /*  const catAxios = await ProductService.getCategories();
    this.setState({ categories: catAxios });*/
    console.log(ProductService.getProducts());
    await this.setState({ result: this.state.products });
    try {
    await this.setState({result : this.state.filterProducts})
    } catch {
      console.log("jézusmárja")
    }

    //  await this.setState({result : this.state.filterProducts})
    

  }

  handleChange = (event, id) => {
    switch (id) {
      case "searchmethod":
        switch (event.target.value) {
          case "textSearch":
            this.setState({ searchMethod: event.target.value });
            break;
          case "inaccurateSearch":
            this.setState({ searchMethod: event.target.value });
            break;
          case "accurateSearch":
            this.setState({ searchMethod: event.target.value });
            break;
        }

        break;
      case "searchquery":
        this.setState({ searchQuery: event.target.value });
        console.log(event.target.value);
        break;
    }
  };

  handleSearchSubmit = (searchType) => {
    switch (searchType) {
      case "textSearch":
        var filteredProducts = ProductService.findProductsByFilterText(
          this.state.searchQuery
        );
        this.setState({ filterProducts: filteredProducts });
        break;
      case "inaccurateSearch":
        var filteredProducts = ProductService.findProductsByKeywordAny(
          this.state.searchQuery
        );
        this.setState({ filterProducts: filteredProducts });
        break;
      case "accurateSearch":
        var filteredProducts = ProductService.findProductsByKeywordAll(
          this.state.searchQuery
        );
        this.setState({ filterProducts: filteredProducts });
        break;
    }
  };

  componentDidUpdate() {
    
  }

  anyad() {
    alert("anyád");
  }

  /*componentWillReceiveProps() {
    this.setState({ categories: this.props.categories });

    var catid = this.state.categories;
    var products = Object.values(this.state.result);
    // var products = this.state.result.filter((ob) =>catid === ob.categories.category_id);
    var filtered = ProductService.findProductsByCategory(this.props.categories);
    console.log(this.props.categories);
    // this.setState({result : filtered})
    console.log(filtered);
  };*/

  addToCart = (productid, count) => {
    this.cartAddOne = true;
    BasketService.addBasketProduct(productid, count);
  };
  
  vanekep = (product, index) => {
    return product &&
      product.images[index] &&
      product.images[index].image_url &&
      product.images[index].image_url
      ? product.images[index].image_url
      : "https://thumbs.dreamstime.com/b/error-not-found-symbol-logo-design-vector-232023001.jpg";
  };

  getMainImage = (product) => {
    if (product && product.images.length > 0)
      return product.images.sort((img1, img2) =>
        img1.priority > img2.priority ? 1 : -1
      )[0].image_url;
    return "https://thumbs.dreamstime.com/b/error-not-found-symbol-logo-design-vector-232023001.jpg";
  };

  ModaliuszLeviosza = (product, kepindex) => {
    if (!this.cartAddOne) {
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
      document.getElementById("myModal").innerHTML =
        "<div class='modal-inside'>" +
          "<span class='close' id='close' name='close'>&times;</span>" +
          "<div class='modal-content'>" +
            "<img class='modalIMG' src='" + this.vanekep(product, kepindex) + "' alt='Easter egg' ></img>" +
            "<div class='modal-content-detail'>" +
              "<p class='modalName'>" +product.p.name +"</p> " +
              "<p class='modalDesc'>" + product.p.description +"</p>" +
              "<p class='modalPrice'>" +product.p.sale_price + "Ft. /db</p>" +
              "<input type='number' width='10px'></input>"+
            "</div>" +
          "</div>" +
        "</div>";
      var _ = this;
      $("#close").click(function () {
        modal.style.display = "none";
        _.anyad();
      });

      var modal = document.getElementById("myModal");
      window.addEventListener("click", function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      });
    }
    this.cartAddOne = false;
  };

  melyikvalasztva(resz) {
    switch (resz) {
      case 1:
        if (this.state.searchMethod == "textSearch") {
          return "<option id='search' value='textSearch' selected>";
        } else {
          return "<option id='search' value='textSearch'>";
        }
        break;

      case 2:
        if (this.state.searchMethod == "inaccurateSearch") {
          return "<option id='search' value='inaccurateSearch' selected>";
        } else {
          return "<option id='search' value='inaccurateSearch'>";
        }
        break;

      case 3:
        if (this.state.searchMethod == "accurateSearch") {
          return "<option id='search' value='accurateSearch' selected>";
        } else {
          return "<option id='search' value='accurateSearch' >";
        }
        break;
    }
  };

  SearchMethodChangeModal() {
    var modal = document.getElementById("myModal2");
    modal.style.display = "block";

    document.getElementById("myModal2").innerHTML =
      "<div class='modal-inside'>" +
          "<span class='close' id='close' name='close'>&times;</span>" +
          "<div class='modal-content'>" +
            "<label>Keresés típúsa: </label>" +
            "<select id='search' class='keresModValaszt' >" +
              this.melyikvalasztva(1) +
                "Szöveges (Termék címe, leírása alapján)" +
              "</option>" +
              this.melyikvalasztva(2) +
                "'Pontatlan' kulcsszavas (A kulcsszó bármelyik tárgynál szerepelhet)" +
              "</option>" +
              this.melyikvalasztva(3) +
                "'Pontos' kulcsszavas (A kulcsszavak mindegyike szerepel a tárgynál)" +
              "</option>" +
            "</select>" +
          "</div>" +
        "</div>";
    var _ = this;
    $("#close").click(function () {
      modal.style.display = "none";
      //_.anyad();
    });
    $("#search").change(function (event) {
      modal.style.display = "none";
      _.handleChange(event, "searchmethod");
    });
    var modal = document.getElementById("myModal2");
    window.addEventListener("click", function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  }

  render() {
    // const {products}= this.state

   // console.log(this.state.searchMethod);

   // var result = this.state.result
  //  console.log(this.state.filterProducts);

   // if (user !== null) {
     // console.log(user.username);
   // } else console.log("A macska rúgja meg!");
  try {
     console.log(this.state.filterProducts)
     
      console.log(this.state.result);
    } catch {
      console.log("Azért a banánnak is van ám vége!");
    }
    //console.log(this.state.categories)
    return (
      <div>
        <div class=" keresosavdiv">
                  <div class="searchbar">
                    <input
                      class="search_input"
                      id="searchquery"
                      type="text"
                      onChange={(e) => this.handleChange(e, "searchquery")}
                      placeholder="Keresés..."
                    ></input>
                    <a
                      href="#"
                      class="search_icon"
                      onClick={() => this.SearchMethodChangeModal()}
                    >
                      <i class="fa-solid fa-gear"></i>
                    </a>
                    <a
                      href="#"
                      class="search_icon"
                      onClick={() =>
                        this.handleSearchSubmit(this.state.searchMethod)
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
              {this.state.result.map((product, index) => (
                <div key={product.p.id} class="col-md-6 col-lg-4 col-xl-3">
                  <div id={product.p.id} class="single-product">
                    <div
                      onClick={() => this.ModaliuszLeviosza(product, index)}
                      class="part-1"
                      style={{
                        backgroundImage: `url(${this.getMainImage(product)})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    >
                      {user !== null && (
                        <ul>
                          <li>
                            <a
                              onClick={() => this.addToCart(product.p.id, 1)}
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
              ))}

              <div id="myModal" class="modal"></div>
              <div class="col-md-6 col-lg-4 col-xl-3">
                <div id="product-3" class="single-product">
                  <div class="part-1">
                    <ul>
                      <li>
                        <a href="#">
                          <i class="fa fa-cart-plus" aria-hidden="true"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="part-2">
                    <h3 class="product-title">Teszt</h3>
                    <h4 class="product-old-price">$79.99</h4>
                    <h4 class="product-price">$49.99</h4>
                  </div>
                </div>
              </div>

              <div class="col-md-6 col-lg-4 col-xl-3">
                <div id="product-3" class="single-product">
                  <div class="part-1">
                    <ul>
                      <li>
                        <a href="#">
                          <i class="fa fa-cart-plus" aria-hidden="true"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="part-2">
                    <h3 class="product-title">Teszt</h3>
                    <h4 class="product-old-price">$79.99</h4>
                    <h4 class="product-price">$49.99</h4>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-4 col-xl-3">
                <div id="product-3" class="single-product">
                  <div class="part-1">
                    <ul>
                      <li>
                        <a href="#">
                          <i class="fa fa-cart-plus" aria-hidden="true"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="part-2">
                    <h3 class="product-title">Teszt</h3>
                    <h4 class="product-old-price">$79.99</h4>
                    <h4 class="product-price">$49.99</h4>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-4 col-xl-3">
                <div id="product-3" class="single-product">
                  <div class="part-1">
                    <ul>
                      <li>
                        <a href="#">
                          <i class="fa fa-cart-plus" aria-hidden="true"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="part-2">
                    <h3 class="product-title">Teszt</h3>
                    <h4 class="product-old-price">$79.99</h4>
                    <h4 class="product-price">$49.99</h4>
                  </div>
                </div>
              </div>
              <div class="col-md-6 col-lg-4 col-xl-3">
                <div id="product-3" class="single-product">
                  <div class="part-1">
                    <ul>
                      <li>
                        <a href="#">
                          <i class="fa fa-cart-plus" aria-hidden="true"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="part-2">
                    <h3 class="product-title">Teszt</h3>
                    <h4 class="product-old-price">$79.99</h4>
                    <h4 class="product-price">$49.99</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ProductComponent;
