import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createEventRoute } from './routes/events/create-event'
import { registerForEventRoute } from './routes/attendees/register-for-event'
import { getEventRoute } from './routes/events/get-event'
import { getAttendeeBadgeRoute } from './routes/attendees/get-attendee-badge'
import { checkInRoute } from './routes/attendees/check-in'
import { getEventAttendeesRoute } from './routes/attendees/get-event-attendees'

const PORT = 3333

export const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEventRoute)
app.register(registerForEventRoute)
app.register(getEventRoute)
app.register(getAttendeeBadgeRoute)
app.register(checkInRoute)
app.register(getEventAttendeesRoute)

app
  .listen({
    port: PORT,
  })
  .then(() => console.log(`Server running on port ${PORT}`))
