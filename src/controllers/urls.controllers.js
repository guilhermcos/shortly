import { nanoid } from "nanoid";
import { db } from "../database/database.connection.js";
import {
  findUrlById,
  findUrlByShortUrl,
  insertNewShortUrl,
} from "../repositories/urls.repositories.js";
import { deleteUrlById } from "../repositories/users.repositories.js";

export default class UrlsControllers {
  async createShortUrl(req, res) {
    const { url } = req.body;
    const { userId } = res.locals;
    try {
      const shortUrl = nanoid(8);
      const { id: shortUrlId } = (await insertNewShortUrl(userId, shortUrl, url)).rows[0];
      res.status(201).send({
        id: shortUrlId,
        shortUrl: shortUrl,
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async getUrlById(req, res) {
    const id = Number(req.params.id);
    try {
      const urlInfo = await findUrlById(id);
      if (urlInfo.rows.length === 0) {
        return res.status(404).send("url not found");
      }
      res.status(200).send(urlInfo.rows[0]);
    } catch (err) {
      res.sendStatus(500);
    }
  }

  async accessUrl(req, res) {
    const { shortUrl } = req.params;
    try {
      const { url } = await findUrlByShortUrl(shortUrl);
      if (!url) return res.sendStatus(404);
      return res.redirect(url);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async deleteUrl(req, res) {
    const id = Number(req.params.id);
    try {
      await deleteUrlById(id);
      res.sendStatus(204);
    } catch (err) {
      res.status(500).send("Internal server error");
    }
  }
}
