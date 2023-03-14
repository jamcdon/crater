import * as composeDAL from '../dal/Compose'
import { ComposeInput, ComposeOutput } from '../models/Compose'

export const create = (payload: ComposeInput): Promise<ComposeOutput | undefined> => {
    return composeDAL.create(payload)
}