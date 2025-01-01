import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function SearchBooksModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [comments, setComments] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error.message);
      } else {
        setUserId(data?.user?.id || null);
      }
    };

    getUser();
  }, []);

  const searchBooks = async () => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await response.json();
    setResults(data.items || []);
  };

  const addBookToSupabase = async (book: any) => {
    if (!userId) {
      console.error('User not logged in');
      return;
    }

    const comment = comments[book.id] || '';
    const bookUrl = book.volumeInfo.infoLink;

    const { data, error } = await supabase.from('books').insert([
      {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors?.join(', '),
        description: book.volumeInfo.description,
        cover_image: book.volumeInfo.imageLinks?.thumbnail,
        added_by: userId,
        comment: comment,
        book_url: bookUrl,
      },
    ]);

    if (error) {
      console.error('Error adding book:', error.message);
    } else {
      console.log('Book added:', data);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded shadow-lg max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="text-red-500 float-right">×</button>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="本を検索"
          className="border p-2 w-full"
        />
        <button onClick={searchBooks} className="mt-2 p-2 bg-blue-500 text-white w-full">
          検索
        </button>
        <div className="max-h-80 overflow-y-auto mt-4">
          {results.map((book) => (
            <div key={book.id} className="p-4 border-b">
              <h3 className="font-bold">{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors?.join(', ')}</p>
              <input
                type="text"
                value={comments[book.id] || ''}
                onChange={(e) => setComments({ ...comments, [book.id]: e.target.value })}
                placeholder="一言コメント"
                className="border p-2 mt-2 w-full"
              />
              <button
                onClick={() => addBookToSupabase(book)}
                className="mt-2 p-2 bg-green-500 text-white w-full"
              >
                追加
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}