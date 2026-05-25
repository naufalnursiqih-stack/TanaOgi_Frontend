# 🏛️ TanaOgi Frontend

Project ini adalah platform informasi pariwisata Sulawesi Selatan yang dibangun dengan stack modern **Laravel 13**, **Inertia.js**, dan **React**.

## 📂 Struktur Folder

Berikut adalah gambaran struktur folder utama dalam project **TanaOgi**:

TanaOgi/
│
├── 📁 app/
│   │
│   ├── 📁 Http/
│   │   ├── 📁 Controllers/
│   │   │   ├── 📁 Admin/
│   │   │   │   ├── AdminDashboardController.php
│   │   │   │   ├── AdminDestinationController.php
│   │   │   │   ├── AdminRegencyController.php
│   │   │   │   └── AdminAccommodationController.php
│   │   │   ├── HomeController.php
│   │   │   ├── RegencyController.php
│   │   │   ├── DestinationController.php
│   │   │   └── AccommodationController.php
│   │   │
│   │   ├── 📁 Middleware/
│   │   │   ├── HandleInertiaRequests.php
│   │   │   └── EnsureUserIsAdmin.php
│   │   │
│   │   └── 📁 Requests/
│   │       ├── StoreDestinationRequest.php
│   │       ├── UpdateDestinationRequest.php
│   │       ├── StoreAccommodationRequest.php
│   │       └── StoreTransportOptionRequest.php
│   │
│   ├── 📁 Models/
│   │   │   ← Laravel 13: Models sekarang bisa pakai PHP Attributes
│   │   │     menggantikan $table, $fillable, $hidden, dll.
│   │   ├── User.php
│   │   ├── Regency.php
│   │   ├── Destination.php
│   │   ├── DestinationImage.php
│   │   ├── TransportOption.php
│   │   └── Accommodation.php
│   │
│   ├── 📁 Services/
│   │   ├── WhatsAppLinkService.php     ← Generate WA deep-link otomatis
│   │   └── DestinationFilterService.php
│   │
│   └── 📁 Providers/
│       └── AppServiceProvider.php      ← Slim: hanya 1 provider default
│
│
├── 📁 bootstrap/
│   ├── app.php          ← ⚠️ KUNCI Laravel 13: Middleware & routing
│   │                       didaftarkan DI SINI (bukan Kernel.php)
│   ├── providers.php    ← Daftar service providers
│   └── cache/
│       ├── config.php
│       ├── events.php
│       └── routes.php
│
│
├── 📁 config/
│   ├── app.php
│   ├── auth.php
│   ├── cache.php
│   ├── database.php
│   ├── filesystems.php
│   ├── logging.php
│   ├── mail.php
│   ├── queue.php
│   ├── session.php
│   └── inertia.php       ← Konfigurasi Inertia SSR (opsional)
│
│
├── 📁 database/
│   │
│   ├── 📁 migrations/
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   ├── 0001_01_01_000002_create_jobs_table.php
│   │   ├── 2026_05_01_create_regencies_table.php
│   │   ├── 2026_05_02_create_destinations_table.php
│   │   ├── 2026_05_03_create_destination_images_table.php
│   │   ├── 2026_05_04_create_transport_options_table.php
│   │   └── 2026_05_05_create_accommodations_table.php
│   │
│   ├── 📁 seeders/
│   │   ├── DatabaseSeeder.php
│   │   ├── AdminUserSeeder.php
│   │   ├── RegencySeeder.php
│   │   ├── DestinationSeeder.php
│   │   ├── TransportOptionSeeder.php
│   │   └── AccommodationSeeder.php
│   │
│   └── 📁 factories/
│       ├── DestinationFactory.php
│       └── AccommodationFactory.php
│
│
├── 📁 public/
│   ├── 📁 videos/
│   │   ├── hero-sulsel.mp4       ← Video hero utama (720p/1080p)
│   │   └── hero-sulsel-mobile.mp4 ← Versi ringan untuk mobile
│   ├── 📁 images/
│   │   ├── 📁 destinations/      ← Gambar statis fallback
│   │   ├── 📁 accommodations/
│   │   ├── 📁 regencies/
│   │   └── 📁 og/                ← Open Graph images (SEO)
│   ├── build/                    ← Output Vite (auto-generated)
│   ├── index.php
│   └── .htaccess
│
│
├── 📁 resources/
│   │
│   ├── 📁 css/
│   │   ├── app.css               ← Root: @import semua CSS
│   │   │
│   │   ├── 📁 base/
│   │   │   ├── _variables.css    ← Design tokens (colors, fonts, spacing)
│   │   │   ├── _reset.css        ← Modern CSS reset
│   │   │   └── _typography.css   ← Global type scale
│   │   │
│   │   ├── 📁 components/
│   │   │   ├── _preloader.css      ← Tahap 1
│   │   │   ├── _navbar.css
│   │   │   ├── _hero.css           ← Tahap 2
│   │   │   ├── _regency-filter.css ← Tahap 3
│   │   │   ├── _destination-card.css
│   │   │   ├── _transport-form.css ← Tahap 4
│   │   │   ├── _driver-panel.css
│   │   │   ├── _accommodation.css  ← Tahap 5
│   │   │   ├── _button.css
│   │   │   └── _badge.css
│   │   │
│   │   └── 📁 pages/
│   │       ├── _home.css
│   │       ├── _destination-detail.css
│   │       └── _admin.css
│   │
│   ├── 📁 js/
│   │   │
│   │   ├── app.jsx               ← Entry point: Inertia + React mount
│   │   ├── bootstrap.js          ← Axios config, CSRF
│   │   │
│   │   ├── 📁 Components/
│   │   │   │
│   │   │   ├── 📁 Layout/
│   │   │   │   ├── AppLayout.jsx       ← Root layout (Navbar + slot)
│   │   │   │   ├── AdminLayout.jsx     ← Admin panel layout
│   │   │   │   └── Navbar.jsx
│   │   │   │
│   │   │   ├── 📁 Preloader/
│   │   │   │   └── Preloader.jsx
│   │   │   │     ← State: isLoading (true → false saat window.onload)
│   │   │   │     ← Animasi: fade-out 0.5s via CSS transition
│   │   │   │
│   │   │   ├── 📁 Hero/
│   │   │   │   └── HeroSection.jsx
│   │   │   │     ← <video autoPlay loop muted playsInline>
│   │   │   │     ← Overlay + CTA "Explore Now" → scroll ke filter
│   │   │   │
│   │   │   ├── 📁 Regency/
│   │   │   │   ├── RegencyFilter.jsx
│   │   │   │   │ ← State: selectedRegency
│   │   │   │   │ ← Inertia.get('/') dengan params ?regency=bulukumba
│   │   │   │   └── RegencyChip.jsx
│   │   │   │
│   │   │   ├── 📁 Destination/
│   │   │   │   ├── DestinationGrid.jsx
│   │   │   │   └── DestinationCard.jsx
│   │   │   │     ← Link ke /wisata/{slug} via Inertia <Link>
│   │   │   │
│   │   │   ├── 📁 Transport/
│   │   │   │   ├── TransportDecision.jsx
│   │   │   │   │ ← State: hasVehicle (null | 'yes' | 'no')
│   │   │   │   ├── SelfDrivePanel.jsx
│   │   │   │   │ ← Tampil jika hasVehicle === 'yes'
│   │   │   │   │ ← Tombol orange → buka Google Maps URL
│   │   │   │   ├── DriverBookingPanel.jsx
│   │   │   │   │ ← Tampil jika hasVehicle === 'no'
│   │   │   │   │ ← Pilih: Mobil | Bus
│   │   │   │   └── VehicleTypeCard.jsx
│   │   │   │     ← Harga + tombol aqua → WA deep-link
│   │   │   │
│   │   │   ├── 📁 Accommodation/
│   │   │   │   ├── AccommodationToggle.jsx
│   │   │   │   │ ← State: wantStay (false | true)
│   │   │   │   │ ← Checkbox → slide-down animasi CSS
│   │   │   │   └── AccommodationCard.jsx
│   │   │   │     ← Tombol aqua → booking_url eksternal
│   │   │   │
│   │   │   └── 📁 UI/
│   │   │       ├── Button.jsx        ← Variant: primary (orange) | accent (aqua)
│   │   │       ├── Badge.jsx
│   │   │       ├── Divider.jsx
│   │   │       └── LoadingSpinner.jsx
│   │   │
│   │   └── 📁 Pages/
│   │       │   ← Inertia pages: 1 file = 1 route
│   │       ├── Home.jsx                    ← GET /
│   │       ├── DestinationDetail.jsx       ← GET /wisata/{slug}
│   │       │
│   │       └── 📁 Admin/
│   │           ├── Dashboard.jsx           ← GET /admin
│   │           ├── 📁 Destinations/
│   │           │   ├── Index.jsx           ← GET /admin/destinasi
│   │           │   ├── Create.jsx          ← GET /admin/destinasi/tambah
│   │           │   └── Edit.jsx            ← GET /admin/destinasi/{id}/edit
│   │           ├── 📁 Regencies/
│   │           │   ├── Index.jsx
│   │           │   └── Create.jsx
│   │           └── 📁 Accommodations/
│   │               ├── Index.jsx
│   │               ├── Create.jsx
│   │               └── Edit.jsx
│   │
│   └── 📁 views/
│       └── app.blade.php     ← Satu-satunya Blade file (root HTML shell)
│
│
├── 📁 routes/
│   ├── web.php       ← Public routes + Admin routes (via prefix group)
│   └── console.php   ← Artisan command routes (gantikan routes/console.php)
│   ← ⚠️ Laravel 13: TIDAK ada lagi api.php & channels.php secara default
│      Ditambahkan manual jika butuh API atau Broadcasting
│
│
├── 📁 storage/
│   ├── 📁 app/
│   │   └── 📁 public/          ← Upload gambar admin (symlink ke public/)
│   ├── 📁 framework/
│   │   ├── cache/
│   │   ├── sessions/
│   │   └── views/
│   └── 📁 logs/
│       └── laravel.log
│
│
├── 📁 tests/
│   ├── 📁 Feature/
│   │   ├── HomePageTest.php
│   │   ├── DestinationFilterTest.php
│   │   └── AdminCrudTest.php
│   └── 📁 Unit/
│       └── WhatsAppLinkServiceTest.php
│
│
├── .env                  ← DB, APP_KEY, WA_DEFAULT_NUMBER, dll
├── .env.example
├── .gitignore
├── artisan
├── composer.json         ← laravel/framework: ^13.0, PHP: ^8.3
├── composer.lock
├── package.json          ← react, @inertiajs/react, vite
├── package-lock.json
└── vite.config.js        ← laravel/vite-plugin config
