import { prisma } from '../src/lib/prismaClient'
;(async () => {
  await prisma.event.create({
    data: {
      id: '636f7121-cd22-4ace-9b54-8ea11cd89084',
      title: 'Unite Summit',
      slug: 'unit-summit',
      details: 'Evento para devs apaixonados por código',
      maximumAttendees: 120,
    },
  })
})().then(() => {
  console.log('Database seeded!')
  prisma.$disconnect()
})
