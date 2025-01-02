'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProfileBoard from '@/components/profile/ProfileBoard';

export default function MemberProfilePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ユーザーIDが見つかりません。');
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <ProfileBoard
      userId={id as string}
      isMypage={false}
      activeTab="portfolio" // デフォルトのタブ
      setActiveTab={() => {}} // 必要に応じて実装
    />
  );
} 