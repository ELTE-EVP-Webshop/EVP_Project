import React from "react";
import BasketService from "../services/BasketService";
import ProductService from "../services/ProductService";
import { Link } from "react-router-dom";

const baskets = BasketService.getBasketProduct();
export var subTotalPrice = 0;
class ShoppingCart extends React.Component {
  state = {
    products: [],
    basket: [],
    count: 1,
    subTotal: 0,
  };

  handleChange = (event) => {

    this.setState({ count: event.target.value });
    

    // console.log(event.target.value)
  };

  handleSubmit = (productId, count) => {
    
    BasketService.updateBasketProduct(
                                  
      productId,
      count
    )
  //  window.location.reload("/")
  }

  handleDelete = (productId) => {
    
    BasketService.removeBasketProduct(
                                  
      productId
    )
 //   window.location.reload("/")
  }

  async componentDidMount() {
    //Fetch verzió
    //const response = await fetch('http://localhost:8080/api/app/productsListing')
    // const body = await response.json();
    //  this.setState({ products: body });

    //Axios verzió
    const basketData = await BasketService.getBasketProduct();
    this.setState({ basket: basketData });
    const productsData = await ProductService.getProducts();
    this.setState({ products: productsData });

    this.calculateSubTotal();
  }
  calculateSubTotal = () => {
    var basket = Object.values(this.state.basket);
    var products = Object.values(this.state.products);

    var subtotal = 0;
    for (var i = 0; i < products.length; i++) {
      for (var j = 0; j < basket.length; j++) {
        if (products[i].p.id == basket[j].product_id) {
          subtotal += products[i].p.sale_price * basket[j].count;
        }
      }
    }
    this.setState({ subTotal: subtotal });
  };

  render() {

    function getMainImage(product) {
      if (product && product.images.length > 0)
        return product.images.sort((img1, img2) =>
          img1.priority > img2.priority ? 1 : -1
        )[0].image_url;
      return "https://thumbs.dreamstime.com/b/error-not-found-symbol-logo-design-vector-232023001.jpg";
    };

    /* Filter products by basket*/
    var basket = Object.values(this.state.basket);
    var products = Object.values(this.state.products);
    var basketId = [];

    for (var i in basket) {
      basketId.push(basket[i].product_id);
    }

    //  console.log(basketId)

    products = products.filter((ob) => basketId.includes(ob.p.id));
    
    //console.log(basket)
    //  console.log(basketId)
    //products = products.filter(x => x.includes(basket.product_id));

    if (this.state.products.length > 0) {
      subTotalPrice = this.state.subTotal;
      // console.log(subTotalPrice)
      return (
        <div>
          <section class="section-products">
            <div class="container-cart">
              <div class="row justify-content-center text-center">
                <div class="col-md-8 col-lg-6">
                <div class="cart-header">
                  <h2 class="new">Kosár</h2>
                </div>
                </div>
              </div>
              <div class="cart-items">
                <div class="row cart-row">
                  <table class="cartitem-table">
                    {products.map((product, index) => (
                      <tr>
                        <div
                          key={product.p.id}
                          class="col-md-6 col-lg-4 col-xl-3 cart-item"
                        >
                          <div id={product.p.id} class="single-product-cart">
                            <div
                              class="part-1"
                              style={{
                                backgroundImage: `url(${ getMainImage(product) })`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }}
                            >
                        
     
            </div>
            
         
                            <div class="part-2">
                            
                       
          
                       
            
                              <h3 class="product-title">{product.p.name}</h3>
                              <h4 class="product-price">
                                {product.p.sale_price}Ft.
                              </h4>
                              
                              {/*{product && product.images[index] && product.images[index].image_url && product.images[index].image_url ? <h4 class="product-price"><img src={product.images[index].image_url} alt="cs"></img></h4>
                                                                                                 : <h4 class="product-price"><img alt="cs"></img></h4>}*/}
                            </div>
                          </div>
                        </div>
                        <hr class="vonal"></hr>
                      </tr>
                      
                    ))}
                  </table>
                  <table class="cartcount-table">
                    {products.length > 0 &&
                      basket.map((b) => (
                        <tr>
                          <div key={b.product_id} class="item-count">
                            <label for="pcount" class="mennyiseg">Mennyiség:</label>
                            <input
                              class="count"
                              onChange={this.handleChange}
                              id="pcount"
                              type="number"
                              
                              defaultValue={b.count}
                              onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                  event.preventDefault();
                                }
                              }}
                            ></input><br></br>
                            <button
                              onClick={() =>
                                
                                this.handleSubmit(b.product_id, this.state.count)
                              }
                              type="button"
                              class="btn btn-info gomb"
                            >
                              <i class="fa-solid fa-rotate fa-l"></i>
                            </button>
                            <button
                                onClick={() =>
                                  this.handleDelete(b.product_id)
                                }
                                type="button"
                                class="btn btn-warning gomb"
                              >
                               <i class="fa-solid fa-trash fa-l"></i>
                              </button>
                              
                          </div>
                          <hr class="vonal"></hr>
                        </tr>
                      ))}
                  </table>
                </div>

                {products.length > 0 ? (
                  <>
                    <h3 class="finalprice">Végösszeg: {this.state.subTotal == 0 ? "Komputálás... " : this.state.subTotal + " HUF"} </h3>
                     <div class="pay">

                     
                    <button type="button" class="btn btn-success btnpay">
                      <Link to="/payment">Fizetés</Link>
                    </button>
                    </div>
                  </>
                ): 
                <>
                  <h1 className="text-center">A kosarad üres!</h1>
                </>
                }
              </div>
            </div>
          </section>
        </div>
      );
    } else {
      return <h1 className="text-center">Kosár betöltése...</h1>;
    }
  }
}

export default ShoppingCart;
