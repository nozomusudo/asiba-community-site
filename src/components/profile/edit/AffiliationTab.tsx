import { Profile } from "@/types/form";

interface AffiliationTabProps {
    profile: Partial<Profile>;
    onChange: (field: keyof Profile, value: any) => void;
}

const AffiliationTab: React.FC<AffiliationTabProps> = ({ profile, onChange }) => {
    return (
        <div className="space-y-6">
            {/* 所属組織 */}
            <div className="space-y-2">
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
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
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
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
                <label htmlFor="laboratory" className="block text-sm font-medium text-gray-700">
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
                <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
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

export default AffiliationTab; 