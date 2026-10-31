/**
 * Maps preference keys to their declared value types.
 *
 * Use literal unions for string enums:
 * { theme: "light" | "dark" }
 */
export type PreferenceSchema = Record<string, PreferenceValue | null>;

/** Extracts valid string keys from a schema. */
export type PreferenceKey<TSchema> = Extract<keyof TSchema, string>;

/**
 * Values supported by the preferences store.
 */
export type PreferenceValue = string | number | boolean | string[];

/** Extracts keys whose values support a particular primitive type. */
type KeysOfType<TSchema, TValue> = {
  [K in keyof TSchema]-?: Extract<TSchema[K], TValue> extends never ? never : K;
}[keyof TSchema] &
  string;

/** Extracts the value type associated with a preference key. */
export type PreferenceValueOf<TSchema, K extends keyof TSchema> = TSchema[K];

/**
 * Provides typed access to persisted preferences.
 *
 * @typeParam TSchema - Optional map of preference keys to value types.
 * Defaults to arbitrary string keys with primitive preference values.
 */
export interface Preferences<TSchema extends object = Record<string, PreferenceValue>> {
  /**
   * Retrieves a string preference.
   *
   * @param key - A key whose schema value supports strings.
   * @param defaultValue - Fallback value; defaults to null.
   */
  getString: <
    K extends KeysOfType<TSchema, string>,
    D extends Extract<TSchema[K], string> | null = Extract<TSchema[K], string> | null,
  >(
    key: K,
    defaultValue?: D,
  ) => Promise<Extract<TSchema[K], string> | D>;

  /**
   * Retrieves a numeric preference.
   *
   * @param key - A key whose schema value is numeric.
   * @param defaultValue - Fallback value; must not be null.
   */
  getNumber: <K extends KeysOfType<TSchema, number>, D extends Extract<TSchema[K], number>>(
    key: K,
    defaultValue: D,
  ) => Promise<Extract<TSchema[K], number> | D>;

  /**
   * Retrieves a boolean preference.
   *
   * @param key - A key whose schema value is boolean.
   * @param defaultValue - Fallback value; must not be null.
   */
  getBoolean: <K extends KeysOfType<TSchema, boolean>, D extends Extract<TSchema[K], boolean>>(
    key: K,
    defaultValue: D,
  ) => Promise<Extract<TSchema[K], boolean> | D>;

  /**
   * Retrieves a string array preference.
   *
   * @param key - A key whose schema value is a string array.
   * @param defaultValue - Fallback value; defaults to null.
   */
  getStringArray: <
    K extends KeysOfType<TSchema, string[]>,
    D extends Extract<TSchema[K], string[]> | null = Extract<TSchema[K], string[]> | null,
  >(
    key: K,
    defaultValue?: D,
  ) => Promise<Extract<TSchema[K], string[]> | D>;

  /** Retrieves all stored preferences, including declared defaults. */
  getAll: () => Promise<Partial<TSchema>>;

  /** Checks whether a key has a stored or declared value. */
  contains: (key: PreferenceKey<TSchema>) => Promise<boolean>;

  /** Creates a chainable editor for batching preference changes. */
  edit: () => PreferencesEditor<TSchema>;

  /** Removes a preference key. */
  remove: (key: PreferenceKey<TSchema>) => Promise<void>;

  /** Removes all stored preferences. */
  clear: () => Promise<void>;

  /**
   * Subscribes to preference changes.
   * @returns A function that unsubscribes the listener.
   */
  onChange: (listener: (changedKeys: PreferenceKey<TSchema>[]) => void) => () => void;
}

/**
 * Batches preference mutations until apply() is called.
 *
 * @typeParam TSchema - Optional map of preference keys to value types.
 */
export interface PreferencesEditor<TSchema extends object = Record<string, PreferenceValue>> {
  /** Sets a string preference, or removes it when value is null. */
  putString: <K extends KeysOfType<TSchema, string>>(
    key: K,
    value: Extract<TSchema[K], string> | null,
  ) => PreferencesEditor<TSchema>;

  /** Sets a numeric preference, or removes it when value is null. */
  putNumber: <K extends KeysOfType<TSchema, number>>(
    key: K,
    value: Extract<TSchema[K], number> | null,
  ) => PreferencesEditor<TSchema>;

  /** Sets a boolean preference, or removes it when value is null. */
  putBoolean: <K extends KeysOfType<TSchema, boolean>>(
    key: K,
    value: Extract<TSchema[K], boolean> | null,
  ) => PreferencesEditor<TSchema>;

  /** Sets a string array preference, or removes it when value is null. */
  putStringArray: <K extends KeysOfType<TSchema, string[]>>(
    key: K,
    value: Extract<TSchema[K], string[]> | null,
  ) => PreferencesEditor<TSchema>;

  /** Removes a preference from storage. */
  remove: (key: PreferenceKey<TSchema>) => PreferencesEditor<TSchema>;

  /** Clears all preferences. */
  clear: () => PreferencesEditor<TSchema>;

  /** Applies all queued operations. */
  apply: () => Promise<void>;
}

/**
 * Creates a preferences client with an optional schema.
 *
 * @typeParam TSchema - Maps preference keys to their value types.
 */
export type CreatePreferencesFunction = <
  TSchema extends object = Record<string, PreferenceValue>,
>() => Preferences<TSchema>;
