import passport from 'passport'
import Local from 'passport-local'
import Jwt, { ExtractJwt } from 'passport-jwt'
import Github2 from 'passport-github2'

import { userService } from '../dao/services/user.service.js'
import { response } from '../utils/response.js'
import { JWT_SESSION_SECRET, PASSPORT_GITHUB_CALLBACKURL, PASSPORT_GITHUB_CLIENTID, PASSPORT_GITHUB_CLIENTSECRET } from './config.js'

const LocalStrategy = Local.Strategy
const JwtStrategy = Jwt.Strategy
const GithubStrategy = Github2.Strategy

export const initPassport = () => {
  passport.use('github', new GithubStrategy({
    clientID: PASSPORT_GITHUB_CLIENTID,
    clientSecret: PASSPORT_GITHUB_CLIENTSECRET,
    callbackURL: PASSPORT_GITHUB_CALLBACKURL
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await userService.getOne(profile._json.email)

      if (user.status === 404) {
        const newUser = {
          first_name: profile._json.name,
          last_name: '',
          email: profile._json.email,
          password: null
        }
        const result = await userService.create(newUser)
        return done(null, result)
      }
      return done(null, user)
    } catch (error) {
      return done(error)
    }
  }))

  passport.use('signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try {
      const result = await userService.signin(email, password)
      if (result.status !== 200) return done(null, false, result)
      return done(null, result)
    } catch (error) {
      return done(error)
    }
  }))

  passport.use('signup', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
  }, async (req, email, password, done) => {
    try {
      const { first_name, last_name, age } = req.body
      const obj = { first_name, last_name, email, age, password }
      const result = await userService.create(obj)
      if (result.status !== 201) return done(null, false, result)

      return done(null, result)
    } catch (error) {
      return done(error)
    }
  }))

  passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: JWT_SESSION_SECRET
  }, (jwt_payload, done) => {
    try {
      if (!jwt_payload) return done(null, false, response(400, null, jwt_payload))
      const obj = response(200, jwt_payload)
      return done(null, obj)
    } catch (error) {
      return done(error)
    }
  }))

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })
}

const cookieExtractor = (req) => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies.jwt
    req.logger.debug('Token found')
  } else {
    req.logger.debug('No token found')
  }
  return token
}
