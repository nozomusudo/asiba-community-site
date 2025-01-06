import { Profile } from "@/types/form";


interface BasicInfoTabProps {
    profile: Partial<Profile>;
    onChange: (field: keyof Profile, value: string | boolean | string[]) => void;
  }
  
export const BasicInfoTab: React.FC<BasicInfoTabProps> = ({ profile, onChange }) => {
return (
    <div className="space-y-6">
    {/* 氏名（漢字） */}
    <div className="space-y-2">
        <label
        htmlFor="name_kanji"
        className="block text-sm font-medium text-gray-700"
        >
        氏名（漢字）<span className="text-red-500">*</span>
        </label>
        <input
        id="name_kanji"
        type="text"
        value={profile.name_kanji || ''}
        onChange={(e) => onChange('name_kanji', e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        required
        />
    </div>

    {/* 氏名（かな） */}
    <div className="space-y-2">
        <label
        htmlFor="name_kana"
        className="block text-sm font-medium text-gray-700"
        >
        氏名（かな）<span className="text-red-500">*</span>
        </label>
        <input
        id="name_kana"
        type="text"
        value={profile.name_kana || ''}
        onChange={(e) => onChange('name_kana', e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        required
        />
    </div>

    {/* 氏名（英語） */}
    <div className="space-y-2">
        <label
        htmlFor="name_english"
        className="block text-sm font-medium text-gray-700"
        >
        Name (English)<span className="text-red-500">*</span>
        </label>
        <input
        id="name_english"
        type="text"
        value={profile.name_english || ''}
        onChange={(e) => onChange('name_english', e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        required
        />
    </div>

    {/* 生年月日 */}
    <div className="space-y-2">
        <label
        htmlFor="birth_date"
        className="block text-sm font-medium text-gray-700"
        >
        生年月日
        </label>
        <input
        id="birth_date"
        type="date"
        value={profile.birth_date || ''}
        onChange={(e) => onChange('birth_date', e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
    </div>

    {/* 電話番号 */}
    <div className="space-y-2">
        <label
        htmlFor="phone"
        className="block text-sm font-medium text-gray-700"
        >
        電話番号
        </label>
        <input
        id="phone"
        type="tel"
        value={profile.phone || ''}
        onChange={(e) => onChange('phone', e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        placeholder="090-1234-5678"
        />
        <p className="text-sm text-gray-500">
        ハイフン（-）を含めて入力してください
        </p>
    </div>
    </div>
);
};
