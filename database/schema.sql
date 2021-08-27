CREATE TABLE IF NOT EXISTS `user` (
   `userID` SERIAL NOT NULL,
   `userName` varchar(45) NOT NULL,
   `password` varchar(45) NOT NULL,
   PRIMARY KEY (`userID`),
   UNIQUE KEY `userID_UNIQUE` (`userID`),
   UNIQUE KEY `userName` (`userName`)
);

