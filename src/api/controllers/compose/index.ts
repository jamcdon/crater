import { CreateComposeDTO } from '../../dto/compose.dto'
import { ICompose } from '../../../db/nosql/models/Compose'
import * as mapper from './mapper'
import * as service from '../../../db/nosql/services/composeService'

export const create = async(payload: CreateComposeDTO): Promise<ICompose> => {
    return mapper.toCompose(await service.create(payload))
}