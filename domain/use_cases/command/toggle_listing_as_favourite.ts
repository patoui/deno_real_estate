import { FavouriteRepositoryInterface } from '../../../domain/favourite.ts';
import { Status } from "../status.ts";

export default class ToggleListingAsFavourite {
    repository: FavouriteRepositoryInterface;

    constructor(repository: FavouriteRepositoryInterface) {
        this.repository = repository;
    }

    handle = async (userId: number, listingId: number): Promise<Status> => {
        const toggledSuccessfully = await this.repository.toggleFavourite(
            userId,
            listingId
        );

        if (!toggledSuccessfully) {
            return new Status(false, 'Unable to add listing to favourites');
        }

        return new Status(true);
    }
}