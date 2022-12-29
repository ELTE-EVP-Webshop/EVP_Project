import React from 'react'
import PayService from '../services/PayService'
const orders =  PayService.getOrders();
export default function Orders() {
    //console.log(orders) 400-as hiba
  return (

    <div className='text-center'>Rendelések</div>
  )
}
