import type { Metadata } from 'next'
import '../styles/globals.css'
import '../styles/comic.css'
import CustomCursor from '@/components/ui/CustomCursor'
import FilmGrain from '@/components/ui/FilmGrain'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: {
    default: 'Dr. Muhammad Usama — Classroom Universe',
    template: '%s | Dr. Usama',
  },
  description:
    'A centralized academic knowledge platform for Generative AI, Computer Architecture, and Data Science courses taught by Dr. Muhammad Usama.',
  keywords: ['Generative AI', 'Computer Architecture', 'Data Science', 'UAF', 'Dr. Muhammad Usama'],
  openGraph: {
    title: 'Dr. Muhammad Usama — Classroom Universe',
    description: 'All course materials, chapters, and resources in one comic-ink powered platform.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F7F5EE] text-ink-900 antialiased">
        <CustomCursor />
        <FilmGrain />
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              fontFamily: "'Lato', sans-serif",
              border: '2px solid #2C2C2A',
              boxShadow: '3px 3px 0 #D85A30',
              borderRadius: '4px',
              background: '#fff',
              color: '#2C2C2A',
            },
          }}
        />
      </body>
    </html>
  )
}
