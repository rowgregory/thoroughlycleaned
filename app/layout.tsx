import { cookies } from 'next/headers'
import ReduxWrapper from './redux-wrapper'
import './globals.css'
import { metadata } from './config/metadata'
import { Poppins, Rubik } from 'next/font/google'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { createLog } from './utils/logHelper'
import parseErrorStack from './utils/parseErrorStack'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '500', '600', '700'],
  style: ['normal'],
  display: 'swap',
  preload: false
})

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  display: 'swap',
  preload: false
})

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const userData = cookieStore.get('userData')

  let parsedUserData
  if (userData?.value) {
    parsedUserData = JSON.parse(userData?.value)
  }

  let data
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/text-block/fetch-home-page-data`)
    data = await response.json()
  } catch (error: any) {
    await createLog('error', `Failed to application data: ${error.message}`, 'Unknown', 12001, {
      errorLocation: parseErrorStack(error),
      errorMessage: error.message,
      errorName: error.name || 'UnknownError',
      timestamp: new Date().toISOString(),
      url: '/api/text-block/fetch-home-page-data',
      method: 'GET'
    })
  }

  return (
    <html lang="en">
      <body className={`${poppins.className} ${rubik.className}`}>
        <ReduxWrapper
          data={{
            isAuthenticated: parsedUserData?.isAuthenticated,
            userId: parsedUserData?.id,
            role: parsedUserData?.role,
            colorCode: parsedUserData?.colorCode,
            data
          }}
        >
          {children}
        </ReduxWrapper>
      </body>
    </html>
  )
}

export { metadata }
