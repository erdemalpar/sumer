// Sümer şehirleri coğrafi ve tarihi verileri
const SUMER_SEHIRLERI = [
  {
    id: "uruk",
    isim: "Uruk",
    asil_isim: "𒌷𒀕 Unug",
    lat: 31.3219,
    lng: 45.6306,
    tanri: ["An", "İnanna"],
    donemler: ["erken_uruk", "erken_hanedanlik", "akkad", "ur3"],
    nufus: "~80.000 (MÖ 2900)",
    kurulis: "MÖ ~4500",
    bitis: "MÖ ~2004",
    onem: 5,
    aciklama: "Dünyanın bilinen ilk büyük şehr. İnanna'nın kutsal kenti, çivi yazısının doğduğu yer. Gilgamesh Destanı'nın sahnesi.",
    onemli_yapilar: "Eanna Tapınak Kompleksi, Beyaz Tapınak (An), Kırmızı Bina",
    tarihsel_not: "MÖ 3000 civarında dünyada 50.000-80.000 kişiyle muhtemelen en kalabalık şehirdi."
  },
  {
    id: "ur",
    isim: "Ur",
    asil_isim: "𒋀𒀕𒆠 Urim",
    lat: 30.9625,
    lng: 46.1031,
    tanri: ["Nanna", "Ningal"],
    donemler: ["erken_hanedanlik", "akkad", "ur3"],
    nufus: "~65.000 (MÖ 2100)",
    kurulis: "MÖ ~3800",
    bitis: "MÖ ~1740",
    onem: 5,
    aciklama: "Ay tanrısı Nanna'nın şehri. Ur III hanedanı döneminde (MÖ 2112-2004) Sümer medeniyetinin başkenti.",
    onemli_yapilar: "Ur Ziggurat (Nanna'nın tapınağı), Kraliyet Mezarlıkları",
    tarihsel_not: "1922-34 yıllarında Leonard Woolley'nin kazılarında inanılmaz kraliyet defineleri bulundu."
  },
  {
    id: "nippur",
    isim: "Nippur",
    asil_isim: "𒂗𒆤𒆳𒆳 Nibru",
    lat: 32.1267,
    lng: 45.2360,
    tanri: ["Enlil", "Ninlil"],
    donemler: ["erken_uruk", "erken_hanedanlik", "akkad", "ur3"],
    nufus: "~40.000 (MÖ 2500)",
    kurulis: "MÖ ~4000",
    bitis: "MÖ ~800",
    onem: 5,
    aciklama: "Sümer dininin kutsal başkenti. Enlil'in Ekur tapınağı burada bulunurdu. Siyasi iktidar için Nippur'un onayı şarttı.",
    onemli_yapilar: "Ekur Tapınağı (Enlil'in Dağ Evi), Tahıl ambarları",
    tarihsel_not: "Sümer yazın edebiyatının büyük çoğunluğu Nippur kütüphanelerinden ele geçti."
  },
  {
    id: "eridu",
    isim: "Eridu",
    asil_isim: "𒉣𒆠 Eridug",
    lat: 30.8161,
    lng: 45.9994,
    tanri: ["Enki"],
    donemler: ["erken_uruk", "erken_hanedanlik"],
    nufus: "~4.000 (MÖ 4000)",
    kurulis: "MÖ ~5400",
    bitis: "MÖ ~600",
    onem: 4,
    aciklama: "Sümer King List'e göre 'krallığın gökten indiği' ilk şehir. Bilgelik tanrısı Enki'nin E-Abzu tapınağı burada.",
    onemli_yapilar: "E-Abzu Tapınağı (Enki'nin Evi), Kutsal Yapı Katmanları",
    tarihsel_not: "MÖ 5400'de kurulan, insanlığın bilinen en eski yerleşim merkezlerinden biri."
  },
  {
    id: "lagash",
    isim: "Lagash",
    asil_isim: "𒉆𒀭𒆠 Lagaš",
    lat: 31.7103,
    lng: 46.4236,
    tanri: ["Ningirsu", "Nanşe"],
    donemler: ["erken_hanedanlik", "akkad"],
    nufus: "~30.000 (MÖ 2400)",
    kurulis: "MÖ ~2900",
    bitis: "MÖ ~2000",
    onem: 4,
    aciklama: "Savaşçı kral Eannatum ve reformcu Urukagina'nın şehri. Sümerlerin ilk yazılı kanuni reformlar buradan çıktı.",
    onemli_yapilar: "Girsu'daki Eninnu Tapınağı (Ningirsu'nun kartalı)",
    tarihsel_not: "Gudea, MÖ 2150'de şehri yeniden inşa ederek başarılı bir kültürel rönesans yarattı."
  },
  {
    id: "girsu",
    isim: "Girsu",
    asil_isim: "𒄈𒋢𒆠 Ĝirsu",
    lat: 31.6,
    lng: 46.15,
    tanri: ["Ningirsu"],
    donemler: ["erken_hanedanlik", "akkad", "ur3"],
    nufus: "~20.000",
    kurulis: "MÖ ~2900",
    bitis: "MÖ ~2000",
    onem: 3,
    aciklama: "Lagash kenti-devletinin kutsal kültür merkezi. Ningirsu'nun ana tapınağı Eninnu burada yer alırdı.",
    onemli_yapilar: "Eninnu Tapınağı",
    tarihsel_not: "Modern Tello adıyla bilinen bölge, 19. yüzyılda Fransız arkeologlar tarafından kazıldı."
  },
  {
    id: "umma",
    isim: "Umma",
    asil_isim: "𒄑𒆵𒆠 Umma",
    lat: 31.9167,
    lng: 45.5833,
    tanri: ["Shara"],
    donemler: ["erken_hanedanlik", "akkad"],
    nufus: "~15.000",
    kurulis: "MÖ ~2800",
    bitis: "MÖ ~2100",
    onem: 3,
    aciklama: "Lagash ile sürekli sınır savaşları yaşayan güçlü kent-devlet.",
    onemli_yapilar: "Shara Tapınağı",
    tarihsel_not: "Lagash-Umma sınır savaşı (MÖ 2450) toplumda tarihsel kayıtları olan ilk savaş olabilir."
  },
  {
    id: "kish",
    isim: "Kish",
    asil_isim: "𒆧𒆠 Kiš",
    lat: 32.5503,
    lng: 44.6481,
    tanri: ["Zababa", "Inanna"],
    donemler: ["erken_hanedanlik", "akkad"],
    nufus: "~25.000",
    kurulis: "MÖ ~3000",
    bitis: "MÖ ~1700",
    onem: 4,
    aciklama: "Tufan'dan sonra 'krallığın gökten yeniden indiği' şehir. Akkad Sargon'un fethettiği ilk büyük kuzey merkezi.",
    onemli_yapilar: "Hurşagkalamma Tapınağı (İnanna), Saray kompleksi",
    tarihsel_not: "Sümer King List'te 23 kral listeli. Kral Enmebaragesi tarihteki ilk adı geçen kral olabilir."
  },
  {
    id: "sippar",
    isim: "Sippar",
    asil_isim: "𒄀𒆳 Zimbir",
    lat: 33.0586,
    lng: 44.2547,
    tanri: ["Utu", "Aya"],
    donemler: ["erken_hanedanlik", "akkad", "ur3"],
    nufus: "~20.000",
    kurulis: "MÖ ~3000",
    bitis: "MÖ ~500",
    onem: 4,
    aciklama: "Güneş tanrısı Utu'nun (Şamaş) kutsal şehri. Hukuk ve adaletin merkezi.",
    onemli_yapilar: "Ebabbar Tapınağı (Utu tapınağı), Kütüphane",
    tarihsel_not: "Hammurabi Kanunları steli Sippar tapınağında dikilmişti."
  },
  {
    id: "shuruppak",
    isim: "Shuruppak",
    asil_isim: "𒌋𒅆𒊒𒆳𒆠 Šuruppak",
    lat: 31.9833,
    lng: 45.5,
    tanri: ["Ninlil"],
    donemler: ["erken_hanedanlik"],
    nufus: "~15.000",
    kurulis: "MÖ ~2900",
    bitis: "MÖ ~2300",
    onem: 3,
    aciklama: "Tufan kahramanı Ziusudra'nın (Utnapiştim) şehri. Sümer Tufan Miti'nin ana sahnesi.",
    onemli_yapilar: "Ninlil Tapınağı",
    tarihsel_not: "Modern Fara adıyla bilinen bölge. Arkeolojik kazılarda gerçek bir sel katmanı bulundu."
  },
  {
    id: "larsa",
    isim: "Larsa",
    asil_isim: "𒇷𒊬𒆳𒆠 Larsa",
    lat: 31.2231,
    lng: 45.8483,
    tanri: ["Utu"],
    donemler: ["erken_hanedanlik", "akkad", "ur3"],
    nufus: "~30.000",
    kurulis: "MÖ ~2900",
    bitis: "MÖ ~1763",
    onem: 4,
    aciklama: "Ur III sonrası güçlü krallık merkezi. MÖ 1763'te Hammurabi tarafından yıkıldı.",
    onemli_yapilar: "Ebabbar Tapınağı (Utu)",
    tarihsel_not: "Kral Rim-Sin I, MÖ 60 yıl tahtta kalarak Mezopotamya tarihinin en uzun saltanatını yaşadı."
  },
  {
    id: "isin",
    isim: "İsin",
    asil_isim: "𒄿𒋛𒆪𒆠 Isin",
    lat: 31.9,
    lng: 45.2667,
    tanri: ["Ninisina", "Gula"],
    donemler: ["ur3"],
    nufus: "~20.000",
    kurulis: "MÖ ~2600",
    bitis: "MÖ ~1700",
    onem: 3,
    aciklama: "Ur III yıkılınca Sümer siyasi mirasını devralan şehir. Şifa tanrıçası Ninisina'nın kutsal yeri.",
    onemli_yapilar: "Egalmah Tapınağı (Ninisina)",
    tarihsel_not: "İsin-Larsa dönemi Sümer edebiyatının altın çağı olarak kabul edilir."
  },
  {
    id: "bad_tibira",
    isim: "Bad-tibira",
    asil_isim: "𒆍𒀭𒊏𒋾𒁀𒊏 Bad-tibira",
    lat: 31.7706,
    lng: 45.9939,
    tanri: ["Dumuzi", "Inanna"],
    donemler: ["erken_hanedanlik"],
    nufus: "~10.000",
    kurulis: "MÖ ~3000",
    bitis: "MÖ ~2300",
    onem: 2,
    aciklama: "Sümer King List'te tufandan önce sayılan beş şehirden biri. Çoban tanrı Dumuzi'nin şehri.",
    onemli_yapilar: "Dumuzi ve İnanna tapınakları",
    tarihsel_not: "'Maden işçilerinin kalesi' anlamına gelir, metalurji merkezi olarak önemliydi."
  },
  {
    id: "kutha",
    isim: "Kutha",
    asil_isim: "𒆰𒆠 Gudua",
    lat: 32.7333,
    lng: 44.6667,
    tanri: ["Nergal", "Ereşkigal"],
    donemler: ["erken_hanedanlik", "akkad"],
    nufus: "~15.000",
    kurulis: "MÖ ~2800",
    bitis: "MÖ ~1000",
    onem: 3,
    aciklama: "Ölüm ve yeraltı dünyası tanrısı Nergal'in karanlık şehri.",
    onemli_yapilar: "Emeslam Tapınağı (Nergal)",
    tarihsel_not: "Eski Ahit'te Kutha halklarının Samiriye'ye sürgün edilmesinden bahsedilir."
  },
  {
    id: "adab",
    isim: "Adab",
    asil_isim: "𒌓𒀭𒆠 Adab",
    lat: 32.0,
    lng: 45.1,
    tanri: ["Mama"],
    donemler: ["erken_hanedanlik", "akkad"],
    nufus: "~12.000",
    kurulis: "MÖ ~2700",
    bitis: "MÖ ~2200",
    onem: 2,
    aciklama: "Erken Hanedanlık döneminin önemli kültür merkezi.",
    onemli_yapilar: "Mama Tapınağı",
    tarihsel_not: "Kral Lugalannemundu, 7 ülke üzerinde hüküm iddia eden en erken 'evrensel' krallardan biri."
  },
  {
    id: "eshnunna",
    isim: "Eshnunna",
    asil_isim: "𒀸𒉣𒈠𒆠 Ešnunna",
    lat: 33.7,
    lng: 44.75,
    tanri: ["Tishpak"],
    donemler: ["erken_hanedanlik", "akkad", "ur3"],
    nufus: "~20.000",
    kurulis: "MÖ ~2800",
    bitis: "MÖ ~1761",
    onem: 3,
    aciklama: "Hammurabi'nin kanunlarından önce yazılı hukuk kanunları hazırlayan kıuzey kenti.",
    onemli_yapilar: "Tishpak Tapınağı",
    tarihsel_not: "MÖ 1800'e tarihli Eshnunna Kanunları, Hammurabi'den yaklaşık 50 yıl öncedir."
  },
  {
    id: "akkad",
    isim: "Akkad (Agade)",
    asil_isim: "𒀝𒅗𒁲𒆠 Agade",
    lat: 33.1,
    lng: 44.35,
    tanri: ["İştar", "İlaba"],
    donemler: ["akkad"],
    nufus: "~50.000 (tahmini)",
    kurulis: "MÖ ~2334",
    bitis: "MÖ ~2154",
    onem: 5,
    aciklama: "Dünyanın ilk imparatorluğunu kuran Sargon'un başkenti. Kesin konumu hâlâ tartışmalı.",
    onemli_yapilar: "İştar Tapınağı, Saray (kayıp)",
    tarihsel_not: "Sargon 55 yıl tahtta kalarak 34 savaşçı kazandığını iddia etti. Tarihin ilk gerçek imparatoru."
  },
  {
    id: "nippur_alt",
    isim: "Mari",
    asil_isim: "𒈠𒊑𒆠 Mari",
    lat: 34.5461,
    lng: 40.9078,
    tanri: ["Dagan"],
    donemler: ["erken_hanedanlik", "akkad"],
    nufus: "~25.000",
    kurulis: "MÖ ~2900",
    bitis: "MÖ ~1759",
    onem: 3,
    aciklama: "Fırat üzerindeki stratejik ticaret şehri. Hammurabi tarafından yıkıldı.",
    onemli_yapilar: "Kral Sarayı (260 oda), Dagan Tapınağı",
    tarihsel_not: "Kazılarda bulunan 20.000'den fazla kil tablet dönemin siyasi ilişkilerini gözler önüne seriyor."
  },
  {
    id: "babylon",
    isim: "Babil",
    asil_isim: "𒆍𒀭𒊏𒆠 Bābili",
    lat: 32.5364,
    lng: 44.4208,
    tanri: ["Marduk", "Sarpanit"],
    donemler: ["ur3"],
    nufus: "~200.000 (MÖ 600)",
    kurulis: "MÖ ~2300",
    bitis: "MÖ ~200",
    onem: 4,
    aciklama: "Akkad sonrası yükselen ve dünyanın en büyük şehri olan efsanevi başkent.",
    onemli_yapilar: "Marduk Esagila Tapınağı, Etemenanki Ziggurat (Babil Kulesi), Asma Bahçeler",
    tarihsel_not: "Hammurabi'nin kanunları burada dikildi. Babil, İskender döneminde bile dünyanın merkeziydi."
  }
];

