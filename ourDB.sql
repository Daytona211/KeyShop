	CREATE TABLE Students(
        RoomNumber varchar(10),
        Building varchar(20),
        LastName varchar(20) NOT NULL,
        FirstName varchar(20) NOT NULL,
        SUNY_ID varchar(30) NOT NULL,
        PRIMARY KEY (SUNY_ID)
    );
    CREATE TABLE Rooms(
        Building varchar(20) NOT NULL,
        SuiteKey varchar(4), 
        RoomKey varchar(4),
        MailboxKey varchar(8) NOT NULL, 
        RoomNumber varchar(20) NOT NULL,
        PRIMARY KEY (RoomNumber)
    );
    CREATE TABLE Reslife(
        LastName varchar(20) NOT NULL,
        FirstName varchar(20) NOT NULL,
        SUNY_ID varchar(30) NOT NULL,
        FOREIGN KEY (SUNY_ID) REFERENCES Students(SUNY_ID)
    );
    CREATE TABLE KeyMakers(
        LastName varchar(20) NOT NULL,
        FirstName varchar(20) NOT NULL,
        EmployeeID varchar(30) NOT NULL,
        SUNY_ID varchar(30) NOT NULL,
        PRIMARY KEY (EmployeeID)
        FOREIGN KEY (SUNY_ID) REFERENCES Students(SUNY_ID)
    );
    CREATE TABLE Orders(
        OrderID INT NOT NULL,
        OrderedBySunyID varchar(20) NOT NULL, 
        PlacedBySunyID varchar(20) NOT NULL,
        StatusOfOrder varchar(20),
        PRIMARY KEY(OrderID), 
        FOREIGN KEY(OrderedBySunyID) REFERENCES Students(SUNY_ID),
        FOREIGN KEY(PlacedBySunyID) REFERENCES Reslife(SUNY_ID)
    );
	CREATE TABLE logins(
        SUNY_ID varchar(30) NOT NULL,
        Password varchar(30), NOT NULL,
        FOREIGN KEY(SUNY_ID) REFERENCES Students(SUNY_ID),
	);

    CREATE TABLE People(
        SUNY_ID varchar(30) NOT NULL,
        FirstName varchar(30), NOT NULL,
        LastName varchar(30), NOT NULL,
    );