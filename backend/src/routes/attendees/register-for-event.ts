import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  registerForEventParams,
  registerForEventResponse,
  registerForEventSchema,
} from '../../validations/registerForEventSchema'
import { registerForEvent } from '../../services/attendees/register-for-event'

export async function registerForEventRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/events/:eventId/attendees',
    {
      schema: {
        summary: 'Register an attendee',
        tags: ['attendees'],
        body: registerForEventSchema,
        params: registerForEventParams,
        response: {
          201: registerForEventResponse,
        },
      },
    },
    async (req, reply) => {
      const { eventId } = req.params
      const { email, name } = req.body

      const attendeeId = await registerForEvent({ email, name }, eventId)

      return reply.status(201).send({ attendeeId })
    },
  )
}
