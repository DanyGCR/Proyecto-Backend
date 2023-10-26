import { response } from '../../utils/response.js'
import { userModel } from '../models/user.model.js'
import { User } from '../patterns/user.pattern.js'
import { createHash, isValidPassword } from '../../utils/hash.js'
import { cartMongo } from './cart.mongo.js'

import { HandlerError, CodeError, InfoError } from '../../lib/error/index.error.js'
import { logger } from '../../utils/logger.js'

class UserMongo {
  async signin (email, password) {
    try {
      if (typeof email !== 'string') HandlerError.createError({ code: CodeError.BAD_REQUEST, cause: InfoError.BAD_REQUEST, message: 'Email must be a string' })
      if (!email) HandlerError.createError({ code: CodeError.BAD_REQUEST, cause: InfoError.BAD_REQUEST, message: 'Email is required' })

      const exist = await userModel.findOne({ email })
      if (!exist) HandlerError.createError({ code: CodeError.NOT_FOUND, cause: InfoError.NOT_FOUND, message: 'User not found' })

      if (exist.password === null) HandlerError.createError({ code: CodeError.BAD_REQUEST, cause: InfoError.BAD_REQUEST, message: 'This user does not have a password' })

      const valid = isValidPassword(exist, password)
      if (!valid) HandlerError.createError({ code: CodeError.UNPROCESSABLE_ENTITY, cause: InfoError.UNPROCESSABLE_ENTITY, message: 'Invalid password' })
      const user = {
        fullname: exist.fullname,
        first_name: exist.first_name,
        last_name: exist.last_name,
        email: exist.email,
        age: exist.age,
        cart: exist.cart,
        role: exist.role
      }

      return response(200, user)
    } catch (error) {
      HandlerError.createError({ name: error.name, code: error.code, cause: error.cause, message: error.message })
    }
  }

  async getAll (page, limit) {
    try {
      const result = await userModel.paginate({}, { page, limit, lean: true })
      return response(200, result)
    } catch (error) {
      HandlerError.createError({ name: error.name, code: error.code, cause: error.cause, message: error.message })
    }
  }

  async getOne (email) {
    try {
      const exist = await userModel.findOne({ email }).lean()
      if (!exist) {
        logger.error('User not found')
        return response(CodeError.NOT_FOUND, null, { code: CodeError.NOT_FOUND, cause: InfoError.NOT_FOUND, message: 'User not found' })
      }
      return response(200, exist)
    } catch (error) {
      HandlerError.createError({ name: error.name, code: error.code, cause: error.cause, message: error.message })
    }
  }

  async create (obj) {
    try {
      if (!obj.first_name) HandlerError.createError({ code: CodeError.BAD_REQUEST, cause: InfoError.BAD_REQUEST, message: 'First name are required' })
      if (!obj.email) HandlerError.createError({ code: CodeError.BAD_REQUEST, cause: InfoError.BAD_REQUEST, message: 'Email are required' })

      const exist = await userModel.findOne({ email: obj.email })
      if (exist) HandlerError.createError({ code: CodeError.UNPROCESSABLE_ENTITY, cause: InfoError.UNPROCESSABLE_ENTITY, message: 'User already exists' })

      const cart = await cartMongo.create()
      const { payload } = cart
      let user
      if (obj.password) user = new User(obj.first_name, obj.last_name, obj.email, obj.age, createHash(obj.password), payload._id, obj.role)
      else user = new User(obj.first_name, obj.last_name, obj.email, obj.age, null, payload._id, obj.role)
      const result = await userModel.create(user)
      return response(201, result)
    } catch (error) {
      HandlerError.createError({ name: error.name, code: error.code, cause: error.cause, message: error.message })
    }
  }

  async update (email, obj) {
    try {
      if (!obj.email) HandlerError.createError({ code: CodeError.BAD_REQUEST, cause: InfoError.BAD_REQUEST, message: 'Email are required' })
      if (!obj.obj) HandlerError.createError({ code: CodeError.BAD_REQUEST, cause: InfoError.BAD_REQUEST, message: 'All fields are required' })

      const exist = await userModel.findOne({ email })
      if (!exist) HandlerError.createError({ code: CodeError.NOT_FOUND, cause: InfoError.NOT_FOUND, message: 'User not found' })

      exist.first_name = obj.first_name || exist.first_name
      exist.last_name = obj.last_name || exist.last_name
      exist.age = obj.age || exist.age
      exist.password = obj.password || exist.password
      exist.role = obj.role || exist.role

      const result = await userModel.updateOne({ email }, exist)
      const { modifiedCount } = result
      if (!(modifiedCount > 0)) return response(202, null, { message: 'Not modified' })
      return response(200, exist)
    } catch (error) {
      HandlerError.createError({ name: error.name, code: error.code, cause: error.cause, message: error.message })
    }
  }

  async delete (email) {
    try {
      const exist = await userModel.findOne({ email })
      if (!exist) HandlerError.createError({ code: CodeError.NOT_FOUND, cause: InfoError.NOT_FOUND, message: 'User not found' })

      const result = await userModel.deleteOne({ email })
      const { deletedCount } = result
      if (!(deletedCount > 0)) return response(202, null, { message: 'Not deleted' })
      return response(200, result)
    } catch (error) {
      HandlerError.createError({ name: error.name, code: error.code, cause: error.cause, message: error.message })
    }
  }
}

export const userMongo = new UserMongo()
