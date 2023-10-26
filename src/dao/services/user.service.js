import { PERSISTENCE } from '../../config/config.js'
import { connectMongo } from '../../config/mongo.config.js'
import { UserRepository } from './repository/user.repository.js'

let UserService

switch (PERSISTENCE) {
  case 'MONGO': {
    connectMongo()
    const { userMongo } = await import('../mongo/user.mongo.js')
    UserService = userMongo
    break
  }

  case 'MEMORY': {
    const { userMemory } = await import('../memory/user.memory.js')
    UserService = userMemory
    break
  }
}

export const userService = new UserRepository(UserService)
