export interface ListingRepositoryInterface {
    doesListingExists(
        address: string,
        postal_code: string,
        city: string,
        province: string,
        country: string,
        address_2: string|null
    ): Promise<boolean>;
    createListing(newListing: NewListing): Promise<boolean>;
}

export class Listing {
  id: number;
  user_id: number;
  mls_number: number;
  price: number;
  name: string;
  description: string;
  address: string;
  address_2: string;
  postal_code: string;
  city: string;
  province: string;
  country: string;
  bedrooms: number;
  bathrooms: number;
  property_type: string;
  house_type: string;
  stories: number;
  title: string;
  build_year: number;
  parking_type: string;
  created_at: string;
  updated_at: string;

  constructor(
    id: number,
    user_id: number,
    mls_number: number,
    price: number,
    name: string,
    description: string,
    address: string,
    address_2: string,
    postal_code: string,
    city: string,
    province: string,
    country: string,
    bedrooms: number,
    bathrooms: number,
    property_type: string,
    house_type: string,
    stories: number,
    title: string,
    build_year: number,
    parking_type: string,
    createdAt: string,
    updatedAt: string,
  ) {
    this.id = id;
    this.user_id = user_id;
    this.mls_number = mls_number;
    this.price = price;
    this.name = name;
    this.description = description;
    this.address = address;
    this.address_2 = address_2;
    this.postal_code = postal_code;
    this.city = city;
    this.province = province;
    this.country = country;
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.property_type = property_type;
    this.house_type = house_type;
    this.stories = stories;
    this.title = title;
    this.build_year = build_year;
    this.parking_type = parking_type;
    this.created_at = createdAt;
    this.updated_at = updatedAt;
  }
}

export class NewListing {
  user_id: number;
  mls_number: number;
  price: number;
  name: string;
  description: string;
  address: string;
  address_2: string;
  postal_code: string;
  city: string;
  province: string;
  country: string;
  bedrooms: number;
  bathrooms: number;
  property_type: string;
  house_type: string;
  stories: number;
  title: string;
  build_year: number;
  parking_type: string;

  constructor(
    user_id: number,
    mls_number: number,
    price: number,
    name: string,
    description: string,
    address: string,
    address_2: string,
    postal_code: string,
    city: string,
    province: string,
    country: string,
    bedrooms: number,
    bathrooms: number,
    property_type: string,
    house_type: string,
    stories: number,
    title: string,
    build_year: number,
    parking_type: string,
  ) {
    this.user_id = user_id;
    this.mls_number = mls_number;
    this.price = price;
    this.name = name;
    this.description = description;
    this.address = address;
    this.address_2 = address_2;
    this.postal_code = postal_code;
    this.city = city;
    this.province = province;
    this.country = country;
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.property_type = property_type;
    this.house_type = house_type;
    this.stories = stories;
    this.title = title;
    this.build_year = build_year;
    this.parking_type = parking_type;
  }
}
