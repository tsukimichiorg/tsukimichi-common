/**
 * Available filter types for search/filtering.
 */
export type FilterType =
  | "text"
  | "select"
  | "multi-select"
  | "checkbox"
  | "tri-state-checkbox"
  | "radio"
  | "number";

export type TriStateValue = "checked" | "unchecked" | "indeterminate";

/** Base interface for all filter types */
export interface BaseFilter {
  /** Unique key for the filter */
  key: string;
  /** Display label */
  label: string;
  /** Filter type */
  type: FilterType;
  /** Whether filter is required */
  required?: boolean;
  /** Optional description */
  description?: string;
  /** Default value */
  defaultValue?: string | number | boolean;
}

/** Filter option for select/multi-select/radio */
export interface FilterOption {
  /** Option value */
  value: string | number | boolean;
  /** Display label */
  label: string;
  /** Whether option is disabled */
  disabled?: boolean;
}

/** Text input filter */
export interface TextFilter extends BaseFilter {
  defaultValue: string;
  type: "text";
  /** Placeholder text */
  placeholder?: string;
  /** Maximum character length */
  maxLength?: number;
}

/** Single-select dropdown filter */
export interface SelectFilter extends BaseFilter {
  type: "select";
  /** Available options */
  options: FilterOption[];
  multiple?: false;
}

/**
 * Multi-select filter
 */
export interface MultiSelectFilter extends Omit<BaseFilter, "defaultValue"> {
  type: "multi-select";
  /** Available options */
  options: FilterOption[];
  multiple: true;
  /** Maximum number of selectable items */
  maxSelection?: number;
  /**
   * How to render the filter
   */
  renderAs: "checkbox-group" | "select";
}

/**
 * Checkbox filter
 */
export interface CheckboxFilter extends BaseFilter {
  type: "checkbox";
  /** Default checked state */
  defaultValue?: boolean;
}

/** Tri-state checkbox filter */
export interface TriStateCheckboxFilter extends BaseFilter {
  type: "tri-state-checkbox";
  options: FilterOption[];
  multiple: boolean;
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
}

/** Union of all filter types */
export type Filter =
  | TextFilter
  | SelectFilter
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
  /** Optional header text */
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