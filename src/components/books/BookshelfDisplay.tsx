import React from 'react';
import { Book } from '@/types/book';

type BookshelfDisplayProps = {
  books: Book[];
  onLike: (bookId: string) => Promise<void>;
};

const BookshelfDisplay: React.FC<BookshelfDisplayProps> = ({ books, onLike }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <div 
          key={book.id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          {book.coverUrl && (
            <img 
              src={book.coverUrl}
              alt={`Cover of ${book.title}`}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          )}
          <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
          {book.author && (
            <p className="text-gray-600 mb-2">by {book.author}</p>
          )}
          {book.description && (
            <p className="text-gray-700 mb-4 line-clamp-3">{book.description}</p>
          )}
          <div className="flex justify-between items-center">
            <button
              onClick={() => onLike(book.id)}
              className="flex items-center gap-2 px-3 py-1 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <span>👍</span>
              <span>{book.likes || 0}</span>
            </button>
            <span className="text-sm text-gray-500">
              Added: {new Date(book.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookshelfDisplay;