import { db } from "../database/database.connection.js";
import { findUsersByRanking } from "../repositories/ranking.repositories.js";

export default class RankingControllers {
  async getRanking(req, res) {
    try {
      const ranking = await findUsersByRanking();
      res.status(200).send(ranking);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
