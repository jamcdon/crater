import { Router, Request, Response } from 'express'
import { getUserToken } from '../../frontend/controllers/common'
import { reportUser, reportScript, reportImage } from '../controllers/report'
import { ScriptReportsInput } from '../../db/sql/models/ScriptReports'
import { ImageReportsInput } from '../../db/sql/models/ImageReports'
import { UserReportsInput } from '../../db/sql/models/UserReports'

const reportRouter = Router()

reportRouter.post('/user', async(req: Request, res: Response) => {
    const [authorName, authorID, isAdmin] = await getUserToken(req)
    if (authorID != undefined){
        const payload: UserReportsInput = {
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

reportRouter.post('/script', async(req: Request, res: Response) => {
    const [authorName, authorID, isAdmin] = await getUserToken(req)
    if (authorID != undefined){
        const payload: ScriptReportsInput = {
            reportedScriptID: req.body.reportedScriptID,
            badName: req.body.badName,
            badScript: req.body.badScript,
            badTags: req.body.badTags,
            badComments: req.body.badComments,
            badContainerImage: req.body.badContainerImage,
            message: req.body.message,
            UserId: authorID
        }
        const reported = await reportScript(payload)
        if (reported == true){
            return res.status(200).json({success: true})
        }
        return res.status(400).json({success: false})
    }
    return res.status(401).json({Error: "User not logged in. Unable to report script."})
})

reportRouter.post('/image', async(req: Request, res: Response) => {
    const [authorName, authorID, isAdmin] = await getUserToken(req)
    if (authorID != undefined){
        const payload: ImageReportsInput = {
            reportedImageID: req.body.reportedImageID,
            badDescription: req.body.badDescription,
            badPicture: req.body.badPicture,
            badLink: req.body.badLink,
            badContainerImage: req.body.badContainerImage,
            message: req.body.message,
            UserId: authorID
        }
        const reported = await reportImage(payload)
        if (reported == true){
            return res.status(200).json({success: true})
        }
        return res.status(400).json({success: false})
    }
    return res.status(401).json({Error: "User not logged in. Unable to report image."})
})

export default reportRouter