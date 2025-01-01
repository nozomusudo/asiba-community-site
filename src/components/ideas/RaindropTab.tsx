import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import '@/app/globals.css';

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

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Raindrop ブックマーク</h2>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {bookmarks.map((bookmark) => (
          <div key={bookmark._id} className="bg-white p-4 rounded-lg shadow">
            <a href={bookmark.link} target="_blank" rel="noopener noreferrer" className="flex flex-col space-y-2">
              {bookmark.cover && (
                <img src={bookmark.cover} alt={bookmark.title} className="w-full h-32 object-cover rounded" />
              )}
              <div>
                <h3 className="text-lg font-bold">{bookmark.title}</h3>
                <p className="text-sm text-gray-600" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                  {bookmark.excerpt}
                </p>
              </div>
            </a>
          </div>
        ))}
      </Masonry>
    </div>
  );
} 