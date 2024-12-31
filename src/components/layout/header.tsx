import Link from 'next/link';

export const Header = () => {
  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-2xl font-bold">
            ASIBA
          </Link>
          <nav className="flex gap-8">
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/projects" className="text-gray-600 hover:text-gray-900">
              Projects
            </Link>
            <Link href="/events" className="text-gray-600 hover:text-gray-900">
              Events
            </Link>
            <Link href="/community" className="text-gray-600 hover:text-gray-900">
              Community
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
            >
              ログイン
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              メンバー登録
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};