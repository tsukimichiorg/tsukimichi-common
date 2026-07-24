import type { GetEpisodes, GetVideos } from "../types/extension/client";
import type { Anime } from "../types/series/anime";
import { BaseExtensionClient } from "./BaseExtensionClient";

export abstract class AnimeExtensionClient extends BaseExtensionClient<Anime> {
  /**
   * Fetches all episodes for an anime.
   *
   * @param query - Series identifier or URL (as used by the source)
   * @param options - Optional scraping options
   * @return Array of episodes, typically sorted in broadcast order
   */
  abstract getEpisodes: GetEpisodes;

  /**
   * Fetches a list of videos for a given episode.
   */
  abstract getVideos: GetVideos;
}
