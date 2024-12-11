export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  listingPrice?: number;
  stock: number;
  salesUnit: "group" | "unit" | "area";
  measurementUnit?: "m2" | "m" | "pallet" | "bolson";
  unitValue?: number;
  image?: string,
};
