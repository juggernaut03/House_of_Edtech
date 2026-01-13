/**
 * Centralized color constants for the House of EdTech Demo App.
 * Black and White theme with clean, minimal design.
 */

// Primary Brand Colors - Black & White Theme
export const PRIMARY = '#000000';     // Black - Primary actions
export const SUCCESS = '#000000';     // Black - Success states
export const WARNING = '#333333';     // Dark Gray - Secondary actions

// Background Colors
export const BACKGROUND_LIGHT = '#ffffff';
export const BACKGROUND_WHITE = '#ffffff';
export const BACKGROUND_DARK = '#000000';
export const BACKGROUND_DARK_SECONDARY = '#111111';
export const BACKGROUND_DARK_TERTIARY = '#222222';
export const BACKGROUND_GRAY = '#f5f5f5';

// Border Colors
export const BORDER_LIGHT = '#e0e0e0';
export const BORDER_DARK = '#333333';

// Text Colors
export const TEXT_PRIMARY = '#000000';
export const TEXT_SECONDARY = '#333333';
export const TEXT_TERTIARY = '#666666';
export const TEXT_MUTED = '#999999';
export const TEXT_GRAY = '#808080';
export const TEXT_LIGHT_MUTED = '#aaaaaa';
export const TEXT_WHITE = '#ffffff';

// Video Player Specific
export const VIDEO_PROGRESS_BAR = '#000000';
export const VIDEO_SELECTED_STREAM = '#333333';
export const VIDEO_CONTROL_BUTTON = '#333333';
export const VIDEO_LOADING_OVERLAY = 'rgba(0, 0, 0, 0.5)';

// Button Colors
export const BUTTON_PRIMARY = PRIMARY;
export const BUTTON_SUCCESS = '#000000';
export const BUTTON_WARNING = '#333333';
export const BUTTON_TEXT = TEXT_WHITE;
export const BUTTON_DESC = 'rgba(255, 255, 255, 0.9)';
export const BUTTON_DESC_MUTED = 'rgba(255, 255, 255, 0.8)';

// Header Colors for Tabs
export const HEADER_LIGHT_BLUE = '#f0f0f0';
export const HEADER_DARK_BLUE = '#111111';
export const HEADER_LIGHT_GRAY = '#e0e0e0';
export const HEADER_DARK_GRAY = '#222222';

// Organized color palette for theme support
export const Colors = {
    // Brand Colors
    primary: PRIMARY,
    success: SUCCESS,
    warning: WARNING,

    // Light Theme
    light: {
        background: BACKGROUND_WHITE,
        backgroundSecondary: BACKGROUND_LIGHT,
        text: TEXT_PRIMARY,
        textSecondary: TEXT_SECONDARY,
        textMuted: TEXT_MUTED,
        border: BORDER_LIGHT,
        tint: PRIMARY,
        icon: TEXT_GRAY,
        tabIconDefault: TEXT_GRAY,
        tabIconSelected: PRIMARY,
        headerBackground: HEADER_LIGHT_GRAY,
    },

    // Dark Theme
    dark: {
        background: BACKGROUND_DARK,
        backgroundSecondary: BACKGROUND_DARK_SECONDARY,
        backgroundTertiary: BACKGROUND_DARK_TERTIARY,
        text: TEXT_WHITE,
        textSecondary: TEXT_LIGHT_MUTED,
        textMuted: TEXT_MUTED,
        border: BORDER_DARK,
        tint: TEXT_WHITE,
        icon: TEXT_MUTED,
        tabIconDefault: TEXT_MUTED,
        tabIconSelected: TEXT_WHITE,
        headerBackground: HEADER_DARK_GRAY,
    },

    // Video Player Colors
    video: {
        progressBar: VIDEO_PROGRESS_BAR,
        selectedStream: VIDEO_SELECTED_STREAM,
        controlButton: VIDEO_CONTROL_BUTTON,
        loadingOverlay: VIDEO_LOADING_OVERLAY,
        playButton: PRIMARY,
    },

    // Button Colors
    button: {
        primary: BUTTON_PRIMARY,
        success: BUTTON_SUCCESS,
        warning: BUTTON_WARNING,
        text: BUTTON_TEXT,
        description: BUTTON_DESC,
        descriptionMuted: BUTTON_DESC_MUTED,
    },
};

export default Colors;
