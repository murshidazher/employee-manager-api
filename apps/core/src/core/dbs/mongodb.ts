import {
  MongoClient,
  ReadConcern,
  ReadPreference,
  WriteConcern,
  type ClientSession,
  type Db,
  type MongoClientOptions,
  type TransactionOptions,
} from "mongodb";
import {
  aggregatePaginated,
  findPaginated,
  type AggregatePaginatedParams,
  type FindPaginatedParams,
} from "mongodb-cursor-pagination/dist";
import { type BaseDocument } from "mongodb-cursor-pagination/dist/types";

import { type MongoConnection } from "src/config/types/mongo-connection";
import { type MongodbCollectionName } from "src/core/constants";
import { logger } from "src/core/logger";
import { type Page } from "src/types/common/page";

const defaultTransactionOptions: TransactionOptions = {
  readConcern: new ReadConcern("snapshot"),
  writeConcern: new WriteConcern("majority"),
  readPreference: new ReadPreference("primary"),
  maxCommitTimeMS: 1000,
};

interface CollectionResponse {
  name: MongodbCollectionName;
  db: Db | null;
}

interface IMongoDB {
  client: MongoClient;
  config: MongoConnection;

  connect: () => Promise<any>;
  close: () => Promise<any>;

  collection: (name: MongodbCollectionName) => CollectionResponse;
  findPaginated: <T extends BaseDocument>(
    name: MongodbCollectionName,
    { first, after, last, before, query, sort, projection }: FindPaginatedParams
  ) => Promise<Page<T>>;
  aggregatePaginated: <T extends BaseDocument>(
    name: MongodbCollectionName,
    { first, after, last, before, pipeline, sort }: AggregatePaginatedParams
  ) => Promise<Page<T>>;
}

const errorMessageMongodbClassDbNull = "[mongodb] MongoDB class _db is null";

class MongoDB implements IMongoDB {
  private _db: Db | null = null as any;

  client: MongoClient;
  config: MongoConnection;

  get db(): Db {
    if (!this._db) {
      logger.error(errorMessageMongodbClassDbNull);
      throw Error(errorMessageMongodbClassDbNull);
    }
    return this._db;
  }

  set db(newInstance: Db | null) {
    this._db = newInstance;
  }

  constructor(config: MongoConnection) {
    this.config = config;
    const options: MongoClientOptions = {
      maxPoolSize: process.env.POOLSIZE ? +process.env.POOLSIZE : 100,
      maxIdleTimeMS: 2500,
      connectTimeoutMS: 10000,
    };

    const mongodbUrl = new URL(this.config.url);
    logger.info(`[mongodb] Mongodb connecting to ${mongodbUrl.host}`);

    this.client = new MongoClient(mongodbUrl.toString(), options);
  }

  connect = async (): Promise<any> => {
    await this.client
      .connect()
      .then(() => {
        logger.info("[mongodb] Mongodb connection is ready.");
        this.db = this.client.db(this.config.db);
      })
      .catch((e) => {
        logger.error(e, "[mongodb:error] Error in connecting to mongo db.");
        throw e;
      });
  };

  close = async (): Promise<any> => {
    await this.client
      .close()
      .then(() => {
        logger.info("[mongodb] Mongodb connection closed.");
        this.db = null;
      })
      .catch((e) => {
        logger.error(
          e,
          "[mongodb:error] Error while closing connection to mongo db."
        );
        throw e;
      });
  };

  collection = (name: MongodbCollectionName): CollectionResponse => ({
    name,
    db: this.db,
  });

  findPaginated = async <T extends BaseDocument>(
    name: MongodbCollectionName,
    {
      first,
      after,
      last,
      before,
      query,
      sort,
      skip,
      projection,
    }: FindPaginatedParams
  ): Promise<Page<T>> =>
    await findPaginated<T>(this.db.collection(name), {
      first,
      after,
      last,
      before,
      skip,
      query,
      sort,
      projection,
    });

  aggregatePaginated = async <T extends BaseDocument>(
    name: MongodbCollectionName,
    {
      first,
      after,
      last,
      before,
      pipeline,
      sort,
      skip,
    }: AggregatePaginatedParams
  ): Promise<Page<T>> =>
    await aggregatePaginated<T>(this.db.collection(name), {
      first,
      after,
      last,
      before,
      skip,
      pipeline,
      sort,
    });

  withTransaction = async <T = unknown>(
    func: (session: ClientSession) => Promise<T>,
    transactionOptions?: TransactionOptions
  ): Promise<T> => {
    const session = this.client.startSession({ defaultTransactionOptions });
    let result: T | undefined;
    try {
      await session.withTransaction(async () => {
        result = await func(session);
        return result;
      }, transactionOptions);
      return result as T;
    } catch (error) {
      logger.error(
        error,
        "An error occurred in the mongodb transaction, performing a data rollback."
      );
      throw error;
    } finally {
      await session.endSession();
    }
  };
}

export default MongoDB;
