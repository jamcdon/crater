import * as service from '../../../db/sql/services/reportService'
import { UserReportsInput } from '../../../db/sql/models/UserReports'
import { ImageReportsInput } from '../../../db/sql/models/ImageReports'
import { ScriptReportsInput } from '../../../db/sql/models/ScriptReports'

export const reportUser = async (payload: UserReportsInput): Promise<boolean> => {
    return await service.fileUserReport(payload)
}

export const reportImage = async (payload: ImageReportsInput): Promise<boolean> => {
    return await service.fileImageReport(payload)
}

export const reportScript = async (payload: ScriptReportsInput): Promise<boolean> => {
    return await service.fileScriptReport(payload)
}