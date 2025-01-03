import { Profile } from "@/types/form";

interface SocialTabProps {
    profile: Partial<Profile>;
    onChange: (field: keyof Profile, value: any) => void;
}

const SocialTab: React.FC<SocialTabProps> = ({ profile, onChange }) => {
    return (
        <div className="space-y-6">
            {/* Twitter URL */}
            <div className="space-y-2">
                <label htmlFor="twitter_url" className="block text-sm font-medium text-gray-700">
                    Twitter URL
                </label>
                <input
                    id="twitter_url"
                    type="url"
                    value={profile.twitter_url || ''}
                    onChange={(e) => onChange('twitter_url', e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            {/* Instagram URL */}
            <div className="space-y-2">
                <label htmlFor="instagram_url" className="block text-sm font-medium text-gray-700">
                    Instagram URL
                </label>
                <input
                    id="instagram_url"
                    type="url"
                    value={profile.instagram_url || ''}
                    onChange={(e) => onChange('instagram_url', e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            {/* Note URL */}
            <div className="space-y-2">
                <label htmlFor="note_url" className="block text-sm font-medium text-gray-700">
                    Note URL
                </label>
                <input
                    id="note_url"
                    type="url"
                    value={profile.note_url || ''}
                    onChange={(e) => onChange('note_url', e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
        </div>
    );
};

export default SocialTab; 