import jwt from 'jsonwebtoken'
import { JWT_SESSION_SECRET } from '../config/config.js'

import { userService } from '../dao/services/user.service.js'

const validateSession = async (req, res, next, path) => {
  try {
    if (!req.cookies.jwt) {
      req.session = null
      req.logger.debug('There is no active session')
      return res.redirect(`${path}`)
    }
    const session = jwt.verify(req.cookies.jwt, JWT_SESSION_SECRET)
    const { email } = session
    const result = await userService.getOne(email)
    if (result.status === 404) {
      req.logger.warning('Session exist but user does not exist')
      req.logger.debug('Session exist but user does not exist')
      req.session = null
      return res.redirect(`${path}`)
    }
    req.logger.debug('Session is valid')
    return next()
  } catch (error) {
    next(error)
  }
}

const validateUser = async (req, res, next, role) => {
  const session = jwt.verify(req.cookies.jwt, JWT_SESSION_SECRET)
  if (session.role !== role) {
    req.logger.warning('User is not authorized')
    req.logger.debug('User is not authorized')
    return res.sendStatus(401)
  }
  return next()
}

const existSession = async (req, res, next, path) => {
  try {
    if (req.cookies.jwt) {
      const session = jwt.verify(req.cookies.jwt, JWT_SESSION_SECRET)
      const { email } = session
      const result = await userService.getOne(email)
      if (result.status === 404) {
        req.logger.warning('Session exist but user does not exist')
        req.logger.debug('Session exist but user does not exist')
        res.clearCookie('jwt')
      }
      if (result.status === 200) {
        req.logger.debug('Session exists and user exists')
        return res.redirect(`${path}`)
      }
    }

    return next()
  } catch (error) {
    next(error)
  }
}

export const requireApiSession = async (req, res, next) => await validateSession(req, res, next, '/error')
export const requireViewSession = async (req, res, next) => await validateSession(req, res, next, '/signin')

export const requireAuthRoleAdmin = async (req, res, next) => await validateUser(req, res, next, 'admin')
export const requireAuthRoleUser = async (req, res, next) => await validateUser(req, res, next, 'usuario')

export const requireExistSession = async (req, res, next) => await existSession(req, res, next, '/products')
