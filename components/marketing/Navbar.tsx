import Link from 'next/link'

interface NavbarProps {
  projectName?: string
}

export default function Navbar({ projectName = 'V4 - Ig Fb Poster Comment Tool' }: NavbarProps) {
  return (
    <nav className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 max-w-7xl mx-auto w-full">
      <span className="font-bold text-gray-900 text-lg">{projectName}</span>
      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
          Sign in
        </Link>
        <Link
          href="/signup"
          className="text-sm font-medium px-4 py-2 rounded-lg text-white transition-colors"
          style={{ background: 'var(--color-primary)' }}
        >
          Get started
        </Link>
      </div>
    </nav>
  )
}