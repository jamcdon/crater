import { Op } from 'sequelize'
import { UserReports } from '../models'
import { UserReportInputDTO } from '../../../api/dto/userReports.dto'

export const create = async(payload: UserReportInputDTO): Promise<boolean> => {
    const userReport = await UserReports.create(payload)
    if (userReport){
        return true
    }
    return false
}