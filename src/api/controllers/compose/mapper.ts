import { ICompose, ComposeOutput } from "../../../db/nosql/models/Compose";

export const toCompose = (compose: ComposeOutput): ICompose => {
    return {
        _id: compose._id,
        title: compose.title,
        authorID: compose.authorID,
        imageName: compose.imageName,
        imageID: compose.imageID,
        tags: compose.tags,
        public: compose.public,
        yaml: compose.yaml,
        stars: compose.stars
    }
}