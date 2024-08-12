import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import logo from "../Img/logo_completo.png";

function ChangePsw() {
  const [vecchiaPsw, setVecchiaPsw] = useState("");
  const [nuovaPsw, setNuovaPsw] = useState("");
  let history = useNavigate();
  const changePsw = () => {
    axios
      .put(
        `http://localhost:3001/auth/changepsw`,
        { vecchiaPsw: vecchiaPsw, nuovaPsw: nuovaPsw },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Password cambiata con successo");
          history("/");
        }
      });
  };
  return (
    <>
      <Helmet>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
        <link rel="stylesheet" href="Style.css"/>
      </Helmet>
      <div class="log-forgot-header">
        <div className="wrapper">
          <div className="changePswPage">
            <h2>Cambia la tua Password:</h2>
            <div className="formChange">
              <div class="input-box">
                <input
                  type="password"
                  placeholder="Vecchia Password"
                  onChange={(event) => {
                    setVecchiaPsw(event.target.value);
                  }}
                />
              </div>
              <div class="input-box">
                <input
                  type="password"
                  placeholder="Nuova Password"
                  onChange={(event) => {
                    setNuovaPsw(event.target.value);
                  }}
                />
              </div>
              <button class="btn-log-reg-forgot" onClick={changePsw}>Cambia Password</button>
            </div>
          </div>
        </div>
        <br></br><img src={logo} />
      </div>
    </>
  );
}

export default ChangePsw;
