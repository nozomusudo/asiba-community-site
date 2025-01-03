import { Profile } from "@/types/form";

interface SettingsTabProps {
    profile: Partial<Profile>;
    onChange: (field: keyof Profile, value: any) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ profile, onChange }) => {
    return (
        <div className="space-y-6">
            {/* Certifications */}
            <div className="space-y-2">
                <label htmlFor="certifications" className="block text-sm font-medium text-gray-700">
                    資格
                </label>
                <input
                    id="certifications"
                    type="text"
                    value={profile.certifications || ''}
                    onChange={(e) => onChange('certifications', e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            {/* Terms Agreed */}
            <div className="space-y-2">
                <label htmlFor="terms_agreed" className="block text-sm font-medium text-gray-700">
                    利用規約に同意
                </label>
                <input
                    id="terms_agreed"
                    type="checkbox"
                    checked={profile.terms_agreed || false}
                    onChange={(e) => onChange('terms_agreed', e.target.checked)}
                />
            </div>

            {/* Privacy Agreed */}
            <div className="space-y-2">
                <label htmlFor="privacy_agreed" className="block text-sm font-medium text-gray-700">
                    プライバシーポリシーに同意
                </label>
                <input
                    id="privacy_agreed"
                    type="checkbox"
                    checked={profile.privacy_agreed || false}
                    onChange={(e) => onChange('privacy_agreed', e.target.checked)}
                />
            </div>
        </div>
    );
};

export default SettingsTab; 