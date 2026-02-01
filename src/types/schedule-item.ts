import { z } from "zod";

export const frequencyTypeSchema = z.enum([
  "daily",
  "eod", // every other day
  "specific_days",
  "before_workout",
]);
export type FrequencyType = z.infer<typeof frequencyTypeSchema>;

export const timeOfDaySchema = z.enum([
  "morning",
  "evening",
  "bedtime",
  "split",
  "with_meal",
]);
export type TimeOfDay = z.infer<typeof timeOfDaySchema>;

export const dayOfWeekSchema = z.enum([
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
]);
export type DayOfWeek = z.infer<typeof dayOfWeekSchema>;

export const doseTypeSchema = z.enum(["flat", "ramp"]);
export type DoseType = z.infer<typeof doseTypeSchema>;

export const rampStepFrequencySchema = z.enum([
  "daily",
  "weekly",
  "every_x_days",
]);
export type RampStepFrequency = z.infer<typeof rampStepFrequencySchema>;

export const scheduleItemSchema = z.object({
  id: z.string().uuid(),
  protocolId: z.string().uuid(),
  protocolVersion: z.number().int().positive(),
  compoundName: z.string().min(1),
  doseUnit: z.string().min(1), // "mg", "mcg", "cc", "ml", etc.

  // Frequency
  frequencyType: frequencyTypeSchema,
  specificDays: z.array(dayOfWeekSchema).nullable(),

  // Timing
  timeOfDay: timeOfDaySchema.nullable(),
  morningTime: z.string().nullable(), // HH:mm format
  eveningTime: z.string().nullable(), // HH:mm format

  // Optional and notes
  isOptional: z.boolean(),
  notes: z.string().nullable(),

  // Dosing type
  doseType: doseTypeSchema,

  // Flat dosing
  flatDose: z.number().positive().nullable(),

  // Ramp dosing
  rampStartDose: z.number().positive().nullable(),
  rampEndDose: z.number().positive().nullable(),
  rampStep: z.number().positive().nullable(),
  rampStepFrequency: rampStepFrequencySchema.nullable(),
  rampStepDays: z.number().int().positive().nullable(), // for every_x_days
  rampThenReverse: z.boolean().nullable(), // pyramid back down
});
export type ScheduleItem = z.infer<typeof scheduleItemSchema>;

// Schema for Claude's parsed output
export const parsedScheduleItemSchema = z.object({
  compoundName: z.string(),
  doseUnit: z.string(),
  frequencyType: frequencyTypeSchema,
  specificDays: z.array(dayOfWeekSchema).nullable(),
  timeOfDay: timeOfDaySchema.nullable(),
  isOptional: z.boolean(),
  notes: z.string().nullable(),
  doseType: doseTypeSchema,
  flatDose: z.number().nullable(),
  rampStartDose: z.number().nullable(),
  rampEndDose: z.number().nullable(),
  rampStep: z.number().nullable(),
  rampStepFrequency: rampStepFrequencySchema.nullable(),
  rampStepDays: z.number().nullable(),
  rampThenReverse: z.boolean().nullable(),
});
export type ParsedScheduleItem = z.infer<typeof parsedScheduleItemSchema>;

export const claudeParseResponseSchema = z.object({
  items: z.array(parsedScheduleItemSchema),
  clarificationsNeeded: z.array(z.string()),
});
export type ClaudeParseResponse = z.infer<typeof claudeParseResponseSchema>;
