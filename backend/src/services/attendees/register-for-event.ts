import { prisma } from '../../lib/prismaClient'
import { RegisterForEventsData } from '../../validations/registerForEventSchema'

export async function registerForEvent(
  data: RegisterForEventsData,
  eventId: string,
) {
  const [event, amountOfAttendeeForEvent] = await Promise.all([
    prisma.event.findUnique({
      where: {
        id: eventId,
      },
    }),
    prisma.attendee.count({
      where: {
        eventId,
      },
    }),
  ])

  if (!event) throw new Error('Event not found')

  if (
    event?.maximumAttendees &&
    amountOfAttendeeForEvent >= event.maximumAttendees
  )
    throw new Error(
      'The maximum number of attendees for this event has been reached',
    )

  const attendeeFromEmail = await prisma.attendee.findUnique({
    where: {
      eventId_email: {
        email: data.email,
        eventId: event.id,
      },
    },
  })

  if (attendeeFromEmail)
    throw new Error('This e-mail is already registered for this event!')

  const attendee = await prisma.attendee.create({
    data: {
      email: data.email,
      name: data.name,
      eventId: event.id,
    },
  })

  return attendee.id
}
