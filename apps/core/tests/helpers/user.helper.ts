import { type ObjectId } from "mongodb";

import { type RawUser } from "src/objects/user/types";

import factories from "../factory/mongo/factories";
import { type BaseModel } from "../factory/mongo/utils/model";

class User {
  private readonly user: BaseModel<Partial<RawUser>>;

  constructor(user: BaseModel<Partial<RawUser>>) {
    this.user = user;
  }

  static initialize = async (attrs?: Partial<RawUser>): Promise<User> => {
    const user = factories.user.build(attrs);
    await user.save();
    return new User(user);
  };

  getId = (): ObjectId | undefined => this.user.id;

  getPubId = (): string | undefined => this.user.attrs?.pubId?.toString();

  getName = (): string =>
    `${this.user.attrs?.firstName} ${this.user.attrs?.lastName}`;

  getUser = (): Partial<RawUser> | undefined => this.user.attrs;

  update = async (updates: Partial<RawUser>): Promise<Partial<RawUser>> => {
    await this.user.update({ $set: updates });
    return {
      ...this.user.attrs,
      ...updates,
    };
  };

  destroy = async (): Promise<void> => {
    await this.user.destroy();
  };
}

export default User;
