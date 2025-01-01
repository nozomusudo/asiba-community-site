import { useEffect, useState } from 'react';

type Bookmark = {
  _id: string;
  title: string;
  link: string;
  excerpt: string;
  cover: string;
};

export default function RaindropTab() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch('https://api.raindrop.io/rest/v1/raindrops/49402575', {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_RAINDROP_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bookmarks');
        }

        const data = await response.json();
        setBookmarks(data.items);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
        setError('ブックマークの取得に失敗しました。');
      }
    };

    fetchBookmarks();
  }, []);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Raindrop ブックマーク</h2>
      <ul className="space-y-4">
        {bookmarks.map((bookmark) => (
          <li key={bookmark._id} className="bg-white p-4 rounded-lg shadow">
            <a href={bookmark.link} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4">
              {bookmark.cover && (
                <img src={bookmark.cover} alt={bookmark.title} className="w-16 h-16 object-cover rounded" />
              )}
              <div>
                <h3 className="text-lg font-bold">{bookmark.title}</h3>
                <p className="text-sm text-gray-600">{bookmark.excerpt}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
} 