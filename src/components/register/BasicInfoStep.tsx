type Props = {
  formData: any;
  setFormData: (data: any) => void;
};

export default function BasicInfoStep({ formData, setFormData }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          メールアドレス
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          パスワード
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
          minLength={8}
          placeholder="8文字以上で入力してください"
        />
      </div>

      <div>
        <label htmlFor="nameKanji" className="block text-sm font-medium text-gray-700 mb-1">
          氏名（漢字）
        </label>
        <input
          type="text"
          id="nameKanji"
          name="nameKanji"
          value={formData.nameKanji}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
          placeholder="山田 太郎"
        />
      </div>

      <div>
        <label htmlFor="nameKana" className="block text-sm font-medium text-gray-700 mb-1">
          氏名（カナ）
        </label>
        <input
          type="text"
          id="nameKana"
          name="nameKana"
          value={formData.nameKana}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
          placeholder="ヤマダ タロウ"
        />
      </div>

      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
          生年月日
        </label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          電話番号
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
          placeholder="090-1234-5678"
        />
      </div>
    </div>
  );
} 