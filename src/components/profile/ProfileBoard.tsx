import { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import PortfolioTab from './PortfolioTab';
import BookshelfTab from './BookshelfTab';
import IdeasTab from './IdeasTab';
import { supabase } from '@/lib/supabase';
import { Profile } from '@/types/form';


type ProfileBoardProps = {
  initialProfile?: Profile;
  userId?: string;
  isMypage: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function ProfileBoard({ initialProfile, userId, isMypage, activeTab, setActiveTab }: ProfileBoardProps) {
  const [profile, setProfile] = useState(initialProfile);
  const [projects, setProjects] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfileData = async (userId: string | undefined) => {
      if (!profile && userId) {
        try {
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

          if (error) {
            console.error('Error fetching profile:', error.message);
            return;
          }

          setProfile(profileData);
        } catch (error) {
          console.error('Unexpected error:', error);
        }
      }
    };

    const fetchProjects = async () => {
      if (profile) {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('leader', profile.id);

        if (error) {
          console.error('Error fetching projects:', error);
        } else {
          setProjects(data || []);
        }
      }
    };

    const fetchBooks = async () => {
      if (profile) {
        const { data, error } = await supabase
          .from('books')
          .select('*')
          .eq('added_by', profile.id);

        if (error) {
          console.error('Error fetching books:', error);
        } else {
          setBooks(data || []);
        }
      }
    };

    fetchProfileData(userId);
    fetchProjects();
    fetchBooks();
  }, [profile, userId]);

  const likeBook = async (bookId: string) => {
    const { data, error } = await supabase
      .from('books')
      .update({ likes: supabase.raw('likes + 1') })
      .eq('id', bookId);

    if (error) {
      console.error('Error liking book:', error);
    } else {
      console.log('Book liked:', data);
    }
  };

  if (!profile) {
    return <div></div>; // ローディングインジケーター
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader initialProfile={profile} isMypage={isMypage} />

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
        {activeTab === 'portfolio' && <PortfolioTab profile={profile} projects={projects} />}
        {activeTab === 'bookshelf' && <BookshelfTab profile={profile} books={books} onLike={likeBook} />}
        {activeTab === 'ideas' && <IdeasTab profile={profile} />}
      </div>
    </div>
  );
} 