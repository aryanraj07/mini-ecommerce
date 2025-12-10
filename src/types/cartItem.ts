import { Product } from "./products";

export interface cartProduct extends Product {
  quantity: number;
}
