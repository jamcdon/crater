import * as composeDAL from '../dal/Compose'
import { ComposeInput, ComposeOutput } from '../models/Compose'

export const create = (payload: ComposeInput): Promise<ComposeOutput> => {
    return composeDAL.create(payload)
}