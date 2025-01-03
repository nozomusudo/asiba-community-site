export type FormData = {
  email: string;
  password: string;
  nameKanji: string;
  nameEnglish: string;
  termsAgreed: boolean;
  privacyAgreed: boolean;

  // プロフィールの公開範囲
  visibility: string;
};

//スネークケースでProfile型を定義（supabaseとの連携のため）
export type Profile = {
    id?: string;
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