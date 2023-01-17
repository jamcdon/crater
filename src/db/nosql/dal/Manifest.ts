import mongoose from "mongoose";
import { Manifest } from "../models";
import { ManifestInput, ManifestOutput } from '../models/Manifest'

export const create = async(payload: ManifestInput): Promise<ManifestOutput | undefined> => {
    payload._id = new mongoose.Types.ObjectId
    const manifest = await Manifest.create(payload)
    if (!manifest){
        return undefined
    }

    const createdManifest: ManifestOutput = {
        _id: manifest._id,
        title: manifest.title!,
        authorID: manifest.authorID!,
        imageName: manifest.imageName!,
        imageID: manifest.imageID!,
        tags: manifest.tags,
        public: manifest.public!,
        yamls: manifest.yamls!,
        stars: manifest.stars!
    }
    manifest.save()
    return createdManifest
}