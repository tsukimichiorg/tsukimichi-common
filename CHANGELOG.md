# @tsukimichi/common

## 1.0.0

### Major Changes

- [`6d18437`](https://github.com/tsukimichiorg/tsukimichi-common/commit/6d18437ed0cb9eb19a4ea0da07b477dd9770842f) Thanks [@redoyyy](https://github.com/redoyyy)! - BREAKING: rework filters, settings, series identity, and extension context

  - `SeriesListResponse` drops `pagination`; `hasMore` is now a top-level field.
  - `ExtensionFilterConfig` replaces `extensionId`, `extensionName`, and `supportedFilters` with `filters`, and `GetFilterConfig` no longer accepts `includeNsfw`.
  - `getSettingsPreference()` becomes `getSettingsFilters(): Setting[]`; `ExtensionSettings`, `RadioSetting`, and the `"radio"` settings type are removed.
  - Removed `BaseExtensionClient.getSetting()`, `ExtensionClientConstructorOptions.getAllCookies`, and `ExtensionMetadata.apiUrl`; `ExtensionMetadata.isNsfw` becomes `contentRating`.
  - Filters: `NumberFilter`/`"number"` removed, tri-state values are now `include`/`exclude`/`off`, and `FilterOption.disabled` plus `MultiSelectFilter.maxSelection` are removed.
  - `Anime`, `Episode`, `Manga`, and `Chapter` no longer include `id`, `extensionId`, or `source`.

  Added:

  - `$context.loadDoc` (host-provided HTML/XML parser) and `$context.createPreferences` on `ExtensionClientConstructorOptions`; `settings` is deprecated.
  - Typed preferences API (`Preferences`, `PreferencesEditor`, `CreatePreferencesFunction`) exported from the package root.
  - `init()` lifecycle hook on `BaseExtensionClient`.
  - URL helpers (`GetAnimeUrl`, `GetEpisodeUrl`, `GetMangaUrl`, `GetChapterUrl`) and filter helpers (`FilterValues`, `FilterValue`, `ResolvedFilterEntry`, `isTriState`, `isFilterType`, `resolveFilterEntries`).
  - `"chapters"` auxiliary track kind.

  Tooling: bumps `tsup` to v9.

## 0.3.0

### Minor Changes

- [`3137ade`](https://github.com/tsukimichiorg/tsukimichi-common/commit/3137ade85d45e096ec88504bd841bc7b3d030c5b) Thanks [@redoyyy](https://github.com/redoyyy)! - refactor: simplify extension metadata

## 0.2.0

### Minor Changes

- [`69d5861`](https://github.com/tsukimichiorg/tsukimichi-common/commit/69d58617d781fc7aef35e204385088d3f5446146) Thanks [@redoyyy](https://github.com/redoyyy)! - feat(filters): add sort filter, simplify filter types
