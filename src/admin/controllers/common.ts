import { interpolationObject } from '../../frontend/controllers/common'
import { Request } from 'express'
import { verify } from 'jsonwebtoken'

const jwtSignature = process.env.JWT_SIGNATURE as string;

export type adminInterpolationObject = interpolationObject

export const getAdminToken = (req: Request): boolean => {
    if (req.signedCookies.adminToken) {
        try{
            const adminToken = verify(req.signedCookies.adminToken, jwtSignature)
            if (typeof adminToken != "string" && adminToken.authenticated){
                return adminToken.authenticated
            }
        }
        catch {
            return false
        }
    }
    return false
}