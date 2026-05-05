import { Locale } from "@/types/i18n";

export type UserRoleType = "user" | "admin";

export type UserSubscriptionType = "none" | "premium";

export interface IPublicUser {
  id: number;
  username: string;
  avatar: string | null;
  // banner: string | null; // Not now
  // background: string | null; // Not now
  bio: string;
  location: string;
  website: string;
  subscription: UserSubscriptionType;
  locale: Locale;
  createdAt: string;
  updatedAt: string;
}

export interface IUser extends IPublicUser {
  fullName: string; // Use username instead
  isAdmin: boolean; // Use role instead
  email: string; // Private info!
  role: UserRoleType; // Private info!
  expires: number; // Must be separate (3 weeks)
}
