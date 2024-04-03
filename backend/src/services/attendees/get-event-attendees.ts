import { prisma } from '../../lib/prismaClient'

export async function getEventAttendees(
  eventId: string,
  pageIndex: number,
  limit = 10,
  query?: string | null,
) {
  const attendees = await prisma.attendee.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      checkIn: {
        select: {
          createdAt: true,
        },
      },
    },
    where: {
      eventId,
      ...(query && { name: { contains: query } }),
    },
    take: limit,
    skip: pageIndex * 10,
    orderBy: {
      createdAt: 'desc',
    },
  })

  return attendees.map((attendee) => ({
    id: attendee.id,
    name: attendee.name,
    email: attendee.email,
    createdAt: attendee.createdAt,
    checkedInAt: attendee.checkIn?.createdAt ?? null,
  }))
}
