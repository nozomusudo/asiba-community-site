import { Bookmark } from 'lucide-react';

type IdeasTabProps = {
  profile: any;
};

export default function IdeasTab({ profile }: IdeasTabProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow p-4">
          <div className="flex items-start justify-between">
            <h4 className="font-bold">アイデア {i}</h4>
            <button>
              <Bookmark className="w-4 h-4 text-gray-400 hover:text-blue-500" />
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            アイデアの説明文がここに入ります。新しい建築の可能性を探求するプロジェクトのアイデアスケッチです。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
              建築
            </span>
            <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
              サステナビリティ
            </span>
            <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
              テクノロジー
            </span>
          </div>
        </div>
      ))}
    </div>
  );
} 