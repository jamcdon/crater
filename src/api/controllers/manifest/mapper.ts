import { ICompose, ComposeOutput } from "../../../db/nosql/models/Compose";

export const toManifest = (manifest: ComposeOutput): ICompose => {
    return {
        _id: manifest._id,
        title: manifest.title,
        manifest: manifest.manifest,
        authorID: manifest.authorID,
        imageName: manifest.imageName,
        imageID: manifest.imageID,
        tags: manifest.tags,
        public: manifest.public,
        yaml: manifest.yaml,
        yamls: manifest.yamls,
        stars: manifest.stars
    }
}