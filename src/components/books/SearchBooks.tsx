import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function SearchBooks() {
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

    const { data, error } = await supabase.from('books').insert([
      {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors?.join(', '),
        description: book.volumeInfo.description,
        cover_image: book.volumeInfo.imageLinks?.thumbnail,
        added_by: userId,
        comment: comment,
      },
    ]);

    if (error) {
      console.error('Error adding book:', error.message);
    } else {
      console.log('Book added:', data);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="本を検索"
        className="border p-2"
      />
      <button onClick={searchBooks} className="ml-2 p-2 bg-blue-500 text-white">
        検索
      </button>
      <div>
        {results.map((book) => (
          <div key={book.id} className="p-4 border-b">
            <h3 className="font-bold">{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors?.join(', ')}</p>
            <input
              type="text"
              value={comments[book.id] || ''}
              onChange={(e) => setComments({ ...comments, [book.id]: e.target.value })}
              placeholder="一言コメント"
              className="border p-2 mt-2"
            />
            <button
              onClick={() => addBookToSupabase(book)}
              className="mt-2 p-2 bg-green-500 text-white"
            >
              追加
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}