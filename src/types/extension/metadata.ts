/**
 * Metadata describing an extension's capabilities and identification.
 */
export interface ExtensionMetadata {
  /**
   * Unique identifier for the extension
   */
  id: string;

  /**
   * Display name of the extension
   */
  name: string;

  /**
   * The class name of the extension implementation
   */
  extClass: string;

  /**
   * Optional description of the extension's functionality
   */
  description?: string | null;

  /**
   * Base URL of the extension/site without trailing slash
   * @example "https://mangadex.org"
   */
  url: string;

  /**
   * URL of the extension/site icon
   */
  iconUrl: string | null;

  /**
   * A language code following [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
   * or `multi` if the extension supports multiple languages
   */
  lang: string;

  /**
   * Whether the extension contains any NSFW content
   */
  isNsfw: boolean;

  /**
   * Base URL for API endpoints (if different from main url)
   */
  apiUrl: string | null;

  /**
   * Extension version following semantic versioning
   * @see {@link https://semver.org/}
   */
  version: string;

  /** Whether this is a manga extension (vs anime) */
  isManga: boolean;

  /** Whether the extension supports fetching latest series */
  supportsLatest: boolean;

  /**
   * Whether the extension supports fetching popular series
   */
  supportsPopular: boolean;
}