import { IImage, ImageOutput } from '../../../db/nosql/models/Image'

export const toImage = (image: ImageOutput): IImage => {
    return {
        name: image.name,
        hyperlink: image.hyperlink,
    }
}