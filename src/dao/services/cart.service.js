import { PERSISTENCE } from '../../config/config.js'
import { connectMongo } from '../../config/mongo.config.js'
import { CartRepository } from './repository/cart.repository.js'

let CartService

switch (PERSISTENCE) {
  case 'MONGO': {
    connectMongo()
    const { cartMongo } = await import('../mongo/cart.mongo.js')
    CartService = cartMongo
    break
  }

  case 'MEMORY': {
    const { cartMemory } = await import('../memory/cart.memory.js')
    CartService = cartMemory
    break
  }
}

export const cartService = new CartRepository(CartService)
