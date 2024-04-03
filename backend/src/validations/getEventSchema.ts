import z from 'zod'

export const getEventParams = z.object({
  eventId: z.string().uuid(),
})

export const getEventResponse = z.object({
  id: z.string().ulid(),
  title: z.string(),
  slug: z.string(),
  details: z.string().nullable(),
  maximumAttendees: z.number().int().nullable(),
  attendeesAmount: z.number().int(),
})
