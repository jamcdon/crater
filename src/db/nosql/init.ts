import mongoose from 'mongoose'

const dbUser = process.env.MONGO_USER as string;
const dbPassword = process.env.MONGO_PASS as string;
const dbHost = process.env.NO_SQL_HOST as string;
const dbPort: number = +(process.env.NO_SQL_PORT as string);

const connectionString: string = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/`
const noSqlInit = () => {
    mongoose.connect(connectionString)
    console.log('Connecting to NOSQL database...')
}

export default noSqlInit