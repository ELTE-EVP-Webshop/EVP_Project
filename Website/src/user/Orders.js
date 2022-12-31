import React, { useEffect, useState } from 'react'
import PayService from '../services/PayService'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [orderProducts, setOrderProducts] = useState([])
  const [orderProductsVisible, setOrderProductsVisible] = useState(false)
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
                                        <p>Termék azonosító: {oproduct.product_id}</p>
                                        <p>Mennyiség: {oproduct.count}</p>
                                        <p>Ár: {oproduct.price}</p>
                                        <p>Rendelési azonosító: {oproduct.order_id}</p>
                                        <br></br>
                                    </>
                                    )}
                                     
                                   </>
                                 }
      </>
  )
}
