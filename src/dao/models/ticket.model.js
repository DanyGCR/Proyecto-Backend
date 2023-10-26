import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

import { MONGOOSE_DB_COLLECTION_TICKETS } from '../../config/config.js'

const collection = MONGOOSE_DB_COLLECTION_TICKETS
const schema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  purchase_datetime: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  purchaser: {
    type: Object,
    required: true
  },
  products: Array
})

schema.plugin(paginate)
export const ticketModel = model(collection, schema)
