import * as crypto from 'crypto'
import * as service from '../../../db/sql/services/userService'
import {CreateUserDTO, UpdateUserDTO, FilterUserDTO, CreateUserNoSalt, UpdateUserNoSalt } from '../../dto/user.dto'
import {User} from '../../interfaces'
import * as mapper from './mapper'

const saltHash = (password: string):  { salt: string, hexHash: string }=> {
    const salt = crypto.randomBytes(64)
        .toString('hex')
    const hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    const hexHash = hash.digest('hex')
    return {salt, hexHash}
}

export const createUserSaltHash = async(payload: CreateUserNoSalt): Promise<CreateUserDTO> => {
    /*const randomSalt = crypto.randomBytes(64)
        .toString('hex');
    
    const hash = crypto.createHmac('sha512', randomSalt)
    hash.update(payload.password)
    const hexHash = hash.digest('hex')
    */
    const {salt, hexHash} = saltHash(payload.password)

    const saltHashUserDTO:CreateUserDTO = {
        id: payload.id,
        email: payload.email,
        username: payload.username,
        passwordSalt: salt,
        passwordHash: hexHash
    }

    return saltHashUserDTO
}

export const create = async(payload: CreateUserDTO): Promise<User> => {
    return mapper.toUser(await service.create(payload))
}

export const updateUserSaltHash = async(payload: UpdateUserNoSalt): Promise<UpdateUserDTO> => {
    // let output: UpdateUserDTO | UpdateUserNoSalt;
    if (!!payload.password) {
        return payload as unknown as UpdateUserDTO
    }
    else {
        const {salt, hexHash} = saltHash(payload.password)

        const saltHashUserDTO:UpdateUserDTO = {

        }

        return saltHashUserDTO
    }
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