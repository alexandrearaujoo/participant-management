import { prisma } from '../../lib/prismaClient'
import { BadRequest } from '../../routes/_errors/bad-requests'

export async function checkIn(attendeeId: number) {
  const attendeeCheckIn = await prisma.checkIn.findUnique({
    where: {
      attendeeId,
    },
  })

  if (attendeeCheckIn) throw new BadRequest('Attendee already checked in!')

  await prisma.checkIn.create({
    data: {
      attendeeId,
    },
  })
}
