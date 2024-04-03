import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { checkInParams } from '../../validations/checkInSchema'

export async function checkInRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/attendees/:attendeeId/check-in',
    {
      schema: {
        params: checkInParams,
      },
    },
    async (req, reply) => {},
  )
}
