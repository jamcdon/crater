import { Op } from 'sequelize'
import { UserReports } from '../models'
import { UserReportInputDTO } from '../../../api/dto/userReports.dto'
import { UserReportsOutput } from '../models/UserReports'

export const create = async(payload: UserReportInputDTO): Promise<boolean> => {
    const userReport = await UserReports.create(payload)
    if (userReport){
        return true
    }
    return false
}

export const getReportsPaginated = async(page: number): Promise<Array<UserReportsOutput> | undefined> => {
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