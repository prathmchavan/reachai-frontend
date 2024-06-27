export const OAUTH_CLIENT_ID = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID;
export const OAUTH_CLIENT_SECRET = process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET;
export const OAUTH_REDIRECT_URL = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URL;
export const OAUTH_TOKEN_URL = process.env.NEXT_PUBLIC_OAUTH_TOKEN_URL;
export const OAUTH_USERINFO_URL = process.env.NEXT_PUBLIC_OAUTH_USERINFO_URL;
export const authScopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  " https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/gmail.readonly",
];
export const OPENAI_ORG_ID = process.env.NEXT_PUBLIC_OPENAI_ORG_ID;
export const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY
export const API_URL = process.env.NEXT_PUBLIC_API_URL;