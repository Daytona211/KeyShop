CREATE TABLE People(
    SUNY_ID varchar(30) NOT NULL,
    LastName varchar(20) NOT NULL,
    FirstName varchar(20) NOT NULL,
    Classification varchar(20) NOT NULL
);

CREATE TABLE logins(
    SUNY_ID varchar(30) NOT NULL,
    Password varchar(30), NOT NULL,
    FOREIGN KEY(SUNY_ID) REFERENCES People(SUNY_ID),
);

CREATE TABLE Orders(
    OrderID INT NOT NULL,
    OrderedBySunyID varchar(20) NOT NULL,
    PlacedBySunyID varchar(20) NOT NULL,
    StatusOfOrder varchar(20),
    Price varchar(20) NOT NULL,
    PRIMARY KEY(OrderID),
    FOREIGN KEY(OrderedBySunyID) REFERENCES People(SUNY_ID),
    FOREIGN KEY(PlacedBySunyID) REFERENCES People(SUNY_ID)
);
CREATE TABLE Rooms(
    RoomId varchar(20) NOT NULL,
    Building varchar(20) NOT NULL,
    RoomNumber varchar(20) NOT NULL,
    PRIMARY KEY(RoomId)
);
CREATE TABLE Keys(
    KeyID varchar(20) NOT NULL,
    SuiteKey varchar(4) NOT NULL,
    RoomKey varchar(4) NOT NULL,
    MailboxKey varchar(8) NOT NULL,
    -- Make a foreign key that connects a room with it's keys 
);