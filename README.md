# House of EdTech Demo App

This is a React Native mobile application built with Expo and Expo Router. It demonstrates several key mobile features including WebView integration, video playback, and push notifications.

## Features

-   WebView Integration: Embeds and interacts with external websites directly within the application.
-   Video Player: Provides custom video playback capabilities that support HLS streaming.
-   Push Notifications: Integrated system for receiving and handling remote push notifications.
-   Tab Navigation: Uses Expo Router's file-based routing for intuitive bottom tab navigation.
-   Parallax Scroll Effects: Adds a parallax scrolling effect to list views for a better user experience.
-   Dark/Light Mode Support: The UI automatically adapts to the system's theme settings.

## Tech Stack

-   Framework: React Native with Expo (SDK 54)
-   Routing: Expo Router (v6) - Uses file-based routing similar to Next.js.
-   Styling: Standard StyleSheet API with custom design tokens.
-   Video: expo-video for video playback.
-   WebView: react-native-webview for embedding web content.
-   Icons: @expo/vector-icons.

## Project Structure

```
JobJD-App/
├── app/                  # Application source code (Router)
│   ├── (tabs)/           # Tab-based navigation screens
│   ├── _layout.tsx       # Root layout configuration
│   ├── index.tsx         # Main entry screen
│   ├── modal.tsx         # Modal screen example
│   ├── video-player.tsx  # Video player implementation
│   └── webview.tsx       # WebView screen implementation
├── components/           # Reusable UI components
├── constants/            # App constants (Colors, Theme configs)
├── hooks/                # Custom React hooks
├── assets/               # Static assets (images, fonts)
└── scripts/              # Utility scripts
```

## Implementation Details

### Routing & Navigation
We chose Expo Router for its modern, file-system-based approach to navigation. This simplifies deep linking and aligns well with web development patterns.
-   app/_layout.tsx: Defines the root stack navigator.
-   app/(tabs)/_layout.tsx: Configures the bottom tab navigator.

### WebView Integration
This is implemented using react-native-webview in app/webview.tsx. It allows the app to serve as a wrapper for existing web platforms while adding native capabilities.

### Video Playback
We use expo-video in app/video-player.tsx to handle modern video formats including HLS, ensuring smooth streaming experiences across devices.

## Getting Started

1.  Install Dependencies:
    ```bash
    npm install
    ```

2.  Start the Server:
    ```bash
    npm start
    ```

3.  Run on Device/Emulator:
    -   Press 'a' for Android Emulator.
    -   Press 'i' for iOS Simulator.
    -   Scan the QR code with the Expo Go app on a physical device.

## Reset Project

To reset the project to a clean state (moving current app code to app-example):
```bash
npm run reset-project
```

## Testing

A comprehensive testing suite has been implemented using Jest and React Native Testing Library.

### Running Tests

To run the tests, use the following commands:

-   Run all tests: `npm test`
-   Run tests in watch mode: `npm run test:watch`

### Test Coverage

The following components and screens are covered by tests:

-   **Unit Tests:**
    -   `ThemedText`
    -   `ThemedView`
    -   `HelloWave`
    -   `ParallaxScrollView`
-   **Integration Tests:**
    -   `HomeScreen` (Navigation and rendering)
    -   `VideoPlayerScreen` (Video player mocking and rendering)
    -   `WebViewScreen` (WebView rendering and notifications mocking)

Tests are located in `__tests__` directories alongside their respective components or in `app/__tests__`.
