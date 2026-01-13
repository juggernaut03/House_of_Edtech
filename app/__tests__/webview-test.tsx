import { render } from '@testing-library/react-native';
import * as React from 'react';
import WebViewScreen from '../webview';

// Mock react-native-webview
jest.mock('react-native-webview', () => {
    const { View } = require('react-native');
    return {
        __esModule: true,
        default: (props: any) => <View testID="webview" {...props} />,
        WebView: (props: any) => <View testID="webview" {...props} />,
    };
});

// Mock expo-notifications
jest.mock('expo-notifications', () => ({
    requestPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
    getExpoPushTokenAsync: jest.fn(() => Promise.resolve({ data: 'mock-token' })),
    setNotificationHandler: jest.fn(),
    addNotificationReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
    addNotificationResponseReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
    removeNotificationSubscription: jest.fn(),
    scheduleNotificationAsync: jest.fn(),
}));

describe('WebViewScreen', () => {
    it('renders correctly', () => {
        const { getByText } = render(<WebViewScreen />);
        // Check for the header title
        expect(getByText('WebView + Notifications')).toBeTruthy();
    });
});
