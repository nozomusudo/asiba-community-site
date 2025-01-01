'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Menu, ChevronDown, User as UserIcon } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('name_kanji, avatar_url')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else {
          setUser(profile);
        }
      }
      setLoading(false);
    };

    fetchUserProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchUserProfile();
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="h-16 bg-white shadow-sm"></div>;
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* ロゴ */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900">
              ASIBA
            </Link>
          </div>

          {/* メインナビゲーション */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/projects" className="text-gray-600 hover:text-gray-900">
              Project
            </Link>
            <Link href="/events" className="text-gray-600 hover:text-gray-900">
              Event
            </Link>
            <Link href="/members" className="text-gray-600 hover:text-gray-900">
              Member
            </Link>
            <Link href="/ideas" className="text-gray-600 hover:text-gray-900">
              Idea
            </Link>
          </nav>

          {/* ユーザーメニュー */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {user ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                >
                  <div className="flex items-center gap-2">
                    {user.avatar_url ? (
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={user.avatar_url}
                          alt=""
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-gray-500" />
                      </div>
                    )}
                    <span>{user.name_kanji}</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    ログイン
                  </Link>
                  <Link
                    href="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    新規登録
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* モバイルメニューボタン */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden py-2 border-t">
            <div className="space-y-1 pb-3 pt-2">
              <Link
                href="/projects"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
              >
                Project
              </Link>
              <Link
                href="/events"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
              >
                Event
              </Link>
              <Link
                href="/members"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
              >
                Member
              </Link>
              <Link
                href="/ideas"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
              >
                Idea
              </Link>
            </div>

            <div className="border-t pt-4">
              {user ? (
                <div className="space-y-2 px-3">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 py-2"
                  >
                    {user.avatar_url ? (
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={user.avatar_url}
                          alt=""
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-gray-500" />
                      </div>
                    )}
                    <span>{user.name_kanji}</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2 px-3">
                  <Link
                    href="/login"
                    className="block text-gray-600 hover:text-gray-900"
                  >
                    ログイン
                  </Link>
                  <Link
                    href="/register"
                    className="block text-gray-600 hover:text-gray-900"
                  >
                    新規登録
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}