import { Context } from '../../../deps.ts'
import PaginatedListingList from "../../../domain/use_cases/query/paginated_listings_list.ts";
import ListingRepository from "../../repositories/listing_repository.ts";
import view from './helpers/view.ts'

export async function homeHandler(ctx: Context) {
    const paginatedListingList = new PaginatedListingList(
        new ListingRepository()
    );
    const paginatedListings = await paginatedListingList.fetch();
    console.log(paginatedListings);
    await view(ctx, 'home.eta', { data: { paginatedListings } });
}