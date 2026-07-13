import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function SupportPageLayout({
  pageKey,
  content,
  onNavigateHome,
  onNavigateLogin,
  onNavigateRegister,
  onNavigateDestinations,
  onNavigateExperiences,
  onNavigateCulture,
  onNavigateJournal,
  onNavigateTravelGuide,
  onNavigateSustainability,
  onNavigateAbout,
  onNavigatePressKit,
  onNavigatePrivacyPolicy,
  onNavigateTerms,
  currentUser,
  onLogout,
}) {
  const font = "'Plus Jakarta Sans', sans-serif";

  const quickLinks = [
    { label: 'Panduan Perjalanan', key: 'travel-guide', action: onNavigateTravelGuide },
    { label: 'Keberlanjutan', key: 'sustainability', action: onNavigateSustainability },
    { label: 'Tentang Kami', key: 'about', action: onNavigateAbout },
    { label: 'Press Kit', key: 'press-kit', action: onNavigatePressKit },
    { label: 'Kebijakan Privasi', key: 'privacy', action: onNavigatePrivacyPolicy },
    { label: 'Syarat & Ketentuan', key: 'terms', action: onNavigateTerms },
  ];

  return (
    <div style={{ fontFamily: font, backgroundColor: '#f0fcf7', color: '#131e1b', minHeight: '100vh' }}>
      <style>{`
        .support-card {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .support-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 30px 60px rgba(19,30,27,0.08) !important;
          border-color: rgba(0, 107, 94, 0.2) !important;
        }
        .sidebar-link {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .sidebar-link:hover {
          background-color: rgba(0, 107, 94, 0.08) !important;
          color: #006b5e !important;
          transform: translateX(6px);
          box-shadow: 0 4px 12px rgba(0, 107, 94, 0.05);
        }
        .sidebar-link.active-link {
          background-color: rgba(0, 107, 94, 0.12) !important;
          color: #006b5e !important;
          border-left: 3px solid #006b5e !important;
          padding-left: 13px !important;
        }
        .sidebar-link.active-link:hover {
          background-color: rgba(0, 107, 94, 0.18) !important;
          transform: none;
        }
        .header-gradient-box {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 968px) {
          .support-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .support-aside {
            position: static !important;
            order: -1; 
            margin-bottom: 8px;
          }
          .responsive-padding-top {
            padding-top: 100px !important;
          }
          .responsive-section-padding {
            padding: 0 24px 32px 24px !important;
          }
          .responsive-header-padding {
            padding: 40px 24px !important;
            border-radius: 24px !important;
          }
          .responsive-title {
            font-size: 32px !important;
          }
          .responsive-subtitle {
            font-size: 15px !important;
          }
        }
      `}</style>
      <Navbar
        activePage=""
        onNavigateHome={onNavigateHome}
        onNavigateLogin={onNavigateLogin}
        onNavigateRegister={onNavigateRegister}
        onNavigateDestinations={onNavigateDestinations}
        onNavigateExperiences={onNavigateExperiences}
        onNavigateCulture={onNavigateCulture}
        onNavigateJournal={onNavigateJournal}
        currentUser={currentUser}
        onLogout={onLogout}
        wishlistCount={wishlistCount}
        onWishlistToggle={onWishlistToggle}
      />

      <main className="responsive-padding-top" style={{ paddingTop: '120px' }}>
        <section className="responsive-section-padding" style={{ padding: '0 64px 48px 64px', maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' }}>
          <div
            className="header-gradient-box responsive-header-padding"
            style={{
              background: 'linear-gradient(135deg, rgba(0,107,94,0.08) 0%, rgba(179,32,0,0.06) 100%)',
              borderRadius: '32px',
              padding: '64px',
              border: '1px solid rgba(0,107,94,0.12)',
              boxShadow: '0 24px 60px rgba(19,30,27,0.06)'
            }}
          >
            <span
              style={{
                display: 'inline-block',
                marginBottom: '20px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: '#006b5e'
              }}
            >
              {content.eyebrow}
            </span>
            <h1
              className="responsive-title"
              style={{
                margin: '0 0 20px 0',
                fontSize: '56px',
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                fontWeight: 800,
                maxWidth: '840px'
              }}
            >
              {content.title}
            </h1>
            <p
              className="responsive-subtitle"
              style={{
                margin: 0,
                maxWidth: '760px',
                fontSize: '18px',
                lineHeight: 1.8,
                color: '#4f5f57'
              }}
            >
              {content.subtitle}
            </p>
            <p
              style={{
                margin: '24px 0 0 0',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#5c4039'
              }}
            >
              Diperbarui: {content.lastUpdated}
            </p>
          </div>
        </section>

        <section className="responsive-section-padding" style={{ padding: '0 64px 80px 64px', maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' }}>
          <div className="support-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.7fr) minmax(280px, 0.9fr)', gap: '32px', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {content.sections.map((section) => (
                <article
                  key={section.heading}
                  className="support-card"
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '24px',
                    padding: '32px',
                    border: '1px solid rgba(19,30,27,0.06)',
                    boxShadow: '0 18px 40px rgba(19,30,27,0.05)'
                  }}
                >
                  <h2
                    style={{
                      margin: '0 0 16px 0',
                      fontSize: '28px',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      color: '#131e1b'
                    }}
                  >
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph, index) => (
                    <p
                      key={`${section.heading}-${index}`}
                      style={{
                        margin: index === section.paragraphs.length - 1 ? 0 : '0 0 14px 0',
                        fontSize: '16px',
                        lineHeight: 1.85,
                        color: '#4f5f57'
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </article>
              ))}
            </div>

            <aside
              className="support-aside"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '28px',
                border: '1px solid rgba(19,30,27,0.06)',
                boxShadow: '0 18px 40px rgba(19,30,27,0.05)',
                position: 'sticky',
                top: '110px'
              }}
            >
              <p
                style={{
                  margin: '0 0 20px 0',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: '#006b5e'
                }}
              >
                Link Terkait
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {quickLinks.map((link) => (
                  <button
                    key={link.key}
                    type="button"
                    onClick={() => link.action && link.action()}
                    className={`sidebar-link ${pageKey === link.key ? 'active-link' : ''}`}
                    style={{
                      textAlign: 'left',
                      border: 'none',
                      borderRadius: '14px',
                      padding: '14px 16px',
                      backgroundColor: '#f8fbfa',
                      color: '#5c4039',
                      fontSize: '15px',
                      fontWeight: pageKey === link.key ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer
        onNavigateHome={onNavigateHome}
        onNavigateDestinations={onNavigateDestinations}
        onNavigateExperiences={onNavigateExperiences}
        onNavigateCulture={onNavigateCulture}
        onNavigateJournal={onNavigateJournal}
        onNavigateTravelGuide={onNavigateTravelGuide}
        onNavigateSustainability={onNavigateSustainability}
        onNavigateAbout={onNavigateAbout}
        onNavigatePressKit={onNavigatePressKit}
        onNavigatePrivacyPolicy={onNavigatePrivacyPolicy}
        onNavigateTerms={onNavigateTerms}
      />
    </div>
  );
}
