import { Op } from 'sequelize';
import { ComposeInteractionDTO } from '../../../api/dto/interactions.dto';
import { Interactions, User, CommentInteractions } from '../models'
import { InteractionsInput, InteractionsOutput} from '../models/Interactions'
import { CommentInteractionInput, CommentInteractionOutput } from '../models/commentInteractions';
import ComposeInteractions, { ComposeInteractionInput, ComposeInteractionOutput } from '../models/composeInteractions';
import ImageInteractions, { ImageInteractionInput, ImageInteractionOutput } from '../models/imageInteractions';
import ManifestInteractions, { ManifestInteractionInput, ManifestInteractionOutput} from '../models/manifestInteractions';


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

    let commentInteraction: CommentInteractionOutput | null = null
    try {
        commentInteraction = await CommentInteractions.create(commentPayload)
    }
    catch {
        return false
    }


    const interactionPayload: InteractionsInput = {
        UserId: payload.UserId,
        CommentInteractionId: commentInteraction.id
    } 

    try {
        await Interactions.create(interactionPayload)
    }
    catch {
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

    let composeInteraction: ComposeInteractionOutput | null = null
    try {
        composeInteraction = await ComposeInteractions.create(composePayload, {raw: true})
    }
    catch {
        return false
    }

    const interactionPayload: InteractionsInput = {
        UserId: payload.UserId,
        ComposeInteractionId: composeInteraction.id
    }

    try {
        await Interactions.create(interactionPayload)
    }
    catch {
        return false
    }

    return true
}

export const setManifestInteraction = async(payload: ComposeInteractionDTO): Promise<boolean> => {
    if (payload.imageID == null){
        return false
    }

    const manifestPayload: ManifestInteractionInput = {
        creator: payload.creator,
        star: payload.star,
        composeID: payload.composeID,
        imageID: payload.imageID
    }

    let manifestInteraction: ManifestInteractionOutput | null = null
    try {
        manifestInteraction = await ManifestInteractions.create(manifestPayload, {raw: true})
    }
    catch {
        return false
    }

    const interactionPayload: InteractionsInput = {
        UserId: payload.UserId,
        ManifestInteractionId: manifestInteraction.id
    }

    try {
        await Interactions.create(interactionPayload)
    }
    catch {
        return false
    }


    return true
}

export const setImageInteraction = async(payload: ComposeInteractionDTO): Promise<boolean> => {

    if (payload.imageID == undefined){
        return false
    }

    const imagePayload: ImageInteractionInput = {
        creator: payload.creator,
        star: payload.star,
        imageID: payload.imageID
    }

    let imageInteraction: ImageInteractionOutput | null = null
    try {
    imageInteraction = await ImageInteractions.create(imagePayload)
    }
    catch {
        return false
    }

    const interactionPayload: InteractionsInput = {
        UserId: payload.UserId,
        ImageInteractionId: imageInteraction.id
    }

    let interaction: InteractionsOutput | null = null
    try {
    interaction = await Interactions.create(interactionPayload)
    }
    catch {
        return false
    }

    return true
}

export const getByUserId = async (id: number): Promise<Array<string> | undefined> => {
    let composeIdArray: Array<string> = []

    const manifestInteractions = await ManifestInteractions.findAll({
        attributes: ['composeID'],
        include: [{
                model: Interactions,
                attributes: ['updatedAt'],
                include: [{
                    model: User,
                    where: {id: id},
                    attributes: ['id']
                }]
        }],
        order: [
            [Interactions, 'updatedAt', 'DESC']
        ],
        raw: true
    })

    const composeInteractions = await ComposeInteractions.findAll({
        attributes: ['composeID'],
        include: [{
                model: Interactions,
                attributes: ['updatedAt'],
                include: [{
                    model: User,
                    where: {id: id},
                    attributes: ['id']
                }]
        }],
        order: [
            [Interactions, 'updatedAt', 'DESC']
        ],
        raw: true
    })

    const commentInteractions = await CommentInteractions.findAll({
        attributes: ['composeID'],
        include: [{
                model: Interactions,
                attributes: ['updatedAt'],
                include: [{
                    model: User,
                    where: {id: id},
                    attributes: ['id']
                }]
        }],
        order: [
            [Interactions, 'updatedAt', 'DESC']
        ],
        raw: true
    })

    manifestInteractions.forEach(
        function(interaction){
            if (interaction.composeID != null){
                composeIdArray.push(interaction.composeID)
            }
        }
    )

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

export const getManifestsByUserId = async(userID: number):Promise<Array<string> | undefined> => {
    let composeIdArray: Array<string> = []

    const manifestInteractions = await ManifestInteractions.findAll({
        attributes: ['composeID'],
        include: [{
                model: Interactions,
                attributes: ['updatedAt'],
                include: [{
                    model: User,
                    where: {id: userID},
                    attributes: ['id']
                }]
        }],
        order: [
            [Interactions, 'updatedAt', 'DESC']
        ],
        raw: true
    })

    manifestInteractions.forEach(
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

export const getComposesByUserId = async(userID: number):Promise<Array<string> | undefined> => {
    let composeIdArray: Array<string> = []

    const composeInteractions = await ComposeInteractions.findAll({
        attributes: ['composeID'],
        include: [{
                model: Interactions,
                attributes: ['updatedAt'],
                include: [{
                    model: User,
                    where: {id: userID},
                    attributes: ['id']
                }]
        }],
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
        include: [{
            model: Interactions,
            attributes: ['UserId'],
            include: [{
                model: User,
                attributes: ['id'],
                where: {id: userID}
            }]
        }],
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