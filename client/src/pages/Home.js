import React from "react";
import axios from "axios";
//useEffec ci permette di eseguire una funzione ogni volta che la pagina è rendereizzata
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import copertina from "../Img/logo_completo.png";
import categoria1 from "../Img/matrimonio.jpg";
import categoria2 from "../Img/violoncello.jpg";
import categoria3 from "../Img/festa.jpg";
import bardi from "../Img/castello_bardi.jpg";
import immobiliare from "../Img/immobiliare.png";
import facile from "../Img/logo_facile_(azienda).png";
import ticketone from "../Img/ticketone.png";
import vivaticket from "../Img/Vivaticket.png";
import ticketmaster from "../Img/ticketmaster.png";
import logo from "../Img/logo_titolo.png";
import facebook from "../Img/social/icons8-facebook-nuovo-25.png";
import instagram from "../Img/social/icons8-instagram-25.png";
import linkedin from "../Img/social/icons8-linkedin-25 .png";
import twitter from "../Img/social/icons8-twitter-25.png";
import yt from "../Img/social/icons8-youtube-25.png";
import logo_bianco from "../Img/logo_titolo_bianco.png";
import play_app from "../Img/play_app_store.png";

function Home() {
  //Creiamo uno state che contiene una lista per la api request
  const [locationList, setLocationList] = useState([]);
  let history = useNavigate();
  const goToLocation = (idLocation) => {
    if (localStorage.getItem("accessToken")) {
      history(`/location/${idLocation}`);
    } else {
      history("/registration");
    }
  };
  useEffect(() => {
    //URL PER L'api Req, facciamo la richiesta degli eventi e aggiungendo then, quindi dopo eseguiamo una funzione
    //All'interno di response ci saranno i dati della richiesta precedente
    axios.get("http://localhost:3001/locations").then((response) => {
      setLocationList(response.data);
    });
  }, []);

  return (
    <>
      <Helmet>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
        <link rel="stylesheet" href="Style.css"/>
      </Helmet>       

      <div className="header">
        <div className="row">
          <div className="col-2">
            <h1>Dove Ogni Dettaglio Conta</h1>
            <p className="sottotitolo">Il nostro obiettivo è stupire i nostri clienti e i loro ospiti, lasciandoli senza parole,
              e soprattutto organizzare<br></br>eventi indimenticabili in location
              straordinarie.</p>
          </div>
          <div className="col-2">
            <img src={copertina}/>
          </div>
        </div>
      </div>

      <div className="categorie">
        <div className="small-container">
          <div className="row">
            <div className="col-3">
              <img src={categoria1} />
            </div>
            <div className="col-3">
              <img src={categoria2} />
            </div>
            <div className="col-3">
              <img src={categoria3} />
            </div>
          </div>
        </div>
      </div>

      <div className="small-container">
        <h2 className="titolo">Eventi In Programma</h2>     
        {locationList.map((value, key) => {
            //key=index dell'elemento dell'array mentre value= il valore dell'elemento
          return (
            <div
                className="row"
                onClick={() => {
                goToLocation(value.id);
              }}
              key={key}
            >
              <div className="col-4">
                <h4>
                  <div className="testo_item">{value.nome}</div>
                </h4>
                <div className="testo_item">{value.indirizzo}</div>
              </div>
            </div>
          );
        })}
      </div> 

      <div className="proposta">
        <div className="small-container">
          <div className="row">
            <div className="col-2">
              <img src={bardi} className="proposta-img"/>
            </div>
            <div className="col-2">
              <p>Organizza Il Tuo Evento Da Noi</p>
              <h1 className="proposta-titolo">Castello di Bardi</h1>
              <small>Possiamo organizzare il tuo evento in qualsiasi location, comprese quelle suggestive come il Castello di Bardi. Sebbene possa sembrare una scelta secondaria, questa location provinciale è ricca di storia e fascino medievale. 
                Permetti ai tuoi ospiti di godersi l'evento in un luogo unico e indimenticabile come questo.</small>
            </div>
          </div>
        </div>
      </div>   

      <div className="partners">
        <div className="small-container">
          <div className="row">
            <div className="col-5">
              <img src={immobiliare} />
            </div>
            <div className="col-5">
              <img src={facile} />
            </div>
            <div className="col-5">
              <img src={ticketone} />
            </div>
            <div className="col-5">
              <img src={vivaticket} />
            </div>
            <div class="col-5">
              <img src={ticketmaster} />
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col-1">
              <h3>Scarica La Nostra App</h3>
              <p>Scarica la nostra app sia su Play Store che su Apple Store.</p>
              <div className="app-logo">
                <img src={play_app} />
              </div>
            </div>
            <div className="footer-col-3">
              <h3>Seguici su</h3>
              <img src={facebook} /><img src={instagram} /><img src={linkedin} /><img src={twitter} /><img src={yt} />
            </div>
          </div>
        </div>
      </div> 
    </>
  );
}

export default Home;
