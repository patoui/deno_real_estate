import {
  FavouriteRepositoryInterface,
  HasFavouriteRepositoryInterface,
} from "../../domain/favourite.ts";
import { client } from "../database/db.ts";

export default class FavouriteRepository
  implements FavouriteRepositoryInterface, HasFavouriteRepositoryInterface {
  toggleFavourite = async (
    userId: number,
    listingId: number,
  ): Promise<boolean> => {
    const hasFavourite = await this.doesFavouriteExists(userId, listingId);

    // TODO: check for errors from delete/insert statements
    if (hasFavourite) {
      await client.queryArray(
        `DELETE FROM favourites WHERE user_id = $1 AND listing_id = $2`,
        [userId, listingId],
      );
    } else {
      await client.queryArray(
        `INSERT INTO favourites (user_id, listing_id) VALUES ($1, $2)`,
        [userId, listingId],
      );
    }

    return true;
  };

  doesFavouriteExists = async (
    userId: number,
    listingId: number,
  ): Promise<boolean> => {
    const favouriteExists = await client.queryArray(
      `SELECT EXISTS(
          SELECT FROM favourites WHERE user_id = $1 AND listing_id = $2 LIMIT 1
        );`,
      [userId, listingId],
    );

    return Boolean(favouriteExists.rows[0][0] ?? false).valueOf();
  };
}
