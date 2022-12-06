import {redisClient} from '../init'

export const createToken = async(): Promise<string> => {
    let id = (Math.random() * 100000000000000000).toString()
    if (await redisClient.get(id)){
        id = await createToken()
    }
    return id
}