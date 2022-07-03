import {Op} from 'sequelize';
import sequelizeConnection from '../config';
import {User} from '../models';
import {UserInput, UserOutput} from '../models/User'
import Sequelize from 'sequelize'

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

export const getByUsername = async(username: string): Promise<UserOutput> => {
    const user = await User.findOne({ 
        where: { 
            username: {
                [Op.iLike]: username
            }
        }
    })
    if (!user) {
        throw new Error('not found')
    }
    return user
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedUserCount = await User.destroy({
        where: {id}
    })
    return !!deletedUserCount
}