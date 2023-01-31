export const OfferDefault = {
  CommentsCount: 0,
  ListCount: 60,
  Rating: 1,
} as const;

export const TitleLength = {
  Min: 10,
  Max: 100,
} as const;

export const DescriptionLength = {
  Min: 20,
  Max: 1024,
} as const;

export const RoomsRange = {
  Min: 1,
  Max: 8,
} as const;

export const GuestsRange = {
  Min: 1,
  Max: 10,
} as const;

export const PriceRange = {
  Min: 100,
  Max: 100000,
} as const;
