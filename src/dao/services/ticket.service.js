import { PERSISTENCE } from '../../config/config.js'
import { connectMongo } from '../../config/mongo.config.js'
import { TicketRepository } from './repository/ticket.repository.js'

let TicketService

switch (PERSISTENCE) {
  case 'MONGO': {
    connectMongo()
    const { ticketMongo } = await import('../mongo/ticket.mongo.js')
    TicketService = ticketMongo
    break
  }

  case 'MEMORY': {
    const { ticketMemory } = await import('../memory/ticket.memory.js')
    TicketService = ticketMemory
    break
  }
}

export const ticketService = new TicketRepository(TicketService)
