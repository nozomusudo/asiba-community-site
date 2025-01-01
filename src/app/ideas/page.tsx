'use client';

import { useState } from 'react';
import RaindropTab from '@/components/ideas/RaindropTab';
import BookshelfTab from '@/components/ideas/BookshelfTab';
import IdeasTab from '@/components/ideas/IdeasTab';

export default function IdeasPage() {
  const [activeTab, setActiveTab] = useState('raindrop');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('raindrop')}
              className={`py-4 ${
                activeTab === 'raindrop'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Raindrop
            </button>
            <button
              onClick={() => setActiveTab('bookshelf')}
              className={`py-4 ${
                activeTab === 'bookshelf'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Bookshelf
            </button>
            <button
              onClick={() => setActiveTab('ideas')}
              className={`py-4 ${
                activeTab === 'ideas'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Ideas
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'raindrop' && <RaindropTab />}
        {activeTab === 'bookshelf' && <BookshelfTab />}
        {activeTab === 'ideas' && <IdeasTab />}
      </div>
    </div>
  );
} 