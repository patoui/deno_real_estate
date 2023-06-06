import { RouteParams, RouterContext, State } from "../../../deps.ts";
import ToggleListingAsFavourite from "../../../domain/use_cases/command/toggle_listing_as_favourite.ts";
import FavouriteRepository from "../../repositories/favourite_repository.ts";
import view from "./helpers/view.ts";

export async function favouriteListingHandler(
  ctx: RouterContext<
    "/listing/:id/favourite",
    { id: string } & RouteParams<string>,
    State
  >,
) {
  const authedUser = ctx.state.user ?? null;
  if (!authedUser) {
      console.log('user not found');
    ctx.response.redirect(`/listing/${ctx.params.id}`);
    return;
  }

  const listingId = Number(ctx.params.id).valueOf();

  const toggleFavouriteListing = new ToggleListingAsFavourite(
    new FavouriteRepository(),
  );

  const favouriteStatus = await toggleFavouriteListing.handle(
      authedUser.id,
      listingId
  );

  if (!favouriteStatus.wasSuccessful()) {
    const errors = { general: [favouriteStatus.getMessage()] };
    ctx.response.status = 302;
    await view(ctx, "listing/show.eta", { errors });
    return;
  }

  ctx.response.redirect(`/listing/${listingId}`);
}
