import {
  Listing,
  PaginatedListingListInterface,
} from "../../../domain/listing.ts";

export default class PaginatedListingList
  implements PaginatedListingListInterface {
  page: number;
  perPage: number;
  totalPages: number;
  totalListings: number;
  listings: Listing[];

  constructor(
    page: number,
    perPage: number,
    totalListings: number,
    listings: Listing[],
  ) {
    this.page = page;
    this.perPage = perPage;
    this.totalPages = Math.ceil(totalListings / perPage);
    this.totalListings = totalListings;
    this.listings = listings;
  }
}
