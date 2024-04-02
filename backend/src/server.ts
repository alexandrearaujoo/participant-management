import fastify from 'fastify'
import { createEventSchema } from './validations/createEventSchema'
import { prisma } from './lib/prismaClient'

const PORT = 3333

const app = fastify()

app.post('/events', async (req, reply) => {
  const data = createEventSchema.parse(req.body)

  const event = await prisma.event.create({
    data: { ...data, slug: new Date().toISOString() },
  })

  return reply.status(201).send({ eventId: event.id })
})

app
  .listen({
    port: PORT,
  })
  .then(() => console.log(`Server running on port ${PORT}`))
