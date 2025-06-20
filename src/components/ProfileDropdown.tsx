/*'use client';
import { useState, useRef, useEffect } from 'react';

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center focus:outline-none"
      >
      
        <span className="text-sm font-bold">U</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul className="text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
}
*/

'use client';

import { useState, useRef, useEffect } from 'react';
import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/auth/login');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center focus:outline-none"
      >
        <span className="text-sm font-bold">U</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <ul className="text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-600 font-medium"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}