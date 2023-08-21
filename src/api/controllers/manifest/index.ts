import { CreateComposeDTO } from "../../dto/compose.dto";
import { ComposeModification, ICompose } from "../../../db/nosql/models/Compose";
import * as mapper from './mapper'
import * as service from '../../../db/nosql/services/manifestService'
import * as interactionsService from '../../../db/sql/services/interactionsService'
import * as composeMapper from '../compose/mapper'
import { ComposeInteractionDTO } from "../../dto/interactions.dto";

export const create = async(payload: CreateComposeDTO): Promise<ICompose | undefined> => {
    const manifest = await service.create(payload)
    if (manifest != undefined){
        let payload: ComposeInteractionDTO = {
            composeID: manifest._id.toString(),
            imageID: manifest.imageID.toString(),
            UserId: manifest.authorID,
            commentID: undefined,
            comment: false,
            star: false,
            manifest: true,
            creator: true
        }
        const interactionsSuccess = await interactionsService.setInteraction(payload)
        if (!interactionsSuccess){
            await service.deleteById(manifest._id.toString())
            return undefined
        }
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