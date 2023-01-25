import mongoose from 'mongoose'

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbHost = process.env.NO_SQL_HOST as string;
const dbPort: number = +(process.env.NO_SQL_PORT as string);

//const connectionString: string = `mongodb://${dbHost}:27017/${dbName}`
//const connectionString: string = `mongodb://${dbUser}:${dbPassword}@${dbHost}:27017/${dbName}?authSource=admin&w=1`
const connectionString: string = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/`
const noSqlInit = () => {
    mongoose.connect(connectionString)
    console.log('Connecting to NOSQL database...')
}

export default noSqlInit