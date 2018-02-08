CREATE TABLE team (
  TeamID INT NOT NULL auto_increment,
  Bezeichnung VARCHAR(255),
  Ort VARCHAR(255),
  PRIMARY KEY (TeamID)
);

CREATE TABLE spieler (
  SpielerID INT NOT NULL auto_increment,
  Nachname VARCHAR(255),
  Vorname VARCHAR(255),
  Geburtsdatum DATETIME,
  Geschlecht VARCHAR(20),
  Beitrittsdatum DATETIME,
  Strasse VARCHAR(255),
  Hausnummer INT NOT NULL,
  PLZ VARCHAR(5),
  Ort VARCHAR(45),
  TeamID INT NOT NULL,
  Rueckennummer INT NOT NULL,
  PRIMARY KEY (SpielerID),
  FOREIGN KEY (TeamID) REFERENCES team(TeamID)
);

CREATE TABLE spiel (
  SpielID INT NOT NULL auto_increment,
  PunkteGast INT NOT NULL,
  PunkteHeim INT NOT NULL,
  PRIMARY KEY (SpielID)
);

CREATE TABLE tor (
  TorID INT NOT NULL auto_increment,
  Spielminute VARCHAR(20),
  SpielID INT NOT NULL,
  SpielerID INT NOT NULL,
  TeamID INT NOT NULL,
  PRIMARY KEY (TorID),
  FOREIGN KEY (SpielID) REFERENCES spiel(SpielID),
  FOREIGN KEY (SpielerID) REFERENCES spieler(SpielerID),
  FOREIGN KEY (TeamID) REFERENCES team(TeamID)
);

CREATE TABLE strafe (
  StrafeID INT NOT NULL auto_increment,
  Datum DATE,
  Hoehe DOUBLE NOT NULL,
  SpielID INT NOT NULL,
  SpielerID INT NOT NULL,
  PRIMARY KEY (StrafeID),
  FOREIGN KEY (SpielID) REFERENCES spiel(SpielID),
  FOREIGN KEY (SpielerID) REFERENCES spieler(SpielerID)
);

CREATE TABLE zuordnung (
  ZuordnungID INT NOT NULL auto_increment,
  SpielID INT NOT NULL,
  TeamGastID INT NOT NULL,
  TeamHeimID INT NOT NULL,
  PRIMARY KEY (ZuordnungID),
  FOREIGN KEY (TeamGastID) REFERENCES team(TeamID),
  FOREIGN KEY (TeamHeimID) REFERENCES team(TeamID),
  FOREIGN KEY (SpielID) REFERENCES spiel(SpielID)
);

INSERT INTO team VALUES
  (NULL, 'Klara-Oppenheimer-Schule Lehrermannschaft', 'WürzburgKlara-Oppenheimer-Schule Lehrermannteam'),
  (NULL, 'Klara-Oppenheimer-Schule Schülermannschaft', 'Würzburg'),
  (NULL, 'FCB', 'München'),
  (NULL, 'FCN', 'Nürnberg');

