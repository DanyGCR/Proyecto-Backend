import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import { MONGOOSE_DB_COLLECTION_CARTS, MONGOOSE_DB_COLLECTION_USERS } from '../../config/config.js'

const collection = MONGOOSE_DB_COLLECTION_USERS
const schema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    default: null
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    default: null
  },
  password: {
    type: String,
    default: null
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: MONGOOSE_DB_COLLECTION_CARTS,
    default: null
  },
  role: {
    type: String,
    default: 'usuario'
  }
})

schema.plugin(paginate)
export const userModel = model(collection, schema)
