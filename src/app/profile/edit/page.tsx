'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { Camera, X } from 'lucide-react';
import { FormData } from '@/types/form';

const TABS = [
  { id: 1, label: '基本情報' },
  { id: 2, label: '所属情報' },
  { id: 3, label: 'スキル情報' },
  { id: 4, label: 'ソーシャル情報' },
  { id: 5, label: '自己紹介情報' },
  { id: 6, label: '設定情報' },
  { id: 7, label: 'アイコン/ポートフォリオ' },
];

export default function ProfileEditPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    nameKanji: '',
    nameKana: '',
    nameEnglish: '',
    birthDate: '',
    phone: '',
    organization: '',
    department: '',
    laboratory: '',
    grade: '',
    expertise: [],
    skills: [],
    certifications: [],
    discordId: '',
    discordUsername: '',
    twitterUrl: '',
    instagramUrl: '',
    noteUrl: '',
    bio: '',
    interests: [],
    projectTypes: [],
    availability: '',
    howFound: '',
    tags: [],
    avatarUrl: '',
    portfolioUrl: '',
    notifyUpdates: false,
    termsAgreed: false,
    privacyAgreed: false,
    visibility: 'public',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push('/login');
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError.message);
          setError('プロフィールの読み込みに失敗しました。');
          return;
        }

        setFormData({
          nameKanji: profile.name_kanji || '',
          nameKana: profile.name_kana || '',
          nameEnglish: profile.name_english || '',
          birthDate: profile.birth_date || '',
          phone: profile.phone || '',
          organization: profile.organization || '',
          department: profile.department || '',
          laboratory: profile.laboratory || '',
          grade: profile.grade || '',
          expertise: profile.expertise || [],
          skills: profile.skills || [],
          certifications: profile.certifications || [],
          discordId: profile.discord_id || '',
          discordUsername: profile.discord_username || '',
          twitterUrl: profile.twitter_url || '',
          instagramUrl: profile.instagram_url || '',
          noteUrl: profile.note_url || '',
          bio: profile.bio || '',
          interests: profile.interests || [],
          projectTypes: profile.project_types || [],
          availability: profile.availability || '',
          howFound: profile.how_found || '',
          tags: profile.tags || [],
          avatarUrl: profile.avatar_url || '',
          portfolioUrl: profile.portfolio_url || '',
          notifyUpdates: profile.notify_updates || false,
          termsAgreed: profile.terms_agreed || false,
          privacyAgreed: profile.privacy_agreed || false,
          visibility: profile.visibility || 'public',
        });
        setLoading(false);
      } catch (error) {
        console.error('Unexpected error:', error);
        setError('予期せぬエラーが発生しました。');
      }
    };

    fetchProfile();
  }, [router]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) { // 2MB制限
        setError('画像サイズは2MB以下にしてください。');
        return;
      }
      setAvatarFile(file);
      setFormData(prev => ({ ...prev, avatarUrl: URL.createObjectURL(file) }));
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPdfFile(file);
      setFormData(prev => ({ ...prev, portfolioUrl: file.name }));
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setFormData(prev => ({ ...prev, avatarUrl: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemovePdf = () => {
    setPdfFile(null);
    setFormData(prev => ({ ...prev, portfolioUrl: null }));
    if (pdfInputRef.current) {
      pdfInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
        return;
      }

      let newAvatarUrl = formData.avatarUrl;
      let newPortfolioUrl = formData.portfolioUrl;

      // 画像がアップロードされている場合
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${session.user.id}.${fileExt}`;

        // 画像をアップロード
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile, {
            upsert: true
          });

        if (uploadError) {
          console.error('Error uploading avatar:', uploadError);
          setError('画像のアップロードに失敗しました。');
          return;
        }

        // 公開URLを取得
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);

        newAvatarUrl = publicUrl;
      }

      // PDFがアップロードされている場合
      if (pdfFile) {
        const fileName = `${session.user.id}.pdf`;

        // PDFをアップロード
        const { error: uploadError } = await supabase.storage
          .from('portfolios')
          .upload(fileName, pdfFile, {
            upsert: true
          });

        if (uploadError) {
          console.error('Error uploading PDF:', uploadError);
          setError('PDFのアップロードに失敗しました。');
          return;
        }

        // 公開URLを取得
        const { data: { publicUrl } } = supabase.storage
          .from('portfolios')
          .getPublicUrl(fileName);

        newPortfolioUrl = publicUrl;
      }

      // 更新するフィールドを選択
      let updateFields = {};
      switch (activeTab) {
        case 1:
          updateFields = {
            name_kanji: formData.nameKanji,
            name_kana: formData.nameKana,
            name_english: formData.nameEnglish,
            birth_date: formData.birthDate,
            phone: formData.phone,
          };
          break;
        case 2:
          updateFields = {
            organization: formData.organization,
            department: formData.department,
            laboratory: formData.laboratory,
            grade: formData.grade,
          };
          break;
        case 3:
          updateFields = {
            expertise: formData.expertise,
            skills: formData.skills,
            certifications: formData.certifications,
          };
          break;
        case 4:
          updateFields = {
            discord_id: formData.discordId,
            discord_username: formData.discordUsername,
            twitter_url: formData.twitterUrl,
            instagram_url: formData.instagramUrl,
            note_url: formData.noteUrl,
          };
          break;
        case 5:
          updateFields = {
            bio: formData.bio,
            interests: formData.interests,
            project_types: formData.projectTypes,
            availability: formData.availability,
            how_found: formData.howFound,
            tags: formData.tags,
          };
          break;
        case 6:
          updateFields = {
            visibility: formData.visibility,
            notify_updates: formData.notifyUpdates,
            terms_agreed: formData.termsAgreed,
            privacy_agreed: formData.privacyAgreed,
          };
          break;
        case 7:
          updateFields = {
            avatar_url: newAvatarUrl,
            portfolio_url: newPortfolioUrl,
          };
          break;
        default:
          break;
      }

      // プロフィール情報を更新
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          ...updateFields,
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.user.id);

      if (updateError) {
        console.error('Error updating profile:', updateError);
        setError('プロフィールの更新に失敗しました。');
        return;
      }

      setError('プロフィールが更新されました。');

      // 3秒後にメッセージを消す
      setTimeout(() => {
        setError(null);
      }, 2000);
    } catch (error) {
      console.error('Unexpected error:', error);
      setError('予期せぬエラーが発生しました。');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">基本情報</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                名前（漢字）
              </label>
              <input
                type="text"
                name="nameKanji"
                value={formData.nameKanji}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                名前（カナ）
              </label>
              <input
                type="text"
                name="nameKana"
                value={formData.nameKana}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                名前（英語）
              </label>
              <input
                type="text"
                name="nameEnglish"
                value={formData.nameEnglish}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                生年月日
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                電話番号
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">所属情報</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                大学/所属機関名
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                学部/学科
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                研究室名
              </label>
              <input
                type="text"
                name="laboratory"
                value={formData.laboratory}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                学年/役職
              </label>
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">スキル情報</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                専門分野
              </label>
              <input
                type="text"
                name="expertise"
                value={formData.expertise.join(', ')}
                onChange={(e) => setFormData({ ...formData, expertise: e.target.value.split(', ') })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                技術スキル
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills.join(', ')}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(', ') })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                保有資格
              </label>
              <input
                type="text"
                name="certifications"
                value={formData.certifications.join(', ')}
                onChange={(e) => setFormData({ ...formData, certifications: e.target.value.split(', ') })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">ソーシャル情報</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discord ID
              </label>
              <input
                type="text"
                name="discordId"
                value={formData.discordId}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discordユーザー名
              </label>
              <input
                type="text"
                name="discordUsername"
                value={formData.discordUsername}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Twitter URL
              </label>
              <input
                type="url"
                name="twitterUrl"
                value={formData.twitterUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                name="instagramUrl"
                value={formData.instagramUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                note URL
              </label>
              <input
                type="url"
                name="noteUrl"
                value={formData.noteUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">自己紹介情報</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                自己紹介文
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                関心分野
              </label>
              <input
                type="text"
                name="interests"
                value={formData.interests.join(', ')}
                onChange={(e) => setFormData({ ...formData, interests: e.target.value.split(', ') })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                希望プロジェクト
              </label>
              <input
                type="text"
                name="projectTypes"
                value={formData.projectTypes.join(', ')}
                onChange={(e) => setFormData({ ...formData, projectTypes: e.target.value.split(', ') })}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                参加可能時間/頻度
              </label>
              <input
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                知ったきっかけ
              </label>
              <input
                type="text"
                name="howFound"
                value={formData.howFound}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                タグ/キーワード
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags.join(', ')}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(', ') })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        );
      case 6:
    return (
          <div>
            <h2 className="text-xl font-bold mb-4">設定情報</h2>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="notifyUpdates"
                checked={formData.notifyUpdates}
                onChange={(e) => setFormData({ ...formData, notifyUpdates: e.target.checked })}
                className="mr-2"
              />
              <label className="text-sm text-gray-700">
                メール通知を受け取る
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={(e) => setFormData({ ...formData, termsAgreed: e.target.checked })}
                className="mr-2"
                required
              />
              <label className="text-sm text-gray-700">
                利用規約に同意する
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="privacyAgreed"
                checked={formData.privacyAgreed}
                onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
                className="mr-2"
                required
              />
              <label className="text-sm text-gray-700">
                プライバシーポリシーに同意する
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                公開範囲
              </label>
              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="public">公開</option>
                <option value="members">メンバーのみ</option>
                <option value="private">非公開</option>
              </select>
            </div>
      </div>
    );
      case 7:
  return (
          <div>
            <h2 className="text-xl font-bold mb-4">アイコン/ポートフォリオ</h2>
            <div className="flex items-center mb-4">
              <div className="relative">
                <div 
                  onClick={handleAvatarClick}
                  className="w-32 h-32 rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden"
                >
                  {formData.avatarUrl ? (
                    <Image
                      src={formData.avatarUrl}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Camera className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                {formData.avatarUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <p className="mt-2 text-sm text-gray-500">
                クリックして画像をアップロード
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="file"
                accept="application/pdf"
                ref={pdfInputRef}
                onChange={handlePdfChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => pdfInputRef.current?.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                PDFをアップロード
              </button>
              {formData.portfolioUrl && (
                <div className="ml-4">
                  <span>{formData.portfolioUrl}</span>
                  <button
                    type="button"
                    onClick={handleRemovePdf}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex gap-8">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderTabContent()}

            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}

          <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? '保存中...' : '保存する'}
              </button>
            </div>
          </form>
      </div>
    </div>
  );
} 