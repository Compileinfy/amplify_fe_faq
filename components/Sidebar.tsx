'use client';

import { useEffect, useState } from 'react';
import { useListFaqQuery } from '@/hooks/useGetFaqQuery';
import { useUserGroup, useListUsersQuery } from '@/hooks/useUserGroup';
import { ButtonProps } from '@/types/types';
import Button from './commonComponents/Button';

export default function Sidebar({
  onShowForm,
  onSelectFormId,
  onViewUserAnswers,
}: ButtonProps) {
  const { data: faqList, isLoading, isError } = useListFaqQuery();
  const { getUserGroup } = useUserGroup();
  const [userGroup, setUserGroup] = useState<string | null>(null);

  const [showUsers, setShowUsers] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: users = [], isLoading: userLoading } = useListUsersQuery({
    enabled: showUsers,
  });

  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  useEffect(() => {
    getUserGroup().then(setUserGroup);
  }, [getUserGroup]);

  const filteredUsers = users.filter((user) =>
    `${user.firstname} ${user.lastname} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleUserClick = (userId: string) => {
    setLoadingUserId(userId);
    setActiveUserId(userId);
    setTimeout(() => {
      setLoadingUserId(null);
      onViewUserAnswers(userId);
    }, 10);
  };

  return (
    <aside className="w-64 bg-white border-r min-h-screen flex flex-col justify-between px-4 py-6">
      {/* Content area */}
      <div className="flex-grow overflow-y-auto">
        {/* Create FAQ button */}
        {userGroup === "ADMIN" && !showUsers && (
          <div className="mb-6">
            <Button
              onClick={onShowForm}
              variant="secondary"
              className="w-full px-4 py-2 font-semibold transition"
            >
              Create FAQ
            </Button>
          </div>
        )}

        {/* FAQ List */}
        {!showUsers && (
          <ul className="flex flex-col space-y-2">
            {isLoading && (
              <li className="text-sm text-gray-500">Loading FAQs...</li>
            )}
            {isError && (
              <li className="text-sm text-red-500">Error loading FAQs</li>
            )}
            {faqList?.map((faq) => (
              <li
                key={faq.formId}
                onClick={() => onSelectFormId(faq.formId)}
                className="block px-4 py-2 rounded hover:bg-gray-100 cursor-pointer text-gray-800"
              >
                <b>{faq.title}</b>
              </li>
            ))}
          </ul>
        )}

        {/* User List */}
        {showUsers && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-3 text-sm"
            />

            {userLoading && (
              <p className="text-sm text-gray-500">Loading users...</p>
            )}

            <ul className="space-y-2">
              {filteredUsers.map((user) => (
                <li
                  key={user.userId}
                  onClick={() => handleUserClick(user.userId)}
                  className={`text-sm px-3 py-2 rounded cursor-pointer flex justify-between items-center
                    ${
                      activeUserId === user.userId
                        ? "border border-blue-500 bg-blue-50 font-bold"
                        : "bg-gray-100 text-gray-700"
                    }
                    hover:bg-gray-200 transition`}
                >
                  <div>
                    {user.firstname} {user.lastname}
                    <br />
                    <span className="text-xs">{user.email}</span>
                  </div>
                  {loadingUserId === user.userId && (
                    <svg
                      className="ml-2 h-4 w-4 animate-spin text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                      />
                    </svg>
                  )}
                </li>
              ))}
              {!userLoading && filteredUsers.length === 0 && (
                <li className="text-sm text-gray-500">No users found.</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Sticky toggle button */}
      {userGroup === "ADMIN" && (
        <div className="sticky bottom-4 bg-white pt-4 border-t">
          <Button
            onClick={() => setShowUsers((prev) => !prev)}
            className="w-full px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded hover:bg-blue-200 transition"
          >
            {showUsers ? "View FAQs" : "View Users"}
          </Button>
        </div>
      )}
    </aside>
  );
}
