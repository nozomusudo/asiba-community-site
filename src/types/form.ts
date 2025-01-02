export type FormData = {
  // 基本情報（必須）
  nameKanji: string;
  nameKana: string;
  nameEnglish: string;
  birthDate: string;
  phone: string;
  
  // 所属情報（必須）
  organization: string;
  department: string;
  laboratory: string;
  grade: string;

  // スキル情報（必須）
  expertise: string[];
  skills: string[];
  certifications: string[];

  // ソーシャル情報（必須）
  discordId: string;
  discordUsername: string;
  twitterUrl: string;
  instagramUrl: string;
  noteUrl: string;

  // 自己紹介情報（必須）
  bio: string;
  interests: string[];
  projectTypes: string[];
  availability: string;
  howFound: string;
  tags: string[];
  avatarUrl: string | null;
  portfolioUrl: string | null;

  // 設定情報（必須）
  notifyUpdates: boolean;
  termsAgreed: boolean;
  privacyAgreed: boolean;

  // プロフィールの公開範囲
  visibility: string;
};

export type Profile = {
    id: string;
    name_kanji?: string;
    name_english?: string;
    avatar_url?: string;
    updated_at?: string; // ISO 8601 format
    email?: string;
    name_kana?: string;
    birth_date?: string; // YYYY-MM-DD format
    phone?: string;
    organization?: string;
    department?: string;
    laboratory?: string;
    grade?: string;
    supervisor?: string;
    expertise?: string[];
    skills?: string[];
    certifications?: string[];
    discord_id?: string;
    discord_username?: string;
    twitter_url?: string;
    instagram_url?: string;
    note_url?: string;
    bio?: string;
    interests?: string[];
    project_types?: string[];
    availability?: string;
    how_found?: string;
    tags?: string[];
    visibility?: string;
    notify_updates?: boolean;
    terms_agreed?: boolean;
    privacy_agreed?: boolean;
    portfolio_url?: string;
  };