import { UserReportInputDTO } from '../../../api/dto/userReports.dto'
import * as userReportsDAL from '../dal/UserReports'
import { UserReportsOutput } from '../models/UserReports'

export const fileReport = async (payload: UserReportInputDTO): Promise<boolean> => {
    return userReportsDAL.create(payload)
}

export const getReportsPaginated = async(page: number): Promise<Array<UserReportsOutput> | undefined> => {
    return userReportsDAL.getReportsPaginated(page)
}