'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ProfileBoard from '@/components/profile/ProfileBoard';
import { Profile } from '@/types/form';
import Link from 'next/link';
import { FileText, Bell } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [profile, setProfile] = useState<Profile | null>(null);
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
          .select('*')
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

  if (!profile) return null;

  return (
    <div>
      <div className="bg-white shadow-sm py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">My Page</h1>
          <div className="flex gap-6">
            <Link href="/profile/document-submission" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <FileText className="w-5 h-5" />
              <span>書類申請</span>
            </Link>
            <Link href="/profile/notifications" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
              <Bell className="w-5 h-5" />
              <span>通知</span>
            </Link>
          </div>
        </div>
      </div>

      <ProfileBoard
        initialProfile={profile}
        isMypage={true}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
} 