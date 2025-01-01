import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// PDF.jsのワーカーのパスを設定
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

type PortfolioTabProps = {
  profile: any;
};

export default function PortfolioTab({ profile }: PortfolioTabProps) {
  return (
    <div className="space-y-8">
      {/* PDF プレビュー */}
      {profile.portfolio_url ? (
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-bold">ポートフォリオ.pdf</h3>
            <a
              href={profile.portfolio_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              ダウンロード
            </a>
          </div>
          <div className="aspect-[1/1.414] bg-gray-100">
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                profile.portfolio_url
              )}&embedded=true`}
              style={{ width: '100%', height: '500px' }}
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      ) : (
        <p>ポートフォリオがアップロードされていません。</p>
      )}

      {/* プロジェクト一覧 */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg">プロジェクト</h3>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="aspect-video bg-gray-100" />
              <div className="p-4">
                <h4 className="font-bold">プロジェクト {i}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  プロジェクトの説明文がここに入ります。
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 