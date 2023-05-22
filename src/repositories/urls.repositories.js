import { db } from "../database/database.connection.js";

export async function insertNewShortUrl(userId, shortUrl, url) {
  return await db.query(
    `
      INSERT INTO urls ("userId", url, "shortUrl") 
      VALUES ($1,$2,$3)
      RETURNING id;
    `,
    [userId, url, shortUrl]
  );
}

export async function findUrlById(id) {
  return await db.query(
    `
      SELECT id, "shortUrl", url
      FROM urls
      WHERE id = $1
    `,
    [id]
  );
}

export async function findUrlByShortUrl(shortUrl) {
  return (
    (
      await db.query(
        `
      UPDATE urls
      SET visits = visits + 1
      WHERE "shortUrl" = $1
      RETURNING url
    `,
        [shortUrl]
      )
    )?.rows[0] ?? {}
  );
}

export async function findUrlUserIdById(id) {
  return (
    (
      await db.query(
        `
        SELECT "userId"
        FROM urls
        WHERE id = $1
      `,
        [id]
      )
    )?.rows[0] ?? {}
  );
}
