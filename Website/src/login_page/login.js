import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
//import Form from "react-validation";
//import Input from "react-validation";
//import CheckButton from "react-validation";

import AuthService from "../services/AuthService";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        Ezt ki kell tölteni he!
      </div>
    );
  }
};

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

   // form.current.validateAll();


      AuthService.login(username, password).then(
        () => {
          navigate("/");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );

  };

  return (


<div class="limiter">
<div class="container-login100">
    <div class="wrap-login100">
        <form onSubmit={handleLogin} ref={form} class="login100-form validate-form p-l-55 p-r-55 p-t-178">
            <span class="login100-form-title">

                Bejelentkezés

            </span>
            {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
            <div class="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
                <input value={username} class="input100" type="text" onChange={onChangeUsername} validations={[required]} name="username" placeholder="Felhasználónév"></input>
                <span class="focus-input100"></span>
            </div>

            <div class="wrap-input100 validate-input" data-validate = "Please enter password">
                <input class="input100" onChange={onChangePassword} validations={[required]} value={password} type="password" name="pass" placeholder="Jelszó"></input>
                <span class="focus-input100"></span>
            </div>

            <div class="text-right p-t-13 p-b-23">
                <span class="txt1">Elfelejtett     </span>

                <a href="#" class="txt2">Felhasználónév / Jelszó?</a>
            </div>

            <div class="container-login100-form-btn">
                <button class="login100-form-btn">
                    Belépés
                </button>
            </div>

            <div class="flex-col-c  p-b-40 registerspace">
                <span class="txt1 p-b-9">
                    Nincs fiókja?
                </span>

                <a href="/register" class="txt3">
                    Regisztráljon egyet!
                </a>
            </div>

        </form>
    </div>
</div>
</div>

    
  );
};

export default Login;