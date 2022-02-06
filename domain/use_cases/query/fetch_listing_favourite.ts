import { HasFavouriteRepositoryInterface } from "../../favourite.ts";

export default class FetchListingFavourite {
  favouriteRepository: HasFavouriteRepositoryInterface;

  constructor(favouriteRepository: HasFavouriteRepositoryInterface) {
    this.favouriteRepository = favouriteRepository;
  }

  fetch = async (listingId: number, userId: number | null): Promise<boolean> => {
    if (!userId) {
      return false;
    }
    return await this.favouriteRepository.doesFavouriteExists(
        userId,
        listingId
    );
  }
}