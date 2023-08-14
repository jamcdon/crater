import { Request, Response } from 'express'
import { getUserToken } from '../../../frontend/controllers/common'
import { ImageOutput } from '../../../db/nosql/models/Image'
import { getCount, adminPaginateByDate } from '../../../db/nosql/services/imageService'
import { adminInterpolationObject } from '../common'
import { ImageReportsOutput } from '../../../db/sql/models/ImageReports'
import { getImageReportsPaginated } from '../../../db/sql/dal/Reports'

type adminImagesInterpolation = adminInterpolationObject & {
    imageCount?: number,
    mostRecentImages?: Array<ImageOutput>,
    unmatchedImages?: Array<ImageOutput>,
    imageReports?: Array<ImageReportsOutput>
}

let adminImagesInterpolation : adminImagesInterpolation = {
    page: "Images",
    minioPublic: process.env.MINIO_PUBLIC as string,
}

class Images {
    public static async index (req: Request, res: Response): Promise<void> {
        [adminImagesInterpolation.usernameToken, adminImagesInterpolation.userIDToken, adminImagesInterpolation.isAdmin] = await getUserToken(req)
        if (adminImagesInterpolation.isAdmin) {
            adminImagesInterpolation.imageCount = await getCount()

            adminImagesInterpolation.imageReports = await getImageReportsPaginated(0)

            adminImagesInterpolation.mostRecentImages = await adminPaginateByDate(1)
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