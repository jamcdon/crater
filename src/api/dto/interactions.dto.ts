//sql

import { CommentOutput } from "../../db/nosql/models/Comment"

export type ComposeInteractionDTO = {
    composeID?: string,
    imageID?: string,
    UserId: number,
    commentID?: string,
    comment: boolean,
    star: boolean,
    creator: boolean
}

export const commentComposeInteractionsMapper = (comment: CommentOutput, creator: boolean): ComposeInteractionDTO => {
    return {
        composeID: comment.composeID,
        imageID: undefined,
        UserId: comment.user,
        commentID: comment._id.toString(),
        comment: true,
        star: false,
        creator: creator
    }
}