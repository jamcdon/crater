import { IImage, ImageOutput } from '../../../db/nosql/models/Image'

export const toImage = (image: ImageOutput): IImage => {
    return {
        _id: image._id,
        name: image.name,
        hyperlink: image.hyperlink,
    }
}