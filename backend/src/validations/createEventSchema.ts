import { z } from 'zod'

export const createEventSchema = z.object({
  title: z.string().min(4),
  details: z.string().nullable(),
  maximumAttendees: z.coerce.number().int().positive().nullable(),
})

export const createEventResponse = z.object({
  eventId: z.string().uuid(),
})

export type CreateEventData = z.infer<typeof createEventSchema>
