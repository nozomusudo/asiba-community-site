import { Profile } from "@/types/form";

interface BioTabProps {
    profile: Partial<Profile>;
    onChange: (field: keyof Profile, value: any) => void;
}

const BioTab: React.FC<BioTabProps> = ({ profile, onChange }) => {
    return (
        <div className="space-y-6">
            {/* Bio */}
            <div className="space-y-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    自己紹介
                </label>
                <textarea
                    id="bio"
                    value={profile.bio || ''}
                    onChange={(e) => onChange('bio', e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            {/* Interests */}
            <div className="space-y-2">
                <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
                    興味・関心
                </label>
                <textarea
                    id="interests"
                    value={profile.interests || ''}
                    onChange={(e) => onChange('interests', e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
        </div>
    );
};

export default BioTab; 