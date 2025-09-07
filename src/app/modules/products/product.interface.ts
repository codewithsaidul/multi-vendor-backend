import { Types } from "mongoose";




export interface IProduct {
  title: string;
  price: number;
  stock: number;
  vendorId: Types.ObjectId;
  ownerId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}