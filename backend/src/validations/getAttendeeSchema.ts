import z from 'zod'

export const getAttendeeBadgeParams = z.object({
  attendeeId: z.coerce.number().int(),
})

export const getAttendeeBadgeResponse = z.object({
  name: z.string(),
  email: z.string().email(),
  eventTitle: z.string(),
  checkInURL: z.string().url(),
})
