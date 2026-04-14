/* === ANA UYGULAMA KONTROLCÜSÜ ===
   Sekme yönetimi, başlatma, koordinasyon
*/

const uygulama = (() => {

  let aktifSekme = 'harita';
  let baslatildi  = {};

  // ── Uygulama Başlat ──────────────────────────────
  async function baslat() {
    // Yükleniyor ekranını gizle
    setTimeout(() => {
      const yukl = document.getElementById('yukleniyor-ekrani');
      if (yukl) {
        yukl.style.opacity = '0';
        yukl.style.transition = 'opacity 0.5s';
        setTimeout(() => yukl.style.display = 'none', 500);
      }
    }, 1200);

    // Sekme olaylarını bağla
    sekmeOlaylariBagla();

    // Harita başlat (varsayılan sekme)
    await baslatHarita();

    // Sidebar katman toggle'larını bağla
    katmanToggleBagla();

    // Zaman slider'ını bağla
    zamanSliderBagla();
  }

  // ── Harita Başlatma ──────────────────────────────
  async function baslatHarita() {
    if (baslatildi.harita) return;
    baslatildi.harita = true;
    haritaModul.baslatHarita();
  }

  // ── Tanrılar Başlatma ────────────────────────────
  async function baslatTanrilar() {
    if (baslatildi.tanrilar) return;
    baslatildi.tanrilar = true;
    await tanrilarModul.baslat();
  }

  // ── Cuneiform Başlatma ───────────────────────────
  function baslatCuneiform() {
    if (baslatildi.cuneiform) return;
    baslatildi.cuneiform = true;
    cuneiformModul.baslat();
  }

  // ── Tarih Sekmesi ────────────────────────────────
  function baslatTarih() {
    if (baslatildi.tarih) return;
    baslatildi.tarih = true;
    tarihIceriginiDoldur();
  }

  // ── Sekme Geçişleri ──────────────────────────────
  function sekmeOlaylariBagla() {
    document.querySelectorAll('.sekme-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const hedef = btn.dataset.sekme;
        await sekmeGec(hedef, btn);
      });
    });
  }

  async function sekmeGec(hedefSekme, tiklananBtn) {
    if (aktifSekme === hedefSekme) return;

    // Eski sekmeyi gizle
    const eskiPanel = document.getElementById(`${aktifSekme}-sekme`);
    if (eskiPanel) eskiPanel.classList.remove('aktif');

    document.querySelectorAll('.sekme-btn').forEach(b => b.classList.remove('aktif'));

    // Yeni sekmeyi aktifleştir
    aktifSekme = hedefSekme;
    const yeniPanel = document.getElementById(`${hedefSekme}-sekme`);
    if (yeniPanel) yeniPanel.classList.add('aktif');
    if (tiklananBtn) tiklananBtn.classList.add('aktif');

    // Gerekli modülü başlat
    switch (hedefSekme) {
      case 'harita':
        await baslatHarita();
        haritaModul.yenidenboyutlandir();
        break;
      case 'tanrilar':
        await baslatTanrilar();
        break;
      case 'cuneiform':
        baslatCuneiform();
        break;
      case 'tarih':
        baslatTarih();
        break;
    }
  }

  // ── Katman Toggle Bağlantıları ───────────────────
  function katmanToggleBagla() {
    document.querySelectorAll('.katman-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('aktif');
        const katman = toggle.dataset.katman;
        const aktif  = toggle.classList.contains('aktif');
        haritaModul.katmanToggle(katman, aktif);
      });
    });
  }

  // ── Zaman Slider ─────────────────────────────────
  function zamanSliderBagla() {
    const slider = document.getElementById('zaman-slider');
    if (!slider) return;

    slider.addEventListener('input', () => {
      const index = parseInt(slider.value);
      // CSS progress güncelle
      const progress = (index / (TARIHSEL_DONEMLER.length - 1)) * 100;
      slider.style.setProperty('--slider-progress', `${progress}%`);

      // Dönem metinlerini güncelle
      const donem = TARIHSEL_DONEMLER[index];
      const adEl    = document.getElementById('slider-donem-adi');
      const tarihEl = document.getElementById('slider-donem-tarih');
      const acikEl  = document.getElementById('slider-donem-aciklama');

      if (adEl)    adEl.textContent = donem.isim;
      if (tarihEl) tarihEl.textContent = donem.tarih;
      if (acikEl)  acikEl.textContent = donem.aciklama;

      // Slider etiketleri güncelle
      document.querySelectorAll('.slider-etiket').forEach((el, i) => {
        el.classList.toggle('aktif', i === index);
      });

      // Haritayı güncelle
      haritaModul.donemGuncelle(index);
    });

    // Başlangıç değeri (Erken Hanedanlık = index 1)
    slider.value = 1;
    slider.dispatchEvent(new Event('input'));
  }

  // ── Tarih İçeriği ────────────────────────────────
  function tarihIceriginiDoldur() {
    const konteyner = document.querySelector('.tarih-zaman-seridi');
    if (!konteyner) return;

    const olaylar = [
      {
        tarih: "MÖ ~10.000",
        baslik: "Tarım Devrimi — Bereketli Hilal",
        aciklama: "İnsanlık tarihinin en büyük dönüşümü. Fırat ve Dicle arasındaki topraklarda buğday, arpa ilk evcilleştirildi. Yerleşik hayat başladı ve şehir medeniyetinin temelleri atıldı."
      },
      {
        tarih: "MÖ ~5400",
        baslik: "Eridu'nun Kurulması — İlk Şehir",
        aciklama: "Sümer King List'e göre 'krallığın gökten indiği' Eridu, insanlığın bilinen en eski büyük yerleşimlerinden biri. Enki'nin E-Abzu tapınağının bulunduğu kutsal kent."
      },
      {
        tarih: "MÖ ~4500-3000",
        baslik: "Uruk Dönemi — Şehir Medeniyetinin Doğuşu",
        aciklama: "Uruk (Warka), dünyada 50.000-80.000 kişilik nüfusuyla muhtemelen tarihte ilk ‚büyük şehir' oldu. İşbölümü, ticaret ağları ve yönetim yapıları gelişti."
      },
      {
        tarih: "MÖ ~3200",
        baslik: "Çivi Yazısının İcadı",
        aciklama: "Uruk'ta bulunan Uruk tabletleri, insanlığın bilinen en eski yazı belgelerinden. Başlangıçta muhasebe için icat edilen piktografik yazı, zamanla çivi yazısına evrildi. Bu, tarih çağının başlangıcıdır."
      },
      {
        tarih: "MÖ ~2900-2334",
        baslik: "Erken Hanedanlık — Kent-Devletlerin Çağı",
        aciklama: "Uruk, Ur, Nippur, Lagash, Umma, Kish gibi bağımsız kent-devletler birbiriyle hem savaşır hem ticaret yapar. Her şehrin kendi tanrısı, kendi sarayı ve kendi ordusu vardır. Gilgamesh bu dönemde Uruk'u yönetir."
      },
      {
        tarih: "MÖ ~2500",
        baslik: "Ur Kraliyet Mezarlıkları",
        aciklama: "Leonard Woolley'nin 1922-34 kazılarında ortaya çıkan hazineler: altın başlıklar, lapis lazuli kolyeler ve çarpıcı bir uygulama — 'ölüm çukurları'nda onlarca hizmetkar efendileriyle birlikte gömülmüş."
      },
      {
        tarih: "MÖ ~2450",
        baslik: "Lagash-Umma Sınır Savaşları",
        aciklama: "Tarihte kayıtlara geçen ilk sınır anlaşmazlığı. Eannatum'un 'Akbabalar Steli' (Stele of Vultures) bu savaşı tasvir eder. Bu dönemde Urukagina ilk yazılı sosyal reform kanunlarını çıkardı."
      },
      {
        tarih: "MÖ 2334",
        baslik: "Sargon'un Akkad İmparatorluğu",
        aciklama: "Akitli Sargon (Sargon of Akkad), tarihin bilinen ilk imparatorluğunu kurdu. 'Bakır saplı' anlamına gelen adı, Sümer ve Akkad kültürlerini birleştirdi. 34 zafer kazandığını söyleyen kitabeler bıraktı."
      },
      {
        tarih: "MÖ ~2200",
        baslik: "Gutilerin İstilası & Akkad'ın Çöküşü",
        aciklama: "Zagros dağlarından gelen Guti halkı Akkad İmparatorluğu'nu yıktı. Bu karanlık dönem Sümer mitolojisinde 'tanrıların gazabı' olarak nitelendirildi. Ancak güney şehirleri ayakta kaldı."
      },
      {
        tarih: "MÖ 2112-2004",
        baslik: "Ur III Rönesansı — Sümer Altın Çağı",
        aciklama: "Ur-Nammu önderliğinde kurulan Ur III hanedanı, Sümer medeniyetinin doruk noktasını temsil eder. Ur-Nammu Kanunları (Hammurabi'den 300 yıl önce), devlet arşivleri, anıtsal ziggurat mimarisi bu dönemin eserleridir."
      },
      {
        tarih: "MÖ 2004",
        baslik: "Ur'un Düşüşü — Sümer'in Sonu",
        aciklama: "Elamlıların saldırısı ve aşiret göçleri sonucu Ur III hanedanı yıkıldı. Bu yıkım Sümerce 'Ur'un Ağıdı' (Lament for the Destruction of Ur) destanında derin acıyla anlatılır. Sümer civilizasyonu yerini Babil'e bıraktı."
      },
      {
        tarih: "MÖ ~1900",
        baslik: "Epik Gilgamesh'in Yazıya Dökülmesi",
        aciklama: "Dünyanın en eski edebi epik eseri olan Gilgamesh Destanı bu dönemde standart biçimini aldı. Ölümsüzlük arayışı, tufan miti, arkadaşlık temaları bugün bile evrensel yankı uyandırır."
      },
      {
        tarih: "MÖ 1754",
        baslik: "Hammurabi Kanunları",
        aciklama: "Babil Kralı Hammurabi'nin 282 maddelik kanun dizisi, Sümer hukuk geleneğini miras alan ve bugünkü hukuk sistemlerini etkileyen temel belgedir. 'Göze göz dişe diş' ilkesinin kaynağı."
      },
      {
        tarih: "19. yüzyıl",
        baslik: "Modern Arkeoloji — Sümer'in Yeniden Keşfi",
        aciklama: "Austen Henry Layard, Henry Rawlinson ve diğer arkeologlar çivi yazısını deşifre etti. Nineveh, Ur, Lagash gibi antik kentler kazıldı. 5000 yıl önce yazılan tabletler tekrar okunmaya başlandı."
      }
    ];

    konteyner.innerHTML = olaylar.map(olay => `
      <div class="zaman-seridi-olay">
        <div class="olay-tarih">${olay.tarih}</div>
        <div class="olay-baslik">${olay.baslik}</div>
        <div class="olay-aciklama">${olay.aciklama}</div>
      </div>
    `).join('');
  }

  // Public
  return {
    baslat,
    sekmeGec
  };

})();

// ── Sayfa Yükleme ─────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  uygulama.baslat();
});
