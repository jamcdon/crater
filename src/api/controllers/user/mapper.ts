import { User } from '../../interfaces'
import { UserOutput } from '../../../db/sql/models/User'

export const toUser = (user: UserOutput): User => {
    return {
        id: user.id,
        email: user.email,
        username: user.username,
        passwordSalt: user.passwordSalt,
        passwordHash: user.passwordHash,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt
    }
}