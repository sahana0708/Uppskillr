'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Button } from './ui/Button';
import { BookOpen, LogOut, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-md border-b border-pink-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-lg group-hover:scale-110 transition-transform shadow-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Uppskillr
                </span>
                <p className="text-xs text-gray-500 -mt-1 font-medium">Learning Management System</p>
              </div>
            </Link>

            {isAuthenticated && (
              <div className="hidden md:flex ml-8 space-x-2">
                <Link
                  href="/subjects"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive('/subjects')
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-pink-50'
                  }`}
                >
                  Browse Courses
                </Link>
                <Link
                  href="/profile"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive('/profile')
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-pink-50'
                  }`}
                >
                  My Learning
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center space-x-2 bg-pink-50 px-3 py-1.5 rounded-full">
                  <User className="h-4 w-4 text-pink-600" />
                  <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="border-pink-300 text-pink-600 hover:bg-pink-50 hover:shadow-md transition-all"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  <span className="hidden md:inline">Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-pink-300 text-pink-600 hover:bg-pink-50 hover:shadow-md transition-all"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-md hover:shadow-lg transition-all"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
