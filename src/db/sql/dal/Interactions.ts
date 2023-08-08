import {Op, QueryError, QueryTypes, Sequelize} from 'sequelize';
import { ComposeInteractionDTO } from '../../../api/dto/interactions.dto';
import { Interactions, User, CommentInteractions } from '../models'
import { InteractionsInput, InteractionsOutput} from '../models/Interactions'
import { CommentInteractionInput } from '../models/commentInteractions';
import ComposeInteractions, { ComposeInteractionInput } from '../models/composeInteractions';
import ImageInteractions, { ImageInteractionInput } from '../models/imageInteractions';


export const setCommentInteraction = async(payload: ComposeInteractionDTO): Promise<boolean> => {
    if (payload.composeID == null){
        return false
    }

    let commentPayload: CommentInteractionInput = {
        creator: payload.creator,
        commentID: payload.commentID,
        composeID: payload.composeID
    }

    if (payload.upvotes){
        commentPayload.upvote = payload.upvotes
    }

    const commentInteraction = await CommentInteractions.create(commentPayload)


    if (commentInteraction == null){
        return false
    }

    const interactionPayload: InteractionsInput = {
        UserId: payload.UserId,
        CommentInteractionId: commentInteraction.id
    } 

    const interaction = await Interactions.create(interactionPayload)

    if (interaction == null){
        return false
    }

    return true
}

export const setComposeInteraction = async(payload: ComposeInteractionDTO): Promise<boolean> => {
    if (payload.imageID == null){
        return false
    }

    const composePayload: ComposeInteractionInput = {
        creator: payload.creator,
        star: payload.star,
        composeID: payload.composeID,
        imageID: payload.imageID
    }
    const composeInteraction = await ComposeInteractions.create(composePayload, {raw: true})

    if (composeInteraction == null){
        return false
    }


    const interactionPayload: InteractionsInput = {
        UserId: payload.UserId,
        ComposeInteractionId: composeInteraction.id
    }
    const interaction = await Interactions.create(interactionPayload)

    if (interaction == null){
        return false
    }


    return true
}

export const setImageInteraction = async(payload: ComposeInteractionDTO): Promise<boolean> => {

    const imagePayload: ImageInteractionInput = {
        creator: payload.creator,
        star: payload.star,
        imageID: payload.imageID
    }
    const imageInteraction = await ImageInteractions.create(imagePayload)

    if (imageInteraction == null){
        return false
    }

    const interactionPayload: InteractionsInput = {
        UserId: payload.UserId,
        ImageInteractionId: imageInteraction.id
    }
    const interaction = await Interactions.create(interactionPayload)

    if (interaction == null){
        return false
    }

    return true
}

export const getByUserId = async (id: number): Promise<Array<string> | undefined> => {
    let composeIdArray: Array<string> = []

    const composeInteractions = await ComposeInteractions.findAll({
        attributes: ['composeID'],
        include: [
            {
                model: Interactions,
                attributes: ['updatedAt'],
                include: [
                    {
                        model: User,
                        where: {id: id},
                        attributes: ['id']
                    }
                ]
            }
        ],
        order: [
            [Interactions, 'updatedAt', 'DESC']
        ],
        raw: true

    })

    const commentInteractions = await CommentInteractions.findAll({
        attributes: ['composeID'],
        include: [
            {
                model: Interactions,
                attributes: ['updatedAt'],
                include: [
                    {
                        model: User,
                        where: {id: id},
                        attributes: ['id']
                    }
                ]
            }
        ],
        order: [
            [Interactions, 'updatedAt', 'DESC']
        ],
        raw: true
    })

    composeInteractions.forEach(
        function(interaction){
            if (interaction.composeID != null){
                composeIdArray.push(interaction.composeID)
            }
        }
    )

    commentInteractions.forEach(
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

export const checkIfCommentUpvotedByUser = async(commentID: string, userID: number): Promise<number> => {
    let commentInteractionsRow = await CommentInteractions.findOne({
        attributes: [
            'upvote'
        ],
        include: [
            {
                model: Interactions,
                attributes: ['UserId'],
                include: [
                {
                    model: User,
                    attributes: ['id'],
                    where: {id: userID}
                }]
            }
        ],
        where: {
            commentID: commentID,
            upvote: {
                [Op.or]: [1, -1]
            }
        },
        order: [
            ['id', 'DESC']
        ]
    })
    if (commentInteractionsRow != null){
        return commentInteractionsRow.upvote
    }
    return 0
}