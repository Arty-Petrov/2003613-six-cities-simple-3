export const CommentDefault = {
  ListCount: 50,
} as const;

export const TextLength = {
  Min: 5,
  Max: 1024,
} as const;

export const RatingRange = {
  Min: 1,
  Max: 5,
} as const;

export const CommentApiError = {
  TextIsInvalid: `Comment text must be min ${TextLength.Min}, max ${TextLength.Max} chars length`,
  RatingIsNotInteger: 'Rating must be an integer',
  RatingIsInvalid: `Rating value must be min ${RatingRange.Min}, max ${RatingRange.Max}`,
  OfferIdIsInvalid: 'Offer id is must be a MongoDB id',
} as const;
