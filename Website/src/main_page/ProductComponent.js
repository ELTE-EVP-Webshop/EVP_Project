import React, { useState, useEffect } from "react";
import { user } from "./Header";
import BasketService from "../services/BasketService";
import ProductService from "../services/ProductService";
class ProductComponent extends React.Component {
  state = {
    products: [],
  };
  basket = BasketService.getBasketProduct();
 cartAddOne=false
  async componentDidMount() {
    //Fetch verzió
    //const response = await fetch('http://localhost:8080/api/app/productsListing')
    // const body = await response.json();
    //  this.setState({ products: body });

    //Axios verzió
    const data = await ProductService.getProducts();
    this.setState({ products: data });

     console.log(ProductService.getProducts()) 
   
  }
 
  addToCart = (productid, count) => {
        this.cartAddOne=true;
        BasketService.addBasketProduct(productid, count);
  };
  vanekep = (product, index) => {
    
    return product &&product.images[index] &&product.images[index].image_url &&product.images[index].image_url? product.images[index].image_url: "https://thumbs.dreamstime.com/b/error-not-found-symbol-logo-design-vector-232023001.jpg"
	};
	
	getMainImage = (product) => {
		if(product && product.images.length > 0) return product.images.sort((img1, img2) => img1.priority > img2.priority ? 1 : -1)[0].image_url;
		return "https://thumbs.dreamstime.com/b/error-not-found-symbol-logo-design-vector-232023001.jpg";
	};
  ModaliuszLeviosza = (product,kepindex) => {
    
        if(!this.cartAddOne)
        {
            var modal = document.getElementById("myModal");
            modal.style.display = "block";
            document.getElementById("myModal").innerHTML =
                    "<div class='modal-inside'>" +
                    "<span class='close' id='close' name='close'>&times;</span>" +
                      "<div class='modal-content'>" +
                            "<img class='modalIMG' src='"+ this.vanekep(product,kepindex)+"' alt='Easter egg' ></img>"+
                            "<div class='modal-content-detail'>" +
                              "<p class='modalName'>" +product.p.name +"</p> " +
                              "<p class='modalDesc'>" +product.p.description +"</p>" +
                              "<p class='modalPrice'>" +product.p.price +"Ft. /db</p>" +
                            "</div>"+ 
                      "</div>"+ 
                    "</div>";
            document.getElementsByClassName("close")[0].addEventListener("click", function () {
                    modal.style.display = "none";
                    });
            var modal = document.getElementById("myModal");
            window.addEventListener("click", function (event) {
            if (event.target == modal) {
                    modal.style.display = "none";
            }
            });
        }
        this.cartAddOne=false;
  };
  

  render() {
    // const {products}= this.state
    const result = this.state.products;
    if (user !== null) {
      console.log(user.username);
    } else console.log("A macska rúgja meg!");
    try {
      result.map((product, index) =>
        console.log(product.p.name + " " + product.images[index].image_url)
      );
    } catch {
      console.log("Azért a banánnak is van ám vége!");
    }

    return (
      <div>
        <section class="section-products">
          <div class="container-product">
            <div class="row justify-content-center text-center">
              <div class="col-md-8 col-lg-6">
                <div class="header">
                  <h2 class="new">Új termékek</h2>
                </div>
              </div>
            </div>
            <div class="row">
              {result.map((product, index) => (
                <div key={product.p.id} class="col-md-6 col-lg-4 col-xl-3">
                  <div id={product.p.id} class="single-product">
                    <div onClick={() => this.ModaliuszLeviosza(product,index)} class="part-1"
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
                            <a onClick={() => this.addToCart(product.p.id, 1)}href="#">
                              <i class="fa fa-lg fa-cart-plus" aria-hidden="true"></i>
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
              
              <div id="myModal" class="modal">

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
