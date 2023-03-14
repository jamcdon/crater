import * as service from '../../../db/nosql/services/composeService'
import { QueryArrayObject } from '../../../db/nosql/models'

export const paginate = async(page: number): Promise<QueryArrayObject | undefined> => {
    const tagNames = await service.paginateTag(page)
    return tagNames
}

export const paginateNameOnly = async(page: number): Promise<Array<string> | undefined> => {
    const queryObject = await paginate(page)
    if (queryObject != undefined){
        let tagArray = []
        for(let i=0; i < queryObject.length; i++){
            for (let x=0; x < queryObject[i].tags.length; x++){
                if (tagArray.indexOf(queryObject[i].tags[x]) === -1){
                    tagArray.push(queryObject[i].tags[x])
                }
            }
        }
        return tagArray
    }
    return undefined
}