// Tarihsel dönemler
const TARIHSEL_DONEMLER = [
  {
    id: "erken_uruk",
    isim: "Erken Uruk Dönemi",
    tarih: "MÖ 4000 – 3000",
    kisa: "MÖ 4000",
    renk: "#8B4513",
    aciklama: "Çivi yazısının icat edildiği dönem. İlk büyük şehirler kuruldu. Uruk Kültürü.",
    on_raks: -4000,
    bitis_raks: -3000
  },
  {
    id: "erken_hanedanlik",
    isim: "Erken Hanedanlık",
    tarih: "MÖ 3000 – 2334",
    kisa: "MÖ 3000",
    renk: "#D2691E",
    aciklama: "Kent-devletlerin birbiriyle savaştığı dönem. Gilgamesh, Ur Kraliyet Mezarlıkları.",
    on_raks: -3000,
    bitis_raks: -2334
  },
  {
    id: "akkad",
    isim: "Akkad İmparatorluğu",
    tarih: "MÖ 2334 – 2154",
    kisa: "MÖ 2334",
    renk: "#B8860B",
    aciklama: "Sargon'un dünya tarihi ilk imparatorluğu. Sümer ve Akkad kültürlerinin sentezi.",
    on_raks: -2334,
    bitis_raks: -2154
  },
  {
    id: "ur3",
    isim: "Ur III Rönesansı",
    tarih: "MÖ 2112 – 2004",
    kisa: "MÖ 2112",
    renk: "#CD853F",
    aciklama: "Sümer medeniyetinin klasik altın çağı. Ur-Nammu Kanunları, Ziggurat mimarisi.",
    on_raks: -2112,
    bitis_raks: -2004
  }
];

