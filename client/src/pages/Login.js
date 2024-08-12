import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { Helmet } from "react-helmet";

import logo from "../Img/logo_completo.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext); //Così posso informare del login avvenuto tramite setAuthState
  let history = useNavigate();

  const login = (event) => {
    event.preventDefault(); // Previene il comportamento predefinito del form

    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        console.log("Login effettuato");
        //tramite auhtState posso controllare il login in ogni parte dell'app
        setAuthState({
          username: response.data.username,
          tipoUtente: response.data.tipoUtente,
          id: response.data.id,
          status: true,
        });
        history("/");
      }
    });
  };
  return (
    <>
      <Helmet>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="Style.css" />
      </Helmet>
      <div className="log-forgot-header">
        <div className="wrapper">
          <div className="login-box">
            <h2>LOGIN</h2>
            <form action="#">
              <div className="input-box">
                <span class="icon"></span>
                <input
                  type="text"
                  placeholder="Username"
                  autoComplete="off"
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
                <i class="bx bxs-user" />
              </div>
              <div className="input-box">
                <span class="icon"></span>
                <input
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <i class="bx bxs-lock-alt" />
              </div>

              <button className="btn-log-reg-forgot" onClick={login}>
                LOGIN
              </button>

              <div className="register-link">
                <p>
                  Non hai un account? <Link to="/registration">Registrati</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <br></br>
        <img src={logo} />
      </div>
      <script
        type="module"
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        noModule
        src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
      ></script>
    </>
  );
}

export default Login;
