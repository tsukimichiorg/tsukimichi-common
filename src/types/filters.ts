import type { FilterValues } from "./extension/client";

/**
 * Available filter types for search/filtering.
 * Each type determines how the filter should be rendered.
 */
export type FilterType =
  | "text" // Text input
  | "select" // Single selection dropdown
  | "multi-select" // Multiple selection (checkbox group or multi-select dropdown)
  | "checkbox" // Single checkbox
  | "sort" // Sort control with field and direction
  | "tri-state-checkbox" // Checkbox with three states (checked, unchecked, indeterminate)
  | "radio"; // Radio button group for mutually exclusive options

/**
 * Direction for sorting
 */
export type SortDirection = "ascending" | "descending";

/**
 * Tri-state checkbox value
 *
 * - "include": The item is explicitly selected
 * - "exclude": The item is explicitly unselected
 * - "off": The item is neither selected nor unselected
 */
export type TriStateValue = "include" | "exclude" | "off";

/** Base interface for all filter types */
export interface BaseFilter {
  /** Unique key for the filter */
  key: string;
  /** Display label */
  label: string;
  /** Filter type */
  type: FilterType;
  /** Optional description */
  description?: string;
  /** Default value */
  defaultValue?: string | number | string[];
}

/** Filter option for select/multi-select/radio */
export interface FilterOption {
  /** Option value */
  value: string;
  /** Display label */
  label: string;
}

/** Text input filter */
export interface TextFilter extends BaseFilter {
  defaultValue?: string;
  type: "text";
  /** Placeholder text */
  placeholder?: string;
}

/** Single-select dropdown filter */
export interface SelectFilter extends BaseFilter {
  type: "select";
  /** Available options */
  options: FilterOption[];
  defaultValue?: string;
}

export interface SortFilter extends Omit<BaseFilter, "defaultValue"> {
  type: "sort";
  options: FilterOption[];
  defaultValue: string;
  /**
   * Default sort direction.
   *
   * @default - "descending"
   */
  defaultDirection?: SortDirection;
}

/**
 * Multi-select filter
 */
export interface MultiSelectFilter extends Omit<BaseFilter, "defaultValue"> {
  type: "multi-select";
  /** Available options */
  options: FilterOption[];
  /**
   * How to render the filter
   */
  renderAs: "checkbox-group" | "select";
  defaultValue?: string[];
}

/**
 * Checkbox filter
 */
export interface CheckboxFilter extends BaseFilter {
  type: "checkbox";
  /**
   * Default value
   *
   * Note: This value will be used to determine whether the checkbox is checked or not
   */
  defaultValue?: string;
}

/** Tri-state checkbox multi-select filter */
export interface TriStateCheckboxFilter extends Omit<BaseFilter, "defaultValue"> {
  type: "tri-state-checkbox";
  options: FilterOption[];
  defaultValue?: TriStateFilterValue[];
}

/** Radio button group filter */
export interface RadioFilter extends BaseFilter {
  type: "radio";
  /** Available options */
  options: FilterOption[];
}

/** Union of all filter types */
export type Filter =
  | TextFilter
  | SelectFilter
  | SortFilter
  | MultiSelectFilter
  | CheckboxFilter
  | TriStateCheckboxFilter
  | RadioFilter;

export interface FilterValueMap {
  text: string;
  select: string;
  "multi-select": string[];
  checkbox: boolean;
  sort: SortFilterValue;
  "tri-state-checkbox": TriStateFilterValue[];
  radio: string;
}

export type FilterValue<F extends Filter = Filter> = F extends Filter
  ? FilterValueMap[F["type"]]
  : never;

export type ResolvedFilterEntry = {
  [T in Filter["type"]]: {
    type: T;
    filter: Extract<Filter, { type: T }>;
    value: FilterValueMap[T];
  };
}[Filter["type"]];

export function isTriState(value: unknown): value is TriStateFilterValue["state"] {
  return value === "include" || value === "exclude" || value === "off";
}

export function isFilterType<K extends keyof FilterValueMap>(
  filter: Filter,
  value: unknown,
  type: K,
): value is FilterValueMap[K] {
  if (filter.type !== type) return false;

  switch (type) {
    case "text":
    case "select":
    case "radio":
      return typeof value === "string";

    case "multi-select":
      return Array.isArray(value) && value.every((v) => typeof v === "string");

    case "checkbox":
      return typeof value === "boolean";

    case "tri-state-checkbox":
      return (
        Array.isArray(value) &&
        value.every(
          (v) =>
            typeof v === "object" &&
            v !== null &&
            !Array.isArray(v) &&
            "state" in v &&
            isTriState(v.state) &&
            "value" in v &&
            typeof v.value === "string",
        )
      );

    case "sort":
      return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        "value" in value &&
        "direction" in value &&
        ["ascending", "descending"].includes(
          value.direction as { direction: SortDirection }["direction"],
        )
      );

    default:
      return false;
  }
}

export function resolveFilterEntries(
  filters: FilterValues,
  config: ReadonlyArray<Filter>,
): ResolvedFilterEntry[] {
  const map = new Map(config.map((f) => [f.key, f]));
  const out: ResolvedFilterEntry[] = [];

  for (const [key, value] of Object.entries(filters ?? {})) {
    const filter = map.get(key);
    if (!filter || value == null) continue;

    if (isFilterType(filter, value, filter.type)) {
      out.push({
        type: filter.type,
        value,
        filter,
      } as ResolvedFilterEntry);
    }
  }

  return out;
}

/** Complete filter configuration for an extension */
export interface ExtensionFilterConfig {
  /** Optional header text to render at the very top of the filter list */
  header?: string;
  /** List of supported filters */
  filters: Filter[];
}

/**
 * TriState value passed from client
 */
export interface TriStateFilterValue {
  state: TriStateValue;
  value: string;
}

export interface SortFilterValue {
  value: string;
  direction: SortDirection;
}