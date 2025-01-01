import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { Heart } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  cover_image: string;
  comment: string;
  likes: number;
  book_url: string | null;
  added_by: string;
  added_by_name: string;
};

type BookshelfDisplayProps = {
  books: Book[];
};

export default function BookshelfDisplay({ books }: BookshelfDisplayProps) {
  const [booksWithNames, setBooksWithNames] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooksWithNames = async () => {
      const booksWithNames = await Promise.all(
        books.map(async (book) => {
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('name_kanji')
            .eq('id', book.added_by)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
            return { ...book, added_by_name: 'Unknown' };
          }

          return { ...book, added_by_name: profileData?.name_kanji || 'Unknown' };
        })
      );

      setBooksWithNames(booksWithNames);
    };

    fetchBooksWithNames();
  }, [books]);

  const handleLike = async (bookId: string) => {
    const book = booksWithNames.find((b) => b.id === bookId);
    if (book) {
      const newLikes = book.likes + 1;
      const { data, error } = await supabase
        .from('books')
        .update({ likes: newLikes })
        .eq('id', bookId);

      if (error) {
        console.error('Error liking book:', error);
      } else {
        console.log('Book liked:', data);
      }
    }
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const truncateText = (text: string | null | undefined, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {booksWithNames.map((book) => (
        <div key={book.id} className="bg-white p-4 rounded shadow">
          <a
            href={book.book_url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!book.book_url) e.preventDefault();
            }}
          >
            <img src={book.cover_image} alt={book.title} className="w-full h-48 object-cover mb-4" />
          </a>
          <h3 className="font-bold">{book.title}</h3>
          <p className="text-sm text-gray-600">{book.author}</p>
          <p className="text-sm text-gray-600">{truncateText(book.description, 150)}</p>
          <p className="text-sm text-gray-600 italic">"{book.comment}"</p>
          <p className="text-sm text-gray-600">by {book.added_by_name}</p>
          <div className="flex items-center mt-2">
            <button
              onClick={(e) => { e.stopPropagation(); handleLike(book.id); }}
              className="mr-2 group"
            >
              <Heart className="text-red-500 group-hover:fill-current group-hover:text-red-600" />
            </button>
            <span>{book.likes}</span>
          </div>
        </div>
      ))}
    </Masonry>
  );
}