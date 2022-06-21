import express, {Application, Request, Response} from 'express';
import apiRoutes from './api/routes'
import frontEndRoutes from './frontend/router'
import sqlInit from './db/sql/init'
import noSqlInit from './db/nosql/init'
import path from 'path'

sqlInit()
noSqlInit()

const app: Application = express();
const HOST = '0.0.0.0';
const PORT = 3000;

//pug middleware
app.set("views", path.join(__dirname, "../../views"))
app.set("views engine", "pug")

//Body parsing middleware
export const get = () => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use('/', frontEndRoutes)
	app.use('/api/v1', apiRoutes)
	return app
}

export const start = () => {
	const app = get()
	try{
		app.listen(PORT, HOST, () => {
			console.log(`server running at http://${HOST}:${PORT}`) 
		})
	}
	catch (error) {
		console.log(`Error occured: ${error}`)
	}
}

start()