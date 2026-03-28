import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'IG FB Poster - Comment Management Tool',
  description: 'Manage Instagram and Facebook comments with AI-powered responses'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white border-b border-gray-200">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <div className="font-bold text-xl text-blue-600">IG FB Poster</div>
                <div className="space-x-4">
                  <a href="/features" className="text-gray-600 hover:text-gray-900">Features</a>
                  <a href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
                  <a href="/login" className="text-gray-600 hover:text-gray-900">Login</a>
                  <a href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Sign Up</a>
                </div>
              </div>
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}