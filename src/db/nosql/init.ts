import mongoose from 'mongoose'
import { ConnectOptions } from 'mongoose';

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.NO_SQL_HOST as string;
const dbPassword = process.env.DB_PASSWORD as string;

//const connectionString: string = `mongodb://${dbUser}:${dbPassword}@${dbHost}:27017/${dbName}`
const connectionString: string = `mongodb://${dbHost}:27017/${dbName}`
const noSqlInit = () => {
    mongoose.connect(connectionString)
    console.log('Connected to NOSQL databse.')
}

export default noSqlInit