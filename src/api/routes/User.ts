import { Router } from 'express'

const userRouter = Router()

userRouter.get('/:username', () => {
    // get user by username
})

userRouter.put('/:id', () => {
    // update user by id
})

userRouter.delete('/:id', () => {
    // delete user by id
})

userRouter.post('/', () => {
    // create user
})

export default userRouter