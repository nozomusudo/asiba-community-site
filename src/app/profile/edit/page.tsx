'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { Camera, X } from 'lucide-react';

export default function ProfileEditPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    nameKanji: '',
    nameEnglish: '',
    portfolioUrl: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          router.push('/login');
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('name_kanji, name_english, portfolio_url, avatar_url')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          setError('プロフィールの読み込みに失敗しました。');
          return;
        }

        setFormData({
          nameKanji: profile.name_kanji || '',
          nameEnglish: profile.name_english || '',
          portfolioUrl: profile.portfolio_url || ''
        });
        setAvatarUrl(profile.avatar_url);
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
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 30 * 1024 * 1024) { // 30MB制限
        setError('PDFサイズは30MB以下にしてください。');
        return;
      }
      setPdfFile(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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

      let newAvatarUrl = avatarUrl;
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
        const fileExt = pdfFile.name.split('.').pop();
        const fileName = `${session.user.id}-portfolio.${fileExt}`;

        // PDFをアップロード
        const { error: uploadError } = await supabase.storage
          .from('portfolios')
          .upload(fileName, pdfFile, {
            upsert: true
          });

        if (uploadError) {
          console.error('Error uploading PDF:', uploadError.message || uploadError);
          setError('PDFのアップロードに失敗しました。');
          return;
        }

        // 公開URLを取得
        const { data: { publicUrl } } = supabase.storage
          .from('portfolios')
          .getPublicUrl(fileName);

        newPortfolioUrl = publicUrl;
      }

      // プロフィール情報を更新
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          name_kanji: formData.nameKanji,
          name_english: formData.nameEnglish,
          portfolio_url: newPortfolioUrl,
          avatar_url: newAvatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.user.id);

      if (updateError) {
        console.error('Error updating profile:', updateError);
        setError('プロフィールの更新に失敗しました。');
        return;
      }

      router.push('/profile');
    } catch (error) {
      console.error('Unexpected error:', error);
      setError('予期せぬエラーが発生しました。');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold mb-8">プロフィール編集</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div 
                  onClick={handleAvatarClick}
                  className="w-32 h-32 rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden"
                >
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Camera className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                {avatarUrl && (
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
                ポートフォリオPDF
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                キャンセル
              </button>
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
    </div>
  );
} 