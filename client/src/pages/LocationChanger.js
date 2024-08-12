import React from "react";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function LocationChanger() {
  let { id } = useParams();
  const [locationObject, setLocationObject] = useState({}); //{} Perchè è un oggetto
  const { authState } = useContext(AuthContext);
  const [img, setImg] = useState();
  const [galleria, setGalleria] = useState([]);

  useEffect(() => {
    //richiesta per la location in base all'id
    axios.get(`http://localhost:3001/locations/byId/${id}`).then((response) => {
      setLocationObject(response.data);
    });

    axios
      .get(`http://localhost:3001/locations/immaginiById/${id}`)
      .then((response) => {
        setGalleria(response.data);
      });
  }, []);

  const editLocation = (opt) => {
    let cambiamento;
    switch (opt) {
      case "nome":
        cambiamento = prompt("Inserisci il nuovo nome per la location:");
        break;
      case "descrizione":
        cambiamento = prompt("Inserisci la nuova descrizione per la location:");
        break;
      case "indirizzo":
        cambiamento = prompt("Inserisci il nuovo indirizzo per la location:");
        break;
      case "nPosti":
        cambiamento = prompt(
          "Inserisci il nuovo numero di posti per la location:"
        );
        break;
    }
    if (cambiamento) {
      axios
        .put(`http://localhost:3001/locations/cambiamento/${opt}`, {
          cambiamento: cambiamento,
          id: id,
        })
        .then((response) => {
          //con le arentesi quadre opt che sarebbe il nome del cambio che abbiamo cambiato viene utilizzato appunto come nome per il campo da cambiare
          setLocationObject({ ...locationObject, [opt]: cambiamento });
        });
    }
  };
  const uploadImmagine = () => {
    const formData = new FormData();
    formData.append("file", img);
    formData.append("id", id);
    axios
      .post("http://localhost:3001/locations/uploadImmagine", formData)
      .then((response) => {
        alert("Immagine aggiunta con successo");
        setGalleria([...galleria, img]); //Stiamo prendendo l'array e aggiungiamo un elemento in fondo lasciando l'array prima di quello come era
        //Utile per aggiungere in tempo reale le immagini una volta scritte
        setImg(null);
        window.location.reload();
      });
  };

  const cancellaImg = (id) => {
    axios
      .delete(`http://localhost:3001/locations/cancellaImg/${id}`)
      .then(() => {
        setGalleria(
          galleria.filter((foto) => {
            return foto.id !== id; //Ritorno nella galleria(lista di foto) solo le foto che non sono quella che cancello
          })
        );
      });
  };

  return (
    <div className="locationChangerPage">
      <div className="leftSide">
        <div className="infoLocationDaCambiare">
          <div
            className="titolo"
            onClick={() => {
              editLocation("nome");
            }}
            >
            {locationObject.nome}
          </div>
          <label class="campo-loc-change">Gestisci la tua location, cliccando su il campo da modificare lo puoi
          fare comodamente:</label>
          <div
            className="campo-loc"
            onClick={() => {
              editLocation("descrizione");
            }}
          >
            <br /><b>Descrizione Location: </b> {locationObject.descrizione}
          </div>
          <div
            className="campo-loc"
            onClick={() => {
              editLocation("indirizzo");
            }}
          >
            <b>Indirizzo: </b> {locationObject.indirizzo}
          </div>
          <div
            className="campo-loc"
            onClick={() => {
              editLocation("nPosti");
            }}
          >
            <b>Numero Posti Disponibili: </b> {locationObject.nPosti}
          </div>{" "}
        </div>
      </div>
      <div className="rightSide">
        <div className="formAggiungiFoto">
          <label class="campo-loc-change">Aggiungi le fotografie della location</label>
          <label class="btn-upload" for="upload-img">Seleziona File</label>
          <input
            type="file"
            id="upload-img"
            onChange={(immagine) => setImg(immagine.target.files[0])}
          />
          <br /><br /><button class="btn-modifica" onClick={uploadImmagine}>Aggiungi Immagine</button>
        </div>
        <div className="galleriaFoto">
          <br /><br /><label class="campo-loc-change"><b>Foto della tua location:</b></label>
          {galleria.map((immagine) => (
            <div key={immagine.id} className="singolaFoto">
              <img
                src={`http://localhost:3001/images/${immagine.nome}`}
                alt={immagine.nome}
              />
              <br /><br /><button class="btn-modifica" onClick={() => cancellaImg(immagine.id)}>Elimina</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LocationChanger;
