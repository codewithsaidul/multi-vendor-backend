


export type VendorStatus = 'pending' | 'approved' | 'rejected';


export interface IVendor {
  name: string;
  status: VendorStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
