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

## 🛠️ Kurulum ve Çalıştırma

Bu projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/salihyildiz08/gezirota-ai.git
cd gezirota-ai
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. API Anahtarını Yapılandırın (ÖNEMLİ ⚠️)

Bu proje Google Gemini API kullanmaktadır. Çalışması için geçerli bir API anahtarına ihtiyacınız vardır.

1.  Projenin ana dizininde `.env` adında bir dosya oluşturun.
2.  [Google AI Studio](https://aistudio.google.com/app/apikey) adresinden ücretsiz bir API anahtarı alın.
3.  `.env` dosyasına anahtarınızı şu formatta ekleyin:

```env
API_KEY=AIzaSyD_Sizin_Gizli_Api_Anahtariniz_Buraya
```

> **Not:** `.env` dosyası `.gitignore` dosyasında ekli olduğu için GitHub'a yüklenmez. Bu sayede anahtarınız güvende kalır.

### 4. Uygulamayı Başlatın

```bash
npm run dev
```

Tarayıcınızda `http://localhost:5173` adresine giderek uygulamayı kullanabilirsiniz.

## ☁️ Vercel ile Yayınlama (Deployment)

Bu projeyi Vercel üzerinde ücretsiz olarak yayınlayabilirsiniz.

1.  Projenizi GitHub'a pushlayın.
2.  [Vercel](https://vercel.com) hesabınıza giriş yapın ve "Add New Project" deyin.
3.  GitHub reponuzu seçin (Import).
4.  **Environment Variables** bölümüne gelin:
    *   **Key:** `API_KEY`
    *   **Value:** `Sizin_Gemini_Api_Anahtariniz`
5.  **Deploy** butonuna basın.

Vercel, projeyi otomatik olarak derleyecek ve size canlı bir link verecektir.

## 👨‍💻 Geliştirici

**Salih Yıldız**
*   GitHub: [@salihyildiz08](https://github.com/salihyildiz08)

---

Bu proje eğitim ve portföy amaçlı geliştirilmiştir.
