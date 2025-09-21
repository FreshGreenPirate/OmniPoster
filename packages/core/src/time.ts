import { DateTime } from 'luxon';

export const toUTC = (iso: string, timezone: string): string => {
  return DateTime.fromISO(iso, { zone: timezone }).toUTC().toISO();
};

export const fromUTC = (iso: string, timezone: string): string => {
  return DateTime.fromISO(iso, { zone: 'utc' }).setZone(timezone).toISO();
};

export const formatForDisplay = (iso: string, timezone: string): string => {
  return DateTime.fromISO(iso, { zone: timezone }).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
};

export const nextRunFromBuffer = (scheduleAt: Date, bufferMinutes: number): Date => {
  return DateTime.fromJSDate(scheduleAt).minus({ minutes: bufferMinutes }).toJSDate();
};
