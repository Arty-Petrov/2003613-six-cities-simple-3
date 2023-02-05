export interface DocumentExistsInterface {
  exists(documentId: string): Promise<boolean>;
  checkOwnership(userId: string, documentId: string): Promise<boolean>
}
