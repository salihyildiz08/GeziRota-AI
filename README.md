# 🌍 Salih Yıldız GeziRota AI

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white)

**GeziRota AI**, Google Gemini yapay zeka teknolojisini kullanarak kişiselleştirilmiş, detaylı ve akıllı seyahat planları oluşturan modern bir web uygulamasıdır.

🔗 **Canlı Demo:** [Vercel Linkiniz Buraya Gelecek]

## 🚀 Özellikler

*   **Akıllı Rota Planlama:** Gideceğiniz ülke, şehir ve gün sayısına göre saniyeler içinde optimize edilmiş gezi programı.
*   **Lojistik ve Ulaşım Detayları:** 
    *   Havalimanından otele, otelden gezi noktalarına nokta atışı ulaşım tarifleri (Otobüs numarası, metro hattı vb.).
    *   Araç kiralama tavsiyeleri ve otopark bilgileri.
*   **İnteraktif Rota Yönetimi:**
    *   "Alternatif Rota Önerileri" ile yapay zekanın sunduğu ekstra mekanları tek tıkla rotanın en mantıklı zaman dilimine ekleme.
    *   Rotayı düzenleme ve güncelleme imkanı.
*   **Lezzet Rehberi:** Şehre özel yemek, tatlı ve içecek önerileri.
*   **Modern Arayüz:** Responsive, kullanıcı dostu ve şık tasarım.
*   **Yazdırma Desteği:** Oluşturulan planı PDF olarak kaydetme veya yazdırma özelliği.

## 🔑 API Anahtarı Kurulumu (Adım Adım)

Bu projenin çalışması için Google Gemini API anahtarı gereklidir.

### 1. API Anahtarını Alma
1.  [Google AI Studio](https://aistudio.google.com/app/apikey) adresine gidin.
2.  Google hesabınızla giriş yapın.
3.  **"Get API key"** butonuna tıklayın ve yeni bir anahtar oluşturun.
4.  `AIza` ile başlayan bu kodu kopyalayın.

### 2. Yerel Ortamda (Localhost) Çalıştırma
1.  Projeyi klonlayın ve klasöre girin:
    ```bash
    git clone https://github.com/salihyildiz08/gezirota-ai.git
    cd gezirota-ai
    npm install
    ```
2.  Ana dizinde `.env` adında bir dosya oluşturun.
3.  İçine anahtarınızı yapıştırın:
    ```env
    API_KEY=AIzaSyD_Sizin_Kopyaladiginiz_Anahtar
    ```
4.  Uygulamayı başlatın:
    ```bash
    npm run dev
    ```

## ☁️ Vercel'de Yayınlama ve Token Ayarı

Projeyi Vercel'e yükledikten sonra API anahtarını tanımlamanız gerekir.

1.  **Vercel Paneline Girin:** Projenizi seçin ve **Settings** sekmesine tıklayın.
2.  **Environment Variables:** Sol menüden bu seçeneği seçin.
3.  **Değişkeni Ekleyin:**
    *   **Key:** `API_KEY`
    *   **Value:** `AIza...` (Google'dan aldığınız anahtar)
    *   **Save** butonuna basın.
4.  **ÖNEMLİ:** Anahtarı ekledikten sonra **Deployments** sekmesine gidip, son deployment'ın yanındaki üç noktaya basarak **Redeploy** yapın. Aksi halde uygulama anahtarı görmeyebilir.

## 👨‍💻 Geliştirici

**Salih Yıldız**
*   GitHub: [@salihyildiz08](https://github.com/salihyildiz08)

---

Bu proje eğitim ve portföy amaçlı geliştirilmiştir.