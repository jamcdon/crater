import { ComposeInteractionDTO } from '../../../api/dto/interactions.dto'
import * as interactionsDAL from '../dal/Interactions'

export const setInteraction = async(payload: ComposeInteractionDTO): Promise<boolean> => {
    if (payload.commentID && payload.composeID){
        return interactionsDAL.setCommentInteraction(payload)
    }
    else if (payload.composeID && payload.imageID){
        return interactionsDAL.setComposeInteraction(payload)
    }
    else if (payload.imageID){
        return interactionsDAL.setImageInteraction(payload)
    }
    return false
}

export const getAllFromUser = async(userID: number): Promise<Array<string> | undefined> => {
    return interactionsDAL.getByUserId(userID)
}

export const checkIfCommentUpvoted = async(commentID: string, userID: number): Promise<number> => {
    return interactionsDAL.checkIfCommentUpvotedByUser(commentID, userID)
}