// Nehir verileri
const NEHIRLER = {
  firat: {
    isim: "Fırat Nehri",
    asil_isim: "𒉺𒇻𒆳𒆳 Buranun",
    renk: "#4488FF",
    koordinatlar: [
      [36.85, 38.20], [36.20, 38.40], [35.60, 38.80], [35.00, 39.50],
      [34.40, 40.50], [34.30, 41.00], [34.05, 41.75], [33.80, 42.60],
      [33.60, 43.30], [33.35, 43.78], [32.90, 44.10], [32.50, 44.20],
      [32.20, 44.30], [32.00, 44.50], [31.80, 44.85], [31.50, 45.20],
      [31.20, 45.50], [31.00, 45.85], [30.90, 46.20], [30.85, 46.85],
      [30.80, 47.30], [30.65, 47.60], [30.40, 47.80]
    ]
  },
  dicle: {
    isim: "Dicle Nehri",
    asil_isim: "𒀀𒀀𒂗𒆠 Idigna",
    renk: "#2299DD",
    koordinatlar: [
      [37.80, 38.45], [37.50, 40.50], [37.10, 41.30], [36.70, 41.80],
      [36.20, 42.30], [35.85, 43.00], [35.50, 43.50], [35.25, 43.80],
      [34.90, 44.00], [34.60, 43.90], [34.30, 44.00], [34.00, 44.35],
      [33.40, 44.42], [33.10, 44.50], [32.70, 44.55], [32.50, 44.70],
      [32.20, 45.20], [31.90, 46.00], [31.70, 46.55], [31.40, 47.00],
      [31.10, 47.30], [30.70, 47.65], [30.40, 47.80]
    ]
  }
};

