/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "villa",
});

db.connect((err) => {
  if (err) console.error("Gagal connect:", err);
  else console.log("Sukses terhubung ke database XAMPP!");
});

// API Register
app.post("/register", (req, res) => {
  const { full_name, email, password } = req.body;
  const sql = "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [full_name, email, password], (err, result) => {
    if (err) return res.status(500).json({ error: "Gagal daftar" });
    res.json({ message: "Registrasi berhasil!" });
  });
});

// API Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json({ error: "Terjadi kesalahan" });
    if (result.length === 0)
      return res.status(401).json({ message: "Email atau password salah!" });
    res.json({ message: "Login berhasil!", user: result[0] });
  });
});

// API Tambah Review
app.post("/reviews", (req, res) => {
  const { user_id, nama_layanan, rating, ulasan } = req.body;
  const sql =
    "INSERT INTO reviews (user_id, nama_layanan, rating, ulasan) VALUES (?, ?, ?, ?)";

  db.query(sql, [user_id, nama_layanan, rating, ulasan], (err, result) => {
    if (err) return res.status(500).json({ error: "Gagal menyimpan review" });
    res.json({ message: "Review berhasil disimpan!" });
  });
});

// API Ambil Review
app.get("/reviews", (req, res) => {
  const sql =
    "SELECT reviews.*, users.full_name FROM reviews JOIN users ON reviews.user_id = users.id";

  db.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({ error: "Gagal mengambil data review" });
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log("Backend berjalan di port 3000");
});

// API Tambah Transaksi
app.post("/transaksi", (req, res) => {
  const { user_id, layanan_id } = req.body;

  // Ambil harga TERBARU dari layanan_villa dulu
  const cekHarga = "SELECT harga FROM layanan_villa WHERE id = ?";
  db.query(cekHarga, [layanan_id], (err, hasil) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Gagal mengambil harga layanan" });
    }
    if (hasil.length === 0) {
      return res.status(404).json({ error: "Layanan tidak ditemukan" });
    }

    const harga = hasil[0].harga;
    const sql =
      "INSERT INTO transaksi (user_id, layanan_id, harga) VALUES (?, ?, ?)";

    db.query(sql, [user_id, layanan_id, harga], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Gagal menambah transaksi" });
      }
      res.json({
        message: "Transaksi berhasil dibuat!",
        transaksi_id: result.insertId,
        harga_disimpan: harga,
      });
    });
  });
});

// API Ambil Data Transaksi
app.get("/transaksi", (req, res) => {
  const sql = `
    SELECT transaksi.id, users.full_name, layanan_villa.nama_layanan, transaksi.harga, transaksi.tanggal_pesan
    FROM transaksi
    JOIN users ON transaksi.user_id = users.id
    JOIN layanan_villa ON transaksi.layanan_id = layanan_villa.id
  `;
  db.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({ error: "Gagal mengambil data transaksi" });

    const dataFinal = results.map((row) => ({
      ...row,
      harga_format: "Rp" + row.harga.toLocaleString("id-ID"),
    }));

    res.json(dataFinal);
  });
});

// API Ambil Data Paket + Harga + Rata-rata Rating
app.get("/paket", (req, res) => {
  const sql = `
    SELECT 
      l.id, 
      l.nama_layanan, 
      l.harga,
      l.deskripsi,
      ROUND(AVG(r.rating), 1) AS rating_rata,
      COUNT(r.id) AS jumlah_review
    FROM layanan_villa l
    LEFT JOIN reviews r ON l.id = r.layanan_id
    GROUP BY l.id
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Gagal mengambil data paket" });
    }

    const dataFinal = results.map((row) => ({
      ...row,
      harga_format: "Rp" + row.harga.toLocaleString("id-ID"),
      rating_rata: row.rating_rata ? Number(row.rating_rata) : null,
    }));

    res.json(dataFinal);
  });
});
