import React, {useState, useEffect} from 'react'
import {user} from './Header'
import BasketService from "../services/BasketService";
var listed = null
class ProductComponent extends React.Component {
        

        state = {
                products: [],
                basket: []
        };
        basket = BasketService.getBasketProduct();
        
        async componentDidMount() {
                const response = await fetch('http://localhost:8080/api/app/productsListing')
                const body = await response.json();
                this.setState({ products: body });
                
                const { basket } = this.state;
	        listed = Object.values(basket)
                console.log(listed)
                

        }

        addToCart = (productid, count) => {
               
                let existInCart = false
                
                for(var i = 0; i < listed.length;i++) {
                        if(listed.product_id == productid) {
                                existInCart = true
                        }
                }

                if(existInCart) {
                        alert("Ilyen termék már létezik a kosárban!")
                } else {
                        BasketService.addBasketProduct(productid, count)
                        alert("Termék kosárba rakva!")
                }
               
                    
            
            
           
    }
        ModaliuszLeviosza = (a) => {
                        var modal = document.getElementById("myModal");
                        modal.style.display = "block";
                        document.getElementById("myModal").innerHTML="<div class='modal-content'>"+
                                                                                "<span class='close' id='close' name='close'>&times;</span>"+
                                                                                "<p>Some text in the Modal..</p>"+
                                                                                "<H1>PID: "+ a.product.p.id+"</H1>"+
                                                                                "<H1> név: "+ a.product.p.name+"</H1>"+
                                                                                "<H1> Ár "+ a.product.p.price+"</H1>"+
                                                                        "</div>";   
                        document.getElementsByClassName("close")[0].addEventListener("click",function() {
                                modal.style.display = "none";
                        });     
                        var modal = document.getElementById("myModal");
                        window.addEventListener("click",function(event) {
                                if (event.target == modal) {
                                        modal.style.display = "none";
                                      }
                        });            
              }
                
        render() {
                const { products } = this.state;
                const result = Object.values(products)
                if(user !== null)  {
                        console.log(user.username)
                } else console.log("A macska rúgja meg!")
                try {
                        
                      
                        result.map((product, index) =>

                               
                                console.log(product.p.name+ " "+product.images[index].image_url)
                        )
                
                }
                catch{
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
                                                        
                                                        {
                                                                result.map((product, index) =>
                                                                
                                                                                <div key={product.p.id} class="col-md-6 col-lg-4 col-xl-3">
                                                                                        <div id={product.p.id}  class="single-product">
                                                                                               
                                                                                                <div onClick={() => this.ModaliuszLeviosza({"product":product})} 
                                                                                                class="part-1" 
                                                                                                style={{ backgroundImage: `url(${product && product.images[index] && product.images[index].image_url && product.images[index].image_url  ? product.images[index].image_url : 'https://thumbs.dreamstime.com/b/error-not-found-symbol-logo-design-vector-232023001.jpg'})` ,backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'cover'}}>
                                                                                                    {user !== null && (                   
                                                                                                                
                                                                                                        <ul>
                                                                                                                        <li><a onClick={()=> this.addToCart(product.p.id, 1)} href="#"><i class="fa fa-lg fa-cart-plus" aria-hidden="true"></i></a></li>
                                                                                                                
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
                                                                                
                                                                )          
                                                        }
                                                        
                                                                <div id="myModal" class="modal">
                                                                        
                                                                </div>

                                                               <div class="col-md-6 col-lg-4 col-xl-3">
                                                                <div id="product-3" class="single-product">
                                                                        <div class="part-1">
                                                                                <ul>
                                                                                        <li><a href="#"><i class="fa fa-cart-plus" aria-hidden="true"></i></a></li>
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
                                                                                        <li><a href="#"><i class="fa fa-cart-plus" aria-hidden="true"></i></a></li>
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
                                                                                        <li><a href="#"><i class="fa fa-cart-plus" aria-hidden="true"></i></a></li>
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
                                                                                        <li><a href="#"><i class="fa fa-cart-plus" aria-hidden="true"></i></a></li>
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
                                                                                        <li><a href="#"><i class="fa fa-cart-plus" aria-hidden="true"></i></a></li>
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
                )
        }

}


export default ProductComponent

