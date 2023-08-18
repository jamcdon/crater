import { CreateComposeDTO } from "../../dto/compose.dto";
import { ComposeModification, ICompose } from "../../../db/nosql/models/Compose";
import * as mapper from './mapper'
import * as service from '../../../db/nosql/services/manifestService'
import * as composeMapper from '../compose/mapper'

export const create = async(payload: CreateComposeDTO): Promise<ICompose | undefined> => {
    const manifest = await service.create(payload)
    if (manifest != undefined){
        return mapper.toManifest(manifest)
    }
    return undefined
}

export const paginatePopularity = async(page: number): Promise<Array<ComposeModification> | undefined> => {
    const manifestsOutput = await service.paginatePopularity(page)
    if (manifestsOutput != undefined){
        return composeMapper.toComposeModifications(manifestsOutput)
    }
}