CREATE TABLE People(
    SUNY_ID int NOT NULL AUTO_INCREMENT,
    LastName varchar(20) NOT NULL,
    FirstName varchar(20) NOT NULL,
    Classification varchar(20) NOT NULL,
    PRIMARY KEY(SUNY_ID)
);

CREATE TABLE logins(
    SUNY_ID int NOT NULL,
    Pass varchar(30) NOT NULL,
    FOREIGN KEY(SUNY_ID) REFERENCES People(SUNY_ID)
);

CREATE TABLE Rooms(
    RoomID int NOT NULL AUTO_INCREMENT,
    Quad varchar(20) NOT NULL,
    Building varchar(20) NOT NULL,
    RoomNumber varchar(20) NOT NULL,
    SUNY_ID int,
    FOREIGN KEY(SUNY_ID) REFERENCES People(SUNY_ID),
    PRIMARY KEY(RoomID)
);

CREATE TABLE Orders(
    OrderID INT NOT NULL AUTO_INCREMENT,
    OrderedBySunyID int NOT NULL,
    PlacedBySunyID int NOT NULL,
    StatusOfOrder varchar(20),
    Price varchar(20) NOT NULL,
    Reason varchar(40),
    NumberOfSuiteKeys int,
    NumberOfBedroomKeys int,
    NumberOfMailboxKeys int,
    RoomID int(20) NOT NULL,
    PRIMARY KEY(OrderID),
    FOREIGN KEY(OrderedBySunyID) REFERENCES People(SUNY_ID),
    FOREIGN KEY(PlacedBySunyID) REFERENCES People(SUNY_ID),
    FOREIGN KEY(RoomID) REFERENCES Rooms(RoomID)
);

CREATE TABLE KeyInfo(
    KeyID int NOT NULL AUTO_INCREMENT,
    SuiteKey varchar(4) NOT NULL,
    RoomKey varchar(4) NOT NULL,
    MailboxKey varchar(8) NOT NULL,
    RoomID int NOT NULL,
    PRIMARY KEY(KeyID),
    FOREIGN KEY(RoomID) REFERENCES Rooms(RoomID)
    --Make a foreign key that connects a room with it 's keys 
);