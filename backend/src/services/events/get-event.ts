import { prisma } from '../../lib/prismaClient'

export async function getEvent(eventId: string) {
  const event = await prisma.event.findUnique({
    select: {
      id: true,
      title: true,
      slug: true,
      details: true,
      maximumAttendees: true,
      _count: {
        select: {
          attendees: true,
        },
      },
    },
    where: {
      id: eventId,
    },
  })

  if (!event) throw new Error('Event not found!')

  return {
    event: {
      id: event.id,
      title: event.title,
      slug: event.slug,
      details: event.details,
      maximumAttendees: event.maximumAttendees,
      attendeesAmount: event._count.attendees,
    },
  }
}
