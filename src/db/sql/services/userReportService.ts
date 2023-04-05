import { UserReportInputDTO } from '../../../api/dto/userReports.dto'
import * as userReportsDAL from '../dal/UserReports'

export const fileReport = async (payload: UserReportInputDTO): Promise<boolean> => {
    return userReportsDAL.create(payload)
}