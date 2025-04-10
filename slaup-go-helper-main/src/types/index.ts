export type ItemType = "product" | "service" | "food";

export interface Item {
  id: string;
  title: string;
  description: string;
  type: ItemType;
  location: string;
  code: string;
  createdAt: Date;
  available: boolean;
}