import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../build/quaryBuilder';
import { uploadMultipleImgsToCloudinary } from '../../middlewares/uploadImgToCloudinary';
import ApiError from '../../utils/ApiError';
import { User } from '../user/user.model';
import { TListing } from './listing.interface';
import Listing from './listing.model';

const createProductListing = async (
  payload: TListing,
  images: any,
  email: string,
) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (user.status === 'block') {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      'User has been blocked. Cannot post product',
    );
  }

  const files = (images?.fiels as Express.Multer.File[]).map(file => ({
    path: file.path,
    name: file.originalname, // Customize the Cloudinary public_id here
  }));

  // Upload all files to Cloudinary
  const results = await uploadMultipleImgsToCloudinary(files);

  payload.images = results.map(image => image.secure_url as string);
  payload.sellerId = user._id;

  const newProduct = await Listing.create(payload);

  return newProduct;
};

const getAllProducts = async (queryParam: Record<string, unknown>) => {
  const allListing = new QueryBuilder(
    Listing.find().populate('sellerId'),
    queryParam,
  ).search(["category","condition","price","location"]).filter();
  const listing = await allListing.queryModel;
  return listing;
};

const getSingleProduct = async (id: string) => {
  const singleListing = await Listing.findById(id);

  if (!singleListing) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Listing not found');
  }

  return singleListing;
};

const deleteSingLeProduct = async (id: string) => {
  const deleteLeListing = await Listing.findByIdAndUpdate(
    id,
    {
      isDelete: true,
    },
    {
      new: true,
    },
  );

  return deleteLeListing;
};

export const ListingServices = {
  createProductListing,
  getAllProducts,
  getSingleProduct,
  deleteSingLeProduct,
};
