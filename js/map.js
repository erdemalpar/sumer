/* === SÜMER HARİTA MODÜLÜ ===
   Leaflet.js tabanlı CBS haritası
   Şehirler, nehirler, medeniyet sınırları katmanları
*/

// Harita durumu nesnesi
const haritaModul = (() => {
  let harita = null;
  let katmanlar = {};
  let aktifDonemIndex = 1; // Erken Hanedanlık varsayılan
  let bilgiPaneli = null;

  // Şehir kategorisi ikonları
  const SEHIR_IKONLARI = {
    "Ruling": "𒀭",
    "Creator": "𒊹",
    "Main":    "𒈗",
    default:   "𒋺"
  };

  const DONEM_RENKLERI = {
    erken_uruk:       "#8B4513",
    erken_hanedanlik: "#D2691E",
    akkad:            "#B8860B",
    ur3:              "#CD853F"
  };

  // ── Haritayı Başlat ──────────────────────────────
  function baslatHarita() {
    harita = L.map('harita', {
      center: [31.5, 45.5],
      zoom: 7,
      zoomControl: false,
      attributionControl: true,
      minZoom: 4,
      maxZoom: 14
    });

    // Zoom kontrolünü sağ üste taşı
    L.control.zoom({ position: 'topright' }).addTo(harita);

    // CartoDB Voyager – antik görünümlü harita
    const karanlikTile = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      {
        attribution: '© OpenStreetMap, © CartoDB',
        subdomains: 'abcd',
        maxZoom: 19
      }
    );

    const tarihi = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: '© Esri, NatGeo',
        maxZoom: 16,
        opacity: 0.85
      }
    );

    karanlikTile.addTo(harita);

    // Başlangıç katmanlarını oluştur
    katmanlar.sehirler    = L.layerGroup().addTo(harita);
    katmanlar.sinirlar    = L.layerGroup().addTo(harita);
    katmanlar.nehirler    = L.layerGroup().addTo(harita);
    katmanlar.akkad       = L.layerGroup(); // Varsayılan kapalı

    bilgiPaneli = document.getElementById('harita-bilgi-panel');

    // Katmanlar oluştur
    nehirleriCiz();
    sehirleriCiz(aktifDonemIndex);
    siniriCiz();

    // Harita tıklama ile popup kapat
    harita.on('click', () => {
      if (bilgiPaneli) bilgiPaneli.style.display = 'none';
    });

    return harita;
  }

  // ── Nehirleri Çiz ───────────────────────────────
  function nehirleriCiz() {
    katmanlar.nehirler.clearLayers();

    // FIRAT NEHRİ
    const firatCizgi = L.polyline(
      NEHIRLER.firat.koordinatlar,
      {
        color:       '#5599FF',
        weight:      3.5,
        opacity:     0.75,
        smoothFactor: 1.5,
        className:   'nehir-firat'
      }
    );

    firatCizgi.bindTooltip(
      `<div style="font-family:'Cinzel',serif">
        🌊 ${NEHIRLER.firat.isim}
        <div style="font-size:0.65rem;color:#aaa;margin-top:2px">${NEHIRLER.firat.asil_isim}</div>
      </div>`,
      { sticky: true }
    );

    // DICLE NEHRİ
    const dicleCizgi = L.polyline(
      NEHIRLER.dicle.koordinatlar,
      {
        color:       '#3377CC',
        weight:      3.5,
        opacity:     0.75,
        smoothFactor: 1.5,
        className:   'nehir-dicle'
      }
    );

    dicleCizgi.bindTooltip(
      `<div style="font-family:'Cinzel',serif">
        🌊 ${NEHIRLER.dicle.isim}
        <div style="font-size:0.65rem;color:#aaa;margin-top:2px">${NEHIRLER.dicle.asil_isim}</div>
      </div>`,
      { sticky: true }
    );

    katmanlar.nehirler.addLayer(firatCizgi);
    katmanlar.nehirler.addLayer(dicleCizgi);
  }

  // ── Medeniyet Sınırını Çiz ──────────────────────
  function siniriCiz() {
    katmanlar.sinirlar.clearLayers();

    // Klasik Sümer
    const sumerPolygon = L.polygon(
      MEDENIYET_SINIRI.sumer_klasik.koordinatlar,
      {
        color:       '#D4AF37',
        weight:      2,
        opacity:     0.65,
        fillColor:   '#D4AF37',
        fillOpacity: 0.07,
        dashArray:   '8 4'
      }
    );

    sumerPolygon.bindTooltip(
      `<div style="font-family:'Cinzel',serif">
        ${MEDENIYET_SINIRI.sumer_klasik.isim}
      </div>`,
      { sticky: true }
    );

    katmanlar.sinirlar.addLayer(sumerPolygon);

    // Akkad İmparatorluğu
    const akkadPolygon = L.polygon(
      MEDENIYET_SINIRI.akkad_imparatorlugu.koordinatlar,
      {
        color:       '#B8860B',
        weight:      2,
        opacity:     0.5,
        fillColor:   '#B8860B',
        fillOpacity: 0.05,
        dashArray:   '4 6'
      }
    );

    akkadPolygon.bindTooltip(
      `<div style="font-family:'Cinzel',serif">
        ${MEDENIYET_SINIRI.akkad_imparatorlugu.isim}
      </div>`,
      { sticky: true }
    );

    katmanlar.sinirlar.addLayer(akkadPolygon);
  }

  // ── Şehirleri Çiz ───────────────────────────────
  function sehirleriCiz(donemIndex) {
    katmanlar.sehirler.clearLayers();
    const aktifDonem = TARIHSEL_DONEMLER[donemIndex];

    SUMER_SEHIRLERI.forEach(sehir => {
      const gorünür = sehir.donemler.includes(aktifDonem.id);
      if (!gorünür && donemIndex < 3) return; // Erken dönemde sadece aktif şehirleri göster

      const ikon = olusturSehirIkonu(sehir, gorünür);
      const marker = L.marker([sehir.lat, sehir.lng], { icon: ikon });

      // Tooltip
      marker.bindTooltip(
        `<span style="font-family:'Cinzel',serif;font-weight:700">${sehir.isim}</span>
         <span style="font-size:0.65rem;display:block;color:#aaa;font-style:italic">${sehir.kurulis} – ${sehir.bitis}</span>`,
        { direction: 'top', offset: [0, -10] }
      );

      // Popup
      marker.on('click', () => gosterSehirDetay(sehir));

      katmanlar.sehirler.addLayer(marker);
    });
  }

  // ── Şehir İkonu Oluştur ─────────────────────────
  function olusturSehirIkonu(sehir, aktif = true) {
    const boyut = sehir.onem === 5 ? 34 :
                  sehir.onem === 4 ? 28 :
                  sehir.onem === 3 ? 22 : 18;

    const renk = aktif
      ? (sehir.onem === 5 ? '#FFD700' :
         sehir.onem === 4 ? '#D4AF37' :
         sehir.onem === 3 ? '#B8860B' : '#8B6914')
      : '#4A3A2A';

    const bg = aktif
      ? `linear-gradient(135deg, ${renk}, ${renk}88)`
      : 'rgba(40,30,20,0.6)';

    const harfler = sehir.isim.substring(0, 2).toUpperCase();

    return L.divIcon({
      className: '',
      html: `<div class="sehir-ikonu onem-${sehir.onem}" style="
        width:${boyut}px;
        height:${boyut}px;
        background:${bg};
        border:2px solid ${renk};
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:${boyut * 0.35}px;
        font-weight:900;
        color:${aktif ? '#0F0A06' : '#4A3A2A'};
        font-family:'Cinzel',serif;
        box-shadow:0 0 ${aktif ? boyut/2 : 4}px ${renk}66,0 4px 12px rgba(0,0,0,0.6);
        cursor:pointer;
        transition:all 0.2s;
        ${aktif ? '' : 'opacity:0.5;'}
      ">${harfler}</div>`,
      iconSize:   [boyut, boyut],
      iconAnchor: [boyut/2, boyut/2]
    });
  }

  // ── Şehir Detay Paneli ──────────────────────────
  function gosterSehirDetay(sehir) {
    if (!bilgiPaneli) return;

    const tanriRozetleri = (sehir.tanri || [])
      .map(t => `<span class="popup-tanri-rozet">𒀭 ${t}</span>`)
      .join('');

    bilgiPaneli.innerHTML = `
      <div class="popup-baslik">
        <div>
          <div class="popup-isim">${sehir.isim}</div>
          <div class="popup-asil-isim">${sehir.asil_isim}</div>
        </div>
      </div>
      <div class="popup-aciklama">${sehir.aciklama}</div>
      <div class="popup-meta">
        <div class="popup-meta-item">
          <span class="popup-meta-etiket">Kuruluş</span>
          <span class="popup-meta-deger">${sehir.kurulis}</span>
        </div>
        <div class="popup-meta-item">
          <span class="popup-meta-etiket">Koordinat</span>
          <span class="popup-meta-deger">${sehir.lat.toFixed(2)}°N, ${sehir.lng.toFixed(2)}°E</span>
        </div>
        <div class="popup-meta-item" style="grid-column:1/-1">
          <span class="popup-meta-etiket">Önemli Yapılar</span>
          <span class="popup-meta-deger" style="font-size:0.7rem">${sehir.onemli_yapilar || '—'}</span>
        </div>
        ${sehir.tarihsel_not ? `
        <div class="popup-meta-item" style="grid-column:1/-1;padding-top:0.5rem;border-top:1px solid rgba(212,175,55,0.15)">
          <span class="popup-meta-etiket">📜 Tarihsel Not</span>
          <span class="popup-meta-deger" style="font-size:0.7rem;font-style:italic;color:#9B8860">${sehir.tarihsel_not}</span>
        </div>` : ''}
      </div>
      <div class="popup-tanri" style="margin-top:0.75rem">
        <span style="font-size:0.6rem;color:#7A6044;text-transform:uppercase;letter-spacing:0.1em;margin-right:0.5rem">Tanrılar:</span>
        ${tanriRozetleri}
      </div>
    `;

    bilgiPaneli.style.display = 'block';
    bilgiPaneli.style.animation = 'kayan-panel 0.3s ease';
  }

  // ── Katman Toggle ────────────────────────────────
  function katmanToggle(katmanAdi, aktif) {
    if (!katmanlar[katmanAdi]) return;

    if (aktif) {
      harita.addLayer(katmanlar[katmanAdi]);
    } else {
      harita.removeLayer(katmanlar[katmanAdi]);
    }
  }

  // ── Dönem Güncelle ───────────────────────────────
  function donemGuncelle(index) {
    aktifDonemIndex = index;
    sehirleriCiz(index);

    const donem = TARIHSEL_DONEMLER[index];

    // Akkad sınırını sadece akkad döneminde göster
    if (donem.id === 'akkad' || donem.id === 'ur3') {
      if (!harita.hasLayer(katmanlar.sinirlar)) {
        // Sinirlar zaten açıksa güncelleme
      }
    }
  }

  // ── Haritayı Yeniden Boyutlandır ─────────────────
  function yenidenboyutlandir() {
    if (harita) {
      setTimeout(() => harita.invalidateSize(), 100);
    }
  }

  // Public API
  return {
    baslatHarita,
    katmanToggle,
    donemGuncelle,
    yenidenboyutlandir,
    getHarita: () => harita
  };
})();
