import * as manifestDAL from '../dal/Manifest'
import { ManifestInput, ManifestOutput } from '../models/Manifest'

export const create = (payload: ManifestInput): Promise<ManifestOutput | undefined> => {
    return manifestDAL.create(payload)
}