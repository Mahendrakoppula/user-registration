import Link from 'next/link';
import React from 'react';

const AdminLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50  ">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/admin"
                className="flex items-center p-2 text-gray-900 rounded-lg   hover:bg-gray-100   group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  height={24}
                  width={24}
                  fill="currentColor"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Registrations
                </span>
                {/* <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  1
                </span> */}
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-dashed rounded-lg  ">{children}</div>
      </div>
    </>
  );
};
export default AdminLayout;

const sidebarArray = [
  {
    name: 'Dashboard',
    href: '/admin',
  },
  {
    name: 'Registration',
    href: '/admin/registration',
  },
];
