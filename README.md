# Dockerd
> the opensource docker-compose webapp

## Tooling
### Node.js
- Typescript
  - [npm](https://www.npmjs.com/package/typescript)
  - [GitHub](https://github.com/Microsoft/TypeScript)
  - For strongly typed code and better reliability
- Express
  - [npm](https://www.npmjs.com/package/express)
  - [GitHub](https://github.com/expressjs/express)
  - Web framework for managing routing and HTTP related commands
- Sequelize
  - [npm](https://www.npmjs.com/package/sequelize)
  - [GitHub](https://github.com/sequelize/sequelize)
  - ORM to more easily maintain SQL tables and transactions
- Mongoose
  - [npm](https://www.npmjs.com/package/mongoose)
  - [GitHub](https://github.com/Automattic/mongoose)
  - ORM to more easily maintain NoSQL (MongoDB) tables and transactions
- Minio
  - [npm](https://www.npmjs.com/package/minio)
  - [GitHub](https://github.com/minio/minio-js)
  - Client for accessing BLOB data
- Pug
  - [npm](https://www.npmjs.com/package/pug)
  - [GitHub](https://github.com/pugjs/pug/tree/master/packages/pug)
  - Storing HTML as HAML for high reusability and extensibility
- Multer
  - [npm](https://www.npmjs.com/package/multer)
  - [GitHub](https://github.com/expressjs/multer)
  - Handling transactions between API and Minio bucket for BLOBs
- nsfwjs
  - [npm](https://www.npmjs.com/package/nsfwjs)
  - [GitHub](https://github.com/infinitered/nsfwjs)
  - Pornography detection and blocking for user submitted images

#### MySQL
- [Docker Hub](https://hub.docker.com/_/mysql)
- [GitHub](https://github.com/mysql/mysql-server)
- Storing low usage, high reliability transactions
#### MongoDB
- [Docker Hub](https://hub.docker.com/_/mongo)
- [GitHub](https://github.com/mongodb/mongo)
- Storing high usage transactions
#### Minio
- [Docker Hub](https://hub.docker.com/r/minio/minio)
- [GitHub](https://github.com/minio/minio)
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
- pornography testing on uploaded images via [nsfwjs](https://www.npmjs.com/package/nsfwjs)