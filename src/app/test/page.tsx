'use client';

import { supabase } from '@/lib/supabase';
import { useState } from 'react';

export default function TestPage() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    if (!email) {
      setResult('❌ メールアドレスを入力してください');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: 'Password123!', // 安全なパスワード
        options: {
          data: {
            name: 'Test User',
          }
        }
      });
      
      console.log('Registration attempt:', { data, error });
      
      if (error) {
        setResult(`❌ エラー: ${error.message}`);
      } else {
        setResult(`✅ 成功！確認メールを送信しました\nEmail: ${email}`);
      }
    } catch (e) {
      setResult(`❌ 例外が発生: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Supabase 接続テスト</h1>
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          テスト用メールアドレス
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="your@email.com"
        />
      </div>

      <button 
        onClick={handleTest}
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
      >
        {loading ? '処理中...' : 'テスト実行'}
      </button>
      
      {result && (
        <div className={`mt-4 p-4 rounded-md whitespace-pre-line ${
          result.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {result}
        </div>
      )}

      <div className="mt-4 p-4 bg-gray-50 rounded-md">
        <h2 className="font-bold mb-2">デバッグ情報:</h2>
        <p>SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '設定済み' : '未設定'}</p>
        <p>SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '設定済み' : '未設定'}</p>
      </div>
    </div>
  );
}