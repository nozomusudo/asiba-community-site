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
          <p>氏名: {formData.nameKanji}</p>
          <p>フリガナ: {formData.nameKana}</p>
          <p>生年月日: {formData.birthDate}</p>
          <p>電話番号: {formData.phone}</p>
          <p>所属: {formData.organization}</p>
          <p>学部/学科: {formData.department}</p>
          <p>研究室: {formData.laboratory}</p>
          <p>学年/役職: {formData.grade}</p>
          <p>専門分野: {formData.specialization}</p>
          <p>得意分野: {formData.skills.join(', ')}</p>
          <p>参加希望分野: {formData.interests}</p>
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

        <label className="flex items-start">
          <input
            type="checkbox"
            name="guidelinesAgreed"
            checked={formData.guidelinesAgreed}
            onChange={handleChange}
            className="mt-1 mr-2"
            required
          />
          <span className="text-sm">
            <a href="/guidelines" className="text-blue-600 hover:underline" target="_blank">
              コミュニティガイドライン
            </a>
            を読み、同意します
          </span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          メール通知設定
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="notifyEvents"
              checked={formData.notifyEvents}
              onChange={handleChange}
              className="mr-2"
            />
            イベントの案内を受け取る
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="notifyUpdates"
              checked={formData.notifyUpdates}
              onChange={handleChange}
              className="mr-2"
            />
            ASIBAからのお知らせを受け取る
          </label>
        </div>
      </div>
    </div>
  );
} 