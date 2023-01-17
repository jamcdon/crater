import { CreateManifestDTO } from "../../dto/manifest.dto";
import { IManifest } from "../../../db/nosql/models/Manifest";
import * as mapper from './mapper'
import * as service from '../../../db/nosql/services/manifestService'

export const create = async(payload: CreateManifestDTO): Promise<IManifest | undefined> => {
    const manifest = await service.create(payload)
    if (manifest != undefined){
        return mapper.toManifest(manifest)
    }
    return undefined
}