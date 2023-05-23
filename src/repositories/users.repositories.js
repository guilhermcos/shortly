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

export async function findUserInfo(userId) {
  return (
    (
      await db.query(
        `
        SELECT users.id AS "userID",
        users.name AS "userName",
        CAST(COALESCE(SUM(urls.visits), 0) AS INTEGER) AS "totalVisits",
        CASE
        WHEN COUNT(urls) = 0 THEN ARRAY[]::JSON[]
        ELSE  ARRAY_AGG(
                JSON_BUILD_OBJECT(
                    'id', urls."id",
                    'shortUrl', urls."shortUrl",
                    'url', urls."url",
                    'visits', urls."visits"
                )
              )
        END AS "shortenedUrls"
        FROM users LEFT JOIN urls ON urls."userId" = users.id
        WHERE users.id = $1
        GROUP BY users.id;
        `,
        [userId]
      )
    )?.rows[0] ?? {}
  );
}
