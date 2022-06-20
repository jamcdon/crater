import * as userDAl from '../dal/User'
import { UserInput, UserOutput } from '../models/User'

export const create = (payload: UserInput): Promise<UserOutput> => {
    return userDAl.create(payload)
}

export const update = (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
    return userDAl.update(id, payload)
}

export const getById = (id: number): Promise<UserOutput> => {
    return userDAl.getById(id)
}

export const deleteById = (id: number): Promise<Boolean> => {
    return userDAl.deleteById(id)
}
