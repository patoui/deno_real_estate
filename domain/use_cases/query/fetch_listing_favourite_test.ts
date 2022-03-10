import { assert, delay } from "../../../dev_deps.ts";
import { format } from "../../../deps.ts";
import { Favourite, HasFavouriteRepositoryInterface } from "../../favourite.ts";
import FetchListingFavourite from "./fetch_listing_favourite.ts";

class MockHasFavouriteRepository implements HasFavouriteRepositoryInterface {
  public data: Favourite[] = [];

  doesFavouriteExists = async (userId: number, listingId: number): Promise<boolean> => {
    await delay(1);

    return Boolean(
      this.data.find(
        (favourite: Favourite) => favourite.user_id === userId && favourite.listing_id === listingId
      )
    ).valueOf();
  }
}

Deno.test("Fetch listing", async () => {
  // Arrange
  const now = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const mockHasFavouriteRepository = new MockHasFavouriteRepository();
  mockHasFavouriteRepository.data = [
    new Favourite(321, 222, now),
  ];
  const fetchListingFavourite = new FetchListingFavourite(
    mockHasFavouriteRepository,
  );

  // Act
  const result = await fetchListingFavourite.fetch(222, 321);

  // Assert
  assert(result);
});
