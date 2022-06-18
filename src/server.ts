import express, {Application, Request, Response} from 'express';

const app: Application = express();
const HOST = '127.0.0.1';
const PORT = 3000;

//Body parsing middleware
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

try{
	app.listen(PORT, HOST, () => {
		console.log(`server running at http://${HOST}:${PORT}`) 
	})
}
catch (error) {
	console.log(`Error occured: ${error}`)
}
