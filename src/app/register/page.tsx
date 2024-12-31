'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import BasicInfoStep from '@/components/register/BasicInfoStep';
import AffiliationStep from '@/components/register/AffiliationStep';
import SkillsStep from '@/components/register/SkillsStep';
import InterestsStep from '@/components/register/InterestsStep';
import ProfileStep from '@/components/register/ProfileStep';
import ConfirmationStep from '@/components/register/ConfirmationStep';

// ステップの型定義
type Step = {
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    title: "基本情報",
    description: "アカウントの基本情報を入力してください",
  },
  {
    title: "所属情報",
    description: "あなたの所属に関する情報を教えてください",
  },
  {
    title: "専門分野・スキル",
    description: "あなたの専門性やスキルについて教えてください",
  },
  {
    title: "興味・関心",
    description: "どのような活動に興味がありますか？",
  },
  {
    title: "プロフィール設定",
    description: "あなたのプロフィールを設定しましょう",
  },
  {
    title: "確認・同意",
    description: "入力内容を確認し、利用規約に同意してください",
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: 基本情報
    email: '',
    password: '',
    nameKanji: '',
    nameKana: '',
    birthDate: '',
    phone: '',
    
    // Step 2: 所属情報
    organization: '',
    department: '',
    laboratory: '',
    grade: '',
    supervisor: '',
    
    // Step 3: 専門分野・スキル
    specialization: '',
    skills: [],
    certifications: '',
    portfolioUrl: '',
    
    // Step 4: 興味・関心
    interests: '',
    projectType: '',
    discovery: '',
    availability: '',
    
    // Step 5: プロフィール設定
    profileImage: null,
    bio: '',
    twitter: '',
    instagram: '',
    visibility: 'public',
    
    // Step 6: 確認・同意
    termsAgreed: false,
    privacyAgreed: false,
    guidelinesAgreed: false,
    notifyEvents: true,
    notifyUpdates: true,
  });

  // エラー状態の追加
  const [error, setError] = useState<string | null>(null);

  // 進捗バーのレンダリング
  const renderProgress = () => (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">
          Step {currentStep + 1} of {STEPS.length}
        </span>
        <span className="text-sm font-medium text-gray-600">
          {Math.round(((currentStep + 1) / STEPS.length) * 100)}%
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
        />
      </div>
    </div>
  );

  // 各ステップのコンテンツをレンダリング
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep formData={formData} setFormData={setFormData} />;
      case 1:
        return <AffiliationStep formData={formData} setFormData={setFormData} />;
      case 2:
        return <SkillsStep formData={formData} setFormData={setFormData} />;
      case 3:
        return <InterestsStep formData={formData} setFormData={setFormData} />;
      case 4:
        return <ProfileStep formData={formData} setFormData={setFormData} />;
      case 5:
        return <ConfirmationStep formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  // 登録処理を修正
  const handleRegister = async () => {
    if (currentStep !== STEPS.length - 1) return;

    try {
      // 1. 最小限の情報でユーザーを作成
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
            data: {
              full_name: formData.nameKanji,
            },
          },
      });

      if (authError) {
        console.error('認証エラー:', authError);
        setError('登録に失敗しました。もう一度お試しください。');
        return;
      }

      if (!authData.user) {
        console.error('ユーザーデータがありません');
        return;
      }

      // 2. プロフィール情報を更新
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          name_kanji: formData.nameKanji,
          name_kana: formData.nameKana,
          birth_date: formData.birthDate,
          phone: formData.phone,
          organization: formData.organization,
          department: formData.department,
          laboratory: formData.laboratory,
          grade: formData.grade,
          supervisor: formData.supervisor,
          specialization: formData.specialization,
          skills: formData.skills,
          certifications: formData.certifications,
          portfolio_url: formData.portfolioUrl,
          interests: formData.interests,
          project_type: formData.projectType,
          discovery: formData.discovery,
          availability: formData.availability,
          bio: formData.bio,
          twitter_url: formData.twitter,
          instagram_url: formData.instagram,
          visibility: formData.visibility,
          notify_events: formData.notifyEvents,
          notify_updates: formData.notifyUpdates
        })
        .eq('id', authData.user.id);

      if (profileError) {
        console.error('プロフィール更新エラー:', profileError);
        // TODO: ユーザーにエラーを表示
        return;
      }

      // 登録成功
      console.log('登録成功:', authData);
      router.push('/register/complete');

    } catch (error) {
      console.error('登録エラー:', error);
      // TODO: ユーザーにエラーを表示
    }
  };

  // 次へボタンのクリックハンドラを更新
  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleRegister();
    }
  };

  // 前のステップへ
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-8">
          {renderProgress()}
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold">{STEPS[currentStep].title}</h1>
            <p className="mt-2 text-gray-600">{STEPS[currentStep].description}</p>
          </div>

          {renderStepContent()}

          <div className="flex justify-between mt-8 pt-8 border-t">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
              戻る
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {currentStep === STEPS.length - 1 ? '登録する' : '次へ'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 