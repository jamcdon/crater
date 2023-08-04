export type CreateCommentDTO = {
    composeID: string,
    user: number,
    content: string,
    upvotes: number,
    edited: false
}

export type CommentJsonOutput = {
    composeID: string,
    user: string,
    content: string,
    upvotes: number,
    edited: boolean
}