import { Router, Request, Response } from 'express'
import * as userController from '../controllers/user'
import {
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
    const user = await userController.getById(id)
    if (user != undefined){
        return res.status(200).send(user)
    }
    return res.status(400).send('{"Error": "user not found"}')
})

userRouter.get('/:username', async (req: Request, res: Response) => {
    const username = String(req.params.username)
    const user = await userController.getByUsername(username)
    if (user != undefined){
        return res.status(200).send(user)
    }
    return res.status(400).send('{"Error": "user not found"}')
})

userRouter.put('/id/:id', async (req: Request, res: Response) => {
    // update user by id
    const id = Number(req.params.id)
    const payload:UpdateUserNoSalt = req.body
    // tests if new password and converts NoSalt payload to UpdateUserDTO type
    const saltHashPayload = await userController.updateUserSaltHash(payload)

    const user = await userController.update(id, saltHashPayload)
    if (user != undefined){
        return res.status(201).send(user)
    }
    return res.status(400).send('{"Error": "User could not be updated"}')
})

userRouter.delete('/id/:id', async(req: Request, res: Response) => {
    // delete user by id
    const id = Number(req.params.id)

    const deleted = await userController.deleteById(id)
    if (deleted){
        return res.status(200).send(`{"user": ${id},"deleted": true}`)
    }
    return res.status(400).send(`{"user": ${id},"deleted": false}`)
})

userRouter.post('/', async (req: Request, res: Response) => {
    // create user
    const payload:CreateUserNoSalt = req.body
    // converts password to salt & hashed values to return CreateUserDTO type
    const saltHashPayload = await userController.createUserSaltHash(payload)
    const results = await userController.create(saltHashPayload)
    // creates random pixelart and sends to blob storage
    if (results != undefined){
        const pixelGen = generateImage()
        const pixel = new BlobObject('user', `${results.id}.png`, pixelGen.size, pixelGen.buffer) 
        pixel.upload()

        const id = await userController.setCookie(payload.username)
        res.cookie("loginToken", id, {signed: true})
        return res.status(200).send(results)
    }
    return res.status(400).send('{"Error": "could not create user"}')
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
    if (username != ""){
        const id = await userController.setCookie(username)
        res.cookie("loginToken", id, {signed: true})
        res.status(200).send(username)
    }
    else {
        res.status(401).send()
    }
})

userRouter.post('/log/out', async (req: Request, res: Response) => {
    if (req.signedCookies != null) {
        if (req.signedCookies.loginToken){
            const id = req.signedCookies.loginToken
            const deleted = await userController.delCookie(id)
            res.clearCookie("loginToken")
            return (deleted ? res.status(200).send() : res.status(400).send())
        }
    }
    res.clearCookie("loginToken")
    return res.status(406).send()
})

userRouter.put('/blob/:id', async (req: Request, res: Response) => {
    const payload = new BlobObject('user', req.params.id, req.body.size, req.body.buffer)
    const uploadStatus = payload.upload()

    return(uploadStatus ? res.status(201) : res.status(500))
})

export default userRouter