import { ImageResponse } from '@vercel/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'Shadcn UI Showcase'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            backgroundImage: 'linear-gradient(to bottom, #000000, #171717)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src="https://flexslot.vercel.app/shadcn-showcase.png"
            alt="Shadcn UI Showcase"
            width={1200}
            height={630}
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
      ),
      {
        ...size,
      }
    )
  } catch (error) {
    console.error('Error generating Twitter image:', error)
    
    // Fallback to a simple text-based image
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 128,
            background: 'linear-gradient(to bottom, #000000, #171717)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          <div
            style={{
              fontSize: '60px',
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Shadcn UI Showcase
          </div>
        </div>
      ),
      {
        ...size,
      }
    )
  }
} 