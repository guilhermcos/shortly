import { db } from "../database/database.connection.js";
import { findUrlUserIdById } from "../repositories/urls.repositories.js";

export default class UrlsValidations {
  async validateDeleteUrl(req, res, next) {
    const { userId } = res.locals;
    const id = Number(req.params.id);
    try {
      const { userId: urlUserId } = await findUrlUserIdById(id);
      if (!urlUserId) return res.sendStatus(404);
      if (urlUserId !== userId) return res.sendStatus(401);
      next();
    } catch (err) {
      res.sendStatus(500);
    }
  }
}
