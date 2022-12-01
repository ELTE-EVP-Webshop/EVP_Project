import React from 'react'

class ProductComponent extends React.Component {


        state = {
                products: []
        };


        async componentDidMount() {
                const response = await fetch('http://localhost:8080/api/app/productsListing')
                const body = await response.json();
                this.setState({ products: body });

        }


        render() {
                const { products } = this.state;
                var result = Object.values(products)
                console.log(result);
                return (

                        <div>
                                <section class="section-products">
                                        <div class="container">
                                                <div class="row justify-content-center text-center">
                                                        <div class="col-md-8 col-lg-6">
                                                                <div class="header">
                                                                        <h2 class="new">Új termékek</h2>
                                                                </div>
                                                        </div>
                                                </div>
                                                <div class="row">
                                                        
                                                        {
                                                                result.map(
                                                                        product =>
                                                                                <div key={product.p.id} class="col-md-6 col-lg-4 col-xl-3">
                                                                                        <div id={product.p.id}  class="single-product"  style={{ backgroundImage: `url(${product.images=== undefined  ? product.images[0].image_url : 'https://thumbs.dreamstime.com/b/error-not-found-symbol-logo-design-vector-232023001.jpg'})` ,backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'cover'}}>
                                                                                               
                                                                                                <div class="part-1">
                                                                                                        <ul>
                                                                                                                <li><a href="#"><i class="fa fa-cart-plus" aria-hidden="true"></i></a></li>
                                                                                                        </ul>
                                                                                                        <span class="new">new</span>
                                                                                                </div>
                                                                                                <div class="part-2">
                                                                                                        <h3 class="product-title">{product.p.name}</h3>
                                                                                                        <h4 class="product-old-price">{product.p.sale_price}Ft.</h4>
                                                                                                        <h4 class="product-price">{product.p.price}Ft.</h4>
                                                                                                </div>
                                                                                        </div>
                                                                                </div>
                                                                )          
                                                        }

                                                               <div class="col-md-6 col-lg-4 col-xl-3">
                                                                <div id="product-3" class="single-product">
                                                                        <div class="part-1">
                                                                                <ul>
                                                                                        <li><a href="#"><i class="fa fa-cart-plus" aria-hidden="true"></i></a></li>
                                                                                </ul>
                                                                        </div>
                                                                        <div class="part-2">
                                                                                <h3 class="product-title">Here Product Title</h3>
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
                                                                                <h3 class="product-title">Here Product Title</h3>
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
                                                                                <h3 class="product-title">Here Product Title</h3>
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
                                                                                <h3 class="product-title">Here Product Title</h3>
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
                                                                                <h3 class="product-title">Here Product Title</h3>
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

