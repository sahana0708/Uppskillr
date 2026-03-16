'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { SubjectCard } from '@/components/SubjectCard';
import { Spinner } from '@/components/ui/Spinner';
import { apiClient } from '@/lib/apiClient';
import { Subject } from '@/types';

export default function SubjectsPage() {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
    };
    verifyAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push('/auth/login');
      return;
    }

    const fetchSubjects = async () => {
      try {
        const response = await apiClient.get('/subjects');
        setSubjects(response.data);
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchSubjects();
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Browse Courses
      </h1>
      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : subjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 py-12">
          No courses available at the moment.
        </p>
      )}
    </div>
  );
}
