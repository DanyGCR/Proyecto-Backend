import { PERSISTENCE } from '../../config/config.js'
import { connectMongo } from '../../config/mongo.config.js'
import { ProductRepository } from './repository/product.repository.js'

let ProductService

switch (PERSISTENCE) {
  case 'MONGO': {
    connectMongo()
    const { productMongo } = await import('../mongo/product.mongo.js')
    ProductService = productMongo
    break
  }

  case 'MEMORY': {
    const { productMemory } = await import('../memory/product.memory.js')
    ProductService = productMemory
    break
  }
}

export const productService = new ProductRepository(ProductService)
