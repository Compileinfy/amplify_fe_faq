'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useUserGroup } from '@/hooks/useUserGroup';
import ProfileDropdown from './ProfileDropdown';

export default function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();
  const hideProfile = ['/signin', '/signup'].includes(pathname);

  const { getUserGroup } = useUserGroup();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const group = await getUserGroup();
        if (group === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error('Failed to get group:', err);
      }
    };

    fetchGroup();
  }, [getUserGroup]);

  return (
    <header>
      <nav className="w-full shadow-xl px-6 py-4 relative flex items-center justify-between bg-white">
        {/* Left: App Name */}
        <div className="text-3xl font-semibold text-gray-800">HeroFAQ</div>

        {/* Center: Hello Admin (shown only if admin) */}
        {isAdmin && (
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <span className="text-red-600 font-bold text-2xl">Hello Admin</span>
          </div>
        )}

        {/* Right: Profile Dropdown */}
        {!hideProfile && <ProfileDropdown />}
      </nav>
    </header>
  );
}
