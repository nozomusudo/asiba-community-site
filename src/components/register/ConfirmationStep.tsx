import { FormData } from '@/types/form';

type Props = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

export default function ConfirmationStep({ formData, setFormData }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="font-medium mb-2">入力内容の確認</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p>メールアドレス: {formData.email}</p>
          <p>氏名（漢字）: {formData.nameKanji}</p>
          <p>氏名（英語）: {formData.nameEnglish}</p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-start">
          <input
            type="checkbox"
            name="termsAgreed"
            checked={formData.termsAgreed}
            onChange={handleChange}
            className="mt-1 mr-2"
            required
          />
          <span className="text-sm">
            <a href="/terms" className="text-blue-600 hover:underline" target="_blank">
              利用規約
            </a>
            を読み、同意します
          </span>
        </label>

        <label className="flex items-start">
          <input
            type="checkbox"
            name="privacyAgreed"
            checked={formData.privacyAgreed}
            onChange={handleChange}
            className="mt-1 mr-2"
            required
          />
          <span className="text-sm">
            <a href="/privacy" className="text-blue-600 hover:underline" target="_blank">
              プライバシーポリシー
            </a>
            を読み、同意します
          </span>
        </label>
      </div>
    </div>
  );
} 