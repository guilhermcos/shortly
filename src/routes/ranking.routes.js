import { Router } from "express";
import RankingControllers from "../controllers/ranking.controllers.js";

const rankingControllers = new RankingControllers();

const rankingRouter = Router();

rankingRouter.get("/ranking", rankingControllers.getRanking);

export default rankingRouter;
