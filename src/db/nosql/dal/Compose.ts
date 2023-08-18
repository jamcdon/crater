import mongoose from 'mongoose'
import { Compose } from '../models'
import { ComposeInput, ComposeOutput, ICompose } from '../models/Compose'
import { incrementScriptsUsing } from '../services/imageService'
import { QueryArrayObject } from '../models'

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
        manifest: compose.manifest,
        authorID: compose.authorID!,
        imageName: compose.imageName!,
        imageID: compose.imageID!,
        tags: compose.tags,
        public: compose.public!,
        yaml: compose.yaml!,
        yamlTitle: compose.yamlTitle,
        yamls: compose.yamls,
        stars: compose.stars!
    }
    compose.save()

    incrementScriptsUsing(createdCompose.imageID.toString())

    return createdCompose
}

export const deleteById = async (id: string): Promise<boolean> => {
    const deletion = await Compose.deleteOne({
        _id: id
    })
    return deletion.acknowledged
}

export const getById = async (id: string): Promise<ComposeOutput | undefined> => {
    let compose
    try {
        compose = await Compose.findById(id).lean()
    }
    catch (err) {
        return undefined
    }
    if (compose != null){
        return compose
    }
}

export const paginatePopularity = async (page: number): Promise<Array<ComposeOutput> | undefined> => {
    const values = page * 25
    let composes: Array<ComposeOutput> | null = null;
    try {
        composes = await Compose.find(
            {
                public: true,
                manifest: false
            },
            {},
            {
                skip: values - 25,
                limit: values,
                sort: {stars: -1}
            }
        )
    }
    catch (err) {
        return undefined
    }
    if (composes != null){
        return composes
    }
    return undefined
}

export const paginatePopularityManifests = async (page: number): Promise<Array<ComposeOutput> | undefined> => {
    const values = page * 25
    let composes: Array<ComposeOutput> | null = null;
    try {
        composes = await Compose.find(
            {
                public: true,
                manifest: true
            },
            {},
            {
                skip: values - 25,
                limit: values,
                sort: {stars: -1}
            }
        )
    }
    catch (err) {
        return undefined
    }
    if (composes != null){
        return composes
    }
    return undefined
}

export const getByIds = async (ids: Array<string>, findPublic: boolean, page: number): Promise<Array<ComposeOutput> | undefined> => {

    const values = page * 10
    let composes: Array<ComposeOutput> = []
    if (findPublic){
        composes = await Compose.find(
            {
                public: true,
                _id: {
                    $in: ids
                }
            },
            {},
            {
                skip: values - 10,
                limit: values,
                sort: {_id: -1}
            }
        )
    } else {
        composes = await Compose.find(
            {
                _id: {
                    $in: ids
                }
            },
            {},
            {
                skip: values - 10,
                limit: values,
                sort: {_id: -1}
            }
        )
    }
    if (composes[0] != null){
        return composes
    }
    return undefined
}

export const paginateTag = async (page: number): Promise<QueryArrayObject | undefined> => {
    const values = page * 25
    let tagNames: QueryArrayObject | undefined = undefined
    try {
        tagNames = await Compose.find(
            {},
            {
                tags: 1
            },
            {
                skip: values - 25,
                limit: values,
                sort: {stars: -1}
            }
        ).lean()
    }
    catch(err){
        return undefined
    }
    return tagNames
}

export const paginateScriptsById = async (imageID: string, page: number): Promise<Array<ICompose> | undefined> => {
    const values = page * 25
    let scripts: Array<ICompose> | undefined = undefined
    try {
        scripts = await Compose.find(
            {
                public: true,
                imageID: imageID
            },
            {},
            {
                skip: values - 25,
                limit: values,
                sort: {stars: -1}
            }
        )
    }
    catch {
        return undefined
    }
    return scripts
}