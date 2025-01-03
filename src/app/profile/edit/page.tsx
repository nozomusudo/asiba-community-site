'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { Camera, X } from 'lucide-react';
import { Profile } from '@/types/form';
import { BasicInfoTab } from '@/components/profile/edit/BasicInfoTab';
import AffiliationTab from '@/components/profile/edit/AffiliationTab';
import SkillsTab from '@/components/profile/edit/SkillsTab';
import SocialTab from '@/components/profile/edit/SocialTab';
import BioTab from '@/components/profile/edit/BioTab';
import SettingsTab from '@/components/profile/edit/SettingsTab';
import IconPortfolioTab from '@/components/profile/edit/IconPortfolioTab';


// フィールドのマッピングをオブジェクトとして定義
const TAB_FIELDS: Record<number, { properties: (keyof Profile)[], label: string }> = {
  1: {
    properties: ['name_kanji', 'name_kana', 'name_english', 'birth_date', 'phone'],
    label: '基本情報',
  },
  2: {
    properties: ['organization', 'department', 'laboratory', 'grade'],
    label: '所属情報',
  },
  3: {
    properties: ['skills', 'expertise', 'tags'],
    label: 'スキル情報',
  },
  4: {
    properties: ['twitter_url', 'instagram_url', 'note_url'],
    label: 'ソーシャル情報',
  },
  5: {
    properties: ['bio', 'interests', 'availability', 'how_found'],
    label: '自己紹介情報',
  },
  6: {
    properties: ['certifications', 'terms_agreed', 'privacy_agreed'],
    label: '設定情報',
  },
  7: {
    properties: ['avatar_url', 'portfolio_url'],
    label: 'アイコン/ポートフォリオ',
  },
};

// 部分的な更新を型安全に行うための型
type UpdateFieldsType = Partial<Profile>;

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
  const [formData, setFormData] = useState<Profile | null>(null);


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

        setFormData(profile as Profile);
        setLoading(false);
      } catch (error) {
        console.error('Unexpected error:', error);
        setError('予期せぬエラーが発生しました。');
      }
    };

    fetchProfile();
  }, []);

  

// フィールド更新ロジックを関数として分離
const getUpdateFields = (
  formData: Partial<Profile>, 
  activeTab: number
): UpdateFieldsType => {
  const fieldsToUpdate = TAB_FIELDS[activeTab].properties;
  if (!fieldsToUpdate) return {};

  // リスト型のフィールド名を定義
  const arrayFields: (keyof Profile)[] = [
    'skills',
    'expertise',
    'certifications',
    'interests',
    'project_types',
    'tags'
  ];

  // 指定されたフィールドのみを抽出
  return fieldsToUpdate.reduce((acc, field) => {
    if (formData[field] !== undefined) {
      // リスト型フィールドの場合、カンマ区切りの文字列を配列に変換
      if (arrayFields.includes(field)) {
        const value = formData[field];
        if (typeof value === 'string') {
          // 空文字の場合は空配列、それ以外はカンマ区切りで分割して空白を削除
          acc[field] = value.trim() === '' 
            ? [] 
            : value.split(',').map(item => item.trim());
        }
      } else {
        // 通常のフィールドはそのまま代入
        acc[field] = formData[field];
      }
    }
    return acc;
  }, {} as UpdateFieldsType);
};






    // 入力値の変更ハンドラー
    const handleChange = (field: keyof Profile, value: any) => {
      if (!formData) return;
      
      setFormData({
        ...formData,
        [field]: value,
      });
    };
  
    // 保存ハンドラー
    const handleSave = async () => {
      try {
        setSaving(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session || !formData) {
          throw new Error('セッションまたはフォームデータが無効です');
        }
  
        const updateFields = getUpdateFields(formData, activeTab);
        
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            ...updateFields,
            updated_at: new Date().toISOString(),
          })
          .eq('id', session.user.id);
  
        if (updateError) throw updateError;
  
        // 成功メッセージの表示など
        console.log('保存成功');
        
      } catch (error) {
        console.error('Error saving profile:', error);
        setError('保存に失敗しました');
      } finally {
        setSaving(false);
      }
    };
  
    // ローディング中の表示
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
        <div className="max-w-4xl mx-auto p-4">
      {/* タブナビゲーション */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {Object.entries(TAB_FIELDS).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setActiveTab(Number(key))}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === Number(key)
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'}
              `}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    
          {/* フォームコンテンツ */}
          {activeTab === 1 && (
            <BasicInfoTab profile={formData || {}} onChange={handleChange} />
          )}
          {activeTab === 2 && (
            <AffiliationTab profile={formData || {}} onChange={handleChange} />
          )}
          {activeTab === 3 && (
            <SkillsTab profile={formData || {}} onChange={handleChange} />
          )}
          {activeTab === 4 && (
            <SocialTab profile={formData || {}} onChange={handleChange} />
          )}
          {activeTab === 5 && (
            <BioTab profile={formData || {}} onChange={handleChange} />
          )}
          {activeTab === 6 && (
            <SettingsTab profile={formData || {}} onChange={handleChange} />
          )}
          {activeTab === 7 && (
            <IconPortfolioTab profile={formData || {}} onChange={handleChange} />
          )}
          
          {/* Save Button */}
          <div className="mt-4">
            <button
              onClick={handleSave}
              className="bg-indigo-600 text-white py-2 px-4 rounded"
              disabled={saving} // Disable button while saving
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        
      );
    };