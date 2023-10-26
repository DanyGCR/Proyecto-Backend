import app from './app.js'

import { SERVER_PORT } from './config/config.js'
import { logger } from './utils/logger.js'

const server = app.listen(SERVER_PORT, () => logger.info(`Server listening on http://localhost:${SERVER_PORT}`))
server.on('error', (err) => logger.error(err))
