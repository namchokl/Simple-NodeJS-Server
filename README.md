# Simple-NodeJS-Server

> A template of NodeJS/Express server for simple authentication APIs.

* It provides two API routes for **signup** and **login** : 
  * POST: /auth/signup
  * POST: /auth/login
* Uses MongoDB/Mongoose for user data.
* Authentication using bcrypt and jsonwebtoken.
* Request valdation with 'express-validator'.

## It requires these Env Variables:
* port=?
* MONGO_USER=?
* MONGO_PASSWORD=?
* MONGO_DB_NAME=?
* JWT_SECRET_KEY=?
