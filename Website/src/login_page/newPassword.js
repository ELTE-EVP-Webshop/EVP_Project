import AuthService from "../services/AuthService";
import React, {useState} from "react";


var userId = null;
var token = null;
async function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
     userId =  await (urlParams.get('userId'));
     token =  await (urlParams.get('token'));
}


export default function newPassword() {
    const [newPassword, setNewPassword] = useState("")

    

    async function handleSubmit() {
        await getUrlParams();
        console.log(userId)
        if(token && userId && newPassword.length >= 6) {
           await AuthService.newPassword(userId, token, newPassword)
    
        } else if(newPassword.length < 6) {
            alert("A jelszónak legalább 6 karakter hosszúnak kell lennie!")
        } else {
            alert("Hiba lépett fel az új jelszó beállítása során!")
        }
    }
    
    async function handleChange(e) {
        await setNewPassword(e.target.value)

    }
  return (
    <div class="container-product">
    <div class="conatiner-forget">
        <img src="/images/forgotpw.png" class="forgotimg"></img>
        <h3 class="forgotH">Adja meg a fiókhoz tartozó új jelszavát!</h3>
        <div class="row emailsor">
            <label class="forgotLB" for="email">
                <i class="fa-solid fa-lock"></i>
            </label>
            <input class="forgotTX" onChange={(e) => handleChange(e)} id="password" type="password"  placeholder="Jelszó"></input><br></br>
        </div>
        <button class="forgotBTN" onClick={() => handleSubmit()} >Új jelszó generálása</button>
    </div>
</div>
   
  );
}
