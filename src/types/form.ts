export type FormData = {
  // Step 1: 基本情報
  email: string;
  password: string;
  nameKanji: string;
  nameEnglish: string;
  
  // Step 2: プロフィール設定
  portfolioUrl: string;
  
  // Step 3: 確認・同意
  termsAgreed: boolean;
  privacyAgreed: boolean;
};
