import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import profilo from "../Img/profilo.png";
import logo from "../Img/logo_completo.png";

function ProfilePage() {
  //Id dell'utente passato
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [codFiscale, setCODFiscale] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [indirizzo, setIndirizzo] = useState("");
  const [tipoUtente, setTipo] = useState("");
  const [locationList, setLocationList] = useState([]);
  const { authState } = useContext(AuthContext);
  let history = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/getinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`http://localhost:3001/auth/getinfo/${id}`).then((response) => {
      setCODFiscale(response.data.codFiscale);
    });

    axios.get(`http://localhost:3001/auth/getinfo/${id}`).then((response) => {
      setEmail(response.data.email);
    });

    axios.get(`http://localhost:3001/auth/getinfo/${id}`).then((response) => {
      setTelefono(response.data.telefono);
    });

    axios.get(`http://localhost:3001/auth/getinfo/${id}`).then((response) => {
      setNome(response.data.nome);
    });

    axios.get(`http://localhost:3001/auth/getinfo/${id}`).then((response) => {
      setCognome(response.data.cognome);
    });

    axios.get(`http://localhost:3001/auth/getinfo/${id}`).then((response) => {
      setIndirizzo(response.data.indirizzo);
    });

    axios.get(`http://localhost:3001/auth/getinfo/${id}`).then((response) => {
      setTipo(response.data.tipoUtente);
    });

    axios
      .get(`http://localhost:3001/locations/byIdUtente/${id}`)
      .then((response) => {
        setLocationList(response.data);
      });
  }, []);

  const goToLocation = (idLocation) => {
    history(`/locationchanger/${idLocation}`);
  };

  return (
    <>
      <Helmet>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
        <link rel="stylesheet" href="Style.css"/>
      </Helmet>
      <div className="paginaProfilo">
        <div className="row">
          <div className="col-md-4 mt-1">
            <div className="card text-center sidebar">
            <br></br><h1 className="m-3 pt-3">ABOUT</h1><br></br>
              <div className="card-body">
                <img src={profilo} width="150"/>
                <div className="row">
                    <div className="col-md-3">
                      <h5>Nome</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {nome} 
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Cognome</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {cognome} 
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Username</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {username} 
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Email</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {email}
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Telefono</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {telefono}
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Codice Fiscale</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {codFiscale}
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Indirizzo</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {indirizzo} 
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-md-3">
                      <h5>Tipo Utente</h5>
                    </div>
                    <div className="col-md-9 text-secondary">
                      {tipoUtente} 
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="informazioniUtente">
                      <h2 className="testo2"></h2>
                      {authState.username === username && (
                        <button className="btn-modifica" onClick={() => history("/changepsw")}>CambiaPassword</button>
                      )}
                    </div>
                  </div>
              </div>
            </div>
          </div>
            <div className="col-md-8 mt-1">
              <div className="listaLocation">
                <br></br><h1 className="m-3">Lista Location</h1><br></br>
                {locationList.map((value, key) => {
                  //key=index dell'elemento dell'array mentre value= il valore dell'elemento
                  return (
                    <div
                      className="card-body"
                      onClick={() => {
                        goToLocation(value.id);
                      }}
                      key={key}>
                      
                      <div className="row">
                        <div className="col-md-3">
                          <h5>Nome</h5>
                        </div>
                        <div className="col-md-9 text-secondary">
                          {value.nome}
                        </div>
                      </div>
                      <hr></hr>
                      <div className="row">
                        <div className="col-md-3">
                          <h5>Indirizzo</h5>
                        </div>
                        <div className="col-md-9 text-secondary">
                          {value.indirizzo}
                        </div>
                      </div>
                      <hr></hr>
                      <div className="row">
                        <div className="col-md-3">
                          <h5>Descrizione</h5>
                        </div>
                        <div className="col-md-9 text-secondary">
                          {value.descrizione}
                        </div>
                      </div>
                      <hr></hr>
                      <div className="row">
                        <div className="col-md-3">
                          <h5>Numero Posti</h5>
                        </div>
                        <div className="col-md-9 text-secondary">
                          {value.nPosti}
                        </div>
                      </div>
                      <hr></hr>
                      <br></br><br></br>
                    </div>
                  );
                })}
              </div>
            </div>
        </div>
        <img src={logo}/>
        <div className="listaEventi"></div>
      </div>
    </>
  );
}

export default ProfilePage;
