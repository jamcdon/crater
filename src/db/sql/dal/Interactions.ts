import {Op, QueryError, QueryTypes, Sequelize} from 'sequelize';
import { Interactions, User } from '../models'
import { InteractionsInput, InteractionsOutput} from '../models/Interactions'

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
    console.log(composeIdArray)
    if(composeIdArray[0] == null){
        return undefined
    }
    return composeIdArray
}