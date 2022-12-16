import React from 'react'
import BasketService from "../services/BasketService";
import { result } from '../main_page/ProductComponent';
import ProductService from '../services/ProductService';
import { Link } from 'react-router-dom';
const baskets = BasketService.getBasketProduct();

class ShoppingCart extends React.Component {
	state = {
                products: [],
		basket: [],
                count : 1
	};

        handleChange = (event) => {
                this.setState({count: event.target.value})
               // console.log(event.target.value)
              };
        async componentDidMount() {
                //Fetch verzió
                //const response = await fetch('http://localhost:8080/api/app/productsListing')
               // const body = await response.json();
              //  this.setState({ products: body });
              
              //Axios verzió
              const basketData = await BasketService.getBasketProduct();
                this.setState({basket: basketData});
                const productsData = await ProductService.getProducts();
                this.setState({products: productsData}) 

               // console.log(ProductService.getProducts())

        }
  
	
        render() {
                
               
                                /* Filter products by basket*/
                               var basket = Object.values(this.state.basket)
                               var products = Object.values(this.state.products)
                                var basketId = []

                                for(var i in basket) {
                                        basketId.push(basket[i].product_id)
                                }
                               

                              //  console.log(basketId)

                               products = (products.filter(ob => basketId.includes(ob.p.id)))
                                
                              //console.log(basket)
                             //  console.log(basketId)
                            //products = products.filter(x => x.includes(basket.product_id));


                      if(products) {
                return (
                        
                        <div>
                        <section class="section-products">
                                <div class="container-product">
                                        <div class="row justify-content-center text-center">
                                                <div class="col-md-8 col-lg-6">
                                                        <div class="header">
                                                                <h2 class="new">Incidens Kosár</h2>
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="row">
                                                
                                                {
                                                        products.map((product, index) =>
                                                        
                                                                        <div key={product.p.id} class="col-md-6 col-lg-4 col-xl-3">
                                                                                <div id={product.p.id}  class="single-product">
                                                                                       
                                                                                        <div 
                                                                                        class="part-1" 
                                                                                        style={{ backgroundImage: `url(${product && product.images[index] && product.images[index].image_url && product.images[index].image_url  ? product.images[index].image_url : 'https://thumbs.dreamstime.com/b/error-not-found-symbol-logo-design-vector-232023001.jpg'})` ,backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'cover'}}>
                                                                                            {/*{user !== null && (                   
                                                                                                        
                                                                                                <ul>
                                                                                                                <li><a onClick={()=> this.addToCart(product.p.id, 1)} href="#"><i class="fa fa-lg fa-cart-plus" aria-hidden="true"></i></a></li>
                                                                                                        
                                                                                                </ul>
                                                                                            )}
                                                                                             
                                                                                            <span class="new">new</span>*/}
                                                                                            
                                                                                                         
                                                                                        </div>
                                                                                            
                                                                                        <div class="part-2">
                                                                                                <h3 class="product-title">{product.p.name}</h3>
                                                                                                <h4 class="product-price">{product.p.price}Ft.</h4>
                                                                                                <button onClick={()=> BasketService.removeBasketProduct(product.p.id)} type="button" class="btn btn-warning">Törlés</button>
                                                                                                {/*{product && product.images[index] && product.images[index].image_url && product.images[index].image_url ? <h4 class="product-price"><img src={product.images[index].image_url} alt="cs"></img></h4>
                                                                                                 : <h4 class="product-price"><img alt="cs"></img></h4>}*/}
                                                                                               
                                                                                        </div>
                                                                                </div>
                                                                        </div>
                                                                        
                                                        )          
                                                }
                                                 
                                                {basket.map(b =>
                                                <div key={b.product_id}>
                                                       <label for="pcount">Mennyiség:</label>
                                                <input onChange={this.handleChange} id="pcount" type="number" defaultValue={b.count} onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                        }
                                                }}></input>
                                                        <button onClick={() => BasketService.updateBasketProduct(b.product_id, this.state.count)} type='button' class="btn btn-info">Frissít</button>
                                                
                                                </div>
                                                        )}
                                                       
                                                 
                                                </div>
                                                <button type='button' class="btn btn-success"><Link to="/payment">Fizetés</Link></button>
                                        </div>
                                        </section>
                                </div>
                )
                                        } else {
                                                return (
                                                        <div>A kosarad üres!</div>
                                                )
                                        }
                                        
        }

}


export default ShoppingCart
