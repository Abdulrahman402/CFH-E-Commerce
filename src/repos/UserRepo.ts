import { IUser, User } from "../models/user";
import logger from "../logger";

class UserRepo {
  async addUser(args: IUser) {
    try {
      const user = await new User(args).save();

      return user;
    } catch (e) {
      logger.error(`Failed to add user to database ${e}`);
    }
  }

  async userByEmail(email: string) {
    try {
      const user = await User.findOne({ email });

      return user;
    } catch (e) {
      logger.error(`Failed to get user by email ${e}`);
    }
  }
}

export default new UserRepo();
