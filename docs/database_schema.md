**ASIBAコミュニティサイト Supabase データベース仕様書**

## **1\. 概要**

本仕様書は、ASIBAコミュニティサイトのMVPで使用するSupabaseデータベースの設計について記述する。ユーザー認証、プロジェクト管理、イベント管理、ナレッジ共有などをサポートするためのテーブル構成と、Supabase Storageを利用したファイル管理について定義する。

## **2\. データベース構造**

### **2.1 ユーザー関連**

#### **users（ユーザー）**

| カラム名 | データ型 | 説明 |
| :---- | :---- | :---- |
| id | UUID | ユーザーID (主キー) |
| full\_name | TEXT | 氏名 |
| email | TEXT | メールアドレス (ユニーク) |
| avatar\_url | TEXT | プロフィール画像URL（Supabase Storage） |
| skills | TEXT\[\] | スキルタグ（配列型） |
| bio | TEXT | 自己紹介 |
| affiliation | TEXT | 所属（大学・企業など） |
| portfolio\_url | TEXT | ポートフォリオ (PDF, Supabase Storage) |
| created\_at | TIMESTAMP | 作成日時 |
| updated\_at | TIMESTAMP | 更新日時 |

- `avatar_url` と `portfolio_url` は Supabase Storage に保存  
- 認証は Supabase Auth を使用し、メールアドレスをユニークに管理

#### **roles（ロール）**

| カラム名 | データ型 | 説明 |
| :---- | :---- | :---- |
| id | UUID | ロールID (主キー) |
| name | TEXT | ロール名 ("事務局", "管理者", "インキュベーション参加者" など) |
| created\_at | TIMESTAMP | 作成日時 |

#### **user\_roles（ユーザーとロールのリレーション）**

| カラム名 | データ型 | 説明 |
| :---- | :---- | :---- |
| id | UUID | リレーションID (主キー) |
| user\_id | UUID | ユーザーID (users.id) |
| role\_id | UUID | ロールID (roles.id) |

- 一人のユーザーが複数のロールを持てるようにする

### **2.2 プロジェクト関連**

#### **projects（プロジェクト）**

| カラム名 | データ型 | 説明 |
| :---- | :---- | :---- |
| id | UUID | プロジェクトID (主キー) |
| title | TEXT | プロジェクト名 |
| description | TEXT | プロジェクト概要 |
| leader\_id | UUID | プロジェクトリーダー (users.id) |
| members | UUID\[\] | 参加メンバーリスト (users.id の配列) |
| status | TEXT | ステータス (例: "進行中", "完了") |
| cover\_image | TEXT | カバー画像URL（Supabase Storage） |
| created\_at | TIMESTAMP | 作成日時 |
| updated\_at | TIMESTAMP | 更新日時 |

#### **programs（プログラム）**

| カラム名 | データ型 | 説明 |
| :---- | :---- | :---- |
| id | UUID | プログラムID (主キー) |
| name | TEXT | プログラム名 (例: "INC-01", "ws-05") |
| created\_at | TIMESTAMP | 作成日時 |

#### **project\_programs（プロジェクトとプログラムのリレーション）**

| カラム名 | データ型 | 説明 |
| :---- | :---- | :---- |
| id | UUID | リレーションID (主キー) |
| project\_id | UUID | プロジェクトID (projects.id) |
| program\_id | UUID | プログラムID (programs.id) |

### **2.3 プロジェクトの進捗**

#### **project\_updates（プロジェクトの進捗報告）**

| カラム名 | データ型 | 説明 |
| :---- | :---- | :---- |
| id | UUID | 更新ID (主キー) |
| project\_id | UUID | プロジェクトID (projects.id) |
| user\_id | UUID | 投稿者 (users.id) |
| content | TEXT | 更新内容 |
| images | TEXT\[\] | 投稿写真URL（Supabase Storage） |
| created\_at | TIMESTAMP | 投稿日時 |

### **2.4 イベント管理**

#### **events（イベント）**

| カラム名 | データ型 | 説明 |
| :---- | :---- | :---- |
| id | UUID | イベントID (主キー) |
| title | TEXT | イベント名 |
| description | TEXT | イベント概要 |
| date | TIMESTAMP | 開催日時 |
| location | TEXT | 場所 |
| organizer\_id | UUID | 主催者 (users.id) |
| created\_at | TIMESTAMP | 作成日時 |

#### **event\_projects（イベントとプロジェクトのリレーション）**

| カラム名 | データ型 | 説明 |
| :---- | :---- | :---- |
| id | UUID | リレーションID (主キー) |
| event\_id | UUID | イベントID (events.id) |
| project\_id | UUID | プロジェクトID (projects.id) |

---

## **3\. Supabase Storage 設計**

以下のファイルを Supabase Storage に保存する:

- **avatars/**: プロフィール画像 (`users.avatar_url`)  
- **portfolios/**: ユーザーポートフォリオPDF (`users.portfolio_url`)  
- **project\_covers/**: プロジェクトカバー画像 (`projects.cover_image`)  
- **project\_updates/**: プロジェクト進捗画像 (`project_updates.images`)

---

## **4\. 次のステップ**

1. Supabaseにテーブルとリレーションを作成  
2. Supabase Storage のバケットを作成し、適切なアクセス制御を設定  
3. API実装（Next.js & Supabase SDK）

