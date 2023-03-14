import { CreateComposeDTO } from "../../dto/compose.dto";
import { ICompose } from "../../../db/nosql/models/Compose";
import * as mapper from './mapper'
import * as service from '../../../db/nosql/services/manifestService'

export const create = async(payload: CreateComposeDTO): Promise<ICompose | undefined> => {
    const manifest = await service.create(payload)
    if (manifest != undefined){
        return mapper.toManifest(manifest)
    }
    return undefined
}