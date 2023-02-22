import * as interactionsDAL from '../dal/Interactions'

export const setCreator = (authorID: number, composeID: string | undefined, imageID: string | undefined): Promise<boolean> => {
    return interactionsDAL.setCreator(authorID, composeID, imageID)
}

export const getAllFromUser = async(userID: number): Promise<Array<string> | undefined> => {
    return interactionsDAL.getByUserId(userID)
}