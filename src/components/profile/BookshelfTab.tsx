import { useState } from 'react';
import SearchBooksModal from '@/components/books/SearchBooksModal';
import BookshelfDisplay from '@/components/books/BookshelfDisplay';

type BookshelfTabProps = {
  profile: Profile;
  books: any[];
  onLike: (bookId: string) => void;
};

export default function BookshelfTab({ profile, books, onLike }: BookshelfTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{profile.name_kanji}のBookshelf</h2>
      <button onClick={() => setIsModalOpen(true)} className="mb-4 p-2 bg-blue-500 text-white">
        本を追加
      </button>
      <SearchBooksModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <BookshelfDisplay books={books} onLike={onLike} />
    </div>
  );
} 