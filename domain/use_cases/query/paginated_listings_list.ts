import { PaginatedListingListInterface, PaginatedListingListRepositoryInterface, SearchListingsInterface } from "../../listing.ts";

export default class PaginatedListingList {
  listingRepository: PaginatedListingListRepositoryInterface;

  constructor(listingRepository: PaginatedListingListRepositoryInterface) {
    this.listingRepository = listingRepository;
  }

  fetch = async (page = 1, perPage = 15, searchListing: SearchListingsInterface | null = null): Promise<PaginatedListingListInterface> => {
    const paginatedListings = await this.listingRepository.getPaginatedListings(page, perPage, searchListing);
    return paginatedListings;
  }
}