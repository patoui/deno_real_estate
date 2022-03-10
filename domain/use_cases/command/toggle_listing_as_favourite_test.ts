import { assert, delay } from "../../../dev_deps.ts";
import { format } from "../../../deps.ts";
import {
  Favourite,
  FavouriteRepositoryInterface,
  HasFavouriteRepositoryInterface,
} from "../../favourite.ts";
import ToggleListingAsFavourite from "./toggle_listing_as_favourite.ts";

class MockFavouriteRepository
  implements FavouriteRepositoryInterface, HasFavouriteRepositoryInterface {
  public data: Favourite[] = [];

  toggleFavourite = async (
    userId: number,
    listingId: number,
  ): Promise<boolean> => {
    await delay(1);

    const existingListingIndex = this.findListingIndex(userId, listingId);

    if (existingListingIndex > -1) {
        this.data.splice(existingListingIndex, 1);
        return true;
    }

    const now = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    this.data.push(new Favourite(userId, listingId, now));

    return true;
  };

  doesFavouriteExists = async (
    userId: number,
    listingId: number,
  ): Promise<boolean> => {
    await delay(1);
    return Boolean(this.findListingIndex(userId, listingId) > -1).valueOf();
  };

  findListingIndex = (userId: number, listingId: number): number => {
    return this.data.findIndex(
      (favourite) =>
        favourite.user_id === userId && favourite.listing_id === listingId,
    );
  };
}

Deno.test("Toggle listing as favourite", async () => {
  // Arrange
  const userId = 321;
  const listingId = 222;
  const mockFavouriteRepository = new MockFavouriteRepository();
  const toggleListingAsFavourite = new ToggleListingAsFavourite(
    mockFavouriteRepository,
  );

  // Act
  await toggleListingAsFavourite.handle(userId, listingId);

  // Assert - favourite
  assert(
    await mockFavouriteRepository.doesFavouriteExists(userId, listingId),
  );

  // Act 2
  await toggleListingAsFavourite.handle(userId, listingId);

  // Assert 2 - unfavourite
  assert(
    !await mockFavouriteRepository.doesFavouriteExists(userId, listingId),
  );
});
