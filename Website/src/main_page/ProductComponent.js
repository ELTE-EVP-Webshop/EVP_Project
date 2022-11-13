import React from 'react'

class ProductComponent extends React.Component {


        state = {
            products:[]
        };


   async componentDidMount() {
    const response = await fetch('/productsListing')
    const body = await response.json();
    this.setState({products: body});
    //console.log(body);
        
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
                                <tr key={product.p.id}>
                                    <td>{product.p.id}</td>
                                    <td>{product.p.name}</td>
                                    <td>{product.p.description}</td>
                                    <td>{product.p.price}</td>
                                    <td>{product.p.sale_price}</td>

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

