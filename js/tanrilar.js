/* v=20260414_233732 */
/* === SÜMER TANRILAR MODÜLÜ v2 ===
   Kart tabanlı galeri + mini SVG soy ağacı
   Anlaşılır, etkileşimli arayüz
*/

const tanrilarModul = (() => {

  // ── Sabitler ────────────────────────────────────
  const KATEGORI = {
    Creator: { renk: '#E91E63', simge: '🌌', tr: 'Yaratıcı Tanrılar' },
    Ruling: { renk: '#FFD700', simge: '👑', tr: 'Yönetici Tanrılar' },
    Major: { renk: '#9C27B0', simge: '⭐', tr: 'Büyük Tanrılar' },
    Minor: { renk: '#607D8B', simge: '✦', tr: 'Küçük Tanrılar' },
    Demigod: { renk: '#FF5722', simge: '⚔️', tr: 'Yarı Tanrılar' },
    'Demon/Spirit': { renk: '#795548', simge: '👁', tr: 'Demonlar/Ruhlar' }
  };

  // ── Mitolojik Grup Sistemi ───────────────────────
  const GRUP = {
    'Annunaki':       { renk: '#C0392B', ikon: '𒀭', tr: 'Annunaki',          aciklama: 'Yerin ve kaderin büyük tanrıları' },
    'Igigi':          { renk: '#2980B9', ikon: '🌟', tr: 'İgigi',             aciklama: 'Gökyüzü ve göksel tanrılar' },
    'EfsaneviYaratik':{ renk: '#6C3483', ikon: '🐉', tr: 'Efsanevi Yaratık',  aciklama: 'Mitolojik canavarlar ve yaratıklar' },
    'Apkallu':        { renk: '#117A65', ikon: '𒁾', tr: 'Apkallu',           aciklama: 'Yedi Bilge — medeniyeti getiren figürler' },
    'Mitolojik':      { renk: '#B7950B', ikon: '⚔️', tr: 'Mitolojik',         aciklama: 'Efsanelerin ve destanların figürleri' },
    'Duzen':          { renk: '#1A5276', ikon: '𒈨', tr: 'Düzen (Me)',         aciklama: 'Düzeni ve medeniyeti temsil edenler' },
    'Kaos':           { renk: '#4A235A', ikon: '𒆳', tr: 'Kaos (Kur/Hul)',    aciklama: 'Kaos, hastalık ve karanlık güçler' }
  };

  const CINSIYET = {
    M: { ikon: '♂', etiket: 'Erkek', renk: '#4FC3F7', sinif: 'erkek' },
    F: { ikon: '♀', etiket: 'Kadın', renk: '#F48FB1', sinif: 'kadin' },
    N: { ikon: '⚥', etiket: 'Bilinmiyor', renk: '#9E9E9E', sinif: 'notr' }
  };

  const TANRI_SEMBOLLERI = {
    'An': '☽', 'Enlil': '🌪', 'Enki': '🌊',
    'Ninhursag': '🌿', 'İnanna': '⭐', 'Inanna': '⭐',
    'Nanna': '🌙', 'Utu': '☀', 'Adad': '⛈',
    'Nergal': '💀', 'Ereşkigal': '🕷', 'Dumuzi': '🐑',
    'Ninurta': '⚔', 'Marduk': '🐉', 'Gilgamesh': '🦁',
    'Ki': '🌍', 'Nammu': '🌊', 'Abzu': '💧',
    'Kutha': '🔥', 'Nabu': '📜',
    default: '𒀭'
  };

  let tumTanrilar = [];
  let tanriHarita = {};
  let filtreKategori = 'Hepsi';
  let aramaMetni = '';
  let seciliTanri = null;

  // ── JSON Yükle & Temizle ────────────────────────
  async function yukle() {
    try {
      // Global değişkenden veri al (fetch yerine - file:// CORS sorununu önler)
      const veri = typeof TANRILAR_JSON !== 'undefined' ? TANRILAR_JSON : null;

      if (!veri) {
        console.error('TANRILAR_JSON yüklü değil!');
        return;
      }

      tumTanrilar = [
        ...(veri.creator_primordial || []),
        ...(veri.ruling_major_gods || []),
        ...(veri.major_minor_gods || []),
        ...(veri.demons_spirits || [])
      ].map(t => {
        // Category normalleştirme: veri dosyasındaki farklı değerleri
        // KATEGORI haritasındaki anahtarlara eşle
        const katNorm = {
          'Primordial':  'Creator',
          'Ruling':      'Ruling',
          'Major':       'Major',
          'Minor':       'Minor',
          'Demigod':     'Demigod',
          'Demon':       'Demon/Spirit',
          'Spirit':      'Demon/Spirit'
        };
        return {
          ...t,
          category: katNorm[t.category] || t.category,
          parents:  Array.isArray(t.parents)  ? t.parents.filter(Boolean)  : [],
          spouse:   Array.isArray(t.spouse)   ? t.spouse.filter(Boolean)   : [],
          children: Array.isArray(t.children) ? t.children.filter(Boolean) : []
        };
      });

      // Tekrarlananları temizle: aynı name birden fazla dizide olabilir
      const gorulenIsimler = new Set();
      tumTanrilar = tumTanrilar.filter(t => {
        if (gorulenIsimler.has(t.name)) return false;
        gorulenIsimler.add(t.name);
        return true;
      });

      tumTanrilar.forEach(t => {
        tanriHarita[t.name] = t;
        if (t.name_ak) tanriHarita[t.name_ak] = t;
      });

    } catch (hata) {
      console.error('Tanrı verisi hatası:', hata);
    }
  }

  // ── UI Oluştur ───────────────────────────────────
  // HTML yapısı index.html'de -- JS sadece kategorileri ve kartları doldurur
  function uiOlustur() {
    filtreButonlariOlustur();
    kartlariGoster();
  }

  // ── Filtre Butonları ─────────────────────────────
  function filtreButonlariOlustur() {
    const kapsayici = document.getElementById('tanri-kategoriler');
    if (!kapsayici) return;

    const katBtnler = Object.entries(KATEGORI).map(([kat, info]) => {
      const sayi = tumTanrilar.filter(t => t.category === kat).length;
      return '<button class="t-kat-btn" data-kat="' + kat + '"' +
        ' onclick="tanrilarModul.filtrele(\'' + kat + '\', this)"' +
        ' style="--kat-renk:' + info.renk + '">' +
        '<span class="t-kat-ikon">' + info.simge + '</span>' +
        '<span>' + info.tr + '</span>' +
        '<span class="t-kat-sayi">' + sayi + '</span>' +
        '</button>';
    }).join('');

    kapsayici.innerHTML =
      '<button class="t-kat-btn aktif" data-kat="Hepsi"' +
      ' onclick="tanrilarModul.filtrele(\'Hepsi\', this)">' +
      '<span class="t-kat-ikon">𒀭</span>' +
      '<span>Tümü</span>' +
      '<span class="t-kat-sayi">' + tumTanrilar.length + '</span>' +
      '</button>' + katBtnler;
  }

  // ── Kart Izgara Oluştur ──────────────────────────
  function kartlariGoster() {
    const izgara = document.getElementById('tanri-kart-izgara');
    if (!izgara) return;

    const filtreli = filtreliTanrilar();
    izgara.innerHTML = '';

    if (filtreli.length === 0) {
      izgara.innerHTML = `<div class="t-bos-mesaj">
        <span style="font-size:2rem;opacity:0.3">𒀭</span><br>
        Sonuç bulunamadı
      </div>`;
      return;
    }

    filtreli.forEach((tanri, i) => {
      const kart = tanriKartOlustur(tanri, i);
      izgara.appendChild(kart);
    });
  }

  function filtreliTanrilar() {
    return tumTanrilar.filter(t => {
      const katUyum = filtreKategori === 'Hepsi' || t.category === filtreKategori;
      // description aramadan çıkarıldı — sadece isim, Akkadca adı, rol ve şehir
      const araUyum = aramaMetni === '' || [
        t.name, t.name_ak, t.role, t.city
      ].some(a => a && a.toLowerCase().includes(aramaMetni));
      return katUyum && araUyum;
    });
  }

  // ── Tek Tanrı Kartı ─────────────────────────────
  function tanriKartOlustur(tanri, indeks) {
    const kat = KATEGORI[tanri.category] || KATEGORI.Minor;
    const cins = CINSIYET[tanri.gender] || CINSIYET.N;
    const sembol = TANRI_SEMBOLLERI[tanri.name] || TANRI_SEMBOLLERI.default;
    const aktif = seciliTanri && seciliTanri.name === tanri.name;

    const div = document.createElement('div');
    div.className = `t-kart${aktif ? ' aktif-kart' : ''}`;
    div.style.setProperty('--kat-renk', kat.renk);
    div.style.animationDelay = `${Math.min(indeks * 0.03, 0.5)}s`;
    div.dataset.isim = tanri.name;

    // Grup etiketleri HTML'i oluştur
    const grupEtiketleri = Array.isArray(tanri.gruplar) && tanri.gruplar.length > 0
      ? tanri.gruplar.map(g => {
          const grp = GRUP[g];
          if (!grp) return '';
          return '<span class="t-grup-etiketi" style="background:' + grp.renk + '22;color:' + grp.renk + ';border:1px solid ' + grp.renk + '55" title="' + grp.aciklama + '">' +
                 grp.ikon + ' ' + grp.tr + '</span>';
        }).join('')
      : '';

    div.innerHTML = `
      <div class="t-kart-renk-serit"></div>
      <div class="t-kart-ic">
        <div class="t-kart-ust">
          <span class="t-kart-sembol">${sembol}</span>
          <span class="t-kart-cinsiyet" style="color:${cins.renk}" title="${cins.etiket}">${cins.ikon}</span>
        </div>
        <div class="t-kart-isim">${tanri.name}</div>
        ${tanri.name_ak ? `<div class="t-kart-akad">${tanri.name_ak}</div>` : ''}
        <div class="t-kart-rol">${(tanri.role || '').split(',')[0].trim()}</div>
        <div class="t-kart-alt">
          <span class="t-kat-pilule" style="background:${kat.renk}22;color:${kat.renk};border:1px solid ${kat.renk}44">
            ${kat.simge} ${kat.tr}
          </span>
          ${tanri.city ? `<span class="t-kart-sehir">📍 ${tanri.city.split(',')[0]}</span>` : ''}
        </div>
        ${grupEtiketleri ? `<div class="t-grup-satirlari">${grupEtiketleri}</div>` : ''}
      </div>
    `;

    div.addEventListener('click', () => tanriSec(tanri));
    return div;
  }

  // ── Tanrı Seçimi ────────────────────────────────
  function tanriSec(tanri) {
    seciliTanri = tanri;

    // Aktif kartı güncelle
    document.querySelectorAll('.t-kart').forEach(k => {
      k.classList.toggle('aktif-kart', k.dataset.isim === tanri.name);
    });

    // Detay panelini doldur
    detayGoster(tanri);
  }

  // ── Detay Paneli ────────────────────────────────
  function detayGoster(tanri) {
    const alan = document.getElementById('tanri-detay-alani');
    if (!alan) return;

    const kat = KATEGORI[tanri.category] || KATEGORI.Minor;
    const cins = CINSIYET[tanri.gender] || CINSIYET.N;
    const sembol = TANRI_SEMBOLLERI[tanri.name] || TANRI_SEMBOLLERI.default;

    // Ebeveyn/çocuk/eş rozetleri
    const rozetListesi = (liste, tip, renk, etiket) => {
      if (!liste || liste.length === 0) return '';
      const rozetler = liste.filter(a => a && a.trim()).map(ad => {
        const vari = tanriHarita[ad];
        return `<span class="t-detay-rozet"
          style="background:${renk}18;color:${renk};border:1px solid ${renk}44;cursor:${vari ? 'pointer' : ''}"
          onclick="tanrilarModul._bagliTanriGit('${ad}')"
          title="${vari ? (vari.role || '') : ''}">
          ${ad}
        </span>`;
      }).join('');
      return `
        <div class="t-detay-satir">
          <div class="t-detay-etiket">${etiket}</div>
          <div class="t-detay-rozetler">${rozetler}</div>
        </div>`;
    };

    alan.innerHTML = `
      <div class="t-detay-kart" style="--kat-renk:${kat.renk}">
        <div class="t-detay-header">
          <div class="t-detay-sembol">${sembol}</div>
          <div>
            <div class="t-detay-isim">${tanri.name}</div>
            ${tanri.name_ak ? `<div class="t-detay-akad">Akkadça: <em>${tanri.name_ak}</em></div>` : ''}
            <div class="t-detay-kat-rozet" style="background:${kat.renk}22;color:${kat.renk};border-color:${kat.renk}44">
              ${kat.simge} ${kat.tr}
            </div>
          </div>
        </div>

        <div class="t-detay-aciklama">${tanri.description || '—'}</div>

        <div class="t-detay-satir">
          <div class="t-detay-etiket">Rol</div>
          <div class="t-detay-deger">${tanri.role || '—'}</div>
        </div>

        <div class="t-detay-grid">
          <div>
            <div class="t-detay-etiket">Cinsiyet</div>
            <div style="color:${cins.renk}">${cins.ikon} ${cins.etiket}</div>
          </div>
          <div>
            <div class="t-detay-etiket">Şehir</div>
            <div class="t-detay-deger">${tanri.city || '—'}</div>
          </div>
        </div>

        ${rozetListesi(tanri.parents, 'ebeveyn', '#4FC3F7', '👑 Ebeveynler')}
        ${rozetListesi(tanri.spouse, 'es', '#F48FB1', '💛 Eşler')}
        ${rozetListesi(tanri.children, 'cocuk', '#A5D6A7', '🌱 Çocuklar')}

        <!-- Mini Soy Ağacı SVG -->
        <div class="t-agac-baslik">🌳 Soy Ağacı</div>
        <div class="t-agac-kapsayici">
          ${miniAgacCiz(tanri)}
        </div>
      </div>
    `;
  }

  // ── Mini SVG Soy Ağacı ──────────────────────────
  function miniAgacCiz(tanri) {
    const genislik = 230;
    const kutu_y = 26;
    const kutu_bos = 10;
    const aralik = 80;
    const merkez_x = genislik / 2;

    const ebeveynler = (tanri.parents || []).filter(a => a && tanriHarita[a]);
    const cocuklar = (tanri.children || []).filter(a => a && tanriHarita[a]).slice(0, 4);
    const esler = (tanri.spouse || []).filter(a => a && tanriHarita[a]);

    const toplam_yukseklik = 30
      + (ebeveynler.length > 0 ? aralik : 0)
      + kutu_y
      + (cocuklar.length > 0 ? aralik : 0)
      + (cocuklar.length > 0 ? kutu_y : 0)
      + 10;

    let svg_icerik = '';

    // — Ebeveynler Satırı —
    if (ebeveynler.length > 0) {
      const eb_y = 5;
      const eb_genislik = genislik / ebeveynler.length;

      ebeveynler.forEach((ad, i) => {
        const x = eb_genislik * i + eb_genislik / 2;
        const eb_kat = KATEGORI[(tanriHarita[ad] || {}).category] || KATEGORI.Minor;

        // Bağlantı çizgisi → ana düğüm
        svg_icerik += `<line x1="${x}" y1="${eb_y + kutu_y / 2 + 5}" x2="${merkez_x}" y2="${eb_y + aralik - 5}"
          stroke="${eb_kat.renk}" stroke-width="1.5" stroke-opacity="0.5" stroke-dasharray="4 2"/>`;

        // Kutu
        svg_icerik += `
          <g onclick="tanrilarModul._bagliTanriGit('${ad}')" style="cursor:pointer">
            <rect x="${x - 40}" y="${eb_y}" width="80" height="22" rx="11"
              fill="${eb_kat.renk}22" stroke="${eb_kat.renk}" stroke-width="1.2"/>
            <text x="${x}" y="${eb_y + 14}" text-anchor="middle"
              font-family="Cinzel,serif" font-size="9" fill="${eb_kat.renk}">${ad.length > 10 ? ad.slice(0, 9) + '…' : ad}</text>
          </g>`;
      });
    }

    // — Ana Tanrı —
    const merkez_y = (ebeveynler.length > 0 ? aralik : 0) + 5;
    const ana_kat = KATEGORI[tanri.category] || KATEGORI.Minor;

    svg_icerik += `
      <g>
        <rect x="${merkez_x - 50}" y="${merkez_y}" width="100" height="28" rx="14"
          fill="${ana_kat.renk}33" stroke="${ana_kat.renk}" stroke-width="2"/>
        <text x="${merkez_x}" y="${merkez_y + 12}" text-anchor="middle"
          font-family="Cinzel Decorative,serif" font-size="10" fill="${ana_kat.renk}" font-weight="700">
          ${tanri.name.length > 10 ? tanri.name.slice(0, 9) + '…' : tanri.name}
        </text>
        <text x="${merkez_x}" y="${merkez_y + 23}" text-anchor="middle"
          font-family="serif" font-size="8" fill="${ana_kat.renk}99">
          ${(tanri.role || '').split(',')[0].slice(0, 18)}
        </text>
      </g>`;

    // — Eşler (yan) —
    if (esler.length > 0 && esler.length <= 2) {
      esler.forEach((ad, i) => {
        const es_x = i === 0 ? merkez_x - 110 : merkez_x + 110;
        const es_kat = KATEGORI[(tanriHarita[ad] || {}).category] || KATEGORI.Minor;
        svg_icerik += `
          <line x1="${es_x}" y1="${merkez_y + 14}" x2="${merkez_x + (i === 0 ? -50 : 50)}" y2="${merkez_y + 14}"
            stroke="#F48FB1" stroke-width="1" stroke-dasharray="3 2" stroke-opacity="0.6"/>
          <g onclick="tanrilarModul._bagliTanriGit('${ad}')" style="cursor:pointer">
            <rect x="${es_x - 42}" y="${merkez_y + 4}" width="84" height="20" rx="10"
              fill="#F48FB122" stroke="#F48FB1" stroke-width="1"/>
            <text x="${es_x}" y="${merkez_y + 17}" text-anchor="middle"
              font-family="Cinzel,serif" font-size="8.5" fill="#F48FB1">${ad.length > 9 ? ad.slice(0, 8) + '…' : ad}</text>
          </g>`;
      });
    }

    // — Çocuklar Satırı —
    if (cocuklar.length > 0) {
      const co_y = merkez_y + kutu_y + aralik - 10;
      const co_genislik = genislik / cocuklar.length;

      // Ana düğümden çizgi
      svg_icerik += `<line x1="${merkez_x}" y1="${merkez_y + kutu_y}" x2="${merkez_x}" y2="${merkez_y + kutu_y + aralik / 2}"
        stroke="${ana_kat.renk}" stroke-width="1.5" stroke-opacity="0.4"/>
      <line x1="${co_genislik / 2}" y1="${merkez_y + kutu_y + aralik / 2}"
        x2="${co_genislik * (cocuklar.length - 0.5)}" y2="${merkez_y + kutu_y + aralik / 2}"
        stroke="${ana_kat.renk}" stroke-width="1" stroke-opacity="0.3"/>`;

      cocuklar.forEach((ad, i) => {
        const x = co_genislik * i + co_genislik / 2;
        const co_kat = KATEGORI[(tanriHarita[ad] || {}).category] || KATEGORI.Minor;

        svg_icerik += `<line x1="${x}" y1="${merkez_y + kutu_y + aralik / 2}" x2="${x}" y2="${co_y - 5}"
          stroke="${co_kat.renk}" stroke-width="1.2" stroke-opacity="0.4"/>`;

        svg_icerik += `
          <g onclick="tanrilarModul._bagliTanriGit('${ad}')" style="cursor:pointer">
            <rect x="${x - 38}" y="${co_y}" width="76" height="22" rx="11"
              fill="${co_kat.renk}22" stroke="${co_kat.renk}" stroke-width="1.2"/>
            <text x="${x}" y="${co_y + 14}" text-anchor="middle"
              font-family="Cinzel,serif" font-size="9" fill="${co_kat.renk}">${ad.length > 9 ? ad.slice(0, 8) + '…' : ad}</text>
          </g>`;
      });
    }

    const coc_ek = cocuklar.length > 0 ? aralik + 30 : 0;
    const yukseklik = toplam_yukseklik + coc_ek;

    return `<svg viewBox="0 0 ${genislik} ${yukseklik}" width="100%" style="overflow:visible">
      ${svg_icerik}
    </svg>`;
  }

  // ── Filtre & Arama ───────────────────────────────
  function filtrele(kategori, btn) {
    filtreKategori = kategori;

    document.querySelectorAll('.t-kat-btn').forEach(b => b.classList.remove('aktif'));
    if (btn) btn.classList.add('aktif');

    kartlariGoster();

    // Seçili tanrı hâlâ listede mi kontrol et
    if (seciliTanri) {
      const hala_gozukuyor = filtreliTanrilar().find(t => t.name === seciliTanri.name);
      if (hala_gozukuyor) {
        setTimeout(() => {
          document.querySelectorAll('.t-kart').forEach(k => {
            k.classList.toggle('aktif-kart', k.dataset.isim === seciliTanri.name);
          });
        }, 50);
      }
    }
  }

  function _aramaGuncelle(deger) {
    aramaMetni = deger.toLowerCase().trim();
    kartlariGoster();
  }

  function _bagliTanriGit(ad) {
    const tanri = tanriHarita[ad];
    if (tanri) {
      // Kategoriyi otomatik "Hepsi" yap
      filtreKategori = 'Hepsi';
      document.querySelectorAll('.t-kat-btn').forEach(b => {
        b.classList.toggle('aktif', b.dataset.kat === 'Hepsi');
      });
      kartlariGoster();

      setTimeout(() => {
        tanriSec(tanri);
        // Kartı görünüme getir
        const kartEl = document.querySelector(`.t-kart[data-isim="${ad}"]`);
        if (kartEl) kartEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }

  // ── Başlat ───────────────────────────────────────
  async function baslat() {
    await yukle();
    uiOlustur();
  }

  // Public API
  return {
    baslat,
    filtrele,
    _aramaGuncelle,
    _bagliTanriGit,
    getTanrilar: () => tumTanrilar
  };

})();
