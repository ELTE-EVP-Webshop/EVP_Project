import React, { useState } from "react";
import { subTotalPrice } from "../cart/ShoppingCart";
import PayService from "../services/PayService";
export default function Payment() {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [country2, setCountry2] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [housenumber, setHousenumber] = useState(null);
  const [paymethod, setPaymethod] = useState(1);
  const [deliverymethod, setDeliveryMethod] = useState(0);
  const [bankTranferVisible, setBankTransferVisible] = useState(true);
  const [OtherMethodVisible, setOtherMethodVisible] = useState(false);
  const [TermsOfService, setTermsOfService] = useState(false);

  const handleChange = (event, id) => {
    //this.setState({count: event.target.value})
    switch (id) {
      case "phone":
        setPhone(event.target.value);
        break;
      case "country":
        setCountry(event.target.value);
        break;
      case "country2":
        setCountry2(event.target.value);
        break;
      case "city":
        setCity(event.target.value);
        break;
      case "street":
        setStreet(event.target.value);
        break;
      case "housenumber":
        setHousenumber(event.target.value);
        break;
      case "paymethod":
        switch (event.target.value) {
          case "BANKI_UTALAS":
            setPaymethod(1);
            setBankTransferVisible(true);
            setOtherMethodVisible(false);
            break;
          case "KP_UTANVET":
            setPaymethod(2);
            setBankTransferVisible(false);
            setOtherMethodVisible(true);
            break;
          case "KARTYAS_UTANVET":
            setPaymethod(3);
            setBankTransferVisible(false);
            setOtherMethodVisible(true);
            break;
        }
        break;
      case "deliverymethod":
        switch (event.target.value) {
          case "ATVET_UZLETBEN":
            setDeliveryMethod(0);

            break;
          case "ATVETEL_POSTA":
            setDeliveryMethod(1);

            break;
          case "FUTAR_GLS":
            setDeliveryMethod(2);

            break;
          case "FUTAR_DPD":
            setDeliveryMethod(3);

            break;
          case "FUTAR_POSTA":
            setDeliveryMethod(4);

            break;
          case "FOXPOST":
            setDeliveryMethod(5);

            break;
          case "PICKPACK_PONT":
            setDeliveryMethod(6);

            break;
        }
        break;
      case "acceptTerms":
        if (event.target.checked) {
          setTermsOfService(true);
        } else {
          setTermsOfService(false);
        }
        break;
    }
    // console.log(event.target.checked)
  };

  const handlePay = (
    phone,
    country,
    country2,
    city,
    street,
    housenumber,
    paymethod,
    deliverymethod
  ) => {
    if (
      phone != "" &&
      country != "" &&
      country2 != "" &&
      city != "" &&
      street != "" &&
      TermsOfService
    ) {
      if (deliverymethod != 0) {
        PayService.completeOrder(
          phone,
          country,
          country2,
          city,
          street,
          housenumber,
          paymethod,
          deliverymethod
        );
      } else {
        alert("Kérlek válassz másik szállítási módot!");
      }
    } else {
      alert("Kérlek töltse ki a mezőket és fogadja el az üzleti szabályzatot!");
    }
  };

  if (subTotalPrice != 0) {
    return (
      <div>
        <div class="section-products">
          <div class="container-pay">
          <div class="row justify-content-center text-center">
            <div class="col-md-8 col-lg-6">
              <div class="pay-header">
                <h2 class="new">Fizetés</h2>
              </div>
            </div>
          </div>
          <div class="container mt-5 px-5">
            <div class="mb-4">
              <span>Kérjük töltse ki az alábbi mezőket!</span>
            </div>
            <div class="row">
              <div class="col-md-8">
                <div class="leftcard card p-3">
                  <h3 class="text-uppercase">Fizetési Információk</h3>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="inputbox mt-3 mr-2">
                        <input
                          class="form-control"
                          onChange={(e) => handleChange(e, "phone")}
                          id="phone"
                          type="text"
                          value={phone}
                          required
                        ></input>
                         <p>+36.....</p>
                         <span>Telefonszám</span> 
                      </div>
                    </div>
                    
                  </div>
                  <div class="mt-4 mb-4">
                    <h4 class="text-uppercase">Cím</h4>
                    <div class="col-md-12">
                      <div class="inputbox mt-3 mr-2">
                        <input
                          class="form-control"
                          onChange={(e) => handleChange(e, "country")}
                          id="country"
                          type="text"
                          value={country}
                          required
                        ></input>
                        <span>Ország</span>
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div class="col-md-6">
                        <div class="inputbox mt-3 mr-2">
                          <input
                            class="form-control"
                            onChange={(e) => handleChange(e, "country2")}
                            id="country2"
                            type="text"
                            value={country2}
                            required
                          ></input>
                          <span>Megye</span>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="inputbox mt-3 mr-2">
                          <input
                            class="form-control"
                            onChange={(e) => handleChange(e, "city")}
                            id="city"
                            type="text"
                            value={city}
                            required
                          ></input>
                          <span>Város</span>
                        </div>
                      </div>
                    </div>
                    <div class="row mt-2">
                      <div class="col-md-6">
                        <div class="inputbox mt-3 mr-2">
                          <input
                            class="form-control"
                            onChange={(e) => handleChange(e, "street")}
                            id="street"
                            type="text"
                            value={street}
                            required
                          ></input>
                          <span>Utca</span>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="inputbox mt-3 mr-2">
                          <input
                            class="form-control"
                            onChange={(e) => handleChange(e, "housenumber")}
                            id="housenumber"
                            type="number"
                            value={housenumber}
                            maxLength="5"
                            onKeyPress={(event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            }}
                            required
                          ></input>
                          <span>Házszám</span>
                        </div>
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div class="col-md-6">
                        <div class="inputbox mt-3 mr-2">
                          <label for="paymethod">Fizetési Mód:</label>
                          <br></br>
                          <select
                          class="choose"
                            onChange={(e) => handleChange(e, "paymethod")}
                            id="paymethod"
                            required
                          >
                            <option id="paymethod" selected value="BANKI_UTALAS">
                              Banki utalás
                            </option>
                            <option id="paymethod" value="KP_UTANVET">
                              Készpénz utánvét
                            </option>
                            <option id="paymethod" value="KARTYAS_UTANVET">
                              Kártyás utánvét
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="inputbox mt-3 mr-2">
                          <label for="deliverymethod">Szállítás Mód:</label>
                          <br></br>
                          <select
                          class="choose"
                            onChange={(e) => handleChange(e, "deliverymethod")}
                            id="deliverymethod"
                            required
                          >
                            <option
                              id="deliverymethod"
                              selected
                              value="ATVET_UZLETBEN"
                            >
                              Átvétel üzletben
                            </option>
                            <option id="deliverymethod" value="ATVETEL_POSTA">
                              Átvétel postán
                            </option>
                            <option id="deliverymethod" value="FUTAR_GLS">
                              GLS futárszolgálat
                            </option>
                            <option id="deliverymethod" value="FUTAR_DPD">
                              DPD futárszolgálat
                            </option>
                            <option id="deliverymethod" value="FUTAR_POSTA">
                              MPL futárszolgálat
                            </option>
                            <option id="deliverymethod" value="FOXPOST">
                              Foxpost
                            </option>
                            <option id="deliverymethod" value="PICKPACK_PONT">
                              Pickpack pont
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-4 mb-4 d-flex justify-content-between">
                  <span><a href="/cart">Vissza</a></span>
                  <button onClick={() => handlePay(phone,
    country,
    country2,
    city,
    street,
    housenumber,
    paymethod,
    deliverymethod)} class="btn btn-success px-3">Megrendelés</button>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card card-blue p-3 text-white mb-3">
                  <span>Végösszeg: </span>
                  <div class="d-flex flex-row align-items-end mb-3">
                    <h1 class="mb-0 yellow">{subTotalPrice}Ft.</h1>
                  </div>
                  <span>
                      <input
                        type="checkbox" class="paycheck"
                        onChange={(e) => handleChange(e, "acceptTerms")} ></input>
                        Megismertem, és elfogadom az üzleti{" "}
                      <a
                        href="https://www.inf.elte.hu/dstore/document/278/diszkretmatekII.pdf"
                        target="_blank">
                        <b>szabályzatot</b>{" ."}
                      </a>
                    </span>
                  <div class="hightlight">
                    <span>
                      {bankTranferVisible && (
                        <div>
                          <p>
                            Kedvezményezett neve: <b>Incidens Kar Kft.</b>
                          </p>
                          <p>
                            Számlavezető bank: <b>Incidens Bank</b>
                          </p>
                          <p>
                            Számlaszám: <b>11709002-20650786-00000000</b>
                          </p>
                          <p>
                            Közlemény:
                            <b>
                              [Kérem itt tüntesse fel megrendelése azonosítóját,
                              rendelészámát]
                            </b>
                          </p>
                        </div>
                      )}
                      {OtherMethodVisible && (
                        <div>
                          <p>Átvételkor lehet kifizetni az összeget</p>
                        </div>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  } else {
    window.location.assign("/cart");
  }
}
