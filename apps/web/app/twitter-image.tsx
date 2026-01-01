import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function TwitterImage() {
  // Reuse the same composition as OpenGraph for consistency
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          background: '#0B1220',
          padding: 64,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 84,
                height: 84,
                borderRadius: 20,
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 50,
                  fontWeight: 900,
                  color: '#FFFFFF',
                  fontFamily:
                    'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
                }}
              >
                E
              </div>
            </div>
            <div
              style={{
                fontSize: 34,
                fontWeight: 800,
                color: '#E5E7EB',
                fontFamily:
                  'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
                letterSpacing: 1,
              }}
            >
              ESLAMED
            </div>
          </div>

          <div
            style={{
              fontSize: 52,
              fontWeight: 800,
              color: '#FFFFFF',
              maxWidth: 820,
              lineHeight: 1.15,
              fontFamily:
                'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
            }}
          >
            Evde Medikal Ekipman Yönlendirme
            <br />
            ve Süreç Yönetimi
          </div>

          <div
            style={{
              fontSize: 22,
              color: '#CBD5E1',
              maxWidth: 820,
              lineHeight: 1.4,
              fontFamily:
                'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
            }}
          >
            Teknik rehberlik ve süreç netliği. Tanı ve tedavi kararı hekimlere aittir.
          </div>
        </div>

        <div
          style={{
            width: 360,
            height: '100%',
            borderRadius: 28,
            background:
              'linear-gradient(180deg, rgba(37,99,235,0.18) 0%, rgba(29,78,216,0.05) 100%)',
            border: '1px solid rgba(148,163,184,0.22)',
          }}
        />
      </div>
    ),
    size
  );
}



