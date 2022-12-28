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
    <div>
        <h3 className="text-center">Adja meg a fiókhoz tartozó új jelszavát!</h3>
        <label for="password">Új jelszó:</label>
        <input onChange={(e) => handleChange(e)} id="password" type="password" placeholder="passwordstoredasnumeric" required></input>
        <button onClick={() => handleSubmit()} className="btn btn-success">Új jelszó generálása</button>
    </div>
  );
}
