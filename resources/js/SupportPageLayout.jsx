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
      />

      <main style={{ paddingTop: '120px' }}>
        <section style={{ padding: '0 64px 48px 64px', maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' }}>
          <div
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

        <section style={{ padding: '0 64px 80px 64px', maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.7fr) minmax(280px, 0.9fr)', gap: '32px', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {content.sections.map((section) => (
                <article
                  key={section.heading}
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
                    style={{
                      textAlign: 'left',
                      border: 'none',
                      borderRadius: '14px',
                      padding: '14px 16px',
                      backgroundColor: pageKey === link.key ? 'rgba(0,107,94,0.1)' : '#f8fbfa',
                      color: pageKey === link.key ? '#006b5e' : '#5c4039',
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
