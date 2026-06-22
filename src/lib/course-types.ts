export type CoursePriceDTO = {
  id: string;
  title: string;
  subtitle: string;
  priceInr: number;
  priceSuffix?: string;
  sortOrder: number;
  highlighted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export function formatInr(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}
