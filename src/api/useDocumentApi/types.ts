export interface IMongoDocument {
  _id: string;
}

export const getDocumentId = (doc: IMongoDocument) => doc._id;
