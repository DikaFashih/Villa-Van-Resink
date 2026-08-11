import { Pool, types } from "pg";

// Kolom tipe DATE dikembalikan sebagai string "YYYY-MM-DD" apa adanya,
// biar nggak kena geser timezone waktu diubah jadi objek Date.
types.setTypeParser(1082, (value) => value);

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
