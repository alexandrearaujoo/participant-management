import { prisma } from '../../lib/prismaClient'
import { BadRequest } from '../../routes/_errors/bad-requests'
import { generateSlug } from '../../utils/generateSlug'
import { CreateEventData } from '../../validations/createEventSchema'

export async function createEvent(data: CreateEventData) {
  const slug = generateSlug(data.title)

  const eventWithSameSlug = await prisma.event.findUnique({
    where: {
      slug,
    },
  })

  if (eventWithSameSlug) throw new BadRequest('Slug already exists')

  const event = await prisma.event.create({
    data: {
      details: data.details,
      maximumAttendees: data.maximumAttendees,
      title: data.title,
      slug,
    },
  })

  return event.id
}
