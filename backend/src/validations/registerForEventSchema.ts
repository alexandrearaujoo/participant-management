import z from 'zod'

export const registerForEventSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
})

export const registerForEventParams = z.object({
  eventId: z.string().uuid(),
})

export const registerForEventResponse = z.object({
  attendeeId: z.number(),
})

export type RegisterForEventsData = z.infer<typeof registerForEventSchema>
