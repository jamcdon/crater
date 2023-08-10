import * as reportsDAL from '../dal/Reports'
import { ImageReportsInput, ImageReportsOutput } from '../models/ImageReports'
import { ScriptReportsInput, ScriptReportsOutput } from '../models/ScriptReports'
import { UserReportsInput, UserReportsOutput } from '../models/UserReports'

export const fileUserReport = async (payload: UserReportsInput): Promise<boolean> => {
    return reportsDAL.createUserReport(payload)
}

export const getUserReportsPaginated = async(page: number): Promise<Array<UserReportsOutput> | undefined> => {
    return reportsDAL.getUserReportsPaginated(page)
}

export const fileImageReport = async (payload: ImageReportsInput): Promise<boolean> => {
    return reportsDAL.createImageReport(payload)
}

export const getImageReportsPaginated = async(page: number): Promise<Array<ImageReportsOutput> | undefined> => {
    return reportsDAL.getImageReportsPaginated(page)
}

export const fileScriptReport = async (payload: ScriptReportsInput): Promise<boolean> => {
    return reportsDAL.createScriptReport(payload)
}

export const getScriptReportsPaginated = async(page: number): Promise<Array<ScriptReportsOutput> | undefined> => {
    return reportsDAL.getScriptReportsPaginated(page)
}