//sql
import { Optional } from "sequelize/types"

export type CreateUserNoSalt = {
    id: number;
    email: string;
    username: string;
    password: string;
    bio?: string;
}

export type CreateUserDTO = {
    id: number;
    email: string;
    username: string;
    passwordSalt: string;
    passwordHash: string;
    bio?: string;
    sso?: string;
    admin?: boolean;
}

export type SignInUserDTO = {
    email: string;
    password?: string;
    hash?: string;
}

export type UpdateUserDTO = Optional<CreateUserDTO, 'id'>
export type UpdateUserNoSalt = Optional<CreateUserNoSalt, 'id'>

export type FilterUserDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}

export type UserCookieDTO = {
    username: string,
    id: number,
    isAdmin: boolean
}