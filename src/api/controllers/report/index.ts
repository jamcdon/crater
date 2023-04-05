import * as service from '../../../db/sql/services/userReportService'
import { UserReportInputDTO } from '../../dto/userReports.dto'

export const reportUser = async (payload: UserReportInputDTO): Promise<boolean> => {
    return await service.fileReport(payload)
}