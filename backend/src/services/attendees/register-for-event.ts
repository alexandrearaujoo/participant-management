import { prisma } from '../../lib/prismaClient'
import { RegisterForEventsData } from '../../validations/registerForEventSchema'

export async function registerForEvent(
  data: RegisterForEventsData,
  eventId: string,
) {
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  })

  if (!event) throw new Error('Event not found')

  const attendee = await prisma.attendee.create({
    data: {
      email: data.email,
      name: data.name,
      eventId: event.id,
    },
  })

  return attendee.id
}