INSERT INTO spieler VALUES
  -- Spieler von Team 1
  (NULL, 'Zobel', 'Christoph', '1977-02-12 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '12', '97286', 'Winterhausen', 1, 1), 
  (NULL, 'Steinam', 'Karl', '1913-07-08 00:00:00', 'männlich', '2013-07-07 00:00:00', 'Musterstraße', '15', '97070', 'Würzburg', 1, 2),
  (NULL, 'Schellenberger', 'Mario', '1983-07-08 00:00:00', 'männlich', '2013-07-07 00:00:00', 'Waldallee', '15', '97070', 'Würzburg', 1, 3),
  (NULL, 'Sych', 'Gerd', '1968-07-08 00:00:00', 'männlich', '2013-07-07 00:00:00', 'Strandallee', '15', '97070', 'Würzburg', 1, 4),
  (NULL, 'Borachard', 'Frank', '1950-07-08 00:00:00', 'männlich', '2013-07-07 00:00:00', 'Musterstraße', '15', '97070', 'Würzburg', 1, 5),
  (NULL, 'Kral', 'Christian', '1973-07-08 00:00:00', 'männlich', '2013-07-07 00:00:00', 'Musterstraße', '15', '97070', 'Würzburg', 1, 6),
  (NULL, 'Rebhan', 'Timo', '1973-07-08 00:00:00', 'männlich', '2013-07-07 00:00:00', 'Musterstraße', '15', '97070', 'Würzburg', 1, 7),
  (NULL, 'Baierl', 'Helmut', '1943-07-08 00:00:00', 'männlich', '2013-07-07 00:00:00', 'Musterstraße', '15', '97070', 'Würzburg', 1, 8),
  (NULL, 'Sierl', 'Norbert', '1946-07-08 00:00:00', 'männlich', '2013-07-07 00:00:00', 'Musterstraße', '15', '97070', 'Würzburg', 1, 9),
  (NULL, 'Tröster', 'Anni', '1969-07-08 00:00:00', 'weiblich', '2013-07-07 00:00:00', 'Musterstraße', '15', '97070', 'Würzburg', 1, 10),
  (NULL, 'Lange', 'Martin', '1979-04-08 00:00:00', 'männlich', '2013-07-07 00:00:00', 'Musterstraße', '15', '97070', 'Würzburg', 1, 10),
  (NULL, 'Wallner', 'Renate', '1983-11-25 00:00:00', 'weiblich', '2013-06-06 00:00:00', 'Musterstraße', '16', '97070', 'Würzburg', 1, 11),
  
  -- Spieler von Team 2 - Schülermannschaft
  (NULL, 'Lotze', 'Jürgen', '1991-12-31 00:00:00', 'männlich', '2013-09-09 00:00:00', 'Musterstraße', '13', '97070', 'Würzburg', 2, 10),
  (NULL, 'Loos', 'Sebastian', '1979-09-04 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '14','97070', 'Würzburg', 2, 9),
  (NULL, 'Messi', 'Lionel', '1989-09-04 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '17', '97070', 'Würzburg', 2, 8),
  (NULL, 'Markert', 'Patrick', '1986-02-04 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '18', '97070', 'Würzburg', 2, 7),
  (NULL, 'Richter', 'Daniel', '1994-01-05 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 2, 5),
  (NULL, 'Mueller', 'Klaus', '1994-01-04 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 2, 4),
  (NULL, 'Schneider', 'Matthias', '1995-02-06 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 2, 3),
  (NULL, 'Richter', 'Bernd', '1997-03-07 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 2, 2),
  (NULL, 'Kaiser', ' Kurt', '1998-09-11 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 2, 1),
  (NULL, 'Schöll', 'Willi', '1991-04-04 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 2, 11),
  (NULL, 'Friedrich', 'Micheal', '1992-05-01 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 2, 12),

  -- Spieler von Team 3 - FCB
  (NULL, 'Schmitz', 'Benno', '1994-11-17 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 3, 14),
  (NULL, 'Chessa', 'Dennis', '1992-11-10 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 3, 13),
  (NULL, 'Buck', 'Stefan', '1980-09-03 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 3, 12),
  (NULL, 'Wein', 'Daniel', '1994-02-05 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 3, 11),
  (NULL, 'Strieder', 'Rico', '1994-09-04 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 3, 10),
  (NULL, 'Derflinger', 'Christian', '1994-02-02 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 3, 9),
  (NULL, 'Schöpf', 'Alessandro', '1994-07-02 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 3, 8),
  (NULL, 'Fischer', 'Bastian', '1993-01-20 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 3, 7),
  (NULL, 'Schweinsteiger', 'Tobias', '1982-03-12 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 3, 6),
  (NULL, 'Weihrauch', 'Patrick', '1994-03-03 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 3, 5),
  (NULL, 'Friesenbichler', 'Kevin', '1994-05-06 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 3, 4),
  (NULL, 'Green', 'Julian', '1995-06-06 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 3, 3),

  -- Spieler von Team 4 - FCN
  (NULL, 'Schäfer', 'Raphael', '1979-01-30 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 4, 11),
  (NULL, 'Rakovsky', 'Patrick', '1993-06-02 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 4, 10),
  (NULL, 'Uphoff', 'Benjamin', '1993-08-08 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 4, 9),
  (NULL, 'Pogatetz', 'Emanuel', '1983-01-16 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 4, 8),
  (NULL, 'Nilsson', 'Per', '1982-09-15 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 4, 7),  
  (NULL, 'Marcos', 'Antonio', '1983-05-25 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 4, 6),
  (NULL, 'Angha', 'Martin', '1994-02-01 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Musterstraße', '19', '97070', 'Würzburg', 4, 5),
  (NULL, 'Korczowski', 'Noah', '1994-01-22 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Prunkalllee', '19', '97070', 'Würzburg', 4, 4),
  (NULL, 'Plattenhardt', 'Marvin', '1994-09-04 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Prunkalllee', '19', '97070', 'Würzburg', 4, 3),
  (NULL, 'Dabanli', 'Berkay', '1994-09-04 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Prunkalllee', '19', '97070', 'Würzburg', 4, 2),
  (NULL, 'Javier', 'Pinola', '1994-09-04 00:00:00', 'männlich', '2013-06-06 00:00:00', 'Spiegelallee', '19', '97070', 'Würzburg', 4, 1);

INSERT INTO spiel VALUES
  (NULL, 3, 0),
  (NULL, 3, 0),
  (NULL, 1, 1),
  (NULL, 1, 1);

INSERT INTO zuordnung VALUES
  (NULL, 1, (SELECT TeamID FROM team WHERE Bezeichnung = 'Klara-Oppenheimer-Schule Lehrermannschaft'), (SELECT TeamID FROM team WHERE Bezeichnung = 'Klara-Oppenheimer-Schule Schülermannschaft')),
  (NULL, 2, (SELECT TeamID FROM team WHERE Bezeichnung = 'Klara-Oppenheimer-Schule Lehrermannschaft'), (SELECT TeamID FROM team WHERE Bezeichnung = 'FCN')),
  (NULL, 3, (SELECT TeamID FROM team WHERE Bezeichnung = 'FCN'), (SELECT TeamID FROM team WHERE Bezeichnung = 'Klara-Oppenheimer-Schule Schülermannschaft')),
  (NULL, 4, (SELECT TeamID FROM team WHERE Bezeichnung = 'FCB'), (SELECT TeamID FROM team WHERE Bezeichnung = 'FCN'));

INSERT INTO tor VALUES
  (NULL, '2', 1, (SELECT SpielerID FROM spieler WHERE Nachname = 'Lotze'), (SELECT TeamID FROM team WHERE Bezeichnung = 'Klara-Oppenheimer-Schule Schülermannschaft')),
  (NULL, '14', 1, (SELECT SpielerID FROM spieler WHERE Nachname = 'Lotze'), (SELECT TeamID FROM team WHERE Bezeichnung = 'Klara-Oppenheimer-Schule Schülermannschaft')),
  (NULL, '41', 1, (SELECT SpielerID FROM spieler WHERE Nachname = 'Lotze'), (SELECT TeamID FROM team WHERE Bezeichnung = 'Klara-Oppenheimer-Schule Schülermannschaft')),
  (NULL, '45+2', 1, (SELECT SpielerID FROM spieler WHERE Nachname = 'Lotze'), (SELECT TeamID FROM team WHERE Bezeichnung = 'Klara-Oppenheimer-Schule Schülermannschaft')),
  (NULL, '66', 1, (SELECT SpielerID FROM spieler WHERE Nachname = 'Lotze'), (SELECT TeamID FROM team WHERE Bezeichnung = 'Klara-Oppenheimer-Schule Schülermannschaft')),
  (NULL, '18', 1, (SELECT SpielerID FROM spieler WHERE Nachname = 'Loos'), (SELECT TeamID FROM team WHERE Bezeichnung = 'Klara-Oppenheimer-Schule Schülermannschaft')),
  (NULL, '28', 1, (SELECT SpielerID FROM spieler WHERE Nachname = 'Loos'), (SELECT TeamID FROM team WHERE Bezeichnung = 'Klara-Oppenheimer-Schule Schülermannschaft')),
  (NULL, '38', 1, (SELECT SpielerID FROM spieler WHERE Nachname = 'Loos'), (SELECT TeamID FROM team WHERE Bezeichnung = 'Klara-Oppenheimer-Schule Schülermannschaft')),
  (NULL, '45', 1, (SELECT SpielerID FROM spieler WHERE Nachname = 'Loos'), (SELECT TeamID FROM team WHERE Bezeichnung = 'Klara-Oppenheimer-Schule Schülermannschaft')),
  (NULL, '90+3', 1, (SELECT SpielerID FROM spieler WHERE  Nachname = 'Zobel'), (SELECT TeamID FROM team WHERE Bezeichnung = 'Klara-Oppenheimer-Schule Lehrermannschaft')),
  (NULL, '58', 2, (SELECT SpielerID FROM spieler WHERE Nachname = 'Wallner'), (SELECT TeamID FROM team WHERE Bezeichnung = 'Klara-Oppenheimer-Schule Lehrermannschaft')),
  (NULL, '90+3', 2, (SELECT SpielerID FROM spieler WHERE  Nachname = 'Zobel'), (SELECT TeamID FROM team WHERE Bezeichnung = 'Klara-Oppenheimer-Schule Lehrermannschaft')),
  (NULL, '58', 1, (SELECT SpielerID FROM spieler WHERE Nachname = 'Wallner'), (SELECT TeamID FROM team WHERE Bezeichnung = 'Klara-Oppenheimer-Schule Lehrermannschaft')),
  (NULL, '78', 2, (SELECT SpielerID FROM spieler WHERE Nachname = 'Markert'), (SELECT TeamID FROM team WHERE Bezeichnung = 'Klara-Oppenheimer-Schule Lehrermannschaft'));

INSERT INTO strafe VALUES
  (NULL, '2013-02-02', '2000.00', '1', '3'),
  (NULL, '2013-04-27', '1337.00', '2', '1'),
  (NULL, '2013-07-01', '8000.85', '3', '4'),
  (NULL, '2013-03-13', '735.83', '4','4'); 
