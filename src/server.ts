import express, {Application, Request, Response} from 'express';
import routes from './api/routes'
import dbInit from './db/sql/init'

dbInit()

const app: Application = express();
const HOST = '0.0.0.0';
const PORT = 3000;

//Body parsing middleware
export const get = () => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.get('/', async(req: Request, res: Response):
		Promise<Response> => {
			return res
				.status(200)
				.send({
					message: `Hello, World!\n Endpoints at: http://${HOST}:${PORT}/api/v1`
				})
		}
	)

	app.use('/api/v1', routes)
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