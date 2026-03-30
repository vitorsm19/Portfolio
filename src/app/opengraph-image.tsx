import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Vitor Mesquita — Frontend Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  const thunderBold = await fetch(
    new URL('../../public/fonts/Thunder-BoldLC.otf', import.meta.url),
  ).then((res) => res.arrayBuffer())

  const thunderRegular = await fetch(
    new URL('../../public/fonts/Thunder-LC.otf', import.meta.url),
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#030202',
          padding: '80px',
          fontFamily: 'Thunder',
        }}
      >
        {/* Top — label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
            }}
          />
          <span
            style={{
              fontSize: '16px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#10b981',
              fontWeight: 400,
            }}
          >
            Frontend Developer — Available Worldwide
          </span>
        </div>

        {/* Center — name */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span
            style={{
              fontSize: '140px',
              fontWeight: 700,
              color: '#e0e0e0',
              lineHeight: '0.85',
              letterSpacing: '0.03em',
            }}
          >
            VITOR
          </span>
          <span
            style={{
              fontSize: '140px',
              fontWeight: 700,
              color: 'rgba(107,107,107,0.35)',
              lineHeight: '0.85',
              letterSpacing: '0.03em',
            }}
          >
            MESQUITA
          </span>
        </div>

        {/* Bottom — tagline + domain */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              color: '#a3a3a3',
              maxWidth: '500px',
              fontWeight: 400,
            }}
          >
            Building high-performance web products for brands in sports, retail, and tech.
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '1px',
                backgroundColor: '#10b981',
              }}
            />
            <span
              style={{
                fontSize: '14px',
                color: '#6b6b6b',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 400,
              }}
            >
              vitormesquita.com
            </span>
          </div>
        </div>

        {/* Blueprint grid lines */}
        <div
          style={{
            position: 'absolute',
            top: '35%',
            left: '0',
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(107,107,107,0.12)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '65%',
            width: '1px',
            height: '100%',
            backgroundColor: 'rgba(107,107,107,0.12)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: '35%',
            left: '65%',
            transform: 'translate(-50%, -50%)',
            fontSize: '12px',
            color: 'rgba(107,107,107,0.25)',
          }}
        >
          +
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Thunder',
          data: thunderBold,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Thunder',
          data: thunderRegular,
          weight: 400,
          style: 'normal',
        },
      ],
    },
  )
}
