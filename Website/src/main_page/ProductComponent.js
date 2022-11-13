import React from 'react'
import axios from 'axios'
import ProductService from '../services/ProductService'

class ProductComponent extends React.Component {


        state = {
            products:[]
        };


   async componentDidMount() {
    const response = await axios.get('http://localhost:8080/productsListing', {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    })
    const body = await response.json();
    this.setState({products: body});
    console.log(body);
        
    }
    

    render(){
        const {products} = this.state;
        return (
            
            <div>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <td>
                                Termék ID
                            </td>
                            <td>
                                Termék neve
                            </td>
                            <td>
                                Leírás
                            </td>
                            <td>
                                Ár
                            </td>
                            <td>
                                Készleten
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(
                                product =>
                                <tr key={product.Id}>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.sale_price}</td>

                                </tr>
                            )
                            
                        }
                    </tbody>
                </table>
            </div>
        )
        }
    
}


export default ProductComponent

