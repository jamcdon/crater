import mongoose from 'mongoose'
import { ConnectOptions } from 'mongoose';

const dbName = process.env.DB_NAME as string;
const dbHost = process.env.NO_SQL_HOST as string;

const connectionString: string = `mongodb://${dbHost}:27017/${dbName}`
const noSqlInit = () => {
    mongoose.connect(connectionString)
    console.log('Connecting to NOSQL database...')
}

export default noSqlInit