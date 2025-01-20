'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import BasicInfoStep from '@/components/register/BasicInfoStep';
import ConfirmationStep from '@/components/register/ConfirmationStep';
import { FormData } from '@/types/form';

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
    title: "確認・同意",
    description: "入力内容を確認し、利用規約に同意してください",
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    nameKanji: '',
    nameEnglish: '',
    termsAgreed: false,
    privacyAgreed: false,
    visibility: 'public',
    roles: [],
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
        return <ConfirmationStep formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  // 登録処理を修正
  const handleRegister = async () => {
    if (currentStep !== STEPS.length - 1) return;

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.nameKanji,
            name_kanji: formData.nameKanji,
            name_english: formData.nameEnglish,
            updated_at: new Date().toISOString(),
          }
        }
      });

      if (authError || !authData.user) {
        console.error('認証エラー:', authError);
        setError('登録に失敗しました。もう一度お試しください。');
        return;
      }

      // ロールをprofile_rolesテーブルに挿入
      for (const role of formData.roles) {
        await supabase.from('profile_roles').insert({
          profile_id: authData.user.id,
          role_id: role,
        });
      }

      // 登録成功
      router.push('/register/complete');

    } catch (error) {
      console.error('登録エラー:', error);
      setError('登録処理中にエラーが発生しました。');
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