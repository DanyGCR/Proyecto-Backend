import { Router } from 'express'
import { HandleRenderCartDetail, HandleRenderCarts } from '../../controllers/cart/cart.controllers.views.js'
import { requireAuthRoleAdmin, requireAuthRoleUser, requireViewSession } from '../../middlewares/session.js'

const router = Router()

router.get('/', requireViewSession, requireAuthRoleAdmin, HandleRenderCarts)
router.get('/:cid', requireViewSession, requireAuthRoleUser, HandleRenderCartDetail)

export default router
