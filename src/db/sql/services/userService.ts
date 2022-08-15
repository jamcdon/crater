import * as userDAL from '../dal/User'
import { UserInput, UserOutput} from '../models/User'
import { SignInUserDTO } from '../../../api/dto/user.dto'

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

export const validateUsername = (username: string): Promise<boolean> => {
    return userDAL.validateUsername(username)
}

export const validateEmail = (email: string): Promise<boolean> => {
    return userDAL.validateEmail(email)
}

export const getSaltFromEmail = (email: string): Promise<string> => {
    return userDAL.getSaltFromEmail(email)
}

export const authenticateByEmail = (payload: SignInUserDTO): Promise<string> => {
    return userDAL.authenticateByEmail(payload)
}

export const deleteById = (id: number): Promise<Boolean> => {
    return userDAL.deleteById(id)
}
