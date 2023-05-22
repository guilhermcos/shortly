import { hashSync } from "bcrypt";
import { db } from "../database/database.connection.js";

export async function createNewUser(body) {
  const { name, email, password } = body;
  const hashedPassword = hashSync(password, 10);

  return await db.query(
    `
      INSERT INTO users (email, name, password) VALUES ($1, $2, $3);
    `,
    [email, name, hashedPassword]
  );
}

export async function createSession(userId, token) {
  return await db.query(
    `
      INSERT INTO sessions ("userId", token) VALUES ($1, $2)
    `,
    [userId, token]
  );
}

export async function findUserForLogin(email) {
  return await db.query(
    `
      SELECT id AS "userId", password AS "hashedPassword" FROM users WHERE $1 = users.email
    `,
    [email]
  );
}

export async function deleteUrlById(id) {
  return await db.query(
    `
      DELETE FROM urls 
      WHERE id = $1
    `,
    [id]
  );
}
