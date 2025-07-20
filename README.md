# Floonder 🌊

**Sistem Pemantauan Banjir Berbasis GIS untuk Bandung Raya**

Floonder adalah aplikasi Geographic Information System (GIS) yang dirancang khusus untuk memantau kondisi banjir di wilayah Bandung Raya, Indonesia. Aplikasi ini memberikan informasi real-time tentang tingkat banjir, area rawan bencana, dan sistem peringatan dini untuk membantu masyarakat dan pemerintah dalam mitigasi bencana banjir.

## ✨ Fitur Utama

- **Pemetaan Real-time**: Visualisasi kondisi banjir secara langsung di peta interaktif
- **Sistem Peringatan Dini**: Notifikasi otomatis saat terdeteksi potensi banjir
- **Monitoring Curah Hujan**: Pantau intensitas hujan dan prediksi dampaknya
- **Analisis Risiko**: Identifikasi area dengan tingkat risiko banjir tinggi
- **Laporan Masyarakat**: Fitur pelaporan kondisi banjir dari pengguna
- **Dashboard Analytics**: Statistik dan tren data banjir historis
- **Mobile Responsive**: Akses mudah melalui berbagai perangkat

## 🚀 Teknologi yang Digunakan

- **Frontend**: React 18 + Vite
- **Mapping**: Leaflet / MapBox
- **State Management**: Redux Toolkit / Context API
- **UI Components**: Material-UI / Tailwind CSS
- **Data Visualization**: Chart.js / D3.js
- **Build Tool**: Vite
- **Package Manager**: npm / yarn

## 📦 Instalasi

### Prasyarat

- Node.js (versi 16 atau lebih baru)
- npm atau yarn
- Git

### Langkah Instalasi

1. **Clone repository**

   ```bash
   git clone https://github.com/username/floonder.git
   cd floonder
   ```

2. **Install dependencies**

   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit file `.env.local` dan sesuaikan dengan konfigurasi Anda:

   ```env
   VITE_MAP_API_KEY=your_map_api_key
   VITE_WEATHER_API_KEY=your_weather_api_key
   VITE_API_BASE_URL=https://api.floonder.com
   ```

4. **Jalankan development server**

   ```bash
   npm run dev
   # atau
   yarn dev
   ```

5. **Buka aplikasi**

   Akses http://localhost:5173 di browser Anda

## 🏗️ Build untuk Production

```bash
# Build aplikasi
npm run build
# atau
yarn build

# Preview build
npm run preview
# atau
yarn preview
```

## 📊 Data Sources

- **Data Curah Hujan**: BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)
- **Data Topografi**: BIG (Badan Informasi Geospasial)
- **Data Sungai**: Dinas PU Jabar
- **Laporan Masyarakat**: User-generated content

## 🐛 Bug Reports

Jika Anda menemukan bug, silakan buat issue di GitHub dengan informasi:

- Deskripsi bug
- Langkah reproduksi
- Screenshot (jika perlu)
- Browser/device yang digunakan

## 📄 Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 👥 Tim Pengembang

- **Project Lead**: [Aisha Nur Izzati]
- **Frontend Developer**: [Rio Ragil Ramdani]
- **GIS Specialist**: [Rahman Hakim]
- **UI/UX Designer**: [Dewi Puspita]

## 📞 Kontak

- **Email**: info@floonder.com
- **Website**: https://floonder.com
- **GitHub**: https://github.com/Yoshirmdn/GIS-MAPID
- **Issue Tracker**: https://github.com/Yoshirmdn/GIS-MAPID/issues

## 🙏 Acknowledgments

Terima kasih kepada:

- BMKG untuk data cuaca dan iklim
- Pemerintah Kota Bandung untuk dukungan data
- Komunitas open source yang telah berkontribusi
- Seluruh beta tester dan pengguna awal

---

**Floonder** - Melindungi Bandung dari Banjir dengan Teknologi GIS 🌊🗺️
