# Dockerd
> the opensource docker-compose webapp

## Tooling
#### Node.js
- Typescript
  - For strongly typed code and better reliability
- Express
  - Web framework for managing routing and HTTP related commands
- Sequelize
  - ORM to more easily maintain SQL tables and transactions
- Mongoose
  - ORM to more easily maintain NoSQL (MongoDB) tables and transactions
- Minio
  - Client for accessing BLOB data
- Pug
  - Storing HTML as HAML for high reusability and extensibility
#### MySQL
- Storing low usage, high reliability transactions
#### MongoDB
- Storing high usage transactions
#### Minio
- Storing BLOBs such as images

## resources:
 - [sequelize](https://blog.logrocket.com/using-sequelize-with-typescript/)
 - [mongoose](https://medium.com/swlh/typescript-with-mongoose-and-node-express-24073d51d2ee)
 - [mongoose docs](https://mongoosejs.com/docs/typescript/schemas.html)
 - [markdown](https://medium.com/geekculture/how-to-make-a-next-js-blog-with-markdown-and-typescript-1624a54f1b9e)

## goals
- user auth (in progress)
- interactive landing page
- logo with name
- clone over https
  - auto-gen .env file as well
  - Resources:
    - [MIT 2006 git http article](https://web.mit.edu/git/git-doc/git-http-backend.html)
    - [MIT git-http-backend](https://web.mit.edu/git/git-doc/git-http-backend.html)
- add dropdown for subpages of subpage youre on
- read sequelize documentation for something similar to [mongoose methods](https://mongoosejs.com/docs/typescript/statics-and-methods.html#methods)
- create unique usernames and passwords for all related applications when in prod