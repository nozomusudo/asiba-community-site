import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import SearchBooksModal from '@/components/books/SearchBooksModal';
import BookshelfDisplay from '@/components/books/BookshelfDisplay';

export default function BookshelfTab() {
  const [books, setBooks] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

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

  useEffect(() => {
    if (!userId) return;

    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('added_by', userId);

      if (error) {
        console.error('Error fetching books:', error);
      } else {
        setBooks(data || []);
      }
    };

    fetchBooks();
  }, [userId]);

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
      <h2 className="text-xl font-bold mb-4">My Bookshelf</h2>
      <button onClick={() => setIsModalOpen(true)} className="mb-4 p-2 bg-blue-500 text-white">
        本を追加
      </button>
      <SearchBooksModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <BookshelfDisplay books={books} onLike={likeBook} />
    </div>
  );
} 