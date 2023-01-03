import AuthService from "../services/AuthService";
import React, {useState} from "react";





export default function forgetPassword() {
    const [email, setEmail] = useState("")

    async function handleSubmit() {
        if(email != "") {
            await AuthService.askNewPasswordMail(email)
        }
    }
    
    async function handleChange(e) {
        await setEmail(e.target.value)

    }
  return (
    <div class="container-product">
        <div class="conatiner-forget">
            <img src="/images/forgotpw.png" class="forgotimg"></img>
            <h3 class="forgotH">Adja meg az email címét,<br></br>hogy elküldhessük Önnek a fiókjához tartozó új jelszavát!</h3>
            <div class="row emailsor">
                <label class="forgotLB" for="email">
                    <i class="fa-solid fa-envelope fa-xl"></i>
                </label>
                <input class="forgotTX" onChange={(e) => handleChange(e)} id="email" type="email" placeholder="incidens.kar@incidensmail.hu"></input><br></br>
            </div>
            <button class="forgotBTN" onClick={() => handleSubmit()} >Új jelszó generálása</button>
        </div>
    </div>
  );
}
