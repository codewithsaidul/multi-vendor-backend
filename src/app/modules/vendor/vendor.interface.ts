import { Types } from "mongoose";



export type VendorStatus = 'pending' | 'approved' | 'rejected';


export interface IVendor {
  name: string;
  status: VendorStatus;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface IVendorProduct {
  title: string;
  price: number;
  stock: number;
  vendorId: Types.ObjectId
}
