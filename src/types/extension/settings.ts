/**
 * Available setting input types for extension configuration.
 */
export type SettingsType =
  | "toggle"
  | "text"
  | "password"
  | "number"
  | "select"
  | "multi-select"
  | "checkbox";

/** Base interface for all setting types */
export interface BaseSetting {
  /** Unique key for the setting */
  key: string;
  /** Display label */
  label: string;
  /** Optional description/help text */
  description?: string;
  /** Setting type */
  type: SettingsType;
}

/** Toggle/boolean setting */
export interface ToggleSetting extends BaseSetting {
  type: "toggle";
  /** Default value */
  defaultValue?: boolean;
}

/** Text input setting */
export interface TextSetting extends BaseSetting {
  type: "text";
  /** Default text value */
  defaultValue?: string;
  /** Placeholder text */
  placeholder?: string;
}

/** Password input setting */
export interface PasswordSetting extends BaseSetting {
  type: "password";
  /** Default password (should usually be empty) */
  defaultValue?: string;
  /** Placeholder text */
  placeholder?: string;
}

/** Option for select/multi-select/radio inputs */
export interface Option {
  /** Display label */
  label: string;
  /** Option value */
  value: string | number | boolean;
  /** Whether option is disabled */
  disabled?: boolean;
  /** Default value for this option (for multi-select) */
  defaultValue?: string | number | boolean;
}

/** Single-select dropdown setting */
export interface SelectSetting extends BaseSetting {
  type: "select";
  /** Default selected value */
  defaultValue?: string;
  /** Available options */
  options: Option[];
}

/** Multi-select dropdown setting */
export interface MultiSelectSetting extends BaseSetting {
  type: "multi-select";
  /** Default selected values */
  defaultValue?: string[];
  /** Available options */
  options: Option[];
}

/** Checkbox setting */
export interface CheckboxSetting extends BaseSetting {
  type: "checkbox";
  /** Default checked state */
  defaultValue: boolean;
}

/** Union of all setting types */
export type Setting =
  | ToggleSetting
  | TextSetting
  | PasswordSetting
  | SelectSetting
  | MultiSelectSetting
  | CheckboxSetting;
