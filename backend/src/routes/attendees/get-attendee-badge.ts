import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  getAttendeeBadgeParams,
  getAttendeeBadgeResponse,
} from '../../validations/getAttendeeSchema'
import { getAttendeeBadge } from '../../services/attendees/get-attendee-badge'

export async function getAttendeeBadgeRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/attendees/:attendeeId/badge',
    {
      schema: {
        params: getAttendeeBadgeParams,
        response: {
          200: {
            badge: getAttendeeBadgeResponse,
          },
        },
      },
    },
    async (req, reply) => {
      const { attendeeId } = req.params

      const baseURL = `${req.protocol}://${req.hostname}`

      const badge = await getAttendeeBadge(attendeeId, baseURL)

      return reply.send({ badge })
    },
  )
}
