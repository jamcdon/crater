import { Router, Request, Response } from 'express'
import * as userController from '../controllers/user'
import { CreateUserDTO, FilterUserDTO, UpdateUserDTO, CreateUserNoSalt, UpdateUserNoSalt } from '../dto/user.dto'

const userRouter = Router()

userRouter.get('/id/:id', async (req: Request, res: Response) => {
    // get user by id
    const id = Number(req.params.id)
    const result = await userController.getById(id)
    return res.status(200).send(result)
})

userRouter.get('/:username', async (req: Request, res: Response) => {
    const username = String(req.params.username)
    const result = await userController.getByUsername(username)
    return res.status(200).send(result)
})

userRouter.put('/id/:id', async (req: Request, res: Response) => {
    // update user by id
    const id = Number(req.params.id)
    const payload:UpdateUserNoSalt = req.body
    const saltHashPayload = await userController.updateUserSaltHash(payload)

    const result = await userController.update(id, saltHashPayload)
    return res.status(201).send(result)
})

userRouter.delete('/id/:id', async(req: Request, res: Response) => {
    // delete user by id
    const id = Number(req.params.id)

    const result = await userController.deleteById(id)
    return res.status(204).send({
        success: result
    })
})

userRouter.post('/', async (req: Request, res: Response) => {
    // create user
    const payload:CreateUserNoSalt = req.body
    const saltHashPayload = await userController.createUserSaltHash(payload)

    const results = await userController.create(saltHashPayload)
    return res.status(200).send(results)
})

export default userRouter