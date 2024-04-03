import fastify from 'fastify'

import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

import {
  ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createEventRoute } from './routes/events/create-event'
import { registerForEventRoute } from './routes/attendees/register-for-event'
import { getEventRoute } from './routes/events/get-event'
import { getAttendeeBadgeRoute } from './routes/attendees/get-attendee-badge'
import { checkInRoute } from './routes/attendees/check-in'
import { getEventAttendeesRoute } from './routes/attendees/get-event-attendees'
import { errorHandler } from './error-handler'
import fastifyCors from '@fastify/cors'

const PORT = 3333

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'pass.in',
      description: 'Especificações da API para o back-end da aplicação pass.in',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEventRoute)
app.register(registerForEventRoute)
app.register(getEventRoute)
app.register(getAttendeeBadgeRoute)
app.register(checkInRoute)
app.register(getEventAttendeesRoute)

app.setErrorHandler(errorHandler)

app
  .listen({
    port: PORT,
    host: '0.0.0.0',
  })
  .then(() => console.log(`Server running on port ${PORT}`))
