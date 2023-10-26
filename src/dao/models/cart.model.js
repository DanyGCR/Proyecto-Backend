import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import { MONGOOSE_DB_COLLECTION_CARTS, MONGOOSE_DB_COLLECTION_PRODUCTS } from '../../config/config.js'

const collection = MONGOOSE_DB_COLLECTION_CARTS
const schema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: MONGOOSE_DB_COLLECTION_PRODUCTS,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      },
      _id: false
    }
  ]
})

schema.plugin(paginate)
export const cartModel = model(collection, schema)
