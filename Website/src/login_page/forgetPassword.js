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
    <div>
        <h3 className="text-center">Adja meg az email címét, hogy elküldhessük Önnek a fiókjához tartozó új jelszavát!</h3>
        <label for="email">Email cím:</label>
        <input onChange={(e) => handleChange(e)} id="email" type="email" placeholder="incidens.kar@incidensmail.hu"></input>
        <button onClick={() => handleSubmit()} className="btn btn-success">Új jelszó generálása</button>
    </div>
  );
}
