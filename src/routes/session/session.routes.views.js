import { Router } from 'express'
import { HandleRenderSignIn, HandleRenderSignUp } from '../../controllers/session/session.controllers.views.js'
import { requireExistSession } from '../../middlewares/session.js'

const router = Router()

router.get('/signin', requireExistSession, HandleRenderSignIn)
router.get('/signup', requireExistSession, HandleRenderSignUp)

export default router
