import { getUsernameByID } from ".";
import { ICompose, ComposeOutput, ComposeModification } from "../../../db/nosql/models/Compose";

export const toCompose = (compose: ComposeOutput): ICompose => {
    return {
        _id: compose._id,
        title: compose.title,
        manifest: compose.manifest,
        authorID: compose.authorID,
        imageName: compose.imageName,
        imageID: compose.imageID,
        tags: compose.tags,
        public: compose.public,
        yaml: compose.yaml,
        yamlTitle: compose.yamlTitle,
        yamls: compose.yamls,
        stars: compose.stars
    }
}

export const toComposeModifications = async (composes: ComposeOutput[]): Promise<ComposeModification[] | undefined> => {
    let composeModifications: ComposeModification[] = []
    for (let i = 0; i < composes.length; i++){
        const username = await getUsernameByID(composes[i].authorID)
        if (username != undefined){
            composeModifications[i] = {
                _id: composes[i]._id,
                title: composes[i].title,
                authorName: username,
                imageName: composes[i].imageName,
                tags: composes[i].tags,
                stars: composes[i].stars
            }
        }
        else {
            composeModifications[i] = {
                _id: composes[i]._id,
                title: composes[i].title,
                authorName: composes[i].imageID.toString(),
                imageName: composes[i].imageName,
                tags: composes[i].tags,
                stars: composes[i].stars
            }

        }
    }
    return composeModifications
}