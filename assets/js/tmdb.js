/* ============================================================
   INTEGRASI TMDB (The Movie Database) API
   ------------------------------------------------------------
   Mengambil data film trending/populer dari TMDB secara otomatis.
   ============================================================ */
(function () {
  document.addEventListener("DOMContentLoaded", async function () {
    const config = window.CPACONFIG || {};
    const apiKey = config.TMDB_API_KEY && config.TMDB_API_KEY.trim();
    const container = document.getElementById("tmdbContainer");
    const fallbackContainer = document.getElementById("fallbackMovies");

    if (!apiKey || !container) {
      return; // Gunakan fallback statis jika API Key kosong
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
      );
      if (!response.ok) throw new Error("TMDB Response Error");

      const data = await response.json();
      const movies = data.results ? data.results.slice(0, 12) : [];

      if (movies.length === 0) return;

      // Sembunyikan fallback statis dan tampilkan container TMDB
      if (fallbackContainer) fallbackContainer.style.display = "none";
      container.style.display = "grid";
      container.innerHTML = "";

      const offerUrl = config.OFFER_URL || "#";
      const offerLabel = config.OFFER_LABEL || "🎬 Klaim Akses Film";

      movies.forEach((m, idx) => {
        const posterUrl = m.poster_path
          ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
          : "";

        const releaseYear = m.release_date
          ? m.release_date.split("-")[0]
          : "2026";
        const rating = m.vote_average ? m.vote_average.toFixed(1) : "8.0";

        const cardHtml = `
          <div class="movie-card">
            <div class="poster" style="${
              posterUrl
                ? `background-image: url('${posterUrl}'); background-size: cover; background-position: center;`
                : ""
            }">
              <span class="rank">#${idx + 1}</span>
              <div class="meta">${m.title} (${releaseYear})</div>
            </div>
            <div class="body">
              <span class="genre">⭐ ${rating} / 10 · ${releaseYear}</span>
              <h3>${m.title}</h3>
              <p>${
                m.overview
                  ? m.overview.slice(0, 110) + "..."
                  : "Film populer minggu ini."
              }</p>
            </div>
          </div>
        `;

        container.insertAdjacentHTML("beforeend", cardHtml);

        // Selipkan CTA Banner setiap 4 film
        if ((idx + 1) % 4 === 0 && idx < movies.length - 1) {
          const ctaHtml = `
            <div class="movie-card" style="grid-column: 1 / -1;">
              <div class="inline-cta" style="margin: 0;">
                <p>Ingin Nonton Film Trending Lainnya Tanpa Batas?</p>
                <a href="${offerUrl}" data-offer class="btn btn-primary">${offerLabel}</a>
              </div>
            </div>
          `;
          container.insertAdjacentHTML("beforeend", ctaHtml);
        }
      });
    } catch (err) {
      console.warn("Gagal memuat TMDB API, menggunakan fallback statis:", err);
    }
  });
})();
