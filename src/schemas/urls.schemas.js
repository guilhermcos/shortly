import Joi from "joi";

const urlsSchemas = {
  insertNewUrlSchema: Joi.object({
    url: Joi.string().uri().min(1).required(),
  }).unknown(true),

  getUrlByIdSchemaParams: Joi.object({
    id: Joi.string()
      .min(1)
      .pattern(/^[0-9]+$/)
      .required(),
  }).unknown(true),
};

export default urlsSchemas;
