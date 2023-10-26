import { Command } from 'commander'

const program = new Command()

program
  .option('--port <port>', 'Puerto de ejecución')
  .option('--mode <mode>', 'Modo de desarrollo', 'DEVELOPMENT')
  .option('--persistence <persistence>', 'Persistencia de datos')
program.parse()

export const mode = program.opts().mode
export const port = program.opts().port
export const persistence = program.opts().persistence
