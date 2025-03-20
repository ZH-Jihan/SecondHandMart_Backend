import { Types } from 'mongoose';

export interface TListing {
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  location: string;
  images: string[];
  sellerId: Types.ObjectId;
  status: 'available' | 'sold';
  isDelete: boolean;
}
