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
    // Fetch the current likes
    const { data: bookData, error: fetchError } = await supabase
      .from('books')
      .select('likes')
      .eq('id', bookId)
      .single();

    if (fetchError) {
      console.error('Error fetching book:', fetchError);
      return;
    }

    // Increment the likes
    const newLikes = (bookData.likes || 0) + 1;

    // Update the likes in the database
    const { data, error } = await supabase
      .from('books')
      .update({ likes: newLikes })
      .eq('id', bookId);

    if (error) {
      console.error('Error updating likes:', error);
    } else {
      console.log('Likes updated successfully:', data);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Bookshelf</h2>
      <BookshelfDisplay books={books} onLike={likeBook} />
    </div>
  );
}