import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Props = {
  formData: any;
  setFormData: (data: any) => void;
};

export default function BasicInfoStep({ formData, setFormData }: Props) {
  const [roles, setRoles] = useState<{ id: string; name: string; description: string; }[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const { data, error } = await supabase.from('roles').select('id, name, description');
      if (error) {
        console.error('ロールの取得に失敗しました:', error);
      } else {
        setRoles(data);
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedRoles = checked
      ? [...formData.roles, value]
      : formData.roles.filter((role: string) => role !== value);

    setFormData({
      ...formData,
      roles: updatedRoles,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          メールアドレス
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
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
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          氏名（漢字）
        </label>
        <input
          type="text"
          name="nameKanji"
          value={formData.nameKanji}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          氏名（英語）
        </label>
        <input
          type="text"
          name="nameEnglish"
          value={formData.nameEnglish}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ロール選択
        </label>
        <div className="flex flex-col">
          {roles.map((role) => (
            <label key={role.id}>
              <input
                type="checkbox"
                name="roles"
                value={role.id}
                checked={formData.roles.includes(role.id)}
                onChange={handleRoleChange}
              />
              {role.description}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
} 