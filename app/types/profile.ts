export interface ProfileType {
  user: {
    given_name: string;
    family_name: string;
    nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    role: string;
    email: string;
    email_verified: boolean;
    sub: string;
    sid: string;
    id: number;
  };
}
