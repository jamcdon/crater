import { createClient } from 'redis';

const dbPass = process.env.REDIS_PASS as string;
const dbHost = process.env.REDIS_HOST as string;
const dbPort = process.env.REDIS_PORT as string;

export const redisClient = createClient({
    url: `redis://default:${dbPass}@${dbHost}:${dbPort}`
})

redisClient.on('error', (err: any) => console.log('Redis client error', err))

export const cacheInit = async() => {
    await redisClient.connect()
        .then(() => {
            console.log('Redis client connected')
    })
}