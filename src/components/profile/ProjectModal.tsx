import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

type ProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  const [name, setName] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUserId(session.user.id);
      }
    };

    fetchUser();
  }, []);

  const handleImageUpload = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('projects')
      .upload(fileName, file);

    if (error) {
      throw error;
    }

    const storageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/projects/${data.path}`;
    return storageUrl;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      let coverImagePath = '';

      if (coverImage) {
        coverImagePath = await handleImageUpload(coverImage);
      }

      const { error } = await supabase.from('projects').insert([
        {
          name,
          members,
          cover_image: coverImagePath,
          description,
          leader: userId,
        },
      ]);

      if (error) {
        throw error;
      }

      onClose();
    } catch (error) {
      console.error('Error creating project:', error);
      setError('プロジェクトの作成に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">プロジェクトを登録</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="プロジェクト名"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="プロジェクトメンバー (カンマ区切り)"
            value={members.join(', ')}
            onChange={(e) => setMembers(e.target.value.split(',').map((m) => m.trim()))}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files ? e.target.files[0] : null)}
            className="w-full px-3 py-2 border rounded-md"
          />
          <textarea
            placeholder="概要文"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-900">
            キャンセル
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '登録中...' : '登録'}
          </button>
        </div>
      </div>
    </div>
  );
}
