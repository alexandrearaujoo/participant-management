import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { checkInParams, checkInResponse } from '../../validations/checkInSchema'
import { checkIn } from '../../services/attendees/check-in'

export async function checkInRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/attendees/:attendeeId/check-in',
    {
      schema: {
        summary: 'Check-in an attendee',
        tags: ['check-ins'],
        params: checkInParams,
        response: {
          201: checkInResponse,
        },
      },
    },
    async (req, reply) => {
      const { attendeeId } = req.params

      await checkIn(attendeeId)

      return reply.status(201).send()
    },
  )
}
