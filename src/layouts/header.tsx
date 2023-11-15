'use client'
import Link from 'next/link'
import cn from 'classnames'
import { Bug } from 'lucide-react'
import { usePathname } from 'next/navigation'

const Header = () => {
  const currentPath = usePathname()

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
              className={cn({
                'text-zinc-900': currentPath === link.href,
                'text-zinc-500': currentPath !== link.href,
                'hover:text-zinc-800 transition-colors': true,
              })}
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
