export class Favourite {
  user_id: number;
  listing_id: number;
  created_at: string;

  constructor(user_id: number, listing_id: number, created_at: string) {
    this.user_id = user_id;
    this.listing_id = listing_id;
    this.created_at = created_at;
  }
}

export interface FavouriteRepositoryInterface {
  toggleFavourite(userId: number, listingId: number): Promise<boolean>;
}

export interface HasFavouriteRepositoryInterface {
  doesFavouriteExists(userId: number, listingId: number): Promise<boolean>;
}
