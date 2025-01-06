import { Profile } from "@/types/form";

interface SkillsTabProps {
    profile: Partial<Profile>;
    onChange: (field: keyof Profile, value: string | boolean | string[]) => void;
}

const SkillsTab: React.FC<SkillsTabProps> = ({ profile, onChange }) => {
    return (
        <div className="space-y-6">
            {/* Skills */}
            <div className="space-y-2">
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                    スキル
                </label>
                <input
                    id="skills"
                    type="text"
                    value={profile.skills || ''}
                    onChange={(e) => onChange('skills', e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            {/* Expertise */}
            <div className="space-y-2">
                <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">
                    専門分野
                </label>
                <input
                    id="expertise"
                    type="text"
                    value={profile.expertise || ''}
                    onChange={(e) => onChange('expertise', e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            {/* Tags */}
            <div className="space-y-2">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                    タグ
                </label>
                <input
                    id="tags"
                    type="text"
                    value={profile.tags || ''}
                    onChange={(e) => onChange('tags', e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
        </div>
    );
};

export default SkillsTab; 