# CineVault — Situs CPA Niche Movie (Target Mancanegara)

Situs hiburan berbahasa Indonesia berisi **quiz trivia film** dan **rekomendasi movie**, dirancang sebagai *bridge page* untuk mengarahkan traffic ke tawaran CPA/afiliasi.

## Struktur Proyek

```
├── index.html         # Landing: hero, cara kerja, fitur, CTA band, FAQ
├── quiz.html          # Quiz 10 soal + GATE hasil → tombol offer CPA
├── movies.html        # Artikel rekomendasi 12 film + CTA inline
├── about.html         # Tentang (wajib untuk review jaringan CPA)
├── disclaimer.html    # Afiliasi disclosure (wajib)
├── privacy.html       # Kebijakan privasi (wajib)
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/style.css  # Tema sinema gelap, responsif, ringan
    └── js/
        ├── config.js  # ★ GANTI OFFER_URL & TMDB_API_KEY DI SINI
        ├── tmdb.js    # Fetch data film otomatis dari TMDB API
        └── quiz.js    # Mesin quiz (acak opsi, skor, gate)
```

## Cara Pakai (3 Langkah)

1. **Pasang link CPA & API TMDB** — buka `assets/js/config.js`:
   - Ganti `OFFER_URL` dengan link penawaran CPA Anda.
   - *(Opsional)* Isi `TMDB_API_KEY` (dapatkan gratis di [themoviedb.org](https://www.themoviedb.org/settings/api)) agar rekomendasi film di `movies.html` selalu diperbarui otomatis dengan film trending/populer terbaru! Jika dikosongkan, web tetap menampilkan 12 film rekomendasi statis.
2. **Jalankan lokal (opsional)** — `python3 -m http.server 8000` lalu buka `http://localhost:8000`.
3. **Hosting gratis** — push ke GitHub → aktifkan GitHub Pages (Settings → Pages → Source: GitHub Actions) seperti proyek sebelumnya. Ganti domain `cinevault.example` di `sitemap.xml` & `robots.txt` dengan URL Pages Anda.

## Strategi Traffic Mancanegara (tanpa spam)

| Kanal | Taktik |
|-------|--------|
| **SEO** | Judul clickbait wajar + kata kunci "quiz film", "rekomendasi film terbaik", "movie quiz". Struktur H2/H1 sudah rapi, meta description unik per halaman. |
| **TikTok** | Reels soal trivia ("Kamu tahu sutradaranya?"), hook 1 detik, CTA "cek link bio". Bio → halaman quiz. |
| **Pinterest** | Pin vertikal 1000×1500 untuk tiap film di `movies.html`, deskripsi 200+ kata berisi keyword. |
| **Reddit/Quora** | Jawab pertanyaan "movie recommendation" dengan nilai dulu, tautkan situs hanya sebagai tambahan. |

## Catatan Kepatuhan

- Konten **hanya trivia & rekomendasi** — tidak ada streaming/pirasi film.
- Tombol CTA memakai `rel="nofollow sponsored"` + halaman Disclaimer & Privacy sudah tersedia.
- Tombol menampilkan label jujur sesuai isi (unlock hasil quiz).
