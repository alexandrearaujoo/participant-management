import { prisma } from '../../lib/prismaClient'

export async function checkIn(attendeeId: number) {
  const attendeeCheckIn = await prisma.checkIn.findUnique({
    where: {
      attendeeId,
    },
  })

  if (attendeeCheckIn) throw new Error('Attendee already checked in!')

  await prisma.checkIn.create({
    data: {
      attendeeId,
    },
  })
}
