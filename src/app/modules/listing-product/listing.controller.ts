import { StatusCodes } from 'http-status-codes';
import ApiResponse from '../../utils/ApiResponse';
import asyncHandler from '../../utils/asyncHandler';
import { ListingServices } from './listing.service';

const createProductListing = asyncHandler(async (req, res) => {
  const { email } = req.user;
  const result = await ListingServices.createProductListing(
    req.body,
    req.files,
    email,
  );
  return ApiResponse(res, {
    statusCode: StatusCodes.OK,
    data: result,
    message: 'Product listing created successfully',
  });
});

const getAllListings = asyncHandler(async (req, res) => {
  const restults = await ListingServices.getAllProducts(req.query);
  return ApiResponse(res, {
    statusCode: StatusCodes.OK,
    data: restults,
    message: 'Get ALl Product listing successfully',
  });
});

const getSingleListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const restult = await ListingServices.getSingleProduct(id);
  return ApiResponse(res, {
    statusCode: StatusCodes.OK,
    data: restult,
    message: 'Get One Product listing successfully',
  });
});

const deleteSingleListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const restult = await ListingServices.deleteSingLeProduct(id);
  return ApiResponse(res, {
    statusCode: StatusCodes.OK,
    data: restult,
    message: 'Delete Product listing successfully',
  });
});

export {
  createProductListing,
  deleteSingleListing,
  getAllListings,
  getSingleListing,
};
