// Sümer çivi yazısı işaretleri verisi
// Unicode Cuneiform blok: U+12000 – U+123FF
const CUNEIFORM_ISARETLER = [
  // === TANRILAR VE KUTSAL KAVRAMLAR ===
  {
    id: "an",
    isaretUnicode: "𒀭",
    transliterasyon: "AN / DINGIR",
    anlam_tr: "Gök / Tanrı",
    anlam_en: "Sky / God",
    telaffuz: "an / dingir",
    kategori: "tanrilar",
    aciklama: "Tüm tanrı isimlerinin önüne eklenen belirleyici (determinatif). Aynı zamanda gök tanrısı An'ın simgesi.",
    kullanim_ornegi: "𒀭𒂗𒆤 = Enki (EN.KI = 'Yerin Efendisi')",
    zorluk: 1
  },
  {
    id: "en",
    isaretUnicode: "𒂗",
    transliterasyon: "EN",
    anlam_tr: "Efendi / Lord",
    anlam_en: "Lord",
    telaffuz: "en",
    kategori: "tanrilar",
    aciklama: "'Enki', 'Enlil' gibi tanrı adlarında kullanılan temel önek.",
    kullanim_ornegi: "𒂗𒆤 = Enki",
    zorluk: 1
  },
  {
    id: "inanna",
    isaretUnicode: "𒀭𒇔",
    transliterasyon: "AN.INNIN / INANNA",
    anlam_tr: "İnanna (Aşk ve Savaş Tanrıçası)",
    anlam_en: "Inanna (Goddess of Love and War)",
    telaffuz: "i-na-na",
    kategori: "tanrilar",
    aciklama: "Venüs gezegeniyle özdeşleştirilen en güçlü kadın tanrıça.",
    kullanim_ornegi: "Uruk'un koruyucu tanrıçası",
    zorluk: 2
  },
  {
    id: "utu",
    isaretUnicode: "𒀭𒌓",
    transliterasyon: "AN.UD / UTU",
    anlam_tr: "Utu (Güneş Tanrısı)",
    anlam_en: "Utu (Sun God)",
    telaffuz: "u-tu",
    kategori: "tanrilar",
    aciklama: "Adalet ve güneşin tanrısı. Akkadça karşılığı Şamaş.",
    kullanim_ornegi: "'UD' işareti hem 'güneş' hem 'gün, beyaz' anlamına gelir",
    zorluk: 2
  },
  {
    id: "nanna",
    isaretUnicode: "𒀭𒂗𒍪",
    transliterasyon: "AN.EN.ZU / NANNA",
    anlam_tr: "Nanna (Ay Tanrısı)",
    anlam_en: "Nanna (Moon God)",
    telaffuz: "nan-na",
    kategori: "tanrilar",
    aciklama: "Ay tanrısı, 'Büyük Işık'. Ur şehrinin koruyucu tanrısı.",
    kullanim_ornegi: "ZU = 'bilen' → 'Gökbilimi bilen tanrı'",
    zorluk: 3
  },
  {
    id: "enlil",
    isaretUnicode: "𒀭𒂗𒍪𒆤",
    transliterasyon: "AN.EN.ZU.KI / ENLIL",
    anlam_tr: "Enlil (Hava/Rüzgar Tanrısı)",
    anlam_en: "Enlil (Wind/Air God)",
    telaffuz: "en-lil",
    kategori: "tanrilar",
    aciklama: "Tanrılar meclisinin başkanı. Nippur'un efendisi. Fırtına ve yazgının sahibi.",
    kullanim_ornegi: "𒂗𒍪 = EN.LIL (Rüzgar Efendisi)",
    zorluk: 3
  },

  // === SAYILAR ===
  {
    id: "bir",
    isaretUnicode: "𒁹",
    transliterasyon: "DISH",
    anlam_tr: "Bir (1)",
    anlam_en: "One (1)",
    telaffuz: "aş",
    kategori: "sayilar",
    aciklama: "Tek dikey çivi çizgisi. 60 tabanlı Sümer sayı sisteminde temel birim.",
    kullanim_ornegi: "𒁹𒁹𒁹 = üç (3)",
    zorluk: 1
  },
  {
    id: "iki",
    isaretUnicode: "𒁹𒁹",
    transliterasyon: "MIN",
    anlam_tr: "İki (2)",
    anlam_en: "Two (2)",
    telaffuz: "min",
    kategori: "sayilar",
    aciklama: "İki dikey çivi. 'Min' ayrıca 'ikinci, çift' anlamına da gelir.",
    kullanim_ornegi: "Sayı sisteminde kullanım",
    zorluk: 1
  },
  {
    id: "uc",
    isaretUnicode: "𒐈",
    transliterasyon: "ESH2",
    anlam_tr: "Üç (3)",
    anlam_en: "Three (3)",
    telaffuz: "eş",
    kategori: "sayilar",
    aciklama: "Üç dikey çivi. Ayrıca 'üçüncü' anlamında kullanılır.",
    kullanim_ornegi: "𒐈 mana = 3 mina (ağırlık birimi)",
    zorluk: 1
  },
  {
    id: "on",
    isaretUnicode: "𒌋",
    transliterasyon: "U",
    anlam_tr: "On (10)",
    anlam_en: "Ten (10)",
    telaffuz: "u",
    kategori: "sayilar",
    aciklama: "Yatay çivi işareti. 60 tabanlı sistemde onluk birimi.",
    kullanim_ornegi: "𒌋𒌋 = 20, 𒌋𒌋𒌋 = 30",
    zorluk: 1
  },
  {
    id: "altmis",
    isaretUnicode: "𒐗",
    transliterasyon: "GEŠ2",
    anlam_tr: "Altmış (60)",
    anlam_en: "Sixty (60)",
    telaffuz: "geş",
    kategori: "sayilar",
    aciklama: "Büyük dikey çivi. Sümer 60 tabanlı (sexagesimal) sayı sisteminin temeli. Bugünkü dakika ve saniye hesaplamaları buradan gelir.",
    kullanim_ornegi: "𒐗 = 1 ŠAR (büyük düzine)",
    zorluk: 2
  },
  {
    id: "sar",
    isaretUnicode: "𒊹",
    transliterasyon: "ŠAR2",
    anlam_tr: "3600 (60²)",
    anlam_en: "3600 (60²)",
    telaffuz: "şar",
    kategori: "sayilar",
    aciklama: "3600 sayısı. Sümerler bu dev sayıyı büyük astronomik hesaplamalarda kullandı.",
    kullanim_ornegi: "'Tüm evren' veya 'sonsuz' anlamında mecazi kullanım",
    zorluk: 3
  },

  // === DOĞA VE COĞRAFYA ===
  {
    id: "ki",
    isaretUnicode: "𒆠",
    transliterasyon: "KI",
    anlam_tr: "Yer / Toprak / Dünya",
    anlam_en: "Earth / Ground / Place",
    telaffuz: "ki",
    kategori: "doga",
    aciklama: "Yer tanrıçası Ki'nin adı. Şehir adlarının sonuna eklenen yer belirleyicisi.",
    kullanim_ornegi: "Ur𒆠 = 'Ur şehri'",
    zorluk: 1
  },
  {
    id: "kur",
    isaretUnicode: "𒆳",
    transliterasyon: "KUR",
    anlam_tr: "Dağ / Yabancı Ülke / Ölüler Diyarı",
    anlam_en: "Mountain / Foreign Land / Underworld",
    telaffuz: "kur",
    kategori: "doga",
    aciklama: "Hem 'dağ' hem de 'yabancı ülke' anlamına gelir (Sümerler yabancı ülkeleri dağlarla özdeşleştirdi). Ölüler diyarının da adı.",
    kullanim_ornegi: "KUR.KUR = 'tüm ülkeler'",
    zorluk: 2
  },
  {
    id: "a",
    isaretUnicode: "𒀀",
    transliterasyon: "A",
    anlam_tr: "Su",
    anlam_en: "Water",
    telaffuz: "a",
    kategori: "doga",
    aciklama: "Su işareti. Dalga çizgisi motifi. Tatlı su, nehir ve bereket simgesi.",
    kullanim_ornegi: "𒀀𒀭 = AN.A = 'gök suyu = yağmur'",
    zorluk: 1
  },
  {
    id: "ud",
    isaretUnicode: "𒌓",
    transliterasyon: "UD / UTU",
    anlam_tr: "Güneş / Gün / Beyaz",
    anlam_en: "Sun / Day / White",
    telaffuz: "ud",
    kategori: "doga",
    aciklama: "Güneş işareti. 'Gün', 'yıl', 'beyaz', 'parlak' anlamlarını taşır.",
    kullanim_ornegi: "𒌓𒈨 = UD.ME = 'parlak gün'",
    zorluk: 1
  },
  {
    id: "mul",
    isaretUnicode: "𒀯",
    transliterasyon: "MUL",
    anlam_tr: "Yıldız / Gezegen / Parlak",
    anlam_en: "Star / Planet / Shining",
    telaffuz: "mul",
    kategori: "doga",
    aciklama: "Yıldız veya gök cismi anlamına gelir. Sümerler astronomide çığır açtı.",
    kullanim_ornegi: "𒀯𒀯 = MUL.MUL = 'Ülker (Pleiades) takımyıldızı'",
    zorluk: 2
  },
  {
    id: "itu",
    isaretUnicode: "𒌗",
    transliterasyon: "ITU / UD.30",
    anlam_tr: "Ay / Ay (takvim)",
    anlam_en: "Moon / Month",
    telaffuz: "itu",
    kategori: "doga",
    aciklama: "Hilal şekli. Hem ay hemde takvim ayı anlamına gelir. Sümer takvimi ay döngüsüne dayanırdı.",
    kullanim_ornegi: "ITU.BARA2.ZA.GAR = 'Birinci Ay' (yılın ilk ayı)",
    zorluk: 2
  },
  {
    id: "id2",
    isaretUnicode: "𒀭𒋗𒌒",
    transliterasyon: "ID2",
    anlam_tr: "Nehir / Kanal",
    anlam_en: "River / Canal",
    telaffuz: "id",
    kategori: "doga",
    aciklama: "Nehir ve sulama kanalı anlamında kullanılır. Dicle ve Fırat'ın işareti.",
    kullanim_ornegi: " ID2.GAL = 'büyük nehir (= Dicle veya Fırat)'",
    zorluk: 2
  },

  // === TOPLUM VE MESLEKİ KAVRAMLAR ===
  {
    id: "lugal",
    isaretUnicode: "𒈗",
    transliterasyon: "LUGAL",
    anlam_tr: "Kral / Efendi",
    anlam_en: "King / Lord",
    telaffuz: "lugal",
    kategori: "toplum",
    aciklama: "'Büyük adam' anlamına gelir (LU2+GAL). Tanrıların yeryüzündeki temsilcisi.",
    kullanim_ornegi: "𒈗𒆳 = LUGAL.KUR = 'Ülkenin Kralı'",
    zorluk: 2
  },
  {
    id: "nin",
    isaretUnicode: "𒊩𒌆",
    transliterasyon: "NIN",
    anlam_tr: "Hanımefendi / Tanrıça / Kız Kardeş",
    anlam_en: "Lady / Goddess / Sister",
    telaffuz: "nin",
    kategori: "toplum",
    aciklama: "Kadın statüsünü belirten ön ek. Tanrıça isimlerinde yaygın kullanım.",
    kullanim_ornegi: "𒊩𒌆𒊭 = NIN.LIL = 'Rüzgar Hanımefendisi (Ninlil)'",
    zorluk: 1
  },
  {
    id: "e2",
    isaretUnicode: "𒂍",
    transliterasyon: "E2",
    anlam_tr: "Ev / Tapınak / Saray",
    anlam_en: "House / Temple / Palace",
    telaffuz: "e",
    kategori: "toplum",
    aciklama: "İki dikey çizgi içinde ev planı. Tapınak isimlerinde yaygın kullanılır.",
    kullanim_ornegi: "𒂍𒀭𒀭𒉌 = E2.AN.NA = 'Göğün Evi (Eanna tapınağı)'",
    zorluk: 1
  },
  {
    id: "dumu",
    isaretUnicode: "𒌉",
    transliterasyon: "DUMU",
    anlam_tr: "Oğul / Çocuk / Torun",
    anlam_en: "Son / Child / Descendant",
    telaffuz: "dumu",
    kategori: "toplum",
    aciklama: "Soyağacı ve akrabalık ilişkilerinde kullanılır.",
    kullanim_ornegi: "𒌉𒌉 = DUMU.DUMU = 'torun'",
    zorluk: 2
  },
  {
    id: "nam",
    isaretUnicode: "𒉆",
    transliterasyon: "NAM",
    anlam_tr: "Kader / Yazgı / Statü",
    anlam_en: "Fate / Destiny / Status",
    telaffuz: "nam",
    kategori: "toplum",
    aciklama: "Soyut kavramlar için kullanılan önek. 'Nanmahir' = 'Kahramanlık kaderi'.",
    kullanim_ornegi: "𒉆𒈗 = NAM.LUGAL = 'krallık, krallık yazgısı'",
    zorluk: 2
  },
  {
    id: "sanga",
    isaretUnicode: "𒊬",
    transliterasyon: "SANGA",
    anlam_tr: "Baş Rahip / Tapınak Yöneticisi",
    anlam_en: "Chief Priest / Temple Administrator",
    telaffuz: "sanga",
    kategori: "toplum",
    aciklama: "Tapınak ekonomisinin yöneticisi. Sümer'in en önemli idari görevlerinden biri.",
    kullanim_ornegi: "SANGA + şehir adı = o şehrin baş rahibi",
    zorluk: 3
  },
  {
    id: "geme",
    isaretUnicode: "𒊩𒌆𒄀",
    transliterasyon: "GEME2",
    anlam_tr: "Hizmetçi Kadın / İşçi Kadın",
    anlam_en: "Female Servant / Female Worker",
    telaffuz: "geme",
    kategori: "toplum",
    aciklama: "Tapınak ekonomisinde çalışan düşük statülü kadınları ifade eder.",
    kullanim_ornegi: "Tapınak muhasebe tabletlerinde sıkça görülür",
    zorluk: 3
  },

  // === EYLEMLER VE FİİLLER ===
  {
    id: "du",
    isaretUnicode: "𒁺",
    transliterasyon: "DU / GEN",
    anlam_tr: "Gitmek / Yürümek / Getirmek",
    anlam_en: "To Go / To Walk / To Bring",
    telaffuz: "du",
    kategori: "eylem",
    aciklama: "Hareketi ifade eden temel fiil. Birliktelik bağlamına göre anlam değişir.",
    kullanim_ornegi: "𒁺𒁺 = DU.DU = 'sürekli gitmek, yürümek'",
    zorluk: 2
  },
  {
    id: "dug",
    isaretUnicode: "𒆕",
    transliterasyon: "DUG4",
    anlam_tr: "Konuşmak / Söylemek",
    anlam_en: "To Speak / To Say",
    telaffuz: "düg",
    kategori: "eylem",
    aciklama: "Sözlü iletişimi ifade eder. Mitolojik anlatılarda tanrıların konuşması için kullanılır.",
    kullanim_ornegi: "İnanna epos metinlerinde yaygındır",
    zorluk: 2
  },
  {
    id: "ku",
    isaretUnicode: "𒆭",
    transliterasyon: "KU",
    anlam_tr: "Yemek / Tüketmek",
    anlam_en: "To Eat / To Consume",
    telaffuz: "ku",
    kategori: "eylem",
    aciklama: "Yeme içme fiillerinde kullanılır. Festivaller ve dini ritüellerde önemli.",
    kullanim_ornegi: "𒆭𒂗 = KU.EN = 'efendinin yemeği'",
    zorluk: 2
  },
  {
    id: "ab",
    isaretUnicode: "𒀀𒁉",
    transliterasyon: "AB / IB",
    anlam_tr: "Baba / Dededen Gelmek",
    anlam_en: "Father / Ancestral",
    telaffuz: "ab / ib",
    kategori: "eylem",
    aciklama: "Atadan kalma, soydan gelen kavramları için işaret.",
    kullanim_ornegi: "Soyağacı metinlerinde kullanılır",
    zorluk: 3
  },

  // === HAYVANLAR ===
  {
    id: "gud",
    isaretUnicode: "𒄞",
    transliterasyon: "GUD",
    anlam_tr: "Öküz / Boğa",
    anlam_en: "Ox / Bull",
    telaffuz: "güd",
    kategori: "hayvanlar",
    aciklama: "Erken Sümer'de en değerli hayvan. Tapınak ekonomisinin temel birimidir. Ay tanrısı Nanna boğayla sembolize edilir.",
    kullanim_ornegi: "𒄞𒇻 = GUD.NITA = 'erkek sığır'",
    zorluk: 2
  },
  {
    id: "udu",
    isaretUnicode: "𒇻",
    transliterasyon: "UDU",
    anlam_tr: "Koyun",
    anlam_en: "Sheep",
    telaffuz: "udu",
    kategori: "hayvanlar",
    aciklama: "Tapınak kurbanlarının en yaygını. Yün ve süt için de kullanılırdı.",
    kullanim_ornegi: "𒇻 UDU.SISKUR = 'kurban koyun'",
    zorluk: 1
  },
  {
    id: "anzu",
    isaretUnicode: "𒅁",
    transliterasyon: "TI8.MUSEN / ANZU",
    anlam_tr: "Kartal / Anzu Kuşu",
    anlam_en: "Eagle / Anzu Bird",
    telaffuz: "anzu",
    kategori: "hayvanlar",
    aciklama: "Fırtına ve rüzgar tanrısı Ninurta'nın yendiği efsanevi ilahi kuş. Mezopotamya sanatında yaygın.",
    kullanim_ornegi: "Lagash Kartalı (Anzu) Ningirsu'nun sembolüdür",
    zorluk: 3
  },
  {
    id: "mus",
    isaretUnicode: "𒈲",
    transliterasyon: "MUŠ",
    anlam_tr: "Yılan",
    anlam_en: "Snake",
    telaffuz: "muş",
    kategori: "hayvanlar",
    aciklama: "Bilgelik, iyileşme ve yeraltıyla ilişkili. Ningişzida yılanlarla sembolize edilir.",
    kullanim_ornegi: "𒀭𒈲𒌋𒁉 = AN.MUŠ.UR = 'yılan tanrı hanedanı'",
    zorluk: 2
  },

  // === MADDE ve AĞIRLIK ===
  {
    id: "gin",
    isaretUnicode: "𒄀",
    transliterasyon: "GIN2 / SHEKEL",
    anlam_tr: "Şekel (Ağırlık Birimi ~8.3g)",
    anlam_en: "Shekel (Weight Unit ~8.3g)",
    telaffuz: "gin",
    kategori: "olcu",
    aciklama: "Sümer'in temel ticaret ve ağırlık biriminin adı. Modern 'şekel' buradan gelir.",
    kullanim_ornegi: "𒄀𒄀𒄀 = 3 şekel gümüş",
    zorluk: 2
  },
  {
    id: "mana",
    isaretUnicode: "𒈠𒈾",
    transliterasyon: "MA.NA / MINA",
    anlam_tr: "Mina (60 Şekel = ~500g)",
    anlam_en: "Mina (60 Shekels = ~500g)",
    telaffuz: "mana",
    kategori: "olcu",
    aciklama: "60 şekelden oluşur. Ticaret tabletlerinde en sık görülen ağırlık birimi.",
    kullanim_ornegi: "1 mana gümüş = 1 işçinin ~3 yıllık bedeliydi (MÖ 2400)",
    zorluk: 2
  },
  {
    id: "gur",
    isaretUnicode: "𒁁",
    transliterasyon: "GUR",
    anlam_tr: "Kür (Tahıl Ölçeği ~300lt)",
    anlam_en: "Gur (Grain Measure ~300L)",
    telaffuz: "gur",
    kategori: "olcu",
    aciklama: "Büyük tahıl ölçü birimi. Tapınak tahılı dağıtım tabletlerinde görülür.",
    kullanim_ornegi: "𒁁 GUR şe = 'bir kür arpa'",
    zorluk: 3
  },

  // === YAZARLARIN SEVDİĞİ İŞARETLER ===
  {
    id: "mu",
    isaretUnicode: "𒈬",
    transliterasyon: "MU",
    anlam_tr: "Ad / Yıl / Anmak",
    anlam_en: "Name / Year / To Mention",
    telaffuz: "mu",
    kategori: "yazi",
    aciklama: "Hem 'ad, isim' hem 'yıl, dönem' anlamına gelir. Tarihleme tabletlerinde 'MU = yıl' olarak kullanılır.",
    kullanim_ornegi: "𒈬𒁉 = MU.BI = 'onun adı / o yıl'",
    zorluk: 1
  },
  {
    id: "dub",
    isaretUnicode: "𒁾",
    transliterasyon: "DUB",
    anlam_tr: "Tablet / Belge",
    anlam_en: "Tablet / Document",
    telaffuz: "dub",
    kategori: "yazi",
    aciklama: "Kil yazma tableti. Tüm Sümer yazılı kültürünün sembolü.",
    kullanim_ornegi: "𒁾𒊬 = DUB.SAR = 'Tablet Yazarı (katip)'",
    zorluk: 1
  },
  {
    id: "dubsar",
    isaretUnicode: "𒁾𒊬",
    transliterasyon: "DUB.SAR",
    anlam_tr: "Katip / Yazıcı",
    anlam_en: "Scribe",
    telaffuz: "dubsar",
    kategori: "yazi",
    aciklama: "Sümer toplumunun en prestijli mesleklerinden biri. Eduba (okul) mezunu uzmanlar.",
    kullanim_ornegi: "Tapınak muhasebecisinden edebiyat yazarına kadar tüm katipler",
    zorluk: 2
  },
  {
    id: "eduba",
    isaretUnicode: "𒂍𒁾𒁀",
    transliterasyon: "EDUBBA",
    anlam_tr: "Tablet Evi / Okul",
    anlam_en: "Tablet House / School",
    telaffuz: "eduba",
    kategori: "yazi",
    aciklama: "Sümer katipliğinin öğretildiği okul. Dünyanın bilinen ilk organize eğitim kurumu.",
    kullanim_ornegi: "Edubba metinleri öğrenci diyaloglarını aktarır",
    zorluk: 2
  },
  {
    id: "sar",
    isaretUnicode: "𒊬",
    transliterasyon: "SAR",
    anlam_tr: "Yazmak / Çizmek / Bahçe",
    anlam_en: "To Write / To Draw / Garden",
    telaffuz: "sar",
    kategori: "yazi",
    aciklama: "'Yazmak' ile 'bahçe' anlamlarını taşır. Katip kil üzerine yazıyı 'çizerdi'.",
    kullanim_ornegi: "𒊬 sar = 'tablet yazmak', 𒊬 = bahçe ölçü birimi (35 m²)",
    zorluk: 2
  },

  // === MİTOLOJİK KAVRAMLAR ===
  {
    id: "me",
    isaretUnicode: "𒈨",
    transliterasyon: "ME",
    anlam_tr: "İlahi Kural / Medeniyet Gücü",
    anlam_en: "Divine Rule / Power of Civilization",
    telaffuz: "me",
    kategori: "mitoloji",
    aciklama: "Sümer medeniyetini oluşturan ilahi yasalar ve güçler. Krallık, tapınaklık, yazı, müzik bunlar arasındadır. İnanna'nın Enki'den çaldığı şey.",
    kullanim_ornegi: "İnanna ve ME efsanesi Sümer'in en önemli mitlerinden biri",
    zorluk: 3
  },
  {
    id: "kur_nu_gi",
    isaretUnicode: "𒆳𒉡𒄀𒀀",
    transliterasyon: "KUR.NU.GI.A",
    anlam_tr: "Geri Dönüş Olmayan Ülke (Ölüler Diyarı)",
    anlam_en: "Land of No Return (Underworld)",
    telaffuz: "kur-nu-gi",
    kategori: "mitoloji",
    aciklama: "Ölüler diyarının Sümerce adı. İnanna'nın İniş Destanı'nda geçen temel kavram.",
    kullanim_ornegi: "'İnanna'nın Ölüler Diyarına İnişi' destanında merkezi mekân",
    zorluk: 3
  },
  {
    id: "edin",
    isaretUnicode: "𒂔",
    transliterasyon: "EDIN",
    anlam_tr: "Step / Bozkır / Açık Alan",
    anlam_en: "Steppe / Wilderness / Open Field",
    telaffuz: "edin",
    kategori: "mitoloji",
    aciklama: "Şehir dışı bozkır. 'Eden' kelimesinin aslı olduğu teorize edilir.",
    kullanim_ornegi: "Enkidu'nun yaşadığı vahşi alan; İncil'deki Eden bahçesinin kaynağı olabilir",
    zorluk: 2
  },
  {
    id: "tug",
    isaretUnicode: "𒌆",
    transliterasyon: "TUG2",
    anlam_tr: "Giysi / Kumaş",
    anlam_en: "Garment / Cloth",
    telaffuz: "tüg",
    kategori: "diger",
    aciklama: "Tekstil üretimi Sümer ekonomisinin bel kemiğiydi. Tapınaklar dev dokuma atölyelerine sahipti.",
    kullanim_ornegi: "𒌆𒌆 = TUG.TUG = 'birden çok giysi seti'",
    zorluk: 2
  },
  {
    id: "gestin",
    isaretUnicode: "𒄑𒂆",
    transliterasyon: "GESTIN",
    anlam_tr: "Üzüm / Şarap / Asma",
    anlam_en: "Grape / Wine / Vine",
    telaffuz: "geştin",
    kategori: "diger",
    aciklama: "'GEŠ = ağaç' + 'TIN = hayat' → 'Hayat Ağacı'. Tanrıça Geştinanna'nın adı buradan gelir.",
    kullanim_ornegi: "𒄑𒂆𒈾 = GESTIN.NA = 'asma'",
    zorluk: 2
  }
];

// Kategoriler
const CUNEIFORM_KATEGORILER = [
  { id: "hepsi",    isim: "Tümü",         ikon: "𒀭", renk: "#D4AF37" },
  { id: "tanrilar", isim: "Tanrılar",     ikon: "𒀭", renk: "#9B59B6" },
  { id: "sayilar",  isim: "Sayılar",      ikon: "𒁹", renk: "#E67E22" },
  { id: "doga",     isim: "Doğa",         ikon: "𒀀", renk: "#27AE60" },
  { id: "toplum",   isim: "Toplum",       ikon: "𒈗", renk: "#E74C3C" },
  { id: "eylem",    isim: "Eylemler",     ikon: "𒁺", renk: "#3498DB" },
  { id: "hayvanlar",isim: "Hayvanlar",    ikon: "𒄞", renk: "#795548" },
  { id: "olcu",     isim: "Ölçü",         ikon: "𒄀", renk: "#607D8B" },
  { id: "yazi",     isim: "Yazı & Eğitim",ikon: "𒁾", renk: "#FF9800" },
  { id: "mitoloji", isim: "Mitoloji",     ikon: "𒈨", renk: "#673AB7" },
  { id: "diger",    isim: "Diğer",        ikon: "𒌆", renk: "#78909C" }
];
