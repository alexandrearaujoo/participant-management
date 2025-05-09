import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  getEventParams,
  getEventResponse,
} from '../../validations/getEventSchema'
import { getEvent } from '../../services/events/get-event'

export async function getEventRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/events/:eventId',
    {
      schema: {
        summary: 'Get an event',
        tags: ['events'],
        params: getEventParams,
        response: {
          200: getEventResponse,
        },
      },
    },
    async (req, reply) => {
      const { eventId } = req.params

      const { event } = await getEvent(eventId)

      return reply.send({ event })
    },
  )
}
