import type { ElectronCookie, Status } from "../core";
import type { ExtensionFilterConfig } from "../filters";
import type { CreatePreferencesFunction } from "../preferences";
import type { Anime, Episode } from "../series/anime";
import type { Chapter, ChapterPages, Manga } from "../series/manga";
import type { ExtensionMetadata } from "./metadata";
import type { Setting } from "./settings";
import type { Video } from "./video";

// ==================== Function Types ====================

export interface FilterValues {
  /** Whether to include NSFW content */
  includeNsfw?: boolean;
  /** Additional filter values */
  [key: string]: unknown;
}

/** Searches for series */
export type SearchSeries<T> = (
  query?: string,
  options?: {
    page?: number;
    filters?: FilterValues;
  },
) => Promise<SeriesListResponse<T>>;

/** Gets popular series */
export type GetPopularSeries<T> = (options?: {
  page?: number;
  filters?: {
    /** Whether to include NSFW content */
    includeNsfw?: boolean;
  };
}) => Promise<SeriesListResponse<T>>;

/** Gets latest series */
export type GetLatestSeries<T> = (options?: {
  page?: number;
  filters?: {
    /** Whether to include NSFW content */
    includeNsfw?: boolean;
  };
}) => Promise<SeriesListResponse<T>>;

/** Gets a specific series */
export type GetSeries<T> = (query: string) => Promise<T | null>;

/** Gets manga chapters */
export type GetMangaChapters = (query: string) => Promise<Chapter[]>;

/** Gets chapter pages */
export type GetChapterPages = (query: string) => Promise<ChapterPages>;

/**
 * Gets manga URL
 */
export type GetMangaUrl = (manga: Manga) => string;

/**
 * Gets chapter URL
 */
export type GetChapterUrl = (chapter: Chapter) => string;

export type GetAnimeUrl = (anime: Anime) => string;

export type GetEpisodeUrl = (episode: Episode) => string;

/** Gets an image */
export type GetImage = (url: string) => Promise<{
  data: ArrayBuffer;
  contentType: string;
}>;

/** Gets filter configuration */
export type GetFilterConfig = () => ExtensionFilterConfig;

/** Gets series status */
export type GetSeriesStatus = (status?: string | null) => Status;

/** Gets metadata */
export type GetMetadata = () => ExtensionMetadata;

/** Gets episodes */
export type GetEpisodes = (query: string) => Promise<Episode[]>;

export type GetVideos = (url: string) => Promise<Video[]>;

// ==================== Interfaces ====================

/** Paginated series list response */
export interface SeriesListResponse<T> {
  /** Array of series data */
  data: T[];
  /** Whether more pages are available */
  hasMore: boolean;
}

export type GetAllCookies = (extensionId: string) => Promise<{
  defaultCookies: ElectronCookie[];
  persistCookies: ElectronCookie[];
}>;

/** Constructor options for the extension client. */
export interface ExtensionClientConstructorOptions {
  /**
   * @deprecated Use `$context.createPreferences()` to get, set, and manage extension
   * preferences instead. This property will be removed in a future release.
   */
  settings?: Record<string, any>;

  /** Context and utilities provided to the extension client. */
  $context?: {
    /**
     * Parses or manipulates HTML and XML content using Cheerio.
     *
     * @param content - The HTML or XML markup to parse.
     * @param options - Optional Cheerio configuration options.
     * @returns A Cheerio API instance for querying and manipulating the document.
     *
     * @see https://cheerio.js.org/
     */
    loadDoc?: (content: string, options?: Record<string, any>) => any;

    createPreferences: CreatePreferencesFunction | undefined;
  };
}

/** Extension settings preferences function */
export type GetSettingsFilters = () => Setting[];
