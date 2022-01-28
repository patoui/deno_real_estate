import { PaginatedListingListInterface, PaginatedListingListRepositoryInterface } from "../../listing.ts";

export default class PaginatedListingList {
  listingRepository: PaginatedListingListRepositoryInterface;

  constructor(listingRepository: PaginatedListingListRepositoryInterface) {
    this.listingRepository = listingRepository;
  }

  fetch = async (page = 1, perPage = 15): Promise<PaginatedListingListInterface> => {
    const paginatedListings = await this.listingRepository.getPaginatedListings(page, perPage);
    return paginatedListings;
  }
}