import { Context } from "../../../deps.ts";
import { NewListing } from "../../../domain/listing.ts";
import CreateListing from "../../../domain/use_cases/create_listing.ts";
import ListingRepository from "../../repositories/listing_repository.ts";
import IsFloat from "../../services/rules/is_float.ts";
import IsInteger from "../../services/rules/is_integer.ts";
import Required from "../../services/rules/required.ts";
import Validator from "../../services/validator.ts";
import view from "./helpers/view.ts";

export async function showCreateListingHandler(ctx: Context) {
  // TODO: add check for authenticated user
  await view(ctx, "listing/create.eta");
}

export const createListingHandler = async (ctx: Context) => {
  // TODO: add check for authenticated user
  const body = await ctx.request.body({ type: "form" }).value;

  const data = {
    mls_number: body.get("mls_number"),
    price: body.get("price"),
    name: body.get("name"),
    description: body.get("description"),
    address: body.get("address"),
    address_2: body.get("address_2"),
    postal_code: body.get("postal_code"),
    city: body.get("city"),
    province: body.get("province"),
    country: body.get("country"),
    bedrooms: body.get("bedrooms"),
    bathrooms: body.get("bathrooms"),
    property_type: body.get("property_type"),
    house_type: body.get("house_type"),
    stories: body.get("stories"),
    title: body.get("title"),
    build_year: body.get("build_year"),
    parking_type: body.get("parking_type"),
  };
  let errors: { [key: string]: string[] } = {};

  // TODO: add better validation
  const validator = new Validator(
    {
      mls_number: [new Required(), new IsInteger()],
      price: [new Required(), new IsFloat()],
      name: [new Required()],
      description: [new Required()],
      address: [new Required()],
      address_2: [new Required()],
      postal_code: [new Required()],
      city: [new Required()],
      province: [new Required()],
      country: [new Required()],
      bedrooms: [new Required(), new IsInteger()],
      bathrooms: [new Required(), new IsInteger()],
      property_type: [new Required()],
      house_type: [new Required()],
      stories: [new Required(), new IsInteger()],
      title: [new Required()],
      build_year: [new Required(), new IsInteger()],
      parking_type: [new Required()],
    },
    data,
  );

  if (!validator.validate()) {
    // Show errors on form
    errors = validator.getErrors();
    ctx.response.status = 302;
    await view(ctx, "listing/create.eta", { errors });
    return;
  }

  const createListingCase = new CreateListing(new ListingRepository());
  const createListingStatus = await createListingCase.handle(
    new NewListing(
      ctx.state.user.id,
      parseInt(data.mls_number ?? "", 10),
      parseFloat(data.price ?? ""),
      data.name ?? "",
      data.description ?? "",
      data.address ?? "",
      data.address_2 ?? "",
      data.postal_code ?? "",
      data.city ?? "",
      data.province ?? "",
      data.country ?? "",
      parseInt(data.bedrooms ?? "", 10),
      parseInt(data.bathrooms ?? "", 10),
      data.property_type ?? "",
      data.house_type ?? "",
      parseInt(data.stories ?? "", 10),
      data.title ?? "",
      parseInt(data.build_year ?? "", 10),
      data.parking_type ?? "",
    ),
  );

  if (!createListingStatus.wasSuccessful()) {
    errors.general = [createListingStatus.getMessage()];
    ctx.response.status = 302;
    await view(ctx, "listing/create.eta", { errors });
    return;
  }

  ctx.response.redirect("/");
};
