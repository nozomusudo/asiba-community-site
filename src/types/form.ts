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
