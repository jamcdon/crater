import * as crypto from 'crypto'
import e from 'express'
import * as service from '../../../db/sql/services/userService'
import {
    CreateUserDTO,
    UpdateUserDTO,
    FilterUserDTO,
    CreateUserNoSalt,
    UpdateUserNoSalt,
    SignInUserDTO
} from '../../dto/user.dto'
import {User} from '../../interfaces'
import * as mapper from './mapper'
import {redisClient} from '../../../db/cache/init'
import { createToken } from '../../../db/cache/dal/User'

const saltHash = (password: string, passedSalt?: string):  { salt: string, hexHash: string }=> {
    let salt;
    if (passedSalt == undefined){
        salt = crypto.randomBytes(64)
            .toString('hex')
    }
    else {
        salt = passedSalt
    }
        const hash = crypto.createHmac('sha512', salt)
        hash.update(password)
        const hexHash = hash.digest('hex')
       return {salt, hexHash}
}

export const createUserSaltHash = async(payload: CreateUserNoSalt): Promise<CreateUserDTO> => {
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
    // if payload.password does not exist return, else resalt and rehash
    if (!payload.password) {
        return payload as unknown as UpdateUserDTO
    }
    else {
        const {salt, hexHash} = saltHash(payload.password)
        
        const newPayload: any = payload
        delete newPayload.password
        newPayload.passwordSalt = salt
        newPayload.passwordHash = hexHash
        const saltHashUserDTO:UpdateUserDTO = newPayload

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

export const validateUsername = async(username: string): Promise<boolean> => {
    return (await service.validateUsername(username))
}

export const validateEmail = async(email: string): Promise<boolean> => {
    return (await service.validateEmail(email))
}

export const authenticateByEmail = async(payload: SignInUserDTO): Promise <string> => {
    const salt = await service.getSaltFromEmail(payload.email)
    const hash = saltHash(payload.password as string, salt).hexHash
    const newPayload: SignInUserDTO = {
        email: payload.email,
        hash: hash
    }
    return (await service.authenticateByEmail(newPayload))
}

export const deleteById = async (id: number): Promise<Boolean> => {
    const isDeleted = await service.deleteById(id)
    return isDeleted
}

export const setCookie = async (username: string): Promise<string> => {
    const id = await createToken()
    redisClient.set(id, username)
    redisClient.expire(id, 259200) // set TLL to 3 days
    return id
}