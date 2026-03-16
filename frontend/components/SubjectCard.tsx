import React from 'react';
import Link from 'next/link';
import { Subject } from '@/types';
import { Card } from './ui/Card';
import { BookOpen, ArrowRight } from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => {
  return (
    <Link href={`/subjects/${subject.id}`}>
      <Card className="h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden rounded-2xl border border-pink-100">
        {/* Course Thumbnail */}
        {subject.thumbnail ? (
          <div className="relative h-48 overflow-hidden group">
            <img
              src={subject.thumbnail}
              alt={subject.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ) : (
          <div className="relative h-48 bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
            <BookOpen className="h-20 w-20 text-white/80" />
          </div>
        )}
        
        {/* Card Content */}
        <div className="p-6">
          {/* Badge */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              <BookOpen className="h-3 w-3" />
              <span>{subject._count?.sections || 0} Sections</span>
            </div>
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-pink-600 transition-colors">
            {subject.title}
          </h3>
          
          {/* Description */}
          {subject.description && (
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {subject.description}
            </p>
          )}
          
          {/* Learn More Button */}
          <div className="flex items-center text-pink-600 font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
            <span>Start Learning</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </Card>
    </Link>
  );
};
