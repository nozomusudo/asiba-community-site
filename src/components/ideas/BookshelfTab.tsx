import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import BookshelfDisplay from '@/components/books/BookshelfDisplay';

export default function BookshelfTab() {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase.from('books').select('*');
      if (error) {
        console.error('Error fetching books:', error);
      } else {
        setBooks(data || []);
      }
    };

    fetchBooks();
  }, []);

  const likeBook = async (bookId: string) => {
    const { data, error } = await supabase
      .from('books')
      .update({ likes: supabase.raw('likes + 1') })
      .eq('id', bookId);

    if (error) {
      console.error('Error liking book:', error);
    } else {
      console.log('Book liked:', data);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Bookshelf</h2>
      <BookshelfDisplay books={books} onLike={likeBook} />
    </div>
  );
}