
import { Inter, Roboto_Mono } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import CustomCursor from '@/components/CustomCursor'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export const metadata = {
  title: 'Dev Portfolio Showcase',
  description: 'A professional portfolio showcasing developer skills and projects',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-950 transition-colors duration-300">
        <ThemeProvider>
          <CustomCursor />
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
