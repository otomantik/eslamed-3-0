import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
          borderRadius: 36,
        }}
      >
        <div
          style={{
            fontSize: 92,
            fontWeight: 900,
            color: '#FFFFFF',
            fontFamily:
              'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
            lineHeight: 1,
          }}
        >
          E
        </div>
      </div>
    ),
    size
  );
}



