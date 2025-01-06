import { Profile } from "@/types/form";
import { useRef, useState } from "react";
import { supabase } from '@/lib/supabase';
import { Camera, X } from 'lucide-react';

interface IconPortfolioTabProps {
    profile: Partial<Profile>;
    onChange: (field: keyof Profile, value: string | boolean | string[]) => void;
}

const IconPortfolioTab: React.FC<IconPortfolioTabProps> = ({ profile, onChange }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const pdfInputRef = useRef<HTMLInputElement>(null);

    const uploadFile = async (file: File, bucket: string) => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user.id) throw new Error('認証が必要です');

            // ファイル名を一意にする
            const fileExt = file.name.split('.').pop();
            const fileName = `${session.user.id}_${Math.random().toString(36).slice(2)}.${fileExt}`;
            const filePath = `${session.user.id}/${fileName}`;

            // ファイルをアップロード
            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file, {
                    upsert: true,
                });

            if (uploadError) throw uploadError;

            // 公開URLを取得
            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    };

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!event.target.files || !event.target.files[0]) return;

            const file = event.target.files[0];
            if (!file.type.startsWith('image/')) {
                setError('画像ファイルを選択してください');
                return;
            }

            setUploading(true);
            setError(null);

            const publicUrl = await uploadFile(file, 'avatars');
            onChange('avatar_url', publicUrl);

        } catch (error) {
            setError('アイコンのアップロードに失敗しました');
            console.error('Image upload error:', error);
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handlePdfChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!event.target.files || !event.target.files[0]) return;

            const file = event.target.files[0];
            if (file.type !== 'application/pdf') {
                setError('PDFファイルを選択してください');
                return;
            }

            setUploading(true);
            setError(null);

            const publicUrl = await uploadFile(file, 'portfolios');
            onChange('portfolio_url', publicUrl);

        } catch (error) {
            setError('ポートフォリオのアップロードに失敗しました');
            console.error('PDF upload error:', error);
        } finally {
            setUploading(false);
            if (pdfInputRef.current) {
                pdfInputRef.current.value = '';
            }
        }
    };

    // 既存のファイルを削除
    const handleRemoveFile = async (field: 'avatar_url' | 'portfolio_url', bucket: string) => {
        try {
            const url = profile[field];
            if (!url) return;

            // URLからファイルパスを抽出
            const filePath = url.split('/').slice(-2).join('/');
            
            const { error: deleteError } = await supabase.storage
                .from(bucket)
                .remove([filePath]);

            if (deleteError) throw deleteError;

            onChange(field, null);
        } catch (error) {
            console.error('Delete error:', error);
            setError('ファイルの削除に失敗しました');
        }
    };

    return (
        <div className="space-y-6">
            {error && (
                <div className="text-red-500 text-sm">{error}</div>
            )}

            {/* Icon Upload */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    アイコン
                </label>
                <div className="relative">
                    {profile.avatar_url ? (
                        <div className="relative w-32 h-32">
                            <img 
                                src={profile.avatar_url} 
                                alt="Avatar" 
                                className="w-32 h-32 rounded-full object-cover"
                            />
                            <button
                                onClick={() => handleRemoveFile('avatar_url', 'avatars')}
                                className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center"
                        >
                            <Camera className="w-8 h-8 text-gray-400" />
                        </button>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>
            </div>

            {/* Portfolio Upload */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    ポートフォリオ (PDF)
                </label>
                <div className="mt-1 flex items-center space-x-4">
                    <input
                        ref={pdfInputRef}
                        type="file"
                        accept="application/pdf"
                        onChange={handlePdfChange}
                        className="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-violet-50 file:text-violet-700
                            hover:file:bg-violet-100"
                    />
                    {profile.portfolio_url && (
                        <button
                            onClick={() => handleRemoveFile('portfolio_url', 'portfolios')}
                            className="flex items-center text-red-500 hover:text-red-700"
                        >
                            <X className="w-4 h-4" />
                            <span className="ml-1">削除</span>
                        </button>
                    )}
                </div>
                {profile.portfolio_url && (
                    <a 
                        href={profile.portfolio_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:text-blue-700"
                    >
                        アップロード済みのPDFを表示
                    </a>
                )}
            </div>

            {uploading && (
                <div className="text-sm text-gray-500">
                    アップロード中...
                </div>
            )}
        </div>
    );
};

export default IconPortfolioTab;