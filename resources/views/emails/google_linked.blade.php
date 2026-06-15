<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tautan Akun Google Berhasil</title>
    <style>
        body {
            background-color: #f0fcf7;
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
            border: 1px solid rgba(230, 189, 181, 0.3);
        }
        .header {
            background: linear-gradient(135deg, #F5401B 0%, #FF9900 100%);
            padding: 40px 48px;
            text-align: center;
            position: relative;
        }
        .header img {
            width: 50px;
            height: 50px;
            margin-bottom: 16px;
        }
        .header h1 {
            color: #ffffff;
            font-size: 26px;
            font-weight: 800;
            letter-spacing: -0.02em;
            margin: 0;
        }
        .content {
            padding: 48px;
            color: #131e1b;
        }
        .greeting {
            font-size: 20px;
            font-weight: 700;
            margin-top: 0;
            margin-bottom: 16px;
            color: #131e1b;
        }
        .message {
            font-size: 16px;
            line-height: 1.6;
            color: #5c4039;
            margin-bottom: 32px;
        }
        .info-card {
            background-color: #f0fcf7;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 32px;
            border: 1px solid rgba(179, 32, 0, 0.1);
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            font-size: 14px;
        }
        .info-row:last-child {
            margin-bottom: 0;
        }
        .info-label {
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: rgba(92, 64, 57, 0.7);
            font-size: 11px;
        }
        .info-value {
            font-weight: 600;
            color: #131e1b;
        }
        .badge {
            background-color: rgba(35, 247, 219, 0.2);
            color: #006b5e;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 700;
            display: inline-block;
        }
        .security-note {
            border-top: 1px solid rgba(230, 189, 181, 0.3);
            padding-top: 24px;
            font-size: 13px;
            color: rgba(92, 64, 57, 0.7);
            line-height: 1.5;
        }
        .footer {
            background-color: #f0fcf7;
            padding: 32px 48px;
            text-align: center;
            font-size: 12px;
            color: rgba(92, 64, 57, 0.6);
            border-top: 1px solid rgba(230, 189, 181, 0.2);
        }
        .footer p {
            margin: 0;
            font-weight: 600;
            letter-spacing: 0.05em;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <img src="https://dev-storage.tanaogi.zyy.my.id/logo-light.png" onerror="this.src='https://lh3.googleusercontent.com/aida-public/AB6AXuC5Un9-77fsnpAh97g-3uFPx6ibZ2ekWi4FbAPA_Br76y1Vfl73A15t6IO0I56ExggFzZfI1RpDaEn5murmEJDSWClHM2H5xHEuQXXAkrlbkO6x6b19RzmIA06cnNLpgBrlBxwW7ohRuUZKWcCl2r4uoU8MEDv58M5wskUWnT-ObEDo-41Fjodmv3P5yb4uEKYgjGU8JVQRLD8w4tOoQQS4gZoRBZEWu8UXxVkveyL0HQ4qeYrGncHyK9IK5sBFqDw65V2sf1_MTlM';" alt="TanaOgi Logo">
            <h1>TanaOgi'</h1>
        </div>

        <!-- Content -->
        <div class="content">
            <p class="greeting">Halo, {{ $user->name }}!</p>
            <p class="message">
                Kami ingin menginformasikan bahwa akun Google Anda telah berhasil ditautkan ke akun penjelajah TanaOgi Anda. Sekarang Anda dapat masuk ke platform kami dengan lebih cepat dan aman menggunakan opsi Google Sign-In.
            </p>

            <!-- Info Card -->
            <div class="info-card">
                <div class="info-row">
                    <span class="info-label">Akun Google</span>
                    <span class="info-value">{{ $googleEmail }}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Status</span>
                    <span class="info-value"><span class="badge">AKTIF & TERHUBUNG</span></span>
                </div>
                <div class="info-row">
                    <span class="info-label">Waktu Tautan</span>
                    <span class="info-value">{{ now()->setTimezone('Asia/Jakarta')->format('d M Y, H:i') }} WIB</span>
                </div>
            </div>

            <!-- Security Note -->
            <div class="security-note">
                <strong>Catatan Keamanan:</strong> Jika Anda tidak melakukan tindakan penautan ini atau merasa tidak mengenali aktivitas ini, silakan hubungi tim dukungan kami segera untuk mengamankan akun Anda.
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>© 2026 TANAOGI'. CRAFTED FOR THE CULTURAL EXPLORER.</p>
        </div>
    </div>
</body>
</html>
