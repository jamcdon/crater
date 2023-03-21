import express, {Application} from 'express';
import cookieParser from 'cookie-parser';
import apiRouter from './api/routes'
import frontEndRouter from './frontend/routes'
import sqlInit from './db/sql/init'
import noSqlInit from './db/nosql/init'
import { blobInit, blobPolicy, setImageImageDefault } from './db/blob/init';
import { cacheInit } from './db/cache/init'
import path from 'path'

sqlInit()
noSqlInit()
cacheInit()

blobInit().then(() => {
	blobPolicy().then(() => {
		setImageImageDefault()
	})
})

const app: Application = express();
const HOST = '0.0.0.0';
const PORT = 3000;
const cookieSignature = process.env.COOKIE_SIGNATURE as string;

//pug middleware
app.set("views", path.join(__dirname, "../views"))
app.use(express.static(path.join(__dirname, "../public")))
app.set("views engine", "pug")
app.use(cookieParser(cookieSignature))

//Body parsing middleware
export const get = () => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use('/api/v1', apiRouter)
	app.use('/', frontEndRouter)
	return app
}

//Cookie middleware
app.use(cookieParser(cookieSignature))

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