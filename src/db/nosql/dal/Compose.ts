import mongoose from 'mongoose'
import { Compose } from '../models'
import { ComposeInput, ComposeOutput } from '../models/Compose'

export const create = async(payload: ComposeInput): Promise<ComposeOutput | undefined> => {
    payload._id = new mongoose.Types.ObjectId
    const compose = await Compose.create(payload)
    if (!compose){
        return undefined
    }
    const createdCompose: ComposeOutput = {
        _id: compose._id,
        title: compose.title!,
        authorID: compose.authorID!,
        imageName: compose.imageName!,
        imageID: compose.imageID!,
        tags: compose.tags,
        public: compose.public!,
        yaml: compose.yaml!,
        stars: compose.stars!
    }
    compose.save()
    return createdCompose
}