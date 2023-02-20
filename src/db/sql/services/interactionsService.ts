import * as interactionsDAL from '../dal/Interactions'

export const setCreator = (authorID: number, composeID: string | undefined, imageID: string | undefined): Promise<boolean> => {
    return interactionsDAL.setCreator(authorID, composeID, imageID)
}