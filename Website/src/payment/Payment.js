import React, { useState } from 'react'
import { subTotalPrice } from '../cart/ShoppingCart'
import PayService from '../services/PayService';
export default function Payment() {
        const [phone, setPhone] = useState("");
        const [country, setCountry] = useState("");
        const [country2, setCountry2] = useState("")
        const [city, setCity] = useState("")
        const [street, setStreet] = useState("")
        const [housenumber, setHousenumber] = useState(1)
        const [paymethod, setPaymethod] = useState(1)
        const [bankTranferVisible, setBankTransferVisible] = useState(true)

        const handleChange = (event, id) => {
                //this.setState({count: event.target.value})
                switch(id) {
                        case 'phone':
                                setPhone(event.target.value)
                        break;
                        case 'country':
                                setCountry(event.target.value)
                        break;
                        case 'country2':
                                setCountry2(event.target.value)
                        break;
                        case 'city':
                                setCity(event.target.value)
                        break;
                        case 'street':
                                setStreet(event.target.value)
                        break;
                        case 'housenumber':
                                setHousenumber(event.target.value)
                        break;
                        case 'paymethod':
                                switch(event.target.value) {
                                        case 'BANKI_UTALAS':
                                                setPaymethod(1);
                                                setBankTransferVisible(true)
                                        break;
                                        case 'KP_UTANVET':
                                                setPaymethod(2);
                                                setBankTransferVisible(false)
                                        break;
                                        case 'KARTYAS_UTANVET':
                                                setPaymethod(3);
                                                setBankTransferVisible(false)
                                        break;
                                }
                        break;
                }
                console.log(event.target.value)

              };


              const handlePay = (phone, country, country2, city, street, housenumber, paymethod) => {
                PayService.completeOrder(phone,country, country2, city, street, housenumber, paymethod);
              }

        if(subTotalPrice != 0) {
        return (
                
                        <div>
                               <h1>Fizetés</h1>
                               <h3>Kérjük töltse ki az alábbi mezőket!</h3>
                               <form action='post'>
                                <label for="phone" >Telefonszám: </label>
                                <input onChange={(e)=> handleChange(e,"phone")} id="phone" placeholder='+36305613138' type="text" value={phone} required></input>
                                <label for="country">Ország: </label>
                                <input onChange={(e)=> handleChange(e,"country")} id="country" type="text" placeholder='Magyarország' value={country} required></input>
                                <label for="country2">Megye: </label>
                                <input onChange={(e)=> handleChange(e,"country2")} id="country2" placeholder='Vas' type="text" value={country2} required></input>
                                <label for="city">Város: </label>
                                <input onChange={(e)=> handleChange(e,"city")} id="city" placeholder='Vép' type="text"  value={city} required></input>
                                <label for="street">Utca: </label>
                                <input onChange={(e)=> handleChange(e,"street")} id="street" placeholder='Kacérgiliszta utca' type="text" value={street} required></input>
                                <label for="housenumber">Házszám: </label>
                                <input onChange={(e)=> handleChange(e,"housenumber")} id="housenumber" placeholder='7' type="number"  value={housenumber} maxLength="5"  onKeyPress={(event) => {
                                                        if (!/[0-9]/.test(event.key)) {
                                                        event.preventDefault();
                                                        }
                                                }} required></input>
                                <label for="paymethod">Fizetési Mód: </label>
                                <select onChange={(e)=> handleChange(e,"paymethod")} id="paymethod" required>
                                        <option id="paymethod" selected value="BANKI_UTALAS">Banki utalás</option>
                                        <option id="paymethod" value="KP_UTANVET">Készpénz utánvét</option>
                                        <option id="paymethod" value="KARTYAS_UTANVET">Kártyás utánvét</option>
                                </select>
                                {bankTranferVisible &&
                                        <div>
                                                <p>Kedvezményezett neve: <b>Incidens Kar Kft.</b></p>
                                                <p>Számlavezető bank: <b>Incidens Bank</b></p>
                                                <p>Számlaszám: <b>11709002-20650786-00000000</b></p>
                                                <p>Közlemény: <b>[Kérem itt tüntesse fel megrendelése azonosítóját, rendelészámát]</b></p>
   
                                        </div>
                                }
                                <button onClick={()=> handlePay(phone, country, country2, city, street, housenumber, paymethod)} type="button" class="btn btn-success">Fizetés</button>
                                </form>
                                <h3>Végösszeg: {subTotalPrice} Ft</h3>

                        </div>
                
                
        )
        }
        else {
                window.location.assign("/cart")
        }

}



