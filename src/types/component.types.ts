export const Component = {
  Application: Symbol.for('Application'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  DatabaseInterface: Symbol.for('DatabaseInterface'),
  ExceptionFilterInterface: Symbol.for('ExceptionFilterInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  OfferServiceInterface: Symbol.for('OfferServiceInterface'),
  OfferModel: Symbol.for('OfferModel'),
  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  CommentModel: Symbol.for('CommentModel'),
} as const;
