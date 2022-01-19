import { NewListing, ListingRepositoryInterface } from '../../../domain/listing.ts';
import { Status } from "../status.ts";

export default class CreateListing {
    repository: ListingRepositoryInterface;

    constructor(repository: ListingRepositoryInterface) {
        this.repository = repository;
    }

    handle = async (newListing: NewListing): Promise<Status> => {
        const doesListingExists = await this.repository.doesListingExists(
            newListing.address,
            newListing.postal_code,
            newListing.city,
            newListing.province,
            newListing.country,
            newListing.address_2,
        );
        if (doesListingExists) {
            return new Status(
                false,
                `Listing for address: ${newListing.address}, ${newListing.city}, ${newListing.province} ${newListing.postal_code} already exist`
            );
        }

        const createdSuccessfully = await this.repository.createListing(newListing);

        if (!createdSuccessfully) {
            return new Status(false, 'Unable to create listing');
        }

        return new Status(true);
    }
}