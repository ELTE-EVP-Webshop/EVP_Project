import React from 'react'
import ProductService from '../services/ProductService'

class ProductComponent extends React.Component {

    super() {
        this.state = {
            products:[]
        }
    }

    componentDidMount() {
        ProductService.getProducts().then((response) => {
            this.setState({
                products : response.data
            })
        });
    }

    render(){
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.products.map(
                                product =>
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>

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

