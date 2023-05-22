import { Router } from "express";
import UrlsControllers from "../controllers/urls.controllers.js";
import UrlsValidations from "../middlewares/urls.validations.js";
import tokenValidation from "../middlewares/token.validation.js";
import { validateSchemaBody, validateSchemaParams } from "../middlewares/schema.validations.js";
import urlsSchemas from "../schemas/urls.schemas.js";

const urlsControllers = new UrlsControllers();
const urlsValidations = new UrlsValidations();

const urlsRouter = Router();

urlsRouter.post(
  "/urls/shorten",
  validateSchemaBody(urlsSchemas.insertNewUrlSchema),
  tokenValidation,
  urlsControllers.createShortUrl
);
urlsRouter.get(
  "/urls/:id",
  validateSchemaParams(urlsSchemas.getUrlByIdSchemaParams),
  urlsControllers.getUrlById
);
urlsRouter.get("/urls/open/:shortUrl", urlsControllers.accessUrl);
urlsRouter.delete(
  "/urls/:id",
  tokenValidation,
  urlsValidations.validateDeleteUrl,
  urlsControllers.deleteUrl
);

export default urlsRouter;
