import React, { useEffect, useState } from 'react'
import PayService from '../services/PayService'
import ProductService from '../services/ProductService'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [productbyId, setProductById] = useState("")
  const [orderProducts, setOrderProducts] = useState([])
  const [orderProductsVisible, setOrderProductsVisible] = useState(false)
  const [OtherProdInfoVisible, setOtherProdInfoVisible] = useState(false)
  async function  handleOrderProducts(orderid) {


     // console.log(orderid)
   // var orderProductsvar = await PayService.getOrderProducts(orderid);
    
    // await setOrderProductsId(orderid)
      getOrderProducts(orderid);
  }

  async function getOrderProducts(orderid) {
    if(orderid != 0) {
      if(!orderProductsVisible) {
        await setOrderProductsVisible(true)
      } else {
        await setOrderProductsVisible(false)
      }
      var getoproducts = await PayService.getOrderProducts(orderid)
     await setOrderProducts(JSON.parse(getoproducts))
    
    }
  }

  async function otherProdInfo(productId)  {
    

   
    await getProductById(productId)
  }
  
  async function getProductById(productid) {
    if(productid != 0) {
     
      var getProductById = await ProductService.getProductById(productid)
     await setProductById((getProductById))
     if(OtherProdInfoVisible) {
      setOtherProdInfoVisible(false)
    } else {
      setOtherProdInfoVisible(true)
    }
   // console.log(getProductById)
    
    }
  } 


  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    async function getOrders() {
      const orders =  await PayService.getOrders();
      setOrders(JSON.parse(orders))
   }


   getOrders();

    }, []);
  return (
    <>
    <h1 className='text-center'>Rendelési előzmények</h1>
    {orders.map(order =>
      <>
                                <p>Azonosító: {order.id}</p>
                                <p>Rendelés dátuma: {order.order_date}</p>
                                <p>Rendelés állapota: {order.order_state}</p>
                                <p>Fizetés módja: {order.payment_method}</p>
                                <p>Fizetés állapota: {order.payment_state}</p>
                                <p>Szállítás módja: {order.delivery_method}</p>
                                <p>Telefonszám: {order.phone}</p>
                                <p>Ország: {order.country}</p>
                                <p>Megye: {order.country_1}</p>
                                <p>Irányítószám: {order.post_code}</p>
                                <p>Város: {order.city}</p>
                                <p>Utca: {order.street}</p>
                                <p>Házszám: {order.house_number}</p>
                                <p>Egyéb info:{order.post_other}</p>
                                <button onClick={()=> handleOrderProducts(order.id)} className='btn btn-success'>Rendeléshez tartozó termékek megtekintése</button>
                                <br></br>
                                

      </>
      )}
      {orderProductsVisible && 
                                  <>
                                  <h3>Rendeléshez tartozó termék(ek)</h3>
                                  
                                 {orderProducts.map(oproduct =>
                                 <>
                     
                                    
                                        
                                        <p>Mennyiség: {oproduct.count}</p>
                                        <p>Ár: {oproduct.price}</p>
                                        <p>Rendelési azonosító: {oproduct.order_id}</p>
                                        <button onClick={() => otherProdInfo(oproduct.product_id)} className='btn btn-secondary'>Termék további adatai</button>
                                       
                                        <br></br>
                                    </>
                                    )}
                                     {OtherProdInfoVisible &&
                                          <>
                                          <div>Termék további adatai:</div>
                                            
                                                <>
                                                  <p>Termék neve: {productbyId.p.name}</p>
                                                  <p>Termék ára: {productbyId.p.price}</p>
                                                  <p>Termék eladási ára: {productbyId.p.sale_price}</p>
                                                  <p>Termék leírása: {!productbyId.p.description ? "Nincs" : productbyId.p.description}</p>
                                                </>
                                              
                                             
                                          </>
                                        
                                        }
                                     
                                   </>
                                 }
      </>
  )
}
