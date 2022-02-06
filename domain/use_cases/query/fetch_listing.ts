import { FetchListingRepositoryInterface, Listing } from "../../listing.ts";

export default class FetchListing {
  listingRepository: FetchListingRepositoryInterface;

  constructor(listingRepository: FetchListingRepositoryInterface) {
    this.listingRepository = listingRepository;
  }

  fetch = async (id: number): Promise<Listing | null> => {
    const listing = await this.listingRepository.fetchById(id);
    return listing;
  }
}