import { Op } from 'sequelize'
import { Interactions } from '../models'
import { InteractionsInput, InteractionsOutput } from '../models/Interactions'

export const setCreator = async (authorID: number, composeID: string | undefined, imageID: string | undefined): Promise<boolean> => {
    if (composeID == undefined && imageID == undefined){
        return false
    }
    else {
        const sqlPayload: InteractionsInput = {
            composeID: composeID,
            imageID: imageID,
            UserId: authorID,
            comment: false,
            star: false,
            creator: true
        }
        const interaction = await Interactions.create(sqlPayload)

        if (interaction) {
            return true
        }
    }
    return false
}