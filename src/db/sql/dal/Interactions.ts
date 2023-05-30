import {Op, QueryError, QueryTypes, Sequelize} from 'sequelize';
import { ComposeInteractionDTO } from '../../../api/dto/interactions.dto';
import { Interactions, User } from '../models'
import { InteractionsInput, InteractionsOutput} from '../models/Interactions'

export const setInteraction = async (payload: ComposeInteractionDTO): Promise<boolean> => {
    if (payload.composeID == undefined && payload.imageID == undefined){
        return false
    }
    else {
        const sqlPayload: InteractionsInput = {
            composeID: payload.composeID,
            imageID: payload.imageID,
            UserId: payload.UserId,
            commentID: payload.commentID,
            comment: payload.comment,
            star: payload.star,
            creator: payload.creator
        }
        const interaction = await Interactions.create(sqlPayload)

        if (interaction) {
            return true
        }
    }
    return false
}

export const getByUserId = async (id: number): Promise<Array<string> | undefined> => {
    let composeIdArray: Array<string> = []
    const interactions = await Interactions.findAll({
        attributes: ['composeID'],
        include: 
            [{
                model: User,
                where: {id: id},
                attributes: []
            }],
            order: [
                ['composeID', 'ASC']
            ],
            raw: true,
    })
    interactions.forEach(
        function(interaction){
            if (interaction.composeID != null){
                composeIdArray.push(interaction.composeID)
            }
        }
    )
    if(composeIdArray[0] == null){
        return undefined
    }
    return composeIdArray
}
