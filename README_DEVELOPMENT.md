# Villa Van Resink
## Development Progress (Review System Migration)

Last Update:
2026-08-07

---

# Yang Sudah Selesai

## Database

- Migrasi review dari localStorage ke MySQL dimulai.
- Menggunakan tabel:
  - users
  - booking
  - layanan_villa
  - review

Review memiliki relasi:

review
? booking_id
? user_id
? layanan_id

Status review:

- pending
- approved
- rejected

---

## Booking

Selesai:

- GET /api/booking
- POST /api/booking
- PATCH /api/booking/[id]
- DELETE /api/booking/[id]

Admin dapat:

- melihat booking
- mengubah status
- menghapus booking

User dapat:

- membuat booking
- melihat booking sendiri

---

## Library

lib/booking.ts

Sudah menggunakan MySQL.

lib/reviews.ts

Sudah dimigrasikan ke API MySQL.

---

## Dashboard

Booking Dashboard sudah menggunakan API MySQL.

Review Dashboard sedang dimigrasikan.

---

# Sedang Dikerjakan

Migrasi komponen review.

Masih terdapat campuran API lama dan API baru.

---

# Belum Selesai

- ReviewModal
- ReviewsPanel
- ReviewBox
- Packages
- Edukasi
- Wahana
- UserReviewTab
- AdminReviewsTab

Masih perlu disesuaikan dengan layananId.

---

# Database

layanan_villa saat ini

1 Camping Keluarga

2 Outbound

3 Study Tour

Frontend masih menggunakan slug lama sehingga perlu sinkronisasi.

---

# Target

Booking

?

Review Pending

?

Approve Admin

?

Review tampil otomatis

Semua data berasal dari MySQL.

---

Status:

WORK IN PROGRESS
