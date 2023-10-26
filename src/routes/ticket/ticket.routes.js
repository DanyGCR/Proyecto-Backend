import { Router } from 'express'

import { HandleCreate, HandleGetAll, HandleGetOne } from '../../controllers/ticket/ticket.controllers.js'
import { requireApiSession, requireAuthRoleAdmin, requireAuthRoleUser } from '../../middlewares/session.js'

const router = Router()

router.get('/', requireApiSession, requireAuthRoleAdmin, HandleGetAll)
router.post('/', requireApiSession, requireAuthRoleUser, HandleCreate)

router.get('/:tid', requireApiSession, HandleGetOne)

export default router
