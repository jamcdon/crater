import { IManifest, ManifestOutput } from "../../../db/nosql/models/Manifest";

export const toManifest = (manifest: ManifestOutput): IManifest => {
    return {
        _id: manifest._id,
        title: manifest.title,
        authorID: manifest.authorID,
        imageName: manifest.imageName,
        imageID: manifest.imageID,
        tags: manifest.tags,
        public: manifest.public,
        yamls: manifest.yamls,
        stars: manifest.stars
    }
}