//sql
import { Optional } from "sequelize/types"

export type CreateUserDTO = {
    id: number;
    email: string;
    username: string;
    passwordSalt: string;
    passwordHash: string;
}

export type UpdateUserDTO = Optional<CreateUserDTO, 'id'>

export type FilterUserDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}