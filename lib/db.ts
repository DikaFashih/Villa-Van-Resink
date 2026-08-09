import mysql from "mysql2/promise";

const rawPool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
});

// Compatibility layer: kode lama ditulis untuk pool.query() gaya `pg`.
export const pool = {
  query: async <T = any>(text: string, params: any[] = []) => {
    const hasReturningId = /RETURNING\s+id/i.test(text);
    const mysqlText = text
      .replace(/RETURNING\s+id/gi, "")
      .replace(/\$(\d+)/g, "?");

    const [result]: any = await rawPool.query(mysqlText, params);

    if (hasReturningId) {
      // Simulasikan RETURNING id pakai insertId dari MySQL
      return {
        rows: [{ id: result.insertId }] as T[],
        rowCount: result.affectedRows ?? 0,
      };
    }

    return {
      rows: result as T[],
      rowCount: Array.isArray(result) ? result.length : (result?.affectedRows ?? 0),
    };
  },
};
