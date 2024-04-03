import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { createEvent } from '../../services/events/create-events'
import {
  createEventResponse,
  createEventSchema,
} from '../../validations/createEventSchema'

export async function createEventRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/events',
    {
      schema: {
        body: createEventSchema,
        response: {
          201: createEventResponse,
        },
      },
    },
    async (req, reply) => {
      const { details, maximumAttendees, title } = req.body

      const eventId = await createEvent({ details, maximumAttendees, title })

      return reply.status(201).send({ eventId })
    },
  )
}
