/* ============================================================
   Mesin Quiz CineVault
   - 10 soal trivia film
   - skor dihitung real-time
   - hasil DIPERKUAT dengan tombol unlock yang mengarah ke OFFER_URL
   ============================================================ */
(function () {
  const QUESTIONS = [
    { q: "Siapa sutradara film Jurassic Park (1993)?",
      opts: ["Steven Spielberg", "James Cameron", "Ridley Scott", "Christopher Nolan"],
      a: 0 },
    { q: "Film apa yang memenangkan Oscar Best Picture pertama (1929)?",
      opts: ["Wings", "Sunrise", "The Jazz Singer", "Metropolis"],
      a: 0 },
    { q: "Di film The Matrix, warna pil apa yang dipilih Neo?",
      opts: ["Merah", "Biru", "Hijau", "Hitam"],
      a: 0 },
    { q: "Aktor yang memerankan Iron Man / Tony Stark adalah…",
      opts: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth"],
      a: 0 },
    { q: "Studio animasi mana yang membuat film Spirited Away?",
      opts: ["Studio Ghibli", "Pixar", "DreamWorks", "Illumination"],
      a: 0 },
    { q: "Film dengan box office tertinggi sepanjang masa adalah…",
      opts: ["Avatar", "Avengers: Endgame", "Titanic", "Star Wars: The Force Awakens"],
      a: 0 },
    { q: "Siapa yang memerankan Jack Dawson di Titanic?",
      opts: ["Leonardo DiCaprio", "Brad Pitt", "Matt Damon", "Johnny Depp"],
      a: 0 },
    { q: "Film Inception (2010) disutradarai oleh…",
      opts: ["Christopher Nolan", "Denis Villeneuve", "Ridley Scott", "Zack Snyder"],
      a: 0 },
    { q: "Apa nama pulau fiksi di film Parasite tidak berlokasi di… (karakter utama tinggal di)",
      opts: ["Seoul, Korea Selatan", "Tokyo, Jepang", "Busan", "Incheon"],
      a: 0 },
    { q: "Quote ikonik \"I'll be back\" berasal dari film…",
      opts: ["The Terminator", "Predator", "RoboCop", "Blade Runner"],
      a: 0 }
  ];

  // Acak urutan opsi agar jawaban tidak selalu di posisi pertama
  QUESTIONS.forEach(q => {
    const correct = q.opts[q.a];
    for (let i = q.opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [q.opts[i], q.opts[j]] = [q.opts[j], q.opts[i]];
    }
    q.a = q.opts.indexOf(correct);
  });

  const offerUrl = (window.CPACONFIG && window.CPACONFIG.OFFER_URL) || "#";
  const offerLabel = (window.CPACONFIG && window.CPACONFIG.OFFER_LABEL) || "Unlock My Result";

  let idx = 0, score = 0, locked = false;
  const total = QUESTIONS.length;

  const $ = s => document.querySelector(s);
  const startEl = $("#startScreen"),
        quizEl  = $("#quizScreen"),
        resultEl= $("#resultScreen");

  function show(el){ el.classList.remove("hidden"); }
  function hide(el){ el.classList.add("hidden"); }

  function startQuiz(){
    idx = 0; score = 0;
    hide(startEl); hide(resultEl); show(quizEl);
    renderQ();
  }

  function renderQ(){
    const q = QUESTIONS[idx];
    $("#qCount").textContent = `Question ${idx + 1} / ${total}`;
    $("#qText").textContent = q.q;
    $("#bar").style.width = (idx / total * 100) + "%";
    const box = $("#opts"); box.innerHTML = "";
    q.opts.forEach((opt, i) => {
      const b = document.createElement("button");
      b.className = "opt"; b.type = "button"; b.textContent = opt;
      b.onclick = () => answer(i, q, box);
      box.appendChild(b);
    });
  }

  function answer(i, q, box){
    const btns = box.querySelectorAll(".opt");
    btns.forEach(b => b.disabled = true);
    if (i === q.a){
      score++;
      btns[i].classList.add("correct");
    } else {
      btns[i].classList.add("wrong");
      btns[q.a].classList.add("correct");
    }
    setTimeout(() => {
      idx++;
      if (idx < total) renderQ();
      else finish();
    }, 850);
  }

  function finish(){
    $("#bar").style.width = "100%";
    hide(quizEl);
    const pct = Math.round(score / total * 100);
    let rank = "Couch Potato";
    if (pct >= 90) rank = "Cinephile Legend";
    else if (pct >= 70) rank = "Serious Movie Buff";
    else if (pct >= 50) rank = "Casual Watcher";

    $("#finalScore").textContent = `${score}/${total}`;
    $("#finalRank").textContent = rank;
    $("#unlockBtn").textContent = offerLabel;
    $("#unlockBtn").setAttribute("href", offerUrl);
    show(resultEl);
    resultEl.scrollIntoView({ behavior:"smooth", block:"center" });
  }

  // wiring
  document.addEventListener("DOMContentLoaded", () => {
    const start = $("#startBtn");
    if (start) start.addEventListener("click", startQuiz);

    // rekonsiliasi semua tombol offer statis di halaman lain
    document.querySelectorAll("[data-offer]").forEach(el => {
      el.setAttribute("href", offerUrl);
      if (el.hasAttribute("data-offer-label")) el.textContent = offerLabel;
    });
  });
})();