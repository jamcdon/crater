export type CreateCommentDTO = {
    composeID: string,
    user: number,
    content: string,
    upvotes: number,
    edited: false
}

export type CommentJsonOutput = {
    id: string,
    composeID: string,
    userID: number,
    user: string,
    content: string,
    upvotes: number,
    edited: boolean
}