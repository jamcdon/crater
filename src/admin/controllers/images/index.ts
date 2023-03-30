import { Request, Response } from 'express'
import { getUserToken } from '../../../frontend/controllers/common'
import { ImageOutput } from '../../../db/nosql/models/Image'
import { getCount, adminPaginateByDate } from '../../../db/nosql/services/imageService'
import { adminInterpolationObject } from '../common'

type adminImagesInterpolation = adminInterpolationObject & {
    imageCount?: number,
    mostRecentImages?: Array<ImageOutput>,
    unmatchedImages?: Array<ImageOutput>
}

let adminImagesInterpolation : adminImagesInterpolation = {
    page: "Images",
    minioPublic: process.env.MINIO_PUBLIC as string,
}

class Images {
    public static async index (req: Request, res: Response): Promise<void> {
        [adminImagesInterpolation.usernameToken, adminImagesInterpolation.userIDToken, adminImagesInterpolation.isAdmin] = await getUserToken(req)
        // add functionality to test if user is admin
        adminImagesInterpolation.imageCount = await getCount()
        let mostRecentImages = await adminPaginateByDate(1)
        if (mostRecentImages != undefined){
            adminImagesInterpolation.mostRecentImages = mostRecentImages
        }
        //add dal here
        if (adminImagesInterpolation.isAdmin) {
            return res.render('admin/images/index.pug', adminImagesInterpolation)
        }
        return res.status(404).render('error/404.pug', adminImagesInterpolation)
    }
    public static async unmatched (req: Request, res: Response): Promise<void> {
        [adminImagesInterpolation.usernameToken, adminImagesInterpolation.userIDToken, adminImagesInterpolation.isAdmin] = await getUserToken(req)
        // add functionality to test if user is admin

        //generateReport from minio and sql

    }
}

export default Images