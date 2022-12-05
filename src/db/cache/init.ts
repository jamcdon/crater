import { createClient } from 'redis';

const dbPass = process.env.DB_PASSWORD as string;
const dbHost = process.env.REDIS_HOST as string;
const dbPort = process.env.REDIS_PORT as string;

const redisClient = createClient({
    url: `redis://default:${dbPass}@${dbHost}:${dbPort}`
})

redisClient.on('error', (err: any) => console.log('Redis client error', err))

export const cacheInit = async() => {
    await redisClient.connect()
        .then(() => {
            console.log('Redis client connected')
    })
}