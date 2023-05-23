import { db } from "../database/database.connection.js";
import { findUserInfo } from "../repositories/users.repositories.js";

export default class UsersControllers {
  async getUserSelfInfo(req, res) {
    const { userId } = res.locals;
    try {
      const userSelfInfo = await findUserInfo(userId);

      res.status(200).send(userSelfInfo);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
