import { PaginatedListingListInterface, PaginatedListingListRepositoryInterface } from "../../listing.ts";

export default class PaginatedListingList {
  listingRepository: PaginatedListingListRepositoryInterface;

  constructor(listingRepository: PaginatedListingListRepositoryInterface) {
    this.listingRepository = listingRepository;
  }

  fetch = async (): Promise<PaginatedListingListInterface> => {
    const paginatedListings = await this.listingRepository.getPaginatedListings(1, 15);
    return paginatedListings;
  }
}