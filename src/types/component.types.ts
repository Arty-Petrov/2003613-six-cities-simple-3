export const Component = {
  Application: Symbol.for('Application'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  DatabaseInterface: Symbol.for('DatabaseInterface'),
  ExceptionFilterInterface: Symbol.for('ExceptionFilterInterface'),

  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  UserController: Symbol.for('UserController'),

  OfferServiceInterface: Symbol.for('OfferServiceInterface'),
  OfferModel: Symbol.for('OfferModel'),
  OfferController: Symbol.for('OfferController'),

  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  CommentModel: Symbol.for('CommentModel'),
  CommentController: Symbol.for('CommentController'),
} as const;
