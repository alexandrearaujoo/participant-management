import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  getEventAttendeesParams,
  getEventAttendeesQueryParams,
  getEventAttendeesResponse,
} from '../../validations/getEventAttendess'
import { getEventAttendees } from '../../services/attendees/get-event-attendees'

export async function getEventAttendeesRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/events/:eventId/attendees',
    {
      schema: {
        summary: 'Get event attendees',
        tags: ['attendees'],
        params: getEventAttendeesParams,
        querystring: getEventAttendeesQueryParams,
        response: {
          200: getEventAttendeesResponse,
        },
      },
    },
    async (req, reply) => {
      const { eventId } = req.params
      const { limit, pageIndex, query } = req.query

      const attendees = await getEventAttendees(
        eventId,
        pageIndex,
        limit,
        query,
      )

      return reply.status(201).send({ attendees })
    },
  )
}
