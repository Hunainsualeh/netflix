/**
 * Birthday date (month 1-12, day 1-31). On the day itself the intro shows the big
 * "it's your birthday" reveal; on any other day it shows a premiere countdown
 * (with a button to open the gift early). Change with NEXT_PUBLIC_BIRTHDAY="MM-DD".
 */
const raw = process.env.NEXT_PUBLIC_BIRTHDAY ?? "10-13";
const [m, d] = raw.split("-").map(Number);

export const BIRTHDAY = { month: m || 10, day: d || 13 };

export const BRAND = "FAKIHA";

export function nextBirthday(now = new Date()): Date {
  const y = now.getFullYear();
  let target = new Date(y, BIRTHDAY.month - 1, BIRTHDAY.day, 0, 0, 0);
  const startOfToday = new Date(y, now.getMonth(), now.getDate());
  if (target < startOfToday) target = new Date(y + 1, BIRTHDAY.month - 1, BIRTHDAY.day, 0, 0, 0);
  return target;
}

export function isBirthdayToday(now = new Date()): boolean {
  return now.getMonth() + 1 === BIRTHDAY.month && now.getDate() === BIRTHDAY.day;
}
