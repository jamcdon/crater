import { Router, Request, Response, NextFunction } from 'express'
import homeRouter from './Home'
import imagesRouter from './Images'
import logsRouter from './Log'
import scriptsRouter from './Scripts'
import usersRouter from './Users'
import { getAdminToken } from '../controllers/common'
import { getUserToken } from '../../frontend/controllers/common'
import { interpolationObject } from '../../frontend/controllers/common'

const adminRouter = Router()

const redirectUnauthenticated =  async (req: Request, res: Response, next: NextFunction) => {
    let userToken = await getUserToken(req)
    if (!userToken[2]) {
        let [usernameToken, userIDToken, isAdmin] = await getUserToken(req)
        let errorInterpolation: interpolationObject = {
            page: "404",
            minioPublic: process.env.MINIO_PUBLIC as string,
            userIDToken: userIDToken,
            usernameToken: usernameToken,
            isAdmin: isAdmin
        }

        return res.status(404).render('error/404.pug', errorInterpolation )
    }
    let adminAuth = getAdminToken(req)
    if (!adminAuth){
        return res.render('admin/authenticate.pug')
    }
    next()
}

adminRouter.get('*', redirectUnauthenticated)
adminRouter.use('/', homeRouter)
adminRouter.use('/images', imagesRouter)
adminRouter.use('/logs', logsRouter)
adminRouter.use('/scripts', scriptsRouter)
adminRouter.use('/users', usersRouter)

export default adminRouter
