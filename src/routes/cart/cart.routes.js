import { Router } from 'express'

import { HandleCreate, HandleDelete, HandleGetAll, HandleGetOne, HandleProductAdd, HandleProductRemove, HandleProductUpdate, HandlePurchase, HandleUpdate } from '../../controllers/cart/cart.controllers.js'
import { requireApiSession, requireAuthRoleAdmin, requireAuthRoleUser } from '../../middlewares/session.js'

const router = Router()

router.get('/', requireApiSession, requireAuthRoleAdmin, HandleGetAll)
router.post('/', requireApiSession, requireAuthRoleUser, HandleCreate)

router.get('/:cid', requireApiSession, requireAuthRoleUser, HandleGetOne)
router.put('/:cid', requireApiSession, requireAuthRoleUser, HandleUpdate)
router.delete('/:cid', requireApiSession, requireAuthRoleUser, HandleDelete)

router.post('/:cid/purchase', requireApiSession, requireAuthRoleUser, HandlePurchase)

router.post('/:cid/product/:pid', requireApiSession, requireAuthRoleUser, HandleProductAdd)
router.put('/:cid/product/:pid', requireApiSession, requireAuthRoleUser, HandleProductUpdate)
router.delete('/:cid/product/:pid', requireApiSession, requireAuthRoleUser, HandleProductRemove)

export default router
