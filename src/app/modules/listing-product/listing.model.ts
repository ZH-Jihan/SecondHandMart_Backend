import { Schema, model } from 'mongoose';
import { TListing } from './listing.interface';

const ListingSchema = new Schema<TListing>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  condition: { type: String, required: true },
  images: { type: [String], required: true },
  sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['available', 'sold'], required: true },
  isDelete: { type: Boolean, default: false },
});

const Listing = model<TListing>('Listing', ListingSchema);

export default Listing;
