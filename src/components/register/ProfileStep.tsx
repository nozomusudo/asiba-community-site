import { FormData } from '@/types/form';

type Props = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

export default function ProfileStep({ formData, setFormData }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        profileImage: e.target.files[0],
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-1">
          プロフィール画像
        </label>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          onChange={handleFileChange}
          accept="image/*"
          className="w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
          自己紹介文
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"
          required
          placeholder="あなたの経験や目標、興味関心などを自由に記入してください"
        />
      </div>

      <div>
        <label htmlFor="socialLinks" className="block text-sm font-medium text-gray-700 mb-1">
          SNSアカウント（任意）
        </label>
        <div className="space-y-3">
          <input
            type="url"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Twitter URL"
          />
          <input
            type="url"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Instagram URL"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          プロフィール公開設定
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="visibility"
              value="public"
              checked={formData.visibility === 'public'}
              onChange={handleChange}
              className="mr-2"
            />
            全体に公開
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="visibility"
              value="members"
              checked={formData.visibility === 'members'}
              onChange={handleChange}
              className="mr-2"
            />
            メンバーにのみ公開
          </label>
        </div>
      </div>
    </div>
  );
} 