'use client';

import { usePathname } from 'next/navigation';
import ProfileDropdown from './ProfileDropdown';

export default function Header() {
  const pathname = usePathname();

  const hideProfile = ['/signin', '/signup'].includes(pathname);

  return (
    <header>
      <nav className="w-full shadow-xl px-6 py-4 flex justify-between items-center">
        <div className="text-3xl font-semibold text-gray-800">HeroFAQ</div>
        {!hideProfile && <ProfileDropdown />}
      </nav>
    </header>
  );
}