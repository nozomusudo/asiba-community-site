import { Profile } from "@/types/form";


interface BasicInfoTabProps {
    profile: Partial<Profile>;
    onChange: (field: keyof Profile, value: any) => void;
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

// components/ProfileForm/AffiliationTab.tsx
interface AffiliationTabProps {
profile: Partial<Profile>;
onChange: (field: keyof Profile, value: any) => void;
}

const AffiliationTab: React.FC<AffiliationTabProps> = ({ profile, onChange }) => {
return (
    <div className="space-y-6">
    {/* 所属組織 */}
    <div className="space-y-2">
        <label
        htmlFor="organization"
        className="block text-sm font-medium text-gray-700"
        >
        所属組織
        </label>
        <input
        id="organization"
        type="text"
        value={profile.organization || ''}
        onChange={(e) => onChange('organization', e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
    </div>

    {/* 学部・研究科 */}
    <div className="space-y-2">
        <label
        htmlFor="department"
        className="block text-sm font-medium text-gray-700"
        >
        学部・研究科
        </label>
        <input
        id="department"
        type="text"
        value={profile.department || ''}
        onChange={(e) => onChange('department', e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
    </div>

    {/* 研究室 */}
    <div className="space-y-2">
        <label
        htmlFor="laboratory"
        className="block text-sm font-medium text-gray-700"
        >
        研究室
        </label>
        <input
        id="laboratory"
        type="text"
        value={profile.laboratory || ''}
        onChange={(e) => onChange('laboratory', e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
    </div>

    {/* 学年 */}
    <div className="space-y-2">
        <label
        htmlFor="grade"
        className="block text-sm font-medium text-gray-700"
        >
        学年
        </label>
        <select
        id="grade"
        value={profile.grade || ''}
        onChange={(e) => onChange('grade', e.target.value)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
        <option value="">選択してください</option>
        <option value="B1">学部1年</option>
        <option value="B2">学部2年</option>
        <option value="B3">学部3年</option>
        <option value="B4">学部4年</option>
        <option value="M1">修士1年</option>
        <option value="M2">修士2年</option>
        <option value="D1">博士1年</option>
        <option value="D2">博士2年</option>
        <option value="D3">博士3年</option>
        <option value="OTHER">その他</option>
        </select>
    </div>
    </div>
);
};