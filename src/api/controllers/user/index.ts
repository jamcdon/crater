import * as crypto from 'crypto'
import * as service from '../../../db/sql/services/userService'
import {CreateUserDTO, UpdateUserDTO, FilterUserDTO, CreateUserNoSalt } from '../../dto/user.dto'
import {User} from '../../interfaces'
import * as mapper from './mapper'

export const createUserSaltHash = async(payload: CreateUserNoSalt): Promise<CreateUserDTO> => {
    const length = payload.password.length 
    const randomSalt = crypto.randomBytes(
        Math.ceil(length/2)
    ).toString('hex').slice(0,length);
    
    const hash = crypto.createHmac('sha512', randomSalt)
    hash.update(payload.password)
    const hexHash = hash.digest('hex')

    const saltHashUserDTO:CreateUserDTO = {
        id: payload.id,
        email: payload.email,
        username: payload.username,
        passwordSalt: randomSalt,
        passwordHash: hexHash
    }

    return saltHashUserDTO
}

export const create = async(payload: CreateUserDTO): Promise<User> => {
    return mapper.toUser(await service.create(payload))
}

export const update = async (id: number, payload: UpdateUserDTO) => {
    return mapper.toUser(await service.update(id, payload))
}

export const getById = async (id: number): Promise<User> => {
    return mapper.toUser(await service.getById(id))
}

export const getByUsername = async(username: string): Promise<User> => {
    return mapper.toUser(await service.getByUsername(username))
}

export const deleteById = async (id: number): Promise<Boolean> => {
    const isDeleted = await service.deleteById(id)
    return isDeleted
}