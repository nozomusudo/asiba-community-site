export type FormData = {
  // Step 1: 基本情報
  email: string;
  password: string;
  nameKanji: string;
  nameKana: string;
  birthDate: string;
  phone: string;
  
  // Step 2: 所属情報
  organization: string;
  department: string;
  laboratory: string;
  grade: string;
  supervisor: string;
  
  // Step 3: 専門分野・スキル
  specialization: string;
  skills: string[];
  certifications: string;
  portfolioUrl: string;
  
  // Step 4: 興味・関心
  interests: string;
  projectType: string;
  discovery: string;
  availability: string;
  
  // Step 5: プロフィール設定
  profileImage: File | null;
  bio: string;
  twitter: string;
  instagram: string;
  visibility: 'public' | 'members';
  
  // Step 6: 確認・同意
  termsAgreed: boolean;
  privacyAgreed: boolean;
  guidelinesAgreed: boolean;
  notifyEvents: boolean;
  notifyUpdates: boolean;
}; 