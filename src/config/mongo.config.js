import { connect } from 'mongoose'

import { MONGOOSE_URL, MONGOOSE_DB_NAME } from './config.js'

export const connectMongo = async () => await connect(MONGOOSE_URL, { dbName: MONGOOSE_DB_NAME })
