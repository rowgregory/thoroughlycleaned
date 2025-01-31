import { cookies } from 'next/headers'
import ReduxWrapper from './redux-wrapper'
import './globals.css'
import { metadata } from './config/metadata'
import { Poppins, Rubik } from 'next/font/google'

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

  return (
    <html lang="en">
      <body className={`${poppins.className} ${rubik.className}`}>
        <ReduxWrapper
          data={{
            isAuthenticated: parsedUserData?.isAuthenticated,
            userId: parsedUserData?.id,
            role: parsedUserData?.role,
            colorCode: parsedUserData?.colorCode
          }}
        >
          {children}
        </ReduxWrapper>
      </body>
    </html>
  )
}

export { metadata }
