'use client';
import { useState, useRef, useEffect } from 'react';

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
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
        {/* Placeholder for avatar or icon */}
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
