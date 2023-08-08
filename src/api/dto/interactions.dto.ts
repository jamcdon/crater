//sql

import { CommentOutput } from "../../db/nosql/models/Comment"

export type ComposeInteractionDTO = {
    composeID?: string,
    imageID?: string,
    UserId: number,
    commentID?: string,
    comment: boolean,
    star: boolean,
    creator: boolean,
    upvotes?: number
}

export const commentComposeInteractionsMapper = (comment: CommentOutput, interactingUserID: number, creator: boolean, upvoteNumber: number | null): ComposeInteractionDTO => {
    if (upvoteNumber == null){
        return {
            composeID: comment.composeID,
            imageID: undefined,
            UserId: interactingUserID,
            commentID: comment._id.toString(),
            comment: true,
            star: false,
            creator: creator
        }
    }
    return {
        composeID: comment.composeID,
        imageID: undefined,
        UserId: interactingUserID,
        commentID: comment._id.toString(),
        comment: true,
        star: false,
        creator: creator,
        upvotes: upvoteNumber
    }
}