import React from 'react';
import { 
  Clock, AlertCircle, FileText, CheckCircle, 
  XCircle, Send, Download, MessageSquare, 
  ChevronRight, Filter, Bell
} from 'lucide-react';

const DocumentSubmissionPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ページヘッダー */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-xl font-bold">申請・手続き管理</h1>
          <div className="mt-4 flex gap-4">
            <div className="px-4 py-2 bg-red-50 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <div>
                <div className="text-sm text-red-600">期限切れ</div>
                <div className="font-bold text-red-700">2件</div>
              </div>
            </div>
            <div className="px-4 py-2 bg-yellow-50 rounded-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <div>
                <div className="text-sm text-yellow-600">要対応</div>
                <div className="font-bold text-yellow-700">3件</div>
              </div>
            </div>
            <div className="px-4 py-2 bg-blue-50 rounded-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-sm text-blue-600">処理中</div>
                <div className="font-bold text-blue-700">5件</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* メインエリア */}
          <div className="flex-1 space-y-6">
            {/* 未提出・要対応 */}
            <section>
              <h2 className="text-lg font-bold mb-4">未提出・要対応の書類</h2>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">フィルター</span>
                  </div>
                  <button className="text-sm text-blue-600">すべて表示</button>
                </div>
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm text-gray-600">書類名</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-600">提出期限</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-600">ステータス</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-600">アクション</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      {
                        name: "活動報告書 2024年1月",
                        deadline: "2024/01/20",
                        status: "期限切れ",
                        statusColor: "red"
                      },
                      {
                        name: "イベント企画書",
                        deadline: "2024/01/25",
                        status: "修正依頼",
                        statusColor: "yellow"
                      },
                      {
                        name: "経費精算申請",
                        deadline: "2024/02/01",
                        status: "下書き",
                        statusColor: "gray"
                      }
                    ].map((doc, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span>{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm">{doc.deadline}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 text-sm rounded-full bg-${doc.statusColor}-50 text-${doc.statusColor}-600`}>
                            {doc.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <button className="text-blue-600 text-sm hover:text-blue-700">
                            対応する
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 申請履歴 */}
            <section>
              <h2 className="text-lg font-bold mb-4">申請履歴</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-white rounded-xl shadow-sm p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">プロジェクト報告書</h3>
                          <p className="text-sm text-gray-500">2024/01/15 提出</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-50 text-green-600 text-sm rounded-full">
                        承認済み
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* サイドバー */}
          <div className="w-80 space-y-6">
            {/* メッセージ */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold mb-4">事務局からのメッセージ</h3>
              <div className="space-y-4">
                {[1, 2].map((msg) => (
                  <div key={msg} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0" />
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-medium">事務局</span>
                        <span className="text-sm text-gray-500">1時間前</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        活動報告書の修正をお願いします。
                      </p>
                    </div>
                  </div>
                ))}
                <button className="w-full mt-4 text-center text-sm text-blue-600">
                  すべて見る
                </button>
              </div>
            </div>

            {/* 書類テンプレート */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold mb-4">書類テンプレート</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 text-left text-sm hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Download className="w-4 h-4 text-gray-400" />
                    <span>活動報告書</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 text-left text-sm hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Download className="w-4 h-4 text-gray-400" />
                    <span>経費精算書</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* カレンダー */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold mb-4">提出期限カレンダー</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {/* カレンダーコンポーネント */}
                <div className="text-center">カレンダーが表示されます</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentSubmissionPage; 