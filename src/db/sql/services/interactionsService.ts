import { ComposeInteractionDTO } from '../../../api/dto/interactions.dto'
import * as interactionsDAL from '../dal/Interactions'

export const setInteraction = (payload: ComposeInteractionDTO): Promise<boolean> => {
    return interactionsDAL.setInteraction(payload)
}

export const getAllFromUser = async(userID: number): Promise<Array<string> | undefined> => {
    return interactionsDAL.getByUserId(userID)
}