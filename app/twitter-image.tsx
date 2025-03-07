import { ImageResponse } from '@vercel/og'
import { join } from 'path'
import { readFileSync } from 'fs'

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
    // For Edge runtime, we need to use a different approach
    // We'll create a styled container with the image embedded
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, #000000, #171717)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Use absolute URL to the image in the public directory */}
          <img
            src="https://flexslot.vercel.app/shadcn-showcase.png"
            alt="Shadcn UI Showcase"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
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