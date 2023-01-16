import {Op} from 'sequelize';
import sequelizeConnection from '../config';
import {User} from '../models';
import {UserInput, UserOutput} from '../models/User'
import Sequelize from 'sequelize'
import { SignInUserDTO } from '../../../api/dto/user.dto';

export const create = async (payload:UserInput): Promise<UserOutput> => {
    const user = await User.create(payload)
    return user
}
export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
    const user = await User.findByPk(id)
    if (!user) {
        throw new Error('not found')
    }
    const updatedUser = await (user as User).update(payload)
    return updatedUser
}

export const getById = async (id: number): Promise<UserOutput> => {
    const user = await User.findByPk(id)
    if (!user) {
        throw new Error('not found')
    }
    return user
}

export const getByUsername = async(username: string): Promise<UserOutput | null> => {
    //https://stackoverflow.com/questions/41728023/sequelize-case-insensitive-like
    const user = await User.findOne({ 
        where: { 
            username: {
                [Op.like]: `%${username}%`
            }
        }
    })
    return user
}

export const validateUsername = async(username: string): Promise<boolean> => {
    const user = await User.findOne({
        where: {
            username: {
                [Op.like]: `%${username}%`
            }
        }
    })
    return (user ? true : false)
}

export const validateEmail = async(email: string): Promise<boolean> => {
    const user = await User.findOne({
        where: {
            email: {
                [Op.like]: `%${email}%`
            }
        }
    })
    return (user ? true : false)
}

export const getSaltFromEmail = async (email: string): Promise<string> => {
    const user = await User.findOne({
        where: {
            email: {
                [Op.like]: `%${email}%`
            }
        }
    })
    return (user ? user.passwordSalt : '')
}

export const authenticateByEmail = async (payload: SignInUserDTO): Promise<string> => {
    const user = await User.findOne({
        where: {
            email: {
                [Op.like]: `%${payload.email}%`
            },
            passwordHash: {
                [Op.like]: `%${payload.hash}%`
            }
        }
    })
    return (user ? user.username: '')
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedUserCount = await User.destroy({
        where: {id}
    })
    return !!deletedUserCount
}