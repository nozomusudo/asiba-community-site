import { Edit, Mail, Twitter, Globe, RefreshCw, Instagram, FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ProjectModal from './ProjectModal';
import { supabase } from '@/lib/supabase';

type ProfileHeaderProps = {
  initialProfile: any;
  isMypage?: boolean;
};

export default function ProfileHeader({ initialProfile, isMypage = false }: ProfileHeaderProps) {
  const [profile, setProfile] = useState(initialProfile);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error.message);
        return;
      }

      setProfile(profileData);
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>; // or any loading indicator
  }

  return (
    <div className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-start gap-8">
          {/* アバターと基本情報 */}
          <div className="flex-shrink-0">
            <div className="relative w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
              {profile.avatar_url && (
                <Image
                  src={profile.avatar_url}
                  alt={profile.name_kanji}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="mt-4 flex justify-center">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {profile.role || 'メンバー'}
              </span>
            </div>
          </div>

          {/* 名前と基本情報 */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{profile.name_kanji}</h1>
                <p className="text-gray-500">{profile.name_english}</p>
                <p className="mt-2 text-gray-600">{profile.organization}</p>
              </div>
              {isMypage && (
                <div className="flex gap-2">
                  <Link
                    href="/profile/edit"
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                  >
                    <Edit className="w-4 h-4" />
                    編集
                  </Link>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    プロジェクト登録
                  </button>
                </div>
              )}
            </div>

            <p className="text-gray-500">{profile.bio}</p>

            {/* 連絡先 */}
            <div className="mt-4 flex gap-4">
              {profile.twitter_url && (
                <a
                  href={profile.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-500 hover:text-gray-900"
                >
                  <Twitter className="w-5 h-5 fill-current" />
                </a>
              )}
              {profile.instagram_url && (
                <a
                  href={profile.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-500 hover:text-gray-900"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {profile.note_url && (
                <a
                  href={profile.note_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-500 hover:text-gray-900"
                >
                  <FileText className="w-5 h-5" />
                </a>
              )}
            </div>

          </div>
        </div>
      </div>
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
} 