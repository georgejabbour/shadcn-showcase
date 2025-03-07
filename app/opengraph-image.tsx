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
    // Create a stylish text-based OG image with gradient to bottom right
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #0f172a, #1e293b, #334155)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background decorative elements */}
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent 70%)',
            top: '-50px',
            right: '-50px',
          }} />
          <div style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(244, 114, 182, 0.15), transparent 70%)',
            bottom: '50px',
            left: '100px',
          }} />
          
          {/* Main title with gradient text */}
          <div
            style={{
              fontSize: '90px',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '30px',
              background: 'linear-gradient(to right, #f472b6, #818cf8)',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitBackgroundClip: 'text',
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}
          >
            Shadcn UI Showcase
          </div>
          
          {/* Subtitle */}
          <div
            style={{
              fontSize: '36px',
              color: '#e2e8f0',
              textAlign: 'center',
              maxWidth: '800px',
              lineHeight: 1.4,
              textShadow: '0 1px 5px rgba(0,0,0,0.3)',
            }}
          >
            A theme generator and showcase of components built with Shadcn UI
          </div>
          
          {/* Bottom accent line */}
          <div style={{
            position: 'absolute',
            bottom: '40px',
            width: '200px',
            height: '4px',
            background: 'linear-gradient(to right, #f472b6, #818cf8)',
            borderRadius: '2px',
          }} />
        </div>
      ),
      {
        ...size,
      }
    )
  } catch (error) {
    console.error('Error generating OpenGraph image:', error)
    
    // Fallback to a simpler text-based image
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #0f172a, #334155)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
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