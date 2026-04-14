# 𒀭 Sümer — Mezopotamya Keşif Atlası

> İnsanlığın ilk medeniyetini interaktif harita, tanrı soyağacı ve çivi yazısı modülleriyle keşfedin.

🌐 **Canlı Demo:** [https://erdemalpar.github.io/sumer/](https://erdemalpar.github.io/sumer/)

---

## 📸 Ekran Görüntüleri

| Harita | Tanrılar | Çivi Yazısı | Tarih |
|--------|----------|-------------|-------|
| CBS haritası, şehir markerları, nehirler | 380 tanrı kart galerisi + soy ağacı | Çevirme kartları + Quiz | Kronoloji & istatistikler |

---

## 🗺️ Özellikler

### 🌍 İnteraktif CBS Haritası
- **Leaflet.js** tabanlı karanlık harita (CartoDB Dark Matter)
- **20 Sümer şehri** — Uruk, Ur, Nippur, Eridu ve daha fazlası
- **Dicle & Fırat** nehir güzergâhları
- **Sümer & Akkad** medeniyet sınırları
- **Zaman Yolculuğu Slider** — MÖ 4000'den Ur III dönemine kadar tarihi geçiş
- Katman aç/kapat (şehirler, nehirler, sınırlar)
- Şehre tıklayınca açıklama, tanrı bağlantıları ve tarihsel notlar

### 𒀭 Tanrı Soyağacı
- **380 Sümer tanrısı** kart galerisinde listelenir
- 6 kategori filtresi: Yaratıcı, Yönetici, Büyük, Küçük, Yarı Tanrı, Demon/Ruh
- Tanrıya tıklayınca sol panelde **detay bilgisi + mini SVG soy ağacı**
- Ebeveynler ↑ — Tanrı — Çocuklar ↓ hiyerarşisi
- Ebeveyn/eş/çocuk rozetlerine tıklayarak ilgili tanrıya erişim
- Arama kutusuyla ada, role veya şehre göre filtreleme

### 𒁾 Çivi Yazısı Öğretici
- **45 çivi yazısı işareti** — 11 farklı kategori
- **3D kart çevirme animasyonu** — Ön yüz işareti, arka yüz Türkçe anlam
- Kategori filtreleri (Tanrılar, Sayılar, Doğa, Toplum, Eylemler…)
- **Quiz Modu** — 4 şıklı soru, skor takibi, anlık geri bildirim
- Arama alanı (transliterasyon veya Türkçe anlam ile)

### 📜 Tarih Kronolojisi
- MÖ ~10.000 tarım devriminden Hammurabi'ye uzanan zaman serisi
- İnteraktif olay kartları, tarihi notlar
- İstatistik dashboard: çivi yazısı, tanrı sayısı, kil tablet arşivi, sayı sistemi

---

## 🛠️ Teknoloji Yığını

| Araç | Kullanım |
|------|----------|
| [Leaflet.js](https://leafletjs.com/) v1.9.4 | CBS harita motoru |
| [D3.js](https://d3js.org/) *(opsiyonel)* | Ağaç görselleştirme |
| Vanilla HTML/CSS/JS | Tüm uygulama |
| CartoDB Dark Matter | Harita tile katmanı |
| Google Fonts (Cinzel, Inter) | Tipografi |
| Noto Sans Cuneiform | Çivi yazısı karakterleri |

**Sunucu gerektirmez** — tamamen statik, `file://` veya GitHub Pages üzerinde çalışır.

---

## 📁 Proje Yapısı

```
sumer/
├── index.html              # Ana uygulama shell
├── style.css               # Kil tablet teması (~2000 satır)
├── tanrilar.json           # Ham tanrı verisi (380 tanrı)
├── data/
│   ├── cities.js           # 20 Sümer şehri (koordinat + metadata)
│   ├── cuneiform_signs.js  # 45 çivi yazısı işareti
│   └── tanrilar_veri.js    # Tanrı verisi (JS formatı, CORS-free)
└── js/
    ├── app.js              # Ana uygulama kontrolcüsü
    ├── map.js              # Leaflet harita modülü
    ├── tanrilar.js         # Tanrı kart galerisi + mini soy ağacı
    └── cuneiform.js        # Çivi yazısı kartları + quiz
```

---

## 🚀 Yerel Çalıştırma

```bash
# Doğrudan tarayıcıda açın
open index.html

# Veya basit bir HTTP sunucusu ile
python3 -m http.server 8000
# → http://localhost:8000
```

---

## 📊 Veri Kaynakları

- **ETCSL** — Electronic Text Corpus of Sumerian Literature (Oxford)
- **ORACC** — Open Richly Annotated Cuneiform Corpus
- **CDLI** — Cuneiform Digital Library Initiative
- **Ancient History Encyclopedia** — Şehir koordinatları ve tarihi notlar
- Sümer tanrı veritabanı akademik literatür taranarak derlenmiştir

---

## 🎨 Tasarım Felsefesi

Uygulama, **kil tablet estetiği** üzerine kurulmuştur:
- Toprak tonları (amber, sienna, umber) ve altın detaylar
- Glassmorphism ve backdrop-blur efektleri
- `Cinzel Decorative` tipografisi — antik taş yazıt hissi
- Mikro animasyonlar ve hover geçişleri

---

## 📄 Lisans

MIT — Erdem Alpar © 2026
