import { Router, Request, Response } from 'express'
import * as userController from '../controllers/user'
import {
    CreateUserDTO,
    FilterUserDTO,
    UpdateUserDTO,
    CreateUserNoSalt,
    UpdateUserNoSalt,
    SignInUserDTO
} from '../dto/user.dto'
import { BlobObject } from '../../db/blob/models'
import { generateImage } from '../../db/blob/services/RandomPixelArt'

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
    // tests if new password and converts NoSalt payload to UpdateUserDTO type
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
    // converts password to salt & hashed values to return CreateUserDTO type
    const saltHashPayload = await userController.createUserSaltHash(payload)
    const results = await userController.create(saltHashPayload)
    // creates random pixelart and sends to blob storage
    const pixelGen = generateImage()
    const pixel = new BlobObject('user', `${results.id}.png`, pixelGen.size, pixelGen.buffer) 
    pixel.upload()

    return res.status(200).send(results)
})

userRouter.get('/user-exists/:username', async (req: Request, res: Response) => {
    const username = String(req.params.username)
    const validated = await userController.validateUsername(username)

    return(validated ? res.status(200).send('exists') : res.status(200).send('notExists'))
})

userRouter.get('/email-exists/:email', async (req: Request, res: Response) => {
    const email = String(req.params.email)
    const validated = await userController.validateEmail(email)

    return( validated ? res.status(200).send('exists') : res.status(200).send('notExists'))
})

userRouter.post('/authenticate', async (req: Request, res: Response) => {
    const payload: SignInUserDTO = req.body
    const username = await userController.authenticateByEmail(payload)

    return ( username != ''? res.status(200).send(username) : res.status(401).send() )
})

userRouter.put('/blob/:id', async (req: Request, res: Response) => {
    const payload = new BlobObject('user', req.params.id, req.body.size, req.body.buffer)
    const uploadStatus = payload.upload()

    return(uploadStatus ? res.status(201) : res.status(500))
})

export default userRouter