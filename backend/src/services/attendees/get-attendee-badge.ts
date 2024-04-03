import { prisma } from '../../lib/prismaClient'

export async function getAttendeeBadge(attendeeId: number, baseURL: string) {
  const attendee = await prisma.attendee.findUnique({
    select: {
      name: true,
      email: true,
      event: {
        select: {
          title: true,
        },
      },
    },
    where: {
      id: attendeeId,
    },
  })

  if (!attendee) throw new Error('Attendee not found')

  const checkInURL = new URL(`/attendees/${attendeeId}/check-in`, baseURL)

  return {
    badge: {
      name: attendee.name,
      email: attendee.email,
      eventTitle: attendee.event.title,
      checkInURL: checkInURL.toString(),
    },
  }
}
