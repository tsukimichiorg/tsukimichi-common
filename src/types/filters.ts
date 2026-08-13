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
  | "radio" // Radio button group for mutually exclusive options
  | "number"; // Numeric input

/**
 * Direction for sorting
 */
export type SortDirection = "ascending" | "descending";

/**
 * Tri-state checkbox value
 *
 * - "checked": The item is explicitly selected
 * - "unchecked": The item is explicitly unselected
 * - "indeterminate": The item is neither selected nor unselected
 */
export type TriStateValue = "checked" | "unchecked" | "indeterminate";

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
  /** Whether option is disabled */
  disabled?: boolean;
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
  /** Maximum number of selectable items */
  maxSelection?: number;
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

/** Tri-state checkbox filter */
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

/** Number input filter */
export interface NumberFilter extends BaseFilter {
  type: "number";
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /**
   * Default value as a number or a string representation
   */
  defaultValue?: number | string;
}

/** Union of all filter types */
export type Filter =
  | TextFilter
  | SelectFilter
  | SortFilter
  | MultiSelectFilter
  | CheckboxFilter
  | TriStateCheckboxFilter
  | RadioFilter
  | NumberFilter;

/** Complete filter configuration for an extension */
export interface ExtensionFilterConfig {
  /** Extension identifier */
  extensionId: string;
  /** Extension display name */
  extensionName: string;
  /** Optional header text to render at the very top of the filter list */
  header?: string;
  /** Array of supported filters */
  supportedFilters: Filter[];
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
