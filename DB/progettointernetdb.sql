--
-- Struttura della tabella `utenti`
--

CREATE TABLE utenti (
  id int(11) NOT NULL,
  cognome varchar(255) NOT NULL,
  nome varchar(255) NOT NULL,
  codFiscale varchar(255) NOT NULL,
  indirizzo varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  telefono varchar(255) NOT NULL,
  tipoUtente varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL
);

--
-- Struttura della tabella `locations`
--

CREATE TABLE locations (
  id int(11) NOT NULL,
  nome varchar(255) NOT NULL,
  descrizione varchar(255) NOT NULL,
  indirizzo varchar(255) NOT NULL,
  nPosti int(11) NOT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  UtentiId int(11) DEFAULT NULL
);

--
-- Struttura della tabella `eventi`
--

CREATE TABLE eventi (
  id int(11) NOT NULL,
  nome varchar(255) NOT NULL,
  descrizione varchar(255) NOT NULL,
  dataEvento date NOT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  LocationId int(11) DEFAULT NULL,
  UtentiId int(11) DEFAULT NULL
);

--
-- Struttura della tabella `fotografie`
--

CREATE TABLE fotografie (
  id int(11) NOT NULL,
  nome varchar(255) NOT NULL,
  percorso varchar(255) NOT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  LocationId int(11) DEFAULT NULL
);

--
-- Struttura della tabella `recensioni`
--

CREATE TABLE recensioni (
  id int(11) NOT NULL,
  recBody varchar(255) NOT NULL,
  voto int(11) NOT NULL,
  username varchar(255) NOT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  LocationId int(11) DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE utenti
  ADD PRIMARY KEY (id);
  
--
-- Indici per le tabelle `locations`
--
ALTER TABLE locations
  ADD PRIMARY KEY (id),
  ADD KEY UtentiId (UtentiId);

--
-- Indici per le tabelle `eventi`
--
ALTER TABLE eventi
  ADD PRIMARY KEY (id),
  ADD KEY LocationId (LocationId),
  ADD KEY UtentiId (UtentiId);

--
-- Indici per le tabelle `fotografie`
--
ALTER TABLE fotografie
  ADD PRIMARY KEY (id),
  ADD KEY LocationId (LocationId);

--
-- Indici per le tabelle `recensioni`
--
ALTER TABLE recensioni
  ADD PRIMARY KEY (id),
  ADD KEY LocationId (LocationId);

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE utenti
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
  
--
-- AUTO_INCREMENT per la tabella `locations`
--
ALTER TABLE locations
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `eventi`
--
ALTER TABLE eventi
  MODIFY id int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `fotografie`
--
ALTER TABLE fotografie
  MODIFY id int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `recensioni`
--
ALTER TABLE recensioni
  MODIFY id int(11) NOT NULL AUTO_INCREMENT;

-- --------------------------------------------------------

--
-- Limiti per la tabella `locations`
--
ALTER TABLE locations
  ADD CONSTRAINT locations_ibfk_1 FOREIGN KEY (UtentiId) REFERENCES utenti (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `eventi`
--
ALTER TABLE eventi
  ADD CONSTRAINT eventi_ibfk_1 FOREIGN KEY (LocationId) REFERENCES locations (id) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT eventi_ibfk_2 FOREIGN KEY (UtentiId) REFERENCES utenti (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `fotografie`
--
ALTER TABLE fotografie
  ADD CONSTRAINT fotografie_ibfk_1 FOREIGN KEY (LocationId) REFERENCES locations (id) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `recensioni`
--
ALTER TABLE recensioni
  ADD CONSTRAINT recensioni_ibfk_1 FOREIGN KEY (LocationId) REFERENCES locations (id) ON DELETE CASCADE ON UPDATE CASCADE;

-- --------------------------------------------------------

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO utenti (id, cognome, nome, codFiscale, indirizzo, email, telefono, tipoUtente, username, password, createdAt, updatedAt) VALUES
(1, 'Abretti', 'Andrea',  'BRTNDR01E08G337B', 'Via Matteotti, 2', 'andrea@gmail.com', '3482106987', 'cliente', 'andrea', '$2b$10$PtGHGDWfSJcu8Z02g/N4LO3f9YqekghDzHoQY5bsLoIZ/rjQrCL2C', '2024-06-11 16:24:22', '2024-06-11 16:24:22'),
(2, 'Panizzieri', 'Alessio', 'BRTNDR01E08G337B', 'Via Gari baldi, 6', 'alessio@gmail.it', '45987210365', 'gestore', 'alessio', '$2b$10$gielbp8GvCZb6FAHqGp75eArBW8sOw4UBp.WcULBXlVJ9Pue5psX2', '2024-06-11 16:42:18', '2024-06-11 16:42:18');

--
-- Password utente Andrea: andrea
-- Password utente Alessio: alessio
--

--
-- Dump dei dati per la tabella `locations`
--

INSERT INTO locations (id, nome, descrizione, indirizzo, nPosti, createdAt, updatedAt, UtentiId) VALUES
(1, 'Castello', 'Medievale', 'Via Rossi, 10', 200, '2024-06-11 17:13:07', '2024-06-11 17:13:07', 2),
(2, 'San Siro', 'Stadio', 'Via Albertini, 8', 10000, '2024-06-11 17:13:07', '2024-06-11 17:13:07', 2);

--
-- Dump dei dati per la tabella `eventi`
--

INSERT INTO eventi (id, nome, descrizione, dataEvento, createdAt, updatedAt, LocationId, UtentiId) VALUES
(1, 'Adidas Event', 'Evento Adidas', '2025-08-10', '2024-06-11 17:13:07', '2024-06-11 17:13:07', 2, 1);




