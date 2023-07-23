import { Factory, type GeneratorFn } from "fishery";
import { type ObjectId } from "mongodb";

import { type MongodbCollectionName } from "core/constants";
import dbs from "core/dbs";

class BaseModel<T> {
  generator: GeneratorFn<T, any, any>;
  attrs: Partial<T> | undefined;
  id: ObjectId | undefined;
  collection: MongodbCollectionName;

  constructor(
    collection: MongodbCollectionName,
    generator: GeneratorFn<T, any, any>
  ) {
    this.generator = generator;
    this.collection = collection;
  }

  save = async (): Promise<ObjectId> => {
    this.attrs = Factory.define<T>(this.generator).build();

    const { insertedId } = await dbs.mongo.db
      .collection(this.collection)
      .insertOne(this.attrs);
    this.id = insertedId;
    return insertedId;
  };

  upsert = async (
    query: Record<string, any>
  ): Promise<ObjectId | undefined> => {
    this.attrs = Factory.define<T>(this.generator).build();

    const { value: doc } = await dbs.mongo.db
      .collection(this.collection)
      .findOneAndUpdate(
        query,
        { $setOnInsert: this.attrs },
        {
          upsert: true,
          returnDocument: "after",
        }
      );

    this.id = doc?._id;
    return doc?._id;
  };

  update = async (updates: Record<string, any>): Promise<void> => {
    await dbs.mongo.db.collection(this.collection).updateOne(
      {
        _id: this.id,
      },
      updates
    );
  };

  destroy = async (): Promise<void> => {
    await dbs.mongo.db.collection(this.collection).deleteOne({
      _id: this.id,
    });
  };

  get = (attr: keyof T): any => {
    if (!this.attrs) return undefined;

    return this.attrs[attr];
  };
}

export { BaseModel };
