import { FormData } from '@/types/form';

type Props = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

export default function SkillsStep({ formData, setFormData }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions).map(option => option.value);
    setFormData({
      ...formData,
      [e.target.name]: values,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
          専門分野
        </label>
        <select
          id="specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">選択してください</option>
          <option value="architecture">建築</option>
          <option value="design">デザイン</option>
          <option value="art">アート</option>
          <option value="other">その他</option>
        </select>
      </div>

      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
          得意分野（複数選択可）
        </label>
        <select
          multiple
          id="skills"
          name="skills"
          value={formData.skills}
          onChange={handleMultiSelect}
          className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
          required
        >
          <option value="modeling">3Dモデリング</option>
          <option value="drawing">製図</option>
          <option value="planning">企画・設計</option>
          <option value="presentation">プレゼンテーション</option>
          <option value="programming">プログラミング</option>
        </select>
        <p className="mt-1 text-sm text-gray-500">Ctrlキーを押しながらクリックで複数選択できます</p>
      </div>

      <div>
        <label htmlFor="certifications" className="block text-sm font-medium text-gray-700 mb-1">
          保有資格（任意）
        </label>
        <input
          type="text"
          id="certifications"
          name="certifications"
          value={formData.certifications}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="一級建築士、色彩検定1級など"
        />
      </div>

      <div>
        <label htmlFor="portfolioUrl" className="block text-sm font-medium text-gray-700 mb-1">
          ポートフォリオURL（任意）
        </label>
        <input
          type="url"
          id="portfolioUrl"
          name="portfolioUrl"
          value={formData.portfolioUrl}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="https://..."
        />
      </div>
    </div>
  );
} 