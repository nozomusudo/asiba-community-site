import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import ProjectCard from '@/components/project/ProjectCard';
import { Profile } from '@/types/form';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

type PortfolioTabProps = {
  profile: Profile;
  projects: any[];
};

export default function PortfolioTab({ profile, projects }: PortfolioTabProps) {
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
          <div className="bg-gray-100" style={{ height: '500px' }}>
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                profile.portfolio_url
              )}&embedded=true`}
              style={{ width: '100%', height: '100%' }}
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
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
} 