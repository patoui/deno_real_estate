import { assert, delay } from "../../../dev_deps.ts";
import { format } from "../../../deps.ts";
import FetchListing from "./fetch_listing.ts";
import { FetchListingRepositoryInterface, Listing } from "../../listing.ts";

class MockFetchListingRepository implements FetchListingRepositoryInterface {
  public data: Listing[] = [];
  fetchById = async (id: number): Promise<Listing | null> => {
    await delay(1);
    return this.data.find((listing) => listing.id === id) ?? null;
  };
}

Deno.test("Fetch listing", async () => {
  // Arrange
  const now = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const mockFetchListingRepository = new MockFetchListingRepository();
  mockFetchListingRepository.data = [
    new Listing(
        333,
        222,
        111,
        540000,
        'Beautiful family home',
        'Beautiful family home in an up and coming neighbourhood',
        '123 Main Street',
        '',
        'A1A1A1',
        'Toronto',
        'ON',
        'Canada',
        3,
        2,
        'Single Family',
        'Townhouse',
        2,
        'Freehold',
        1992,
        'Attached Garage',
        now,
        now
    ),
  ];
  const fetchListing = new FetchListing(mockFetchListingRepository);

  // Act
  const result = await fetchListing.fetch(333);

  // Assert
  assert(result instanceof Listing);
});
