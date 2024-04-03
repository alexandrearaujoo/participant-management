import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createEventRoute } from './routes/events/create-event'

const PORT = 3333

export const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEventRoute)

app
  .listen({
    port: PORT,
  })
  .then(() => console.log(`Server running on port ${PORT}`))
