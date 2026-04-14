/* === CUNEİFORM ALFABESİ MODÜLÜ ===
   Çivi Yazısı öğretici kart sistemi
   Kart çevirme animasyonu + Quiz modu
*/

const cuneiformModul = (() => {

  let aktifKategori   = 'hepsi';
  let aramaMetni      = '';
  let quizModu        = false;
  let quizSoruIndex   = 0;
  let quizSkor        = 0;
  let quizToplam      = 0;
  let quizYaniti      = null;
  let quizCevapVer    = false;

  // ── Cuneiform Ekranını Başlat ────────────────────
  function baslat() {
    filtreButonlariOlustur();
    aramaKurulumu();
    kartlariGoster();
  }

  // ── Kategori Filtreleri ──────────────────────────
  function filtreButonlariOlustur() {
    const kapsayici = document.querySelector('.kategori-filtreleri');
    if (!kapsayici) return;

    kapsayici.innerHTML = CUNEIFORM_KATEGORILER.map(kat => `
      <button
        class="kat-btn ${kat.id === 'hepsi' ? 'aktif' : ''}"
        data-kategori="${kat.id}"
        style="${kat.id === 'hepsi' ? '' : ''}"
        onclick="cuneiformModul.katFiltrele('${kat.id}', this)"
      >
        <span class="kat-ikon">${kat.ikon}</span>
        <span>${kat.isim}</span>
      </button>
    `).join('');

    // Aktif olanı renklendir
    renklendir(kapsayici.querySelector('[data-kategori="hepsi"]'), CUNEIFORM_KATEGORILER[0]);
  }

  function renklendir(btn, kat) {
    if (!btn || !kat) return;
    btn.style.background = `${kat.renk}22`;
    btn.style.borderColor = `${kat.renk}66`;
    btn.style.color = kat.renk;
  }

  function katFiltrele(kategoriId, btn) {
    aktifKategori = kategoriId;

    // Buton stilleri güncelle
    const tumBtnlar = document.querySelectorAll('.kat-btn');
    tumBtnlar.forEach(b => {
      b.classList.remove('aktif');
      b.style.background   = '';
      b.style.borderColor  = '';
      b.style.color        = '';
    });

    if (btn) {
      btn.classList.add('aktif');
      const kat = CUNEIFORM_KATEGORILER.find(k => k.id === kategoriId);
      renklendir(btn, kat);
    }

    kartlariGoster();
  }

  // ── Arama ────────────────────────────────────────
  function aramaKurulumu() {
    const aramaEl = document.getElementById('cuneiform-arama');
    if (!aramaEl) return;

    aramaEl.addEventListener('input', (e) => {
      aramaMetni = e.target.value.toLowerCase().trim();
      kartlariGoster();
    });
  }

  // ── Kartları Filtrele ────────────────────────────
  function filtreliIsaretler() {
    return CUNEIFORM_ISARETLER.filter(isaret => {
      const katUyumu = aktifKategori === 'hepsi' || isaret.kategori === aktifKategori;
      const aramaUyumu = aramaMetni === '' || [
        isaret.transliterasyon,
        isaret.anlam_tr,
        isaret.anlam_en,
        isaret.aciklama,
        isaret.telaffuz
      ].some(alan => alan && alan.toLowerCase().includes(aramaMetni));

      return katUyumu && aramaUyumu;
    });
  }

  // ── Kartları Göster ──────────────────────────────
  function kartlariGoster() {
    const izgara = document.getElementById('isaretler-izgara');
    if (!izgara) return;

    const isaretler = filtreliIsaretler();
    izgara.innerHTML = '';

    if (isaretler.length === 0) {
      izgara.innerHTML = `
        <div class="bos-mesaj">
          <span class="bos-simge">𒀭</span>
          Bu arama kriterlerine uygun işaret bulunamadı.
        </div>`;
      return;
    }

    isaretler.forEach((isaret, index) => {
      const kart = kartOlustur(isaret, index);
      izgara.appendChild(kart);
    });
  }

  // ── Kart HTML Oluştur ────────────────────────────
  function kartOlustur(isaret, index) {
    const kat = CUNEIFORM_KATEGORILER.find(k => k.id === isaret.kategori);
    const kategoriRenk = kat ? kat.renk : '#888';

    const yildizlar = '⭐'.repeat(isaret.zorluk || 1) + '☆'.repeat(3 - (isaret.zorluk || 1));

    const div = document.createElement('div');
    div.className = 'cuneiform-kart-kapsayici';
    div.style.animationDelay = `${index * 0.03}s`;
    div.dataset.id = isaret.id;

    div.innerHTML = `
      <div class="cuneiform-kart">
        <!-- ÖN YÜZ -->
        <div class="kart-on">
          <div class="kart-on-kategori"
            style="background:${kategoriRenk}"></div>
          <div class="kart-cuneiform-simge">${isaret.isaretUnicode}</div>
          <div class="kart-transliterasyon">${isaret.transliterasyon}</div>
          <div class="kart-cevirme-ipucu">↻ Anlamı görmek için tıkla</div>
        </div>
        <!-- ARKA YÜZ -->
        <div class="kart-arka">
          <div class="kart-arka-zorluk">
            ${yildizlar.split('').map((y,i) => `<span class="zorluk-yildiz" style="color:${i < (isaret.zorluk||1) ? '#FFD700' : '#4A3A2A'}">${y}</span>`).join('')}
          </div>
          <div>
            <div class="kart-arka-anlam">${isaret.anlam_tr || isaret.anlam_en || '—'}</div>
            <div class="kart-arka-transliterasyon">/${isaret.telaffuz || isaret.transliterasyon}/</div>
          </div>
          <div class="kart-arka-aciklama">${isaret.aciklama || ''}</div>
          ${isaret.kullanim_ornegi ? `
          <div class="kart-arka-ornek">${isaret.kullanim_ornegi}</div>
          ` : ''}
        </div>
      </div>
    `;

    div.addEventListener('click', () => {
      div.classList.toggle('cevirilmis');
    });

    return div;
  }

  // ══════════════════════════════════════════════════
  // QUİZ MODU
  // ══════════════════════════════════════════════════

  function quizBaslat() {
    const ekran = document.getElementById('quiz-ekrani');
    if (!ekran) return;

    quizModu    = true;
    quizSkor    = 0;
    quizToplam  = 0;
    quizSoruIndex = 0;

    const quizBtn = document.getElementById('quiz-baslat-btn');
    if (quizBtn) quizBtn.classList.add('aktif');
    if (quizBtn) quizBtn.textContent = '🎯 Quiz Aktif';

    ekran.classList.add('aktif');
    ekran.style.display = 'flex';

    quizSoruGoster();
  }

  function quizKapat() {
    const ekran = document.getElementById('quiz-ekrani');
    if (ekran) {
      ekran.classList.remove('aktif');
      ekran.style.display = 'none';
    }

    quizModu = false;
    const quizBtn = document.getElementById('quiz-baslat-btn');
    if (quizBtn) {
      quizBtn.classList.remove('aktif');
      quizBtn.textContent = '🎯 Quiz Modu';
    }
  }

  function quizSoruGoster() {
    const ekran = document.getElementById('quiz-ekrani');
    if (!ekran) return;

    const isaretler = CUNEIFORM_ISARETLER;
    if (isaretler.length < 4) return;

    // Rastgele soru seç
    const soruIsaret = isaretler[Math.floor(Math.random() * isaretler.length)];

    // 3 yanlış seçenek
    let yanlislar = [];
    while (yanlislar.length < 3) {
      const rastgele = isaretler[Math.floor(Math.random() * isaretler.length)];
      if (rastgele.id !== soruIsaret.id && !yanlislar.find(y => y.id === rastgele.id)) {
        yanlislar.push(rastgele);
      }
    }

    // Seçenekleri karıştır
    const secenekler = karıstir([
      { ...soruIsaret, dogru: true },
      ...yanlislar.map(y => ({ ...y, dogru: false }))
    ]);

    quizCevapVer = false;
    ekran.innerHTML = `
      <div class="quiz-kart">
        <div class="quiz-skor">
          Skor: ${quizSkor} / ${quizToplam}
          <span style="margin-left:1rem;opacity:0.5">Soru ${quizToplam + 1}</span>
        </div>
        <div class="quiz-soru-metin">Bu Sümer çivi yazısı işareti ne anlama gelir?</div>
        <div class="quiz-soru-simge">${soruIsaret.isaretUnicode}</div>
        <div style="font-family:'Cinzel',serif;font-size:0.8rem;color:#9B8860;margin-bottom:1rem">
          /${soruIsaret.telaffuz || soruIsaret.transliterasyon}/
        </div>
        <div class="quiz-secenekler">
          ${secenekler.map((s, i) => `
            <button
              class="quiz-secenek"
              data-dogru="${s.dogru}"
              onclick="cuneiformModul._quizCevap(this, ${s.dogru})"
            >
              ${s.anlam_tr || s.anlam_en || '—'}
            </button>
          `).join('')}
        </div>
        <div class="quiz-kontrol">
          <button class="quiz-devam" onclick="cuneiformModul._quizDevam()" style="opacity:0.4;pointer-events:none" id="quiz-devam-btn">
            Sonraki Soru →
          </button>
          <button class="quiz-kapat" onclick="cuneiformModul.quizKapat()">
            ✕ Çıkış
          </button>
        </div>
      </div>
    `;
  }

  function _quizCevap(btn, dogru) {
    if (quizCevapVer) return;
    quizCevapVer = true;
    quizToplam++;

    if (dogru) {
      quizSkor++;
      btn.classList.add('dogru');
    } else {
      btn.classList.add('yanlis');
      // Doğru olanı göster
      document.querySelectorAll('.quiz-secenek').forEach(b => {
        if (b.dataset.dogru === 'true') b.classList.add('dogru');
      });
    }

    // Devam butonunu aktifleştir
    const devamBtn = document.getElementById('quiz-devam-btn');
    if (devamBtn) {
      devamBtn.style.opacity = '1';
      devamBtn.style.pointerEvents = 'all';
    }
  }

  function _quizDevam() {
    quizSoruGoster();
  }

  function karıstir(dizi) {
    const kopyala = [...dizi];
    for (let i = kopyala.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [kopyala[i], kopyala[j]] = [kopyala[j], kopyala[i]];
    }
    return kopyala;
  }

  // Public API
  return {
    baslat,
    katFiltrele,
    quizBaslat,
    quizKapat,
    _quizCevap,
    _quizDevam
  };

})();
