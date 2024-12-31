import { ArrowRight, Calendar, Book, Users, ArrowUpRight, Tag, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* ヒーローセクション */}
      <section>
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="flex gap-12">
            <div className="flex-1 pt-12">
              <h2 className="text-5xl font-bold leading-tight">
                建築・デザイン・アートで
                <br />
                未来を創造する
              </h2>
              <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                ASIBAは、次世代のクリエイターたちと共に、
                <br />
                社会をより良い方向へと変革していくコミュニティです。
              </p>
              <div className="mt-12 flex gap-4">
                <Link
                  href="/projects"
                  className="px-8 py-4 bg-black text-white rounded-md hover:bg-gray-800 flex items-center gap-2"
                >
                  プロジェクトを見る
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 border border-gray-200 rounded-md hover:bg-gray-50"
                >
                  詳しく知る
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <Image
                src="/hero-image.jpg"
                alt="ASIBAコミュニティの活動風景"
                width={600}
                height={600}
                className="rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 最新情報 */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-blue-600 font-medium">NEWS</span>
              <h2 className="mt-2 text-3xl font-bold">最新情報</h2>
            </div>
            <Link 
              href="/news" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              すべて見る
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {[
              {
                title: "ASIBA FES 2024を開催しました",
                date: "2024.01.15",
                category: "イベント",
                tags: ["フェス", "コミュニティ"],
                image: "/event-1.jpg",
                excerpt: "150名以上が参加し、活発な議論が行われました..."
              },
              // ... 他の記事データ
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                      {item.category}
                    </span>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-2 text-gray-600 text-sm">{item.excerpt}</p>
                  <div className="mt-4 flex gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1 text-xs text-gray-500">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 新規セクション: アクティブメンバー */}
      <section className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-medium">COMMUNITY</span>
            <h2 className="mt-2 text-3xl font-bold">アクティブメンバー</h2>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((member) => (
              <div key={member} className="text-center">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
                  <Image
                    src={`/member-${member}.jpg`}
                    alt="メンバー"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 font-bold">山田 太郎</h3>
                <p className="text-sm text-gray-600">建築デザイナー</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 新規セクション: 今後のイベント */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-medium">EVENTS</span>
            <h2 className="mt-2 text-3xl font-bold">今後のイベント</h2>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {[1, 2].map((event) => (
              <div key={event} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-blue-50 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">23</span>
                    <span className="text-sm text-blue-600">MAR</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">デザインワークショップ</h3>
                    <div className="mt-2 flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">東京都渋谷区</span>
                    </div>
                    <Link
                      href="/events/1"
                      className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700"
                    >
                      詳細を見る
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section>
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-medium">FEATURES</span>
            <h2 className="mt-2 text-3xl font-bold">ASIBAの特徴</h2>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="w-6 h-6" />,
                title: "実践的なプログラム",
                description:
                  "インキュベーションを通じて、アイデアを現実のプロジェクトへと発展させます。",
              },
              {
                icon: <Book className="w-6 h-6" />,
                title: "知識の共有",
                description:
                  "ワークショップや勉強会を通じて、専門知識とスキルを高め合います。",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "コミュニティの力",
                description:
                  "多様な背景を持つメンバーとの協働で、新しい価値を生み出します。",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-xl bg-gray-50">
                <div className="w-12 h-12 mx-auto bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="mt-6 font-bold text-xl">{feature.title}</h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h2 className="text-3xl font-bold">
            あなたのアイデアを、形にしませんか？
          </h2>
          <p className="mt-4 text-gray-400">
            ASIBAは、建築・デザイン・アート分野での挑戦を支援します。
          </p>
          <Link
            href="/register"
            className="inline-block mt-8 px-8 py-4 bg-white text-black rounded-md hover:bg-gray-100"
          >
            メンバーになる
          </Link>
        </div>
      </section>
    </div>
  );
}