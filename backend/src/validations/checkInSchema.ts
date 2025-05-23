import z from 'zod'

export const checkInParams = z.object({
  attendeeId: z.coerce.number().int(),
})

export const checkInResponse = z.null()
