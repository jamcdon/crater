import { Dialect, Sequelize } from 'sequelize';

const dbName = process.env.MYSQL_DATABASE as string;
const dbUser = process.env.MYSQL_USER as string;
const dbHost = process.env.SQL_HOST;
const dbDriver = process.env.DB_DRIVER as Dialect;
const dbPassword = process.env.MYSQL_PASSWORD;
const dbPort: number = +(process.env.SQL_PORT as string);

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
	host: dbHost,
	port: dbPort,
	dialect: dbDriver	
})

export default sequelizeConnection;
