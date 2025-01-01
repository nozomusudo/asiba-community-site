import { FormData } from '@/types/form';

type Props = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

export default function ProfileStep({ formData, setFormData }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ポートフォリオURL
        </label>
        <input
          type="url"
          name="portfolioUrl"
          value={formData.portfolioUrl}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
    </div>
  );
} 