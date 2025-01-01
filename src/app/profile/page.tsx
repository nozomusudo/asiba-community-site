'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ProfileHeader from '@/components/profile/ProfileHeader';
import PortfolioTab from '@/components/profile/PortfolioTab';
import BookshelfTab from '@/components/profile/BookshelfTab';
import IdeasTab from '@/components/profile/IdeasTab';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push('/login');
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select(`
            id,
            name_kanji,
            name_english,
            email,
            avatar_url,
            organization,
            twitter_url,
            portfolio_url,
            skills,
            role,
            updated_at
          `)
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          setError('プロフィールの読み込みに失敗しました。');
          return;
        }

        setProfile(profileData);
        setLoading(false);
      } catch (error) {
        console.error('Unexpected error:', error);
        setError('予期せぬエラーが発生しました。');
      }
    };

    fetchProfile();
  }, [router]);

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
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader profile={profile} />

      {/* タブナビゲーション */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`py-4 ${
                activeTab === 'portfolio'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ポートフォリオ
            </button>
            <button
              onClick={() => setActiveTab('bookshelf')}
              className={`py-4 ${
                activeTab === 'bookshelf'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              読書棚
            </button>
            <button
              onClick={() => setActiveTab('ideas')}
              className={`py-4 ${
                activeTab === 'ideas'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              アイデアボード
            </button>
          </nav>
        </div>
      </div>

      {/* タブコンテンツ */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'portfolio' && <PortfolioTab profile={profile} />}
        {activeTab === 'bookshelf' && <BookshelfTab profile={profile} />}
        {activeTab === 'ideas' && <IdeasTab profile={profile} />}
      </div>
    </div>
  );
} 