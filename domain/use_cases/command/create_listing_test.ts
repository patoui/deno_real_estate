import { delay, assert } from "../../../dev_deps.ts";
import { format } from "../../../deps.ts";
import { NewListing, Listing, ListingRepositoryInterface } from "../../listing.ts";
import CreateListing from "./create_listing.ts";

class MockListingRepository implements ListingRepositoryInterface {
    public data: Listing[] = [];

    doesListingExists = async (
        address: string,
        postal_code: string,
        city: string,
        province: string,
        country: string,
        address_2: string|null
    ): Promise<boolean> => {
        await delay(1);

        return Boolean(
            this.data.find(
                (listing: Listing) => {
                    return listing.address === address
                        && listing.postal_code === postal_code
                        && listing.city === city
                        && listing.province === province
                        && listing.country === country
                        && listing.address_2 === address_2;
                }
            )
        ).valueOf();
    };

    createListing = async (newListing: NewListing): Promise<boolean> => {
        await delay(1);
        const now = format(new Date(), "yyyy-MM-dd HH:mm:ss");
        this.data.push(
            new Listing(
                this.data.length + 1,
                newListing.user_id,
                newListing.mls_number,
                newListing.price,
                newListing.name,
                newListing.description,
                newListing.address,
                newListing.address_2,
                newListing.postal_code,
                newListing.city,
                newListing.province,
                newListing.country,
                newListing.bedrooms,
                newListing.bathrooms,
                newListing.property_type,
                newListing.house_type,
                newListing.stories,
                newListing.title,
                newListing.build_year,
                newListing.parking_type,
                now,
                now
            )
        );
        return true;
    };
}

Deno.test("Create Listing", async () => {
    // Arrange
    const mockListingRepository = new MockListingRepository();
    const createListingCase = new CreateListing(mockListingRepository);
    const newListing = new NewListing(
        Math.floor((Math.random() * 100) + 1),
        Math.floor((Math.random() * 10000) + 1),
        Math.floor((Math.random() * 100000) + 1),
        'New Listing 1',
        'A great starter home!',
        '123 Fun St.',
        '',
        'A1A1A1',
        'Toronto',
        'Ontario',
        'Canada',
        3,
        1,
        'Single Family',
        'Townhouse',
        2,
        'Freehold',
        2022,
        'Open, Surfaced, Visitor Parking',
    );

    // Pre-assert
    // Listing should not exists at this point
    assert(
        !await mockListingRepository.doesListingExists(
            newListing.address,
            newListing.postal_code,
            newListing.city,
            newListing.province,
            newListing.country,
            newListing.address_2,
        )
    );

    // Act
    await createListingCase.handle(newListing);

    // Assert
    // verify Listing has been created and exist
    assert(
        await mockListingRepository.doesListingExists(
            newListing.address,
            newListing.postal_code,
            newListing.city,
            newListing.province,
            newListing.country,
            newListing.address_2,
        )
    );
});