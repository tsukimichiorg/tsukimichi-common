import type { Status } from "../core";

/**
 * Represents an anime series from an extension source.
 */
export interface Anime {
  /** Unique identifier for the anime */
  id: string;
  /** Identifier of the extension that provides this anime */
  extensionId: string;
  /** Main title of the anime */
  title: string;
  /** Publication status of the anime */
  status: Status;
  /** URL of the cover image, or null if not available */
  coverImageUrl: string | null;
  /** Name or identifier of the content source (e.g., website name) */
  source: string;
  /**
   * URL of the anime, relative to the base URL of the source
   *
   * Must be stable across calls to
   * {@link GetLatestSeries}, {@link SearchSeries}, {@link GetPopularSeries} and {@link GetSeries}
   */
  url: string;
  /** Whether the anime contains NSFW content, or null if unknown */
  isNsfw: boolean | null;
  /** List of animation studios */
  studios?: string[] | null;
  /** List of production companies */
  producers?: string[];
  /** List of genres */
  genres?: string[] | null;
  /** Full description or synopsis */
  description?: string | null;
  /** Alternative titles (including translations) */
  alternateTitles?: string[] | null;
  /** ISO timestamp of last update */
  lastUpdated?: string | null;
  /** Rating score (typically 0-10 or 0-100) */
  rating?: number | null;
  /** Whether this anime is stored locally */
}

/**
 * Represents a single episode of an anime.
 */
export interface Episode {
  /** Unique identifier for the episode */
  id: string;
  /** Identifier of the extension that provides this episode */
  extensionId: string;
  /** Name or identifier of the content source */
  source: string;
  /** Display title of the episode */
  title: string;
  /** URL of the episode, relative to the base URL of the source */
  url: string;
  /** ISO timestamp of last update */
  lastUpdated?: string | null;
  /** Numeric episode number */
  episodeNumber?: number | null;
  /** Whether this is a filler episode */
  isFiller?: boolean;
  /** Name of the scanlator */
  scanlator?: string | null;
}