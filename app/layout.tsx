import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import './animations.css'
import './fonts.css'
import PageWrapper from './page-wrapper'

const roboto = Roboto({ weight: ['400'], subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://thoroughlycleaned.vercel.app'),
  title: 'Thoroughly Cleaned',
  description:
    'Thoroughly Cleaned provides professional cleaning services for residential, commercial, and biohazard needs, ensuring a spotless and safe environment.',
  keywords: [
    'Thoroughly Cleaned',
    'cleaning services',
    'residential cleaning',
    'commercial cleaning',
    'biohazard cleaning',
    'deep cleaning',
    'move-in cleaning',
    'move-out cleaning',
    'office cleaning',
    'sanitization',
    'disinfection services',
    'hazardous material cleanup',
    'trauma cleanup',
    'crime scene cleaning',
    'industrial cleaning',
    'cleaning company',
    'affordable cleaning services',
    'cleaning near me',
    'trusted cleaning professionals',
    'local cleaning business',
    'licensed cleaning services',
    'insured cleaners',
    'eco-friendly cleaning',
    'pet-friendly cleaning products',
    'odor removal',
    'stain removal',
    'professional cleaning crew',
    'top cleaning service',
    'cleaning in Lynn',
    'best cleaning company in Lynn',
    'scheduled cleaning services',
    'emergency cleaning',
    'specialty cleaning'
  ],
  openGraph: {
    title: 'Thoroughly Cleaned',
    description:
      'Professional cleaning services for all your needs: residential, commercial, and biohazard cleanup. Thoroughly Cleaned ensures your space is pristine and safe.',
    url: 'https://thoroughlycleaned.vercel.app/',
    siteName: 'Thoroughly Cleaned',
    images: [
      {
        url: 'https://thoroughlycleaned.vercel.app/images/cleaning-preview.png',
        width: 1200,
        height: 630,
        alt: 'Thoroughly Cleaned logo'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: 'index, follow'
  },
  applicationName: 'Thoroughly Cleaned',
  appleWebApp: {
    title: 'Thoroughly Cleaned',
    statusBarStyle: 'default',
    capable: true
  },
  alternates: {
    canonical: 'https://thoroughlycleaned.vercel.app'
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'mobile-web-app-capable': 'yes'
  }
}
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  )
}
