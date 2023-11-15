import Link from 'next/link'
import { Bug } from 'lucide-react'

const Header = () => {
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ]
  return (
    <nav className="flex space-x-6 border-b mb-8 px-5 h-14 items-center">
      <Link href="/">
        <Bug width={24} height={24} />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-zinc-500 hover:text-zinc-800"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Header
