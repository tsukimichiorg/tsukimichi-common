import type { GetChapterPages, GetMangaChapters } from "../types/extension/client";
import type { Manga } from "../types/series/manga";
import { BaseExtensionClient } from "./BaseExtensionClient";

/**
 * Abstract base class for **manga** extension clients.
 *
 * Required abstract methods:
 * - `baseUrl`
 * - `extensionMetadata`
 * - `searchSeries`
 * - `getPopularSeries`
 * - `getLatestSeries`
 * - `getSeries`
 * - `getChapters`
 * - `getChapterPages`
 */
export abstract class MangaExtensionClient extends BaseExtensionClient<Manga> {
  /**
   * Fetches all chapters for a manga.
   *
   * @param query - Series identifier or URL (as used by the source)
   * @param options - Optional scraping options
   * @returns Array of chapters, typically sorted newest-first
   */
  abstract getChapters: GetMangaChapters;

  /**
   * Fetches the page list for a specific chapter.
   *
   * @param query - Chapter identifier or URL (as used by the source)
   * @param options - Optional scraping options
   * @returns Ordered array of chapter pages
   */
  abstract getChapterPages: GetChapterPages;
}
