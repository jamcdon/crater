import { Op } from 'sequelize'
import { UserReports } from '../models'
import { UserReportsInput, UserReportsOutput } from '../models/UserReports'
import ImageReports, { ImageReportsInput, ImageReportsOutput } from '../models/ImageReports'
import ScriptReports, { ScriptReportsInput, ScriptReportsOutput } from '../models/ScriptReports'

export const createUserReport = async(payload: UserReportsInput): Promise<boolean> => {
    let userReport: UserReportsOutput | null = null
    try {
        userReport = await UserReports.create(payload)
        if (userReport){
            return true
        }
    }
    catch {
        return false
    }
    return false
}

export const getUserReportsPaginated = async(page: number): Promise<Array<UserReportsOutput> | undefined> => {
    let skip = page * 20
    const userReports = await UserReports.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 20,
        offset: skip
    })

    if (userReports){
        return userReports
    }
    return undefined
}

export const createImageReport = async(payload: ImageReportsInput): Promise<boolean> => {
    let imageReport: ImageReportsOutput | null = null
    try {
        imageReport = await ImageReports.create(payload)

        if (imageReport){
            return true
        }
    }
    catch {
        return false
    }
    return false
}

export const getImageReportsPaginated = async(page: number): Promise<Array<ImageReportsOutput> | undefined> => {
    let skip = page * 20
    const imageReports = await ImageReports.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 20,
        offset: skip
    })

    if (imageReports){
        return imageReports
    }
    return undefined
}

export const createScriptReport = async(payload: ScriptReportsInput): Promise<boolean> => {
    let scriptReport: ScriptReportsOutput | null = null
    try {
        scriptReport = await ScriptReports.create(payload)

        if (scriptReport){
            return true
        }
    }
    catch {
        return false
    }
    return false
}

export const getScriptReportsPaginated = async(page: number): Promise<Array<ScriptReportsOutput> | undefined> => {
    let skip = page * 20
    const scriptReports = await ScriptReports.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 20,
        offset: skip
    })

    if (scriptReports){
        return scriptReports
    }
    return undefined
}