import React from 'react'
import BasketService from "../services/BasketService";

class ShoppingCart extends React.Component {
	state = {
		basket: []
	};
	
	basket = BasketService.getBasketProduct();
	
        render() {
				const { basket } = this.state;
				var listed = Object.values(basket)
                return (

                        <div>
                               <h1>Kosár tartalma</h1>
                        </div>
                )
        }
}


export default ShoppingCart
