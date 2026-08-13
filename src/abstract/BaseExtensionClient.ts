import type {
  ExtensionClientConstructorOptions,
  GetFilterConfig,
  GetImage,
  GetLatestSeries,
  GetPopularSeries,
  GetSeries,
  GetSeriesStatus,
  GetSettingsPreference,
  SearchSeries,
  SeriesListResponse,
} from "@/types/extension/client";
import type { ExtensionMetadata } from "../types/extension/metadata";
// oxlint-disable-next-line no-unused-vars
import type { AnimeExtensionClient } from "./AnimeExtensionClient";
// oxlint-disable-next-line no-unused-vars
import type { MangaExtensionClient } from "./MangaExtensionClient";
import type { Status } from "@/types/core";

/**
 * Abstract base class for all extension clients.
 *
 *  Extension developers should extend {@link MangaExtensionClient} or
 * {@link AnimeExtensionClient} rather than this class directly.
 *
 * ## Minimal implementation example
 * ```ts
 * import { MangaExtensionClient } from "@tsukimichi-extensions/common";
 * import manifest from "./manifest.json";
 *
 * export class MyExtension extends MangaExtensionClient {
 *  baseUrl: string;
 *
 * constructor() {
 *  ...
 * this.baseUrl = manifest.url;
 * }
 *
 * async searchSeries(query, options) { ... }
 *
 * async getSeries(query, options) { ... }
 * ```
 */
export abstract class BaseExtensionClient<T> {
  protected settings: Record<string, any>;

  constructor(options: ExtensionClientConstructorOptions) {
    this.settings = options.settings || {};
  }

  /**
   * Base URL of the source without trailing slash
   */
  abstract baseUrl: string;

  /**
   * Extension metadata - must be defined by subclass
   */
  abstract extensionMetadata: ExtensionMetadata;

  /**
   * Search for series
   *
   * @param query Search query string
   * @param options Options to search series
   * @returns Array of series matching the search query
   */
  abstract searchSeries: SearchSeries<T>;

  /**
   * Get popular series
   *
   * @param options Options to fetch popular series
   * @returns Array of popular series
   */
  abstract getPopularSeries: GetPopularSeries<T>;

  /**
   * Get latest series
   *
   * @param options Options to fetch latest series
   * @returns Array of latest series
   */
  abstract getLatestSeries: GetLatestSeries<T>;

  /**
   * Get specific series by ID or URL
   *
   * @param query Series ID or URL
   * @return Series details or null if not found
   */
  abstract getSeries: GetSeries<T>;

  /**
   * Convert source-specific status to standard {@link Status}
   *
   * The default implementation is a case-insensitive match against the
   * standard status strings. Override this if your source uses different
   * status labels.
   *
   * @example
   * ```ts
   * override getSeriesStatus(status: string): Status {
   *  if (status === "Publishing") return "ongoing";
   *  return super.getSeriesStatus(status);
   * }
   *```
   */
  getSeriesStatus: GetSeriesStatus = (status) => {
    if (!status) return "unknown";
    const normalized = status.toLowerCase();

    const map: Record<string, Status> = {
      ongoing: "ongoing",
      "on going": "ongoing",
      publishing: "ongoing",
      airing: "ongoing",
      completed: "completed",
      finished: "completed",
      cancelled: "cancelled",
      canceled: "cancelled",
      discontinued: "cancelled",
      hiatus: "hiatus",
      "on hiatus": "hiatus",
      upcoming: "upcoming",
      "not yet released": "upcoming",
      "not yet aired": "upcoming",
      announced: "upcoming",
    };

    return map[normalized] ?? "unknown";
  };

  /**
   * Get filter configuration for search
   * 
   * The default implementation returns an empty filter config.
   * Override this to expose search filters to the app.
   * 
   * @example
   * ```ts
   * override getFilterConfig: GetFilterConfig = () => ({
   *  extensionId: this.extensionMetadata.id,
   *  extensionName: this.extensionMetadata.name,
   *  supportedFilters: [
       { key: "genre", label: "Genre", type: "multi-select", options: [...],
        renderAs: "checkbox-group", multiple: true },
   *  ]
   * });
   *```
   * @return Filter configuration object
   */
  getFilterConfig: GetFilterConfig = () => ({
    extensionId: this.extensionMetadata.id,
    extensionName: this.extensionMetadata.name,
    supportedFilters: [],
  });

  /**
   * Get extension settings preferences
   */
  abstract getSettingsPreference: GetSettingsPreference;

  /**
   * Get image data for a given image URL
   * @param url Image URL
   * @returns Image data as a buffer
   */
  abstract getImage: GetImage;

  //   ==================== Some helper methods ====================

  protected getSetting<V = unknown>(key: string, fallback?: V): V {
    const value = this.settings?.[key];
    return (value !== undefined ? value : fallback) as V;
  }

  /**
   * Builds a paginated empty response — useful as a default return value
   * when a fetch yields no results.
   */
  protected emptyListResponse<S>(): SeriesListResponse<S> {
    return {
      data: [],
      pagination: {
        hasMore: false,
        nextPage: null,
      },
    };
  }

  /**
   * Add an artificial delay (in milliseconds) - useful for rate limiting or simulating network latency in testing.
   */
  protected delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Helper method to convert a full URL to a path relative to the base URL.
   */
  protected setUrlWithoutDomain(url: string, base = this.baseUrl): string {
    const path = new URL(url, base).pathname;
    return path.endsWith("/") ? path.slice(0, -1) : path;
  }

  /**
   * Convert an unknown input value to a number or returns `null`
   * if the value cannot be safely converted.
   *
   * Rules:
   * - `null` and `undefined` return `null`
   * - Numeric strings are converted using `Number()`
   * - Empty strings return `null`
   * - `NaN` values return `null`
   * - By default, only integers are allowed
   * - Set `float` to `true` to allow floating-point numbers
   *
   * @param input - The value to convert to a number
   * @param float - Whether floating-point numbers are allowed (default: `false`)
   * @returns Parsed number or `null` if conversion is fails
   *
   * @example
   * ```ts
   * // Integer parsing (default)
   * toNumberOrNull("42") //  => 42
   * ```
   *
   * @example
   * ```ts
   * // Float rejected when float = false
   * toNumberOrNull("3.14") // => null
   * ```
   *
   * @example
   * ```ts
   * // Float allowed
   * toNumberOrNull("3.14", true) // => 3.14
   * ```
   */
  protected toNumberOrNull(input: unknown, float = false): number | null {
    if (input === null || input === undefined) return null;

    if (typeof input === "number") {
      if (Number.isNaN(input)) return null;
      if (!(float || Number.isInteger(input))) return null;
      return input;
    }

    if (typeof input !== "string") return null;

    if (input.trim() === "") return null;

    const num = Number(input.trim());

    if (Number.isNaN(num)) return null;
    if (!(float || Number.isInteger(num))) return null;

    return num;
  }
}