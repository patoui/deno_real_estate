import { assert, delay } from "../../../dev_deps.ts";
import { format } from "../../../deps.ts";
import {
  Listing,
  PaginatedListingListInterface,
  PaginatedListingListRepositoryInterface,
  SearchListingsInterface,
} from "../../listing.ts";
import PaginatedListingList from "./paginated_listings_list.ts";

class MockPaginatedListingList
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

class MockPaginatedListingListRepository
  implements PaginatedListingListRepositoryInterface {
  public data: Listing[] = [];

  getPaginatedListings = async(
    page: number,
    perPage: number,
    _searchListing: SearchListingsInterface | null,
  ): Promise<PaginatedListingListInterface> => {
      await delay(1);
      return new MockPaginatedListingList(
        page,
        perPage,
        this.data.length,
        this.data.slice(0, perPage)
      );
  }
}

Deno.test("Paginated listing list", async () => {
  // Arrange
  const now = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  const mockPaginatedListingListRepository = new MockPaginatedListingListRepository();
  mockPaginatedListingListRepository.data = [
    new Listing(
      333,
      222,
      111,
      540000,
      "Beautiful family home",
      "Beautiful family home in an up and coming neighbourhood",
      "123 Main Street",
      "",
      "A1A1A1",
      "Toronto",
      "ON",
      "Canada",
      3,
      2,
      "Single Family",
      "Townhouse",
      2,
      "Freehold",
      1992,
      "Attached Garage",
      now,
      now,
    ),
    new Listing(
      334,
      223,
      112,
      640000,
      "ANOTHER Beautiful family home",
      "ANOTHER Beautiful family home in an up and coming neighbourhood",
      "123 Another Street",
      "",
      "A1A1A1",
      "Hamilton",
      "ON",
      "Canada",
      4,
      5,
      "Single Family",
      "Detached",
      2,
      "Freehold",
      1999,
      "Carport",
      now,
      now,
    ),
  ];
  const fetchListing = new PaginatedListingList(mockPaginatedListingListRepository);

  // Act
  const paginated_listings = await fetchListing.fetch(1, 1);

  // Assert
  assert(paginated_listings.listings.length === 1);
  assert(paginated_listings.totalListings === 2);
});
