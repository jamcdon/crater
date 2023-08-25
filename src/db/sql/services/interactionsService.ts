import { ComposeInteractionDTO, ForumInteractionDTO } from '../../../api/dto/interactions.dto'
import * as interactionsDAL from '../dal/Interactions'
import * as forumInteractionsDAL from '../dal/ForumInteractions'

export const setInteraction = async(payload: ComposeInteractionDTO): Promise<boolean> => {
    if (payload.commentID && payload.composeID){
        return interactionsDAL.setCommentInteraction(payload)
    }
    else if (payload.composeID && payload.imageID && payload.manifest == true){
        return interactionsDAL.setManifestInteraction(payload)
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

export const getComposesFromUser = async(userID: number): Promise<Array<string> | undefined> => {
    return interactionsDAL.getComposesByUserId(userID)
}

export const getManifestsFromUser = async(userID: number): Promise<Array<string> | undefined> => {
    return interactionsDAL.getManifestsByUserId(userID)
}
export const checkIfCommentUpvoted = async(commentID: string, userID: number): Promise<number> => {
    return interactionsDAL.checkIfCommentUpvotedByUser(commentID, userID)
}

/*export const getForumInteraction = async(): Promise<> => {
    
}*/

export const setForumInteraction = async(payload: ForumInteractionDTO): Promise<boolean> => {
    if (payload.comment == true){
        return forumInteractionsDAL.setCommentInteraction(payload)
    }
    else if (payload.post == true){
        return forumInteractionsDAL.setPostInteraction(payload)
    }
    /*else if (payload.topic == true){
        return forumInteractionsDAL.setTopicInteraction(payload)
    }*/
    return false
}

export const checkIfForumCommentUpvoted = async(commentID: string, userID: number): Promise<number> => {
    return forumInteractionsDAL.checkIfForumCommentUpvoted(commentID, userID)
}