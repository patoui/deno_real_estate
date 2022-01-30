export default class SearchListings {
  location: string | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  numBedrooms: number | null = null;
  numBathrooms: number | null = null;

  constructor(
    location: string | null,
    minPrice: number | null,
    maxPrice: number | null,
    numBedrooms: number | null,
    numBathrooms: number | null,
  ) {
    this.location = location;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.numBedrooms = numBedrooms;
    this.numBathrooms = numBathrooms;
  }

  static parseUrlSearchParams = (searchParams: URLSearchParams): SearchListings => {
    return new SearchListings(
      searchParams.get("location"),
      searchParams.get("min_price") ? Number(searchParams.get("min_price")).valueOf() : null,
      searchParams.get("max_price") ? Number(searchParams.get("max_price")).valueOf() : null,
      searchParams.get("num_bedrooms") ? Number(searchParams.get("num_bedrooms")).valueOf() : null,
      searchParams.get("num_bathrooms") ? Number(searchParams.get("num_bathrooms")).valueOf() : null,
    );
  };
}
