export function validateSchemaBody(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch ({ message }) {
      return res.status(422).send(message);
    }
  };
}

export function validateSchemaParams(schema) {
  return (req, res, next) => {};
}

export function validateSchemaQuery(schema) {
  return (req, res, next) => {};
}
