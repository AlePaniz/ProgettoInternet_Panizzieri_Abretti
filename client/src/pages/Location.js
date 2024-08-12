import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
//Import utili per la creazione evento:
import { Formik, Form, Field, ErrorMessage } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import * as Yup from "yup";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function Location() {
  let { id } = useParams();
  const [locationObject, setLocationObject] = useState({}); //{} Perchè è un oggetto
  const [voto, setVoto] = useState();
  const [recensioni, setRecensioni] = useState([]);
  const [eventi, setEventi] = useState([]);
  const [nuovaRecensione, setNuovaRecensione] = useState("");
  const { authState } = useContext(AuthContext);
  const [galleria, setGalleria] = useState([]); //Immagini per la location

  let history = useNavigate();
  //Inizio gestione creazione eventi:
  //Valore iniziale degli elementi
  const initialValue = {
    nome: "",
    descrizione: "",
    dataEvento: format(new Date("2000-01-01"), "yyyy-MM-dd"),
  };

  //Per specificare imput validi
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required(),
    descrizione: Yup.string().required(),
    dataEvento: Yup.date().required(),
  });
  //Una volta inviati i dati
  const onSubmit = (data) => {
    //Controlla che la data per cui effettuiamo la richiesta di aggiunta evento sia libera per questa location
    const dataUnica = !eventi.some((eve) => eve.dataEvento === data.dataEvento);
    if (dataUnica) {
      //Se la data selezionata è libera per questa location effettua la richiesta
      axios
        .post(`http://localhost:3001/eventi/${id}`, data, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          alert(
            "Richiesta inviata con successo! Ritorna nella location desiderata e se sarà accettato lo troverai nella lista degli eventi!"
          );
          history("/");
        });
    } else {
      window.alert(
        "La data per cui stai richiedendo la creazione dell'evento non è disponibile, prova un altra location o un altra data per questa location."
      );
    }
  };
  const [selectedDate, setSelectedDate] = useState(null);

  //Fine gestione creazione eventi

  useEffect(() => {
    //richiesta per la location in base all'id
    axios.get(`http://localhost:3001/locations/byId/${id}`).then((response) => {
      setLocationObject(response.data);
    });

    //Richiesta per tutte le recensioni in base all'id della location
    axios.get(`http://localhost:3001/recensioni/${id}`).then((response) => {
      setRecensioni(response.data);
    });

    //Richiesta per tutti gli eventi
    axios.get(`http://localhost:3001/eventi/byId/${id}`).then((response) => {
      setEventi(response.data);
    });

    //Richiesta immagini della location
    axios
      .get(`http://localhost:3001/locations/immaginiById/${id}`)
      .then((response) => {
        setGalleria(response.data);
      });
  }, []);

  const cancellaRecensione = (id) => {
    axios
      .delete(`http://localhost:3001/recensioni/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setRecensioni(
          recensioni.filter((rec) => {
            //faccio un check se voglio tenere una recensione nella lista oppure no, se è quello appena cancellato no
            return rec.id !== id;
          })
        );
      });
  };

  const cancellaEvento = (id) => {
    axios
      .delete(`http://localhost:3001/eventi/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setEventi(
          eventi.filter((eventoCheck) => {
            //faccio un check se voglio tenere l'evento nella lista oppure no, se è quello appena cancellato no
            return eventoCheck.id !== id;
          })
        );
      });
  };

  const aggiungiRecensione = () => {
    axios
      .post(
        "http://localhost:3001/recensioni",
        {
          recBody: nuovaRecensione,
          voto: voto,
          LocationId: id,
        },
        {
          //Passo l'accesstoken nell'header
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        //Se ci sono errori dati dalla non validazione tramite accessToken li mostro
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const recDaAggiungere = {
            recBody: nuovaRecensione,
            voto: voto,
            username: response.data.username,
          };
          setRecensioni([...recensioni, recDaAggiungere]); //Stiamo prendendo l'array e aggiungiamo un elemento in fondo lasciando l'array prima di quello come era
          //Utile per aggiungere in tempo reale le recensioni una volta scritte
          setNuovaRecensione("");
          window.location.reload(); //Un escamotage per refreshare la pagina ogni nuova recensione e rendere possibile cancellarla
        }
      });
  };

  const cancellaLocation = (id) => {
    axios
      .delete(`http://localhost:3001/locations/${id}`, {
        //Passo l'accesstoken nell'header
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        alert("Cancellato con successo!");
        history("/");
      });
  };
  return (
    <div className="locationPage">
      <div className="leftSide">
        <div className="infoLocation">
          <div className="titolo">{locationObject.nome}</div>
          <div className="campo-loc">
            <b>Indirizzo:</b>
            <br />
            {locationObject.indirizzo}
          </div>
          <div className="campo-loc">
            <b>Descrizione Location:</b>
            <br />
            {locationObject.descrizione}
          </div>
          
          <div className="campo-loc">
            <b>Numero posti disponibili:</b>       {locationObject.nPosti}
          </div>{" "}
        </div>
        <div className="cancellaLocation">
          {authState.id === locationObject.UtentiId && (
            <button
              className="btn-modifica"
              onClick={() => {
                cancellaLocation(locationObject.id);
              }}
            >
              Cancella Location
            </button>
          )}
        </div>
        <div className="Evento">
          <div className="listaEventi">
            <label><b>Lista di tutti gli eventi:</b></label>
            {eventi.map((evento, key) => {
              return (
                <div key={key} className="evento">
                  {evento.nome}
                  <br></br>Descrizione:   {evento.descrizione}
                  <br></br>
                  <label>Data:    {evento.dataEvento}</label><br />
                  {authState.id === evento.UtentiId && ( //Mostra il bottone per eliminare l'evento se è loggato lo stesso che l'ha creato
                    <button className="btn-modifica" onClick={() => cancellaEvento(evento.id)}>Elimina</button>
                  )}
                </div>
              );
            })}
          </div>
          <div className="titolo-2">
            Manda la richiesta per creare il tuo evento per questa location:
          </div>
          <div className="formCreazioneEvento">
            <Formik
              initialValues={initialValue}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({ setFieldValue }) => (
                <Form>
                  <label className="campo-add">Nome evento:</label>
                  <ErrorMessage name="nome" component="span" />
                  <Field
                    class="field"
                    autocomplete="off"
                    id="inputCreateEvent"
                    name="nome"
                    placeholder="Nome evento"
                  />
                  <label className="campo-add">Descrizione:</label>
                  <ErrorMessage name="descrizione" component="span" />
                  <Field
                    class="field"
                    autocomplete="off"
                    id="inputCreateEvent"
                    name="descrizione"
                    placeholder="Descrizione evento"
                  />
                  <label className="campo-add">Data:</label>
                  <ErrorMessage name="dataEvento" component="span" />
                  <ReactDatePicker
                    class="field"
                    id="inputCreateEvent"
                    name="dataEvento"
                    selected={selectedDate}
                    onChange={(date) => {
                      const formattedDate = format(date, "yyyy-MM-dd");
                      setFieldValue("dataEvento", formattedDate);
                      setSelectedDate(date);
                    }}
                  />
                  <br /><br /><br />
                  <button className="btn-modifica" type="submit">Manda Richiesta</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <div className="rightSide">
        <br></br><br></br><div className="campo-loc">
          <b>Immagini Location</b>
          {galleria.map((immagine) => (
            <div key={immagine.id} className="singolaFoto">
              <img
                src={`http://localhost:3001/images/${immagine.nome}`}
                alt={immagine.nome}
              />
            </div>
          ))}
        </div>
        
        
        <div className="addTestoRecensione">
          <label class="campo-rec"><b>Sezione recensioni</b></label><br />
          <input
            class="commento"
            type="text"
            placeholder="Recensione"
            autoComplete="off"
            value={nuovaRecensione}
            onChange={(event) => {
              setNuovaRecensione(event.target.value);
            }}
          />
        </div>
        <div className="addVoto">
          1<input
            type="radio"
            name="voto"
            value="1"
            onChange={(voto) => setVoto(voto.target.value)}
          />
          2<input
            type="radio"
            name="voto"
            value="2"
            onChange={(voto) => setVoto(voto.target.value)}
          />
          3<input
            type="radio"
            name="voto"
            value="3"
            onChange={(voto) => setVoto(voto.target.value)}
          />
          4<input
            type="radio"
            name="voto"
            value="4"
            onChange={(voto) => setVoto(voto.target.value)}
          />
          5<input
            type="radio"
            name="voto"
            value="5"
            onChange={(voto) => setVoto(voto.target.value)}
          /><br />
        </div>  
        <button class="btn-modifica" onClick={aggiungiRecensione}>Aggiungi Recensione</button>
        
        <div className="listaRecensioni">
          {recensioni.map((recensione, key) => {
            return (
              <div key={key} class="campo-add">
                <br></br><b>Recensione:</b><br></br>{recensione.recBody}<br></br>
                <br></br><b>Voto:</b>  {recensione.voto}
                <br></br>
                <label><b>Utente:   </b>{recensione.username}</label><br /><br />
                {authState.username === recensione.username && ( //Mostra il bottone per eliminare il commento se è loggato los tesso che l'ha scrittonpm
                  <button class="btn-modifica" onClick={() => cancellaRecensione(recensione.id)}>
                    Elimina
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Location;
