import { Op } from 'sequelize';
import { ForumInteractionDTO } from "../../../api/dto/interactions.dto";
import ForumCommentInteractions, { ForumCommentInteractionInput, ForumCommentInteractionOutput } from "../models/ForumCommentInteraction";
import ForumPostInteractions, { ForumPostInteractionInput, ForumPostInteractionOutput } from "../models/ForumPostInteraction";
import Interactions, { InteractionsInput } from "../models/Interactions";
import { User } from '../models'


export const setCommentInteraction = async (payload: ForumInteractionDTO): Promise<boolean> => {
    let commentPayload: ForumCommentInteractionInput = {
        creator: payload.creator,
        commentID: payload.commentID,
        postID: payload.postID
    }

    if (payload.upvote != undefined){
        commentPayload.upvote = payload.upvote
    }

    let commentInteraction: ForumCommentInteractionOutput | null = null
    try {
        commentInteraction = await ForumCommentInteractions.create(commentPayload)
    }
    catch {
        return false
    }

    const interactionPayload: InteractionsInput = {
        UserId: payload.userID,
        ForumCommentInteractionId: commentInteraction.id
    }

    try {
        await Interactions.create(interactionPayload)
    }
    catch {
        return false
    }

    return true
}

export const setPostInteraction = async (payload: ForumInteractionDTO): Promise<boolean> => {
    let postPayload: ForumPostInteractionInput ={
        creator: payload.creator,
        postID: payload.postID,
    }
    if (payload.upvote != undefined){
        postPayload.upvote = payload.upvote
    }

    let postInteraction: ForumPostInteractionOutput | null = null
    try{
        postInteraction = await ForumPostInteractions.create(postPayload)
    }
    catch {
        return false
    }

    let interactionPayload: InteractionsInput = {
        UserId: payload.userID,
        ForumPostInteractionId: postInteraction.id
    }

    try {
        await Interactions.create(interactionPayload)
    }
    catch {
        return false
    }

    return true
}

export const checkIfForumCommentUpvoted = async(commentID: string, userID: number): Promise<number> => {
    let commentInteractionRow = await ForumCommentInteractions.findOne({
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

    if (commentInteractionRow != null){
        console.log(commentInteractionRow.upvote)
        return commentInteractionRow.upvote
    }
    return 0
}