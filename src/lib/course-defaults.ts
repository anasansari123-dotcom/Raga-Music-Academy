import type { CoursePriceDTO } from "@/lib/course-types";

/** Fallback when database has no course prices yet */
export const defaultCoursePrices: Omit<CoursePriceDTO, "id" | "createdAt" | "updatedAt">[] = [
  {
    title: "Vocal Class",
    subtitle: "Carnatic, Hindustani, Bollywood & Western — online and offline",
    priceInr: 2499,
    priceSuffix: "per month",
    sortOrder: 0,
    highlighted: false,
    isActive: true,
  },
  {
    title: "6 Months Course",
    subtitle: "Structured foundation certification program",
    priceInr: 12999,
    sortOrder: 1,
    highlighted: true,
    isActive: true,
  },
];
