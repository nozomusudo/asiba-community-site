import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import BookshelfDisplay from '@/components/books/BookshelfDisplay';
import { Book } from '@/types/book';

export default function BookshelfTab() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const likeBook = async (bookId: string) => {
    try {
      // まず現在のいいね数を取得
      const { data: currentBook, error: fetchError } = await supabase
        .from('books')
        .select('likes')
        .eq('id', bookId)
        .single();

      if (fetchError) throw fetchError;

      // 新しいいいね数を計算
      const newLikes = (currentBook?.likes || 0) + 1;

      // いいね数を更新
      const { data, error: updateError } = await supabase
        .from('books')
        .update({ likes: newLikes })
        .eq('id', bookId)
        .select()
        .single();

      if (updateError) throw updateError;

      // ローカルのstate更新
      setBooks(books.map(book => 
        book.id === bookId 
          ? { ...book, likes: newLikes }
          : book
      ));

    } catch (err) {
      console.error('Error updating likes:', err);
      setError(err instanceof Error ? err.message : 'Failed to update likes');
    }
  };



  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Bookshelf</h2>
      {books.length === 0 ? (
        <p className="text-gray-500">No books found. Start adding some!</p>
      ) : (
        <BookshelfDisplay books={books} onLike={likeBook} />
      )}
    </div>
  );
}