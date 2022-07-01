import { IImage, ImageOutput } from '../../../db/nosql/models/Image'

export const toImage = (image: ImageOutput): IImage => {
    return {
        id: image.id,
        name: image.name,
        hyperlink: image.hyperlink
    }
}