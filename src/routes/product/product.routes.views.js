import { Router } from 'express'

import { HandleRenderCreateProduct, HandleRenderProductDetail, HandleRenderProducts, HandleRenderUpdateProduct } from '../../controllers/product/product.controllers.views.js'
import { requireAuthRoleAdmin, requireViewSession } from '../../middlewares/session.js'

const router = Router()

router.get('/', requireViewSession, HandleRenderProducts)
router.get('/create', requireViewSession, requireAuthRoleAdmin, HandleRenderCreateProduct)
router.get('/:pid', requireViewSession, HandleRenderProductDetail)
router.get('/:pid/update', requireViewSession, requireAuthRoleAdmin, HandleRenderUpdateProduct)

export default router
