export const JWT_ALGORITHM = 'HS256';
export const USER_FILES_UPLOAD_FIELDS = [
  { name: 'avatar', maxCount: 1 },
];

export const UserDefault = {
  AvatarFileName: 'default-avatar.jpg',
} as const;

export const NameLength = {
  Min: 1,
  Max: 15,
} as const;

export const PasswordLength = {
  Min: 6,
  Max: 12,
} as const;

export const UserApiError = {
  NameIsInvalid: `User name must be min ${NameLength.Min}, max ${NameLength.Max} chars length`,
  EmailIsInvalid: 'Please provide valid email address',
  AvatarIsWrongFormat: 'Preview image file type must be *.png/jpg/jpeg file',
  PasswordIsInvalid: `User name must be min ${PasswordLength.Min}, max ${PasswordLength.Max} chars length`,
} as const;
