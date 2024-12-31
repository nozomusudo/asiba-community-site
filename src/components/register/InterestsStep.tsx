import { FormData } from '@/types/form';

type Props = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

export default function InterestsStep({ formData, setFormData }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
          関心のある活動分野
        </label>
        <select
          id="interests"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">選択してください</option>
          <option value="urban">都市計画・まちづくり</option>
          <option value="housing">住宅・建築設計</option>
          <option value="interior">インテリアデザイン</option>
          <option value="product">プロダクトデザイン</option>
          <option value="art">アート・展示</option>
        </select>
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
          参加したいプロジェクトタイプ
        </label>
        <textarea
          id="projectType"
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"
          required
          placeholder="例：地域活性化のためのパブリックアート制作、持続可能な住宅設計など"
        />
      </div>

      <div>
        <label htmlFor="discovery" className="block text-sm font-medium text-gray-700 mb-1">
          ASIBAを知ったきっかけ
        </label>
        <select
          id="discovery"
          name="discovery"
          value={formData.discovery}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">選択してください</option>
          <option value="sns">SNS</option>
          <option value="friend">友人・知人の紹介</option>
          <option value="event">イベント</option>
          <option value="search">Web検索</option>
          <option value="other">その他</option>
        </select>
      </div>

      <div>
        <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
          参加可能な時間帯/頻度
        </label>
        <input
          type="text"
          id="availability"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="例：平日夜間・週末、月2回程度"
          required
        />
      </div>
    </div>
  );
} 