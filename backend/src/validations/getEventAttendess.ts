import z from 'zod'

export const getEventAttendeesParams = z.object({
  eventId: z.string().uuid(),
})

export const getEventAttendeesQueryParams = z.object({
  pageIndex: z.string().nullish().default('0').transform(Number),
  limit: z.string().nullish().default('10').transform(Number),
  query: z.string().nullish(),
})

export const getEventAttendeesResponse = z.object({
  attendees: z.array(
    z.object({
      id: z.coerce.number().int(),
      name: z.string(),
      email: z.string().email(),
      createdAt: z.date(),
      checkedInAt: z.date().nullable(),
    }),
  ),
})
