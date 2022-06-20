import * as userDAL from '../dal/User'
import { UserInput, UserOutput } from '../models/User'

export const create = (payload: UserInput): Promise<UserOutput> => {
    return userDAL.create(payload)
}

export const update = (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
    return userDAL.update(id, payload)
}

export const getById = (id: number): Promise<UserOutput> => {
    return userDAL.getById(id)
}

export const getByUsername = (username: string): Promise<UserOutput> => {
    return userDAL.getByUsername(username)
}

export const deleteById = (id: number): Promise<Boolean> => {
    return userDAL.deleteById(id)
}
