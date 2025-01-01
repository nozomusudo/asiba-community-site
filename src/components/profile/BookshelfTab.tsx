import { Book } from 'lucide-react';
import Image from 'next/image';

type BookshelfTabProps = {
  profile: any;
};

export default function BookshelfTab({ profile }: BookshelfTabProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6, 8].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
          <div className="aspect-[3/4] relative bg-gray-100">
            <Image
              src={`/books/book-${i}.jpg`}
              alt={`建築の本 ${i}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h4 className="font-bold">建築の本 {i}</h4>
            <p className="text-sm text-gray-600">著者名</p>
            <div className="mt-2 flex items-center gap-2">
              <Book className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">読書中</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 