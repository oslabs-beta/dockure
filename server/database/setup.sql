/*
These are the tables required to run our app.
Please create a separate database for these tables inside of your DB, e.g. CREATE DATABASE wobble_chat; 
Then 
 */

--  CREATE TABLE IF NOT EXISTS users (
--    id SERIAL PRIMARY KEY NOT NULL,
--    username varchar(50) UNIQUE NOT NULL,
--    password varchar(50) NOT NULL,
--    email varchar(100) UNIQUE NOT NULL,
--    -- isLoggedIn boolean DEFAULT true
-- );

-- CREATE TABLE IF NOT EXISTS `user` (
--    `id` SERIAL NOT NULL,
--    `username` varchar(50) NOT NULL,
--    `password` varchar(50) NOT NULL,
--    `email` varchar(100) NOT NULL,
--    PRIMARY KEY (`id`),
--    UNIQUE KEY `username` (`username`)
--    UNIQUE KEY `email` (`email`)
--    -- isLoggedIn boolean DEFAULT true
-- );

-- CREATE TABLE IF NOT EXISTS `user` (
--    `id` SERIAL NOT NULL,
--    `username` varchar(50) NOT NULL,
--    `password` varchar(50) NOT NULL,
--    `email` varchar(100) NOT NULL,
--    PRIMARY KEY (`id`),
--    UNIQUE KEY `id_UNIQUE` (`id`),
--    UNIQUE KEY `username` (`username`)
--    UNIQUE KEY `email` (`email`)
--    -- isLoggedIn boolean DEFAULT true
-- );

-- CREATE TABLE IF NOT EXISTS users (
--   id SERIAL PRIMARY KEY,
--   username varchar(50) UNIQUE,
--   password varchar(100),
--   isLoggedIn boolean DEFAULT true
-- );

-- CREATE TABLE IF NOT EXISTS accounts (
-- 	user_id serial PRIMARY KEY,
-- 	username VARCHAR ( 50 ) UNIQUE NOT NULL,
-- 	password VARCHAR ( 50 ) NOT NULL,
-- 	email VARCHAR ( 255 ) UNIQUE NOT NULL,
-- );

-- CREATE TABLE IF NOT EXISTS questions (
--   id SERIAL PRIMARY KEY,
--   title varchar(500) NOT NULL,
--   description text NOT NULL,
--   url varchar(100) UNIQUE NOT NULL,
--   isAnswered boolean DEFAULT false NOT NULL,
--   creator integer REFERENCES users(id) NOT NULL,
--   /* Can you do a foreign key reference of a boolean in another table? The boolean is not a key... */
--   isOpen boolean DEFAULT false NOT NULL
-- );
-- CREATE TABLE IF NOT EXISTS messages (
--   id SERIAL PRIMARY KEY,
--   dateCreated date NOT NULL,
--   questionId integer REFERENCES questions(id),
--   content text NOT NULL,  
--   senderid varchar,
--   ownedbycurrentuser boolean,
--   body text,
--   num integer
-- );