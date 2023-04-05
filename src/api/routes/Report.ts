import { Router, Request, Response } from 'express'
import { UserReportInputDTO } from '../dto/userReports.dto'
import { getUserToken } from '../../frontend/controllers/common'
import { reportUser } from '../controllers/report'

const reportRouter = Router()

reportRouter.post('/user', async(req: Request, res: Response) => {
    const [authorName, authorID] = await getUserToken(req)
    if (authorID != undefined){
        let payload: UserReportInputDTO = {
            UserId: authorID,
            reportedUserID: req.body.reportedUserID,
            message: req.body.message
        }
        const reported = await reportUser(payload)
        if (reported == true){
            return res.status(200).send('{"success": true}')
        }
        return res.status(400).send('{"success": false}')
   }
   return res.status(401).send('{"Error": "User not logged in. Unable to report user."}')
})

export default reportRouter