![Lines of Code](http://sonar.jdogg.club/api/project_badges/measure?project=jared%3Acrater&metric=ncloc&token=sqb_56cd8692ba75dcc4e1dc69d3301d36aacefef7aa) ![Bugs](http://sonar.jdogg.club/api/project_badges/measure?project=jared%3Acrater&metric=bugs&token=sqb_56cd8692ba75dcc4e1dc69d3301d36aacefef7aa) ![Security Rating](http://sonar.jdogg.club/api/project_badges/measure?project=jared%3Acrater&metric=security_rating&token=sqb_56cd8692ba75dcc4e1dc69d3301d36aacefef7aa) ![Reliability Rating](http://sonar.jdogg.club/api/project_badges/measure?project=jared%3Acrater&metric=reliability_rating&token=sqb_56cd8692ba75dcc4e1dc69d3301d36aacefef7aa)

# crater.sh <img alt="crater crane" src="public/img/crane-yl.svg" witdth="30" height="48"/>
> the opensource docker-compose webapp

_Now under the GNU AGPLv3 license!_ 

## Tooling
### Node.js
- Typescript
  - [npm](https://www.npmjs.com/package/typescript)
  - [GitHub](https://github.com/Microsoft/TypeScript)
  - For strongly typed code and better reliability
- Express
  - [npm](https://www.npmjs.com/package/express)
  - [GitHub](https://github.com/expressjs/express)
  - Web framework for managing routing and HTTP related operations
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
- nsfwjs
  - [npm](https://www.npmjs.com/package/nsfwjs)
  - [GitHub](https://github.com/infinitered/nsfwjs)
  - Pornography detection and blocking for user submitted images
- randpix
  - [npm](https://www.npmjs.com/package/randpix)
  - [GitHub](https://github.com/LIMPIX31/randpix)
  - Random pixelart generator for default profile pictures
- redis
  - [npm](https://www.npmjs.com/package/redis)
  - [GitHub](https://github.com/redis/node-redis)
  - Client for accessing Redis cache database

- ace
  - [npm](https://www.npmjs.com/package/ace-code)
  - [GitHub](https://github.com/ajaxorg/ace)
  - [CDNJS](https://cdnjs.com/libraries/ace)
  - Frontend syntax highlighting/lightweight IDE for creating and displaying YAML scripts on crater

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
#### Redis
- [Docker Hub](https://hub.docker.com/_/redis)
- [GitHub](https://github.com/redis/redis)
- storing key value data in memory such as cookies

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
    - rust webserver with git instance on alpine container?
      - HTTP only
      - no remote pushes allowed to repos
      - delete after x timing? store most used longer?
- add dropdown for subpages of subpage youre on
- read sequelize documentation for something similar to [mongoose methods](https://mongoosejs.com/docs/typescript/statics-and-methods.html#methods)
- create unique usernames and passwords for all related applications when in prod
- pornography testing on uploaded images via [nsfwjs](https://www.npmjs.com/package/nsfwjs)
- explore testing options?
  - `npm i jest --save=dev`
  - `npm i ts-jest --save-dev`
  - `npm i @types/jest --save-dev`
  - [guide](https://www.testim.io/blog/typescript-unit-testing-101/)
  - [docs](https://jestjs.io/docs/getting-started)
- add javascript minifying for frontend code
- headless cms? strapi?

## known issues
- Blob storage requires starting and stopping app for bucket and policy to be set
- User account page image is being grabbed from internal IP
- api router needs better 404 etc error handling instead of timing out (i.e. dont stall when hitting /api/v1/user/{not_a_user})