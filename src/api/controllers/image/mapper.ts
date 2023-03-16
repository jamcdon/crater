import { IImage, ImageOutput, IImageStr } from '../../../db/nosql/models/Image'
import { QueryObject } from '../../../db/nosql/models'

export const toImage = (image: ImageOutput): IImage => {
    return {
        _id: image._id,
        name: image.name,
        hyperlink: image.hyperlink,
        scriptsUsing: image.scriptsUsing,
        authorID: image.authorID,
    }
}

export const toImages = (images: QueryObject): Array<IImageStr> | undefined => {
    let imageArray: Array<IImageStr> = []
    images.forEach(
        (image) => {
            imageArray.push({
                _id: image._id,
                name: image.name,
                hyperlink: image.hyperlink,
                scriptsUsing: image.scriptsUsing,
                authorID: image.authorID,
            })
        }
    )
    if (imageArray[0] != undefined){
        return imageArray
    }
    return undefined
}