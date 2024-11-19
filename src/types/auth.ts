export interface UserMetadata {
  fullName: string;
  position: string;
  education: string;
  institution: string;
  researchSubject: string;
  credits: number;
  subscription: 'free' | 'premium';
}

export interface AuthError {
  message: string;
}