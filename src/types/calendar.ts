import { z } from "zod";

export const calendarProviderSchema = z.enum(["google", "ical"]);
export type CalendarProvider = z.infer<typeof calendarProviderSchema>;

export const calendarConnectionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  protocolId: z.string().uuid(),
  provider: calendarProviderSchema,
  googleCalendarId: z.string().nullable(),
  googleRefreshToken: z.string().nullable(), // encrypted
  lastSyncedAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
});
export type CalendarConnection = z.infer<typeof calendarConnectionSchema>;

export const calendarEventSchema = z.object({
  date: z.string(), // ISO date
  title: z.string(),
  allDay: z.boolean(),
  startTime: z.string().nullable(), // HH:mm
  endTime: z.string().nullable(), // HH:mm
  description: z.string().nullable(),
});
export type CalendarEvent = z.infer<typeof calendarEventSchema>;

export const protocolVersionSchema = z.object({
  id: z.string().uuid(),
  protocolId: z.string().uuid(),
  version: z.number().int().positive(),
  rawInput: z.string(),
  snapshotJson: z.any(), // JSON of schedule_items at that version
  createdAt: z.string().datetime(),
});
export type ProtocolVersion = z.infer<typeof protocolVersionSchema>;
