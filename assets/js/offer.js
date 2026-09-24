/* ============================================================
   SISTEM ROTASI LINK CPA
   ------------------------------------------------------------
   Mengambil link CPA secara acak dari daftar CPACONFIG.OFFER_URLS
   ============================================================ */
window.getRandomOfferUrl = function() {
  const config = window.CPACONFIG || {};
  const urls = config.OFFER_URLS || [];
  
  if (urls.length === 0) {
    return config.OFFER_URL || "https://www.profitableratecpmnetwork.com/ht98m4ep2?key=ffd6bb9468bce38683baeaf72ffacea4";
  }
  
  // Pilih acak dari daftar link CPA
  const randomIndex = Math.floor(Math.random() * urls.length);
  return urls[randomIndex];
};

document.addEventListener("DOMContentLoaded", function() {
  // Pasang listener klik di semua tombol yang punya attribute data-offer
  document.querySelectorAll("[data-offer]").forEach(function(el) {
    el.addEventListener("click", function(e) {
      // Jika link href adalah '#' atau javascript:void(0), cegah default dan buka link acak
      const randomUrl = window.getRandomOfferUrl();
      if (el.tagName === 'A') {
        el.href = randomUrl;
      } else {
        window.open(randomUrl, '_blank', 'noopener,noreferrer');
      }
    });
  });
});
