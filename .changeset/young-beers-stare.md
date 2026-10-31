---
"@tsukimichi/common": major
---

BREAKING: rework filters, settings, series identity, and extension context

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
