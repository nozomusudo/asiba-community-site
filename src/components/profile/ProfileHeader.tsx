import { Edit, Mail, Twitter, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type ProfileHeaderProps = {
  profile: any;
  isMypage?: boolean;
};

export default function ProfileHeader({ profile, isMypage = false }: ProfileHeaderProps) {
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
                <Link
                  href="/profile/edit"
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                >
                  <Edit className="w-4 h-4" />
                  編集
                </Link>
              )}
            </div>

            {/* 連絡先 */}
            <div className="mt-4 flex gap-4">
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                >
                  <Mail className="w-4 h-4" />
                  <span>メール</span>
                </a>
              )}
              {profile.twitter_url && (
                <a
                  href={profile.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                >
                  <Twitter className="w-4 h-4" />
                  <span>Twitter</span>
                </a>
              )}
              {profile.portfolio_url && (
                <a
                  href={profile.portfolio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                >
                  <Globe className="w-4 h-4" />
                  <span>Website</span>
                </a>
              )}
            </div>

            {/* タグ */}
            {profile.skills && (
              <div className="mt-4 flex flex-wrap gap-2">
                {profile.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 