import { useState, useRef, useEffect } from 'react';
import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

Amplify.configure(outputs)
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
      document.cookie = 'userId=; Max-Age=0; path=/';
      await signOut();
      router.push('/signin');
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