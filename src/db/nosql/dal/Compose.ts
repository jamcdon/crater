import mongoose from 'mongoose'
import { Compose } from '../models'
import { ComposeInput, ComposeOutput } from '../models/Compose'
import { incrementScriptsUsing } from '../services/imageService'

export const create = async(payload: ComposeInput): Promise<ComposeOutput | undefined> => {
    payload._id = new mongoose.Types.ObjectId
    let compose
    try {
        compose = await Compose.create(payload)
    }
    catch (err){
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

    incrementScriptsUsing(createdCompose.imageID.toString())

    return createdCompose
}

export const getById = async (id: string): Promise<ComposeOutput | undefined> => {
    let compose
    try {
        compose = await Compose.findById(id)
    }
    catch (err) {
        return undefined
    }
    if (compose != null){
        return compose
    }
}