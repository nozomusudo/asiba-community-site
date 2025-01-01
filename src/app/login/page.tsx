'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setError('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
        return;
      }

      router.push('/');
      
    } catch (error) {
      setError('ログイン中にエラーが発生しました。');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold mb-8">ログイン</h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メールアドレス
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                パスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              ログイン
            </button>

            <p className="text-center text-sm text-gray-600">
              アカウントをお持ちでない方は
              <Link href="/register" className="text-blue-600 hover:underline">
                新規登録
              </Link>
              へ
            </p>
          </form>
        </div>
      </div>
    </div>
  );
} 