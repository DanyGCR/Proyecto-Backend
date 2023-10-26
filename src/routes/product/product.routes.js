import { Router } from 'express'

import { HandleCreate, HandleDelete, HandleGetAll, HandleGetOne, HandleUpdate } from '../../controllers/product/product.controllers.js'
import { requireApiSession, requireAuthRoleAdmin } from '../../middlewares/session.js'

const router = Router()

router.get('/', requireApiSession, HandleGetAll)
router.post('/', requireApiSession, requireAuthRoleAdmin, HandleCreate)

router.get('/:pid', requireApiSession, HandleGetOne)
router.put('/:pid', requireApiSession, requireAuthRoleAdmin, HandleUpdate)
router.delete('/:pid', requireApiSession, requireAuthRoleAdmin, HandleDelete)

export default router
