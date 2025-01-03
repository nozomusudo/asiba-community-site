import React from 'react';
import { Bell } from 'lucide-react';

const NotificationsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-xl font-bold">通知</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-gray-500" />
            <h2 className="text-lg font-bold">最近の通知</h2>
          </div>
          <div className="mt-4 space-y-4">
            {[1, 2, 3].map((notification) => (
              <div key={notification} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">通知内容がここに表示されます。</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage; 