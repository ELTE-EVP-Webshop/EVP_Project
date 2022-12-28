import React, { useState, useRef } from "react";
import { isEmail } from "validator";

import AuthService from "../services/AuthService";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        Ezt a mezőt ki kell tölteni he!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">
        Az email cím nem szabályos!
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        A felhasználónévnek 3 és 20 karakter között kell lennie!
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        A jelszónak 6 és 40 karakter között kell lennie!
      </div>
    );
  }
};

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  function error() {
    setMessage("Sikertelen regisztráció!")
  }

  const handleRegister = (e) => {
    e.preventDefault();
    
    if(successful != true) {
      setMessage("Regisztrálás folyamatban...");
    setTimeout(error, 5000)
    }


    setSuccessful(false);

    if(password.length < 6) {
      setMessage("A jelszónak legalább 6 karakternek kell lennie!")
    }

      AuthService.register(username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          alert("Sikeres regisztráció!")
          window.location.assign("/")
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

         // setMessage(resMessage);
          setSuccessful(false);
        }
      );

  };

  return (

    
<div class="limiter">
<div class="container-login100">
    <div class="wrap-login100">
   
    {!successful && (
        <form onSubmit={handleRegister} ref={form} class="login100-form validate-form p-l-55 p-r-55 p-t-178">
        
            <span class="login100-form-title">

                Regisztráció

            </span>
            {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
            <div class="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                <input value={username} class="input100" type="text" onChange={onChangeUsername} validations={[required, vusername]} name="username" placeholder="Felhasználónév"></input>
                <span class="focus-input100"></span>
            </div>

            <div class="wrap-input100 validate-input m-b-16" data-validate="Please enter email">
                <input value={email} class="input100" type="email" onChange={onChangeEmail} validations={[required, validEmail]} name="email" placeholder="Email cím"></input>
                <span class="focus-input100"></span>
            </div>

            <div class="wrap-input100 validate-input" data-validate = "Please enter password">
                <input class="input100" onChange={onChangePassword} validations={[required, vpassword]} value={password} type="password" name="pass" placeholder="Jelszó"></input>
                <span class="focus-input100"></span>
            </div>


            <div class="container-login100-form-btn">
                <button class="login100-form-btn">
                    Regisztráció
                </button>
            </div>

            <div class="flex-col-c p-t-170 p-b-40">
                <span class="txt1 p-b-9">
                    Van már fiókja?
                </span>

                <a href="/login" class="txt3">
                    Jelentkezzen be!
                </a>
                
            </div>
           
       
      
        </form>
         )}
    </div>
</div>
</div>
    
  );
};

export default Register;