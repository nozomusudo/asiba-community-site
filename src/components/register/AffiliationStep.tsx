import { FormData } from '@/types/form';

type Props = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

export default function AffiliationStep({ formData, setFormData }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
          大学/所属機関名
        </label>
        <input
          type="text"
          id="organization"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
          placeholder="○○大学"
        />
      </div>

      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
          学部/学科
        </label>
        <input
          type="text"
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
          placeholder="工学部建築学科"
        />
      </div>

      <div>
        <label htmlFor="laboratory" className="block text-sm font-medium text-gray-700 mb-1">
          研究室名
        </label>
        <input
          type="text"
          id="laboratory"
          name="laboratory"
          value={formData.laboratory}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="○○研究室"
        />
      </div>

      <div>
        <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
          学年/役職
        </label>
        <input
          type="text"
          id="grade"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
          placeholder="学部3年"
        />
      </div>

      <div>
        <label htmlFor="supervisor" className="block text-sm font-medium text-gray-700 mb-1">
          指導教員名（任意）
        </label>
        <input
          type="text"
          id="supervisor"
          name="supervisor"
          value={formData.supervisor}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="○○ ○○ 教授"
        />
      </div>
    </div>
  );
} 