// Medeniyet sınırı koordinatları — her biri kendi zaman aralığıyla
const MEDENIYET_SINIRI = {

  // ── Sümer Kalbi (MÖ 4500–2004) ──────────────────
  sumer_klasik: {
    isim:          "Sümer Kalbi",
    tarih:         "MÖ 4500 – 2004",
    baslangic_yil: -4500,
    bitis_yil:     -2004,
    renk:          "#D4AF37",
    dashArray:     "8 4",
    fillOpacity:   0.07,
    koordinatlar: [
      [31.05, 43.80], [31.50, 43.70], [32.20, 43.80], [32.80, 44.20],
      [33.30, 44.30], [33.80, 44.60], [34.20, 44.90], [34.00, 45.50],
      [33.50, 46.20], [33.00, 46.80], [32.50, 47.20], [31.80, 47.60],
      [31.20, 47.80], [30.70, 47.90], [30.20, 47.80], [29.80, 47.60],
      [29.50, 47.20], [29.60, 46.50], [30.00, 45.80], [30.20, 45.00],
      [30.30, 44.40], [30.50, 43.90], [31.05, 43.80]
    ]
  },

  // ── Akkad İmparatorluğu (MÖ 2334–2154) ──────────
  akkad_imparatorlugu: {
    isim:          "Akkad İmparatorluğu",
    tarih:         "MÖ 2334 – 2154",
    baslangic_yil: -2334,
    bitis_yil:     -2154,
    renk:          "#B8860B",
    dashArray:     "4 6",
    fillOpacity:   0.06,
    koordinatlar: [
      [31.00, 43.50], [32.00, 43.00], [33.00, 43.50], [34.50, 43.20],
      [35.50, 43.80], [36.00, 44.50], [36.00, 46.50], [35.00, 47.50],
      [33.50, 48.00], [32.00, 48.50], [30.50, 48.20], [29.50, 47.50],
      [29.50, 46.00], [30.00, 44.50], [30.50, 43.70], [31.00, 43.50]
    ]
  },

  // ── Ur III Hanedanlığı (MÖ 2112–2004) ────────────
  ur3_hanedan: {
    isim:          "Ur III Hanedanlığı",
    tarih:         "MÖ 2112 – 2004",
    baslangic_yil: -2112,
    bitis_yil:     -2004,
    renk:          "#CD853F",
    dashArray:     "6 3",
    fillOpacity:   0.07,
    koordinatlar: [
      [30.50, 43.80], [31.50, 43.50], [32.50, 43.80], [33.50, 44.00],
      [34.20, 44.50], [34.50, 45.50], [34.00, 46.50], [33.00, 47.50],
      [32.00, 48.00], [30.80, 48.00], [30.00, 47.50], [29.50, 47.00],
      [29.60, 46.00], [30.00, 45.00], [30.30, 44.20], [30.50, 43.80]
    ]
  },

  // ── Elam Krallığı (MÖ 3200–539) ──────────────────
  elam: {
    isim:          "Elam Krallığı",
    tarih:         "MÖ 3200 – 539",
    baslangic_yil: -3200,
    bitis_yil:     -539,
    renk:          "#8B0000",
    dashArray:     "5 5",
    fillOpacity:   0.06,
    koordinatlar: [
      [31.50, 47.50], [32.00, 47.80], [32.50, 48.00], [33.00, 48.50],
      [33.50, 49.00], [33.80, 49.80], [33.50, 51.00], [32.80, 52.00],
      [32.00, 52.50], [31.00, 52.00], [30.00, 50.50], [29.50, 49.50],
      [29.80, 48.50], [30.50, 47.80], [31.00, 47.50], [31.50, 47.50]
    ]
  },

  // ── Eski Asur (MÖ 2600–609) ──────────────────────
  eski_asur: {
    isim:          "Asur Krallığı",
    tarih:         "MÖ 2600 – 609",
    baslangic_yil: -2600,
    bitis_yil:     -609,
    renk:          "#6A0DAD",
    dashArray:     "3 5",
    fillOpacity:   0.06,
    koordinatlar: [
      [33.50, 41.00], [35.00, 41.00], [36.50, 42.00], [37.50, 43.00],
      [37.80, 44.50], [37.00, 45.50], [36.00, 46.00], [35.00, 45.50],
      [34.00, 44.80], [33.50, 44.00], [33.50, 43.00], [33.50, 41.00]
    ]
  },

  // ── Babil Krallığı (MÖ 1894–539) ─────────────────
  babil: {
    isim:          "Babil Krallığı",
    tarih:         "MÖ 1894 – 539",
    baslangic_yil: -1894,
    bitis_yil:     -539,
    renk:          "#C0392B",
    dashArray:     "4 4",
    fillOpacity:   0.06,
    koordinatlar: [
      [31.00, 43.50], [32.50, 42.80], [34.00, 43.00], [35.00, 43.80],
      [35.80, 45.00], [35.50, 46.50], [34.50, 47.50], [33.00, 48.00],
      [31.50, 48.00], [30.00, 47.50], [29.50, 46.50], [29.80, 45.00],
      [30.30, 44.00], [31.00, 43.50]
    ]
  },

  // ── Gutiler (MÖ 2154–2112) ────────────────────────
  gutiler: {
    isim:          "Guti Yönetimi",
    tarih:         "MÖ 2154 – 2112",
    baslangic_yil: -2154,
    bitis_yil:     -2112,
    renk:          "#556B2F",
    dashArray:     "2 6",
    fillOpacity:   0.05,
    koordinatlar: [
      [33.00, 44.00], [34.00, 43.50], [35.50, 44.00], [36.00, 45.00],
      [35.50, 46.00], [34.50, 46.80], [33.50, 47.00], [32.50, 47.00],
      [32.00, 46.00], [32.50, 45.00], [33.00, 44.00]
    ]
  }
};
