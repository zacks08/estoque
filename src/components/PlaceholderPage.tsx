import React from 'react';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fadeIn">
      <div className="bg-blue-100 dark:bg-blue-900/20 p-6 rounded-full mb-6">
        <Construction className="h-16 w-16 text-blue-600 dark:text-blue-400" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
        {description}
      </p>
      <div className="mt-8 text-sm text-gray-500 dark:text-gray-500">
        Esta funcionalidade será implementada em breve.
      </div>
    </div>
  );
}