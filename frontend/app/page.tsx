'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { SubjectCard } from '@/components/SubjectCard';
import { BookOpen, Code, Layers, Monitor, Sparkles, ArrowRight } from 'lucide-react';
import { Spinner } from '@/components/ui/Spinner';
import { apiClient } from '@/lib/apiClient';
import { Subject } from '@/types';

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
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

    fetchSubjects();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 text-white py-24 md:py-32">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Welcome to Uppskillr
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-pink-100 max-w-3xl mx-auto leading-relaxed">
            Your platform for continuous learning and professional development.
            Master new skills with our expert-curated courses.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/subjects">
              <button className="group bg-white text-pink-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-pink-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center">
                Explore Courses
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            {!isAuthenticated && (
              <Link href="/auth/register">
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Start Learning Free
                </button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Why Choose Uppskillr?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover a better way to learn with our comprehensive platform designed for success
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-b from-pink-50 to-white border border-pink-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-pink-500 to-purple-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Code className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Hands-On Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn by doing with practical projects, real-world examples, and interactive coding exercises
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-b from-purple-50 to-white border border-purple-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Layers className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Structured Content</h3>
              <p className="text-gray-600 leading-relaxed">
                Well-organized courses with clear learning paths and progressive difficulty levels
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-b from-pink-50 to-white border border-pink-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-gradient-to-br from-pink-500 to-purple-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Monitor className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Track Progress</h3>
              <p className="text-gray-600 leading-relaxed">
                Monitor your learning journey with detailed progress tracking and celebrate achievements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-20 bg-gradient-to-b from-white via-pink-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our curated selection of programming and technology courses
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-16">
              <Spinner size="lg" />
            </div>
          ) : subjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {subjects.map((subject) => (
                <SubjectCard key={subject.id} subject={subject} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No courses available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8 text-pink-100">
            Join thousands of learners and master new skills today
          </p>
          <Link href="/auth/register">
            <button className="bg-white text-pink-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-pink-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Get Started for Free
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
