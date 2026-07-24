import type { LANGUAGE_KEY } from "../lib/language";

/**
 * Represents the publication status of a series.
 *
 * - `ongoing`: Series is currently being published
 * - `completed`: Series has finished publication
 * - `cancelled`: Series was cancelled before completion
 * - `hiatus`: Series is on temporary break
 * - `upcoming`: Series is announced but not yet released
 * - `unknown`: Status cannot be determined
 */
export type Status = "ongoing" | "completed" | "cancelled" | "hiatus" | "upcoming" | "unknown";

/**
 * Represents a language supported by the application.
 */
export interface Language {
  /** Unique identifier key for the language */
  key: LANGUAGE_KEY;
  /** Display name of the language */
  name: string;
  /** Emoji flag code representing the language/region */
  flagCode: string;
  /** ISO 639-1 two-letter language code */
  iso6391: string;
  /** Optional region specification (e.g., "United States", "Brazil") */
  region?: string;
}

export interface ElectronCookie {
  domain?: string;
  expirationDate?: number;
  hostOnly?: boolean;
  httpOnly?: boolean;
  name: string;
  path?: string;
  sameSite: "unspecified" | "no_restriction" | "lax" | "strict";
  secure?: boolean;
  session?: boolean;
  value: string;
}
