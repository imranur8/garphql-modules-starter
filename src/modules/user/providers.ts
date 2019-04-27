import { Injectable } from "@graphql-modules/di";
import User, { UserType } from "../../models/user";
import logger from "../../utils/logger";

@Injectable()
export class UserProvider {
  public async allUsers(): Promise<[UserType]> {
    try {
      const users: [UserType] = await User.find();
      return users;
    } catch (error) {
      logger.error(error.message);
      throw error.message;
    }
  }
  public async getUser(id: string): Promise<UserType> {
    try {
      const user: UserType = await User.findById(id);
      return user;
    } catch (error) {
      logger.error(error.message);
      throw error.message;
    }
  }
  public async createUser({input}): Promise<UserType> {
    try {
      const user = new User(input);
      return  await user.save();
    } catch (error) {
      logger.error(error.message);
      throw error.message;
    }
  }
  public async loginUser({input}): Promise<UserType> {
    try {
      const { email, password } = input;
      logger.info(email);
      const user: UserType = await User.findOne({ email });
      if (!user) {
        const message = {
          message: "User not found",
          name: "UserNotFound"
        };
        throw message;
      } else {
        const authenticatedUser = user.authenticateUser(password);
        if (authenticatedUser) {
          return user.toJSON();
        } else {
          const message = {
            message: "Unauthorized access",
            name: "Unauthorized"
          };
          throw message;
        }
      }

    } catch (error) {
      logger.error(error.toString());
      throw error.message;
    }
  }
}
