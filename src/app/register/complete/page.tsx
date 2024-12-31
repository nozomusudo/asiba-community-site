import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function RegisterCompletePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">
            仮登録が完了しました
          </h1>
          
          <p className="text-gray-600 mb-8">
            ご登録いただいたメールアドレスに確認メールを送信しました。
            メール内のリンクをクリックして、本登録を完了してください。
          </p>

          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            トップページへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
} 