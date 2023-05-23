import { db } from "../database/database.connection.js";

export async function findUsersByRanking() {
  return (
    (
      await db.query(`
    SELECT
        users.id AS "id",
        users.name AS "name",
        CAST(COUNT(urls) AS INTEGER) AS "linksCount",
        CAST(COALESCE(SUM(urls.visits), 0) AS INTEGER) AS "visitCount"
    FROM users LEFT JOIN urls ON users."id" = urls."userId"
    GROUP BY users.id
    ORDER BY SUM(urls.visits) DESC
    LIMIT 10
    `)
    )?.rows ?? []
  );